"use client";

import { useState, useEffect, useRef } from 'react';
import { useGameStore } from './game-store';
import { Restaurant } from './restaurant-data';
import { Compass } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Radius of Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function PokeMap() {
  const { 
    latitude, 
    longitude, 
    allRestaurants,
    candidates, 
    searchRadius,
    stage,
    currentRoundIndex,
    currentMatchupIndex,
    rounds,
    mapCenterOverride
  } = useGameStore();

  const [hoveredRest, setHoveredRest] = useState<Restaurant | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const overlaysRef = useRef<any[]>([]);
  const labelsLayerRef = useRef<any>(null);

  const activeRound = rounds[currentRoundIndex];

  const getRestStatus = (rest: Restaurant) => {
    if (stage !== 'tournament' || !activeRound) return 'None';
    const activeMatch = activeRound.matchups[currentMatchupIndex];
    if (activeMatch) {
      if (activeMatch.r1.id === rest.id || activeMatch.r2.id === rest.id) {
        return 'Competitor';
      }
    }
    const defeated = useGameStore.getState().defeatedPath;
    if (defeated.some(d => d.id === rest.id)) {
      return 'Eliminated';
    }
    return 'None';
  };

  // 1. Initialize Leaflet Map Instance
  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || mapInstance.current) return;

    const L = require('leaflet');

    const map = L.map(mapRef.current, {
      center: [latitude || 40.743991, longitude || -74.032363],
      zoom: 15,
      zoomControl: false,
      attributionControl: false
    });

    // Custom pane for labels above vector overlays but below markers
    map.createPane('labelsPane');
    const pane = map.getPane('labelsPane');
    if (pane) {
      pane.style.zIndex = '450';
      pane.style.pointerEvents = 'none';
    }

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // 2. Toggle Street Labels on Hover
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;
    const L = require('leaflet');

    if (hoveredRest !== null) {
      if (!labelsLayerRef.current) {
        labelsLayerRef.current = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          pane: 'labelsPane'
        }).addTo(map);
      }
    } else {
      if (labelsLayerRef.current) {
        labelsLayerRef.current.remove();
        labelsLayerRef.current = null;
      }
    }
  }, [hoveredRest]);

  // 3. Update Markers, Trees, Circle on State Changes
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || latitude === null || longitude === null) return;

    const L = require('leaflet');

    // Clear old overlays
    overlaysRef.current.forEach(o => o.remove());
    overlaysRef.current = [];

    // Draw search radius circle
    const radiusCircle = L.circle([latitude, longitude], {
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.08,
      weight: 3,
      dashArray: '5, 10',
      radius: searchRadius * 1609.344
    }).addTo(map);
    overlaysRef.current.push(radiusCircle);

    // Draw User Location Backpack Marker
    const trainerIcon = L.divIcon({
      html: `
        <div class="relative w-8 h-8 flex items-center justify-center select-none pointer-events-none">
          <div class="absolute inset-0 bg-blue-500/20 border-2 border-blue-600 rounded-full animate-ping"></div>
          <div class="w-6 h-6 border-2 border-foreground bg-white rounded-full flex items-center justify-center shadow-[0_2px_0_#000] z-10 text-[10px]">
            🎒
          </div>
        </div>
      `,
      className: 'trainer-marker-container',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    const userMarker = L.marker([latitude, longitude], { icon: trainerIcon }).addTo(map);
    overlaysRef.current.push(userMarker);

    // Generate Background Scenery Trees
    const treeSeed = Math.abs(Math.sin(latitude) * Math.cos(longitude));
    let treeRandCount = 0;
    function treeRandom(): number {
      const x = Math.sin(treeSeed + treeRandCount++) * 10000;
      return x - Math.floor(x);
    }

    const treesList: { lat: number; lng: number; isShrub: boolean }[] = [];
    const forbiddenPoints = [
      [latitude, longitude],
      ...candidates.map(r => [r.latitude, r.longitude])
    ];

    for (let i = 0; i < 120; i++) {
      const angle = treeRandom() * Math.PI * 2;
      const dist = 0.03 + treeRandom() * 1.5;
      const latOffset = (dist * Math.sin(angle)) / 69;
      const lngOffset = (dist * Math.cos(angle)) / (69 * Math.cos((latitude * Math.PI) / 180));
      const treeLat = latitude + latOffset;
      const treeLng = longitude + lngOffset;

      const isTooClose = forbiddenPoints.some(pt => {
        const d = getDistance(pt[0], pt[1], treeLat, treeLng);
        return d < 0.05;
      });

      if (!isTooClose) {
        treesList.push({
          lat: treeLat,
          lng: treeLng,
          isShrub: treeRandom() > 0.6
        });
      }
      
      if (treesList.length >= 70) break;
    }

    const treeHtml = `
      <div class="select-none pointer-events-none opacity-80 scale-90">
        <svg viewBox="0 0 32 32" width="28" height="28" class="block">
          <path d="M12,4 L20,4 L24,8 L24,16 L28,20 L28,24 L24,28 L8,28 L4,24 L4,20 L8,16 L8,8 Z" fill="#2c3b25" />
          <path d="M13,5 L19,5 L23,9 L23,16 L27,20 L27,23 L23,27 L9,27 L5,23 L5,20 L9,16 L9,9 Z" fill="#5c8a3c" />
          <path d="M14,6 L18,6 L22,10 L22,14 L12,14 L10,12 Z" fill="#8cb86c" />
          <path d="M12,18 L20,18 L22,20 L22,25 L10,25 L10,20 Z" fill="#4a732d" />
          <rect x="14" y="25" width="4" height="5" fill="#7a583a" />
        </svg>
      </div>
    `;

    const shrubHtml = `
      <div class="select-none pointer-events-none opacity-85 scale-75">
        <svg viewBox="0 0 16 16" width="16" height="16" class="block">
          <path d="M2,10 L4,8 L6,10 L8,7 L10,10 L12,8 L14,10 L13,12 L3,12 Z" fill="#5c8a3c" />
          <path d="M4,10 L6,9 L8,10 L10,9 L12,10 Z" fill="#8cb86c" />
          <path d="M1,12 L15,12" stroke="#2c3b25" stroke-width="1.5" />
        </svg>
      </div>
    `;

    treesList.forEach(tree => {
      const treeIcon = L.divIcon({
        html: tree.isShrub ? shrubHtml : treeHtml,
        className: 'tree-marker-container',
        iconSize: [28, 28],
        iconAnchor: [14, 24]
      });
      const treeMarker = L.marker([tree.lat, tree.lng], { icon: treeIcon }).addTo(map);
      overlaysRef.current.push(treeMarker);
    });

    // Draw Candidate Pokémon Overlays
    candidates.forEach(rest => {
      const status = getRestStatus(rest);
      const isCompetitor = status === 'Competitor';
      const isEliminated = status === 'Eliminated';
      const spriteUrl = rest.pokemon.sprite;

      const tooltipContentHtml = `
        <div class="font-mono text-[9px] p-2.5 border-4 border-foreground bg-white rounded-2xl shadow-[0_3px_0_#000] leading-normal min-w-[170px] uppercase text-foreground">
          <div class="font-black text-primary text-[14px] truncate border-b-2 border-dashed border-foreground/15 pb-1 mb-1">${rest.name}</div>
          <div class="font-bold text-foreground/80">Wild ${rest.pokemon.name} • LV. ${rest.level}</div>
          <div class="text-foreground/50 mt-0.5">${rest.attributes.cuisine} Cuisine</div>
          <div class="mt-1.5 pt-1.5 border-t-2 border-dashed border-foreground/15 text-foreground/75 font-semibold">
            ⭐ ${rest.rating} (${rest.reviewCount} Reviews)<br/>
            📍 ${rest.distance} MI • ${rest.deliveryProvider !== 'None' ? rest.deliveryProvider : 'Pick Up'}
          </div>
        </div>
      `;

      const pokemonHtml = `
        <div class="relative cursor-pointer group transition-all duration-300 hover:scale-[1.6] hover:z-[9999] ${isCompetitor ? 'scale-110 font-bold' : isEliminated ? 'opacity-40 grayscale' : ''}">
          <!-- Platform -->
          <div class="w-8 h-2 rounded-full mx-auto -mb-1 shadow-sm transition-colors ${
            isCompetitor
              ? 'bg-amber-400/50 border border-amber-500/20 shadow-md animate-pulse'
              : 'bg-emerald-800/20'
          }"></div>
          
          <!-- Sprite -->
          <div class="relative -mt-0.5">
            <img
              src="${spriteUrl}"
              alt="${rest.pokemon.name}"
              onerror="this.onerror=null; if(this.src.includes('raw.githubusercontent.com')) { this.src=this.src.replace('raw.githubusercontent.com/PokeAPI/sprites/master', 'cdn.jsdelivr.net/gh/PokeAPI/sprites'); } else { this.src='https://cdn.jsdelivr.net/gh/PokeAPI/sprites/sprites/items/poke-ball.png'; }"
              class="w-8 h-8 object-contain select-none mx-auto block transition-transform ${
                isCompetitor
                  ? 'animate-bounce'
                  : isEliminated
                  ? 'rotate-[45deg] translate-y-0.5'
                  : ''
              }"
              draggable="false"
            />

            <!-- PokéBall badge -->
            ${
              isCompetitor
                ? `
                <div class="absolute -top-1 -right-1 z-50 w-4 h-4 rounded-full border-2 border-foreground bg-white overflow-hidden flex flex-col shadow-sm">
                  <div class="bg-primary h-1/2 w-full"></div>
                  <div class="bg-white h-1/2 w-full"></div>
                  <div class="absolute inset-0 m-auto w-1 h-1 border border-foreground bg-white rounded-full"></div>
                  <div class="absolute inset-x-0 h-[2px] bg-foreground top-[5px]"></div>
                </div>
                `
                : ''
            }
          </div>

          <!-- GBA Dialogue side blurb box -->
          <div class="absolute left-full top-1/2 -translate-y-1/2 ml-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-[99999]">
            ${tooltipContentHtml}
          </div>
        </div>
      `;

      const pokemonIcon = L.divIcon({
        html: pokemonHtml,
        className: 'pokemon-marker-container',
        iconSize: [40, 40],
        iconAnchor: [20, 32]
      });

      const pMarker = L.marker([rest.latitude, rest.longitude], { icon: pokemonIcon }).addTo(map);
      
      pMarker.on('mouseover', () => setHoveredRest(rest));
      pMarker.on('mouseout', () => setHoveredRest(null));

      overlaysRef.current.push(pMarker);
    });

  }, [allRestaurants, candidates, rounds, currentRoundIndex, searchRadius, latitude, longitude]);

  // 4. Reactive Camera Pan and Zoom Hook
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || latitude === null || longitude === null) return;
    const L = require('leaflet');

    if (mapCenterOverride) {
      map.panTo([mapCenterOverride[0], mapCenterOverride[1]]);
      map.setZoom(16);
    } else if (stage === 'tournament' && activeRound && activeRound.matchups) {
      const activeMatch = activeRound.matchups[currentMatchupIndex];
      if (activeMatch) {
        const bounds = L.latLngBounds([
          [activeMatch.r1.latitude, activeMatch.r1.longitude],
          [activeMatch.r2.latitude, activeMatch.r2.longitude]
        ]);
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    } else if (stage === 'champion') {
      const champion = useGameStore.getState().champion;
      if (champion) {
        map.panTo([champion.latitude, champion.longitude]);
        map.setZoom(17);
      }
    } else {
      if (candidates.length > 0) {
        const bounds = L.latLngBounds(
          [[latitude, longitude], ...candidates.map(r => [r.latitude, r.longitude])]
        );
        map.fitBounds(bounds, { padding: [40, 40] });
      } else {
        map.panTo([latitude, longitude]);
        map.setZoom(15);
      }
    }
  }, [latitude, longitude, stage, currentRoundIndex, currentMatchupIndex, mapCenterOverride, candidates, activeRound]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" style={{ background: '#5c883e' }} />
    </div>
  );
}
