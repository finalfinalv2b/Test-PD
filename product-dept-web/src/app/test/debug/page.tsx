"use client";

import { useState } from 'react';
import { useGameStore } from '@/components/pokemon-battle/game-store';
import { ShieldCheck, ShieldAlert, Navigation, ArrowLeft, Layers, Info } from 'lucide-react';
import Link from 'next/link';

export default function DebugPage() {
  const { 
    latitude, 
    longitude, 
    searchRadius, 
    allRestaurants, 
    candidates,
    userAddress,
    walkableOnly
  } = useGameStore();

  const [filterType, setFilterType] = useState<'all' | 'inside' | 'outside' | 'candidates'>('all');

  // Stats calculation
  const totalFound = allRestaurants.length;
  
  // Real vs Mock
  const realCount = allRestaurants.filter(r => !r.id.startsWith('mock_') && !r.id.startsWith('density_fill_')).length;
  const mockCount = totalFound - realCount;

  // Inside vs Outside selected radius
  const insideRadiusList = allRestaurants.filter(r => r.distance <= searchRadius);
  const outsideRadiusList = allRestaurants.filter(r => r.distance > searchRadius);

  const insideCount = insideRadiusList.length;
  const outsideCount = outsideRadiusList.length;
  const removedCount = outsideCount; // Count of restaurants outside selected radius

  // Filter list for display
  let displayedRestaurants = allRestaurants;
  if (filterType === 'inside') {
    displayedRestaurants = insideRadiusList;
  } else if (filterType === 'outside') {
    displayedRestaurants = outsideRadiusList;
  } else if (filterType === 'candidates') {
    displayedRestaurants = candidates;
  }

  // Sort displayed list by distance ascending
  const sortedDisplayed = [...displayedRestaurants].sort((a, b) => a.distance - b.distance);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-mono">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            Admin System Portal
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase">
            Geospatial Debug Console
          </h1>
        </div>
        
        <Link 
          href="/test"
          className="flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 bg-zinc-900 px-4 py-2 text-xs font-bold uppercase transition-all rounded shrink-0 self-start"
        >
          <ArrowLeft size={14} />
          Back to Simulator
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: System Metrics & Parameters */}
        <div className="space-y-6 lg:col-span-1">
          {/* Geolocation Parameters */}
          <div className="bg-zinc-900 border-2 border-zinc-800 p-5 rounded-lg space-y-4">
            <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider border-b border-zinc-800 pb-2">
              📡 Scan Parameters
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase font-black">LATITUDE</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {latitude !== null ? latitude.toFixed(6) : 'N/A'}
                </div>
              </div>
              
              <div>
                <div className="text-[10px] text-zinc-500 uppercase font-black">LONGITUDE</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {longitude !== null ? longitude.toFixed(6) : 'N/A'}
                </div>
              </div>
            </div>

            <div>
              <div className="text-[10px] text-zinc-500 uppercase font-black">RESOLVED ADDRESS</div>
              <div className="text-xs font-bold text-zinc-300 mt-1 break-words leading-relaxed">
                {userAddress || 'No location set yet.'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase font-black">ACTIVE RADIUS</div>
                <div className="text-sm font-bold text-red-400 mt-0.5">
                  {searchRadius} MILES
                </div>
              </div>

              <div>
                <div className="text-[10px] text-zinc-500 uppercase font-black">WALKABLE MODE</div>
                <div className={`text-sm font-bold mt-0.5 ${walkableOnly ? 'text-emerald-400' : 'text-zinc-500'}`}>
                  {walkableOnly ? 'ACTIVE (1.0 MI)' : 'INACTIVE'}
                </div>
              </div>
            </div>
          </div>

          {/* Audit Metrics */}
          <div className="bg-zinc-900 border-2 border-zinc-800 p-5 rounded-lg space-y-4">
            <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider border-b border-zinc-800 pb-2">
              📊 Discovery Metrics
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">TOTAL DISCOVERED POOL:</span>
                <span className="font-bold text-white">{totalFound}</span>
              </div>
              <div className="flex justify-between items-center text-xs pl-3 border-l-2 border-zinc-800">
                <span className="text-zinc-500">• Google Places API:</span>
                <span className="font-bold text-zinc-300">{realCount}</span>
              </div>
              <div className="flex justify-between items-center text-xs pl-3 border-l-2 border-zinc-800">
                <span className="text-zinc-500">• Mock Fillers:</span>
                <span className="font-bold text-zinc-300">{mockCount}</span>
              </div>

              <div className="h-px bg-zinc-800 my-2" />

              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">INSIDE SCAN CIRCLE:</span>
                <span className="font-bold text-emerald-400">{insideCount}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">OUTSIDE (EXCLUDED):</span>
                <span className="font-bold text-red-500">{outsideCount}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">COMPETE CANDIDATES:</span>
                <span className="font-bold text-yellow-500">{candidates.length}</span>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-zinc-900 border-2 border-zinc-800 p-5 rounded-lg space-y-3">
            <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider border-b border-zinc-800 pb-2">
              🛡️ Radius Audit Check
            </div>
            
            {outsideCount > 0 && candidates.some(c => c.distance > searchRadius) ? (
              <div className="flex gap-2.5 items-start bg-red-950/40 border border-red-900 p-3.5 rounded text-xs text-red-400 uppercase leading-snug">
                <ShieldAlert size={18} className="shrink-0 text-red-500 mt-0.5" />
                <div>
                  <span className="font-black">CRITICAL FAILURE!</span>
                  <p className="mt-1 text-[10px] text-red-300">
                    A candidate restaurant is located outside the selected {searchRadius} mile radius! This violates user constraints.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex gap-2.5 items-start bg-emerald-950/40 border border-emerald-900 p-3.5 rounded text-xs text-emerald-400 uppercase leading-snug">
                <ShieldCheck size={18} className="shrink-0 text-emerald-500 mt-0.5" />
                <div>
                  <span className="font-black">RADIUS INTEGRITY LOCKED</span>
                  <p className="mt-1 text-[10px] text-emerald-300">
                    100% of candidates are strictly inside the selected {searchRadius} mile scan circle. No exceptions found.
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex gap-2 text-[10px] text-zinc-400 leading-snug bg-zinc-950 p-3 rounded">
              <Info size={14} className="shrink-0 text-blue-400 mt-0.5" />
              <span>
                DISTANCE CALCULATION FORMULA: HAVERSINE FORMULA COMPUTED ON SYSTEM BACKEND.
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Restaurant Inventory & Filter Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border-2 border-zinc-800 p-6 rounded-lg flex flex-col h-full min-h-[500px]">
            {/* Table Header / Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-4">
              <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                📋 Discovery Inventory ({displayedRestaurants.length} items)
              </div>
              
              <div className="flex flex-wrap gap-1 bg-zinc-950 p-1 border border-zinc-800 rounded">
                {(['all', 'inside', 'outside', 'candidates'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilterType(tab)}
                    className={`px-3 py-1 text-[10px] font-bold uppercase rounded cursor-pointer ${
                      filterType === tab 
                        ? 'bg-zinc-800 text-white font-black' 
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Inventory Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Coordinates</th>
                    <th className="py-2.5 px-3 text-right">Calculated Distance</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {sortedDisplayed.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-zinc-500 uppercase">
                        No restaurants matching the filter in current state.
                      </td>
                    </tr>
                  ) : (
                    sortedDisplayed.map((rest) => {
                      const isCandidate = candidates.some(c => c.id === rest.id);
                      const isInside = rest.distance <= searchRadius;
                      
                      // Calculate distance in feet if under 1 mile
                      const distFeet = rest.distance < 1.0 ? Math.round(rest.distance * 5280) : null;
                      
                      return (
                        <tr key={rest.id} className="hover:bg-zinc-800/40">
                          <td className="py-3 px-3">
                            <div className="font-bold text-white">{rest.name}</div>
                            <div className="text-[10px] text-zinc-500 mt-0.5">
                              ID: {rest.id} • {rest.attributes.cuisine}
                            </div>
                          </td>
                          <td className="py-3 px-3 font-mono text-[10px] text-zinc-400">
                            {rest.latitude.toFixed(5)}, {rest.longitude.toFixed(5)}
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-semibold">
                            <div className={isInside ? 'text-emerald-400' : 'text-red-400'}>
                              {rest.distance.toFixed(2)} MI
                            </div>
                            {distFeet !== null && (
                              <div className="text-[10px] text-zinc-500">{distFeet.toLocaleString()} FT</div>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {isCandidate ? (
                              <span className="bg-yellow-950 border border-yellow-800 text-yellow-400 font-bold px-2 py-0.5 rounded-[4px] text-[9px] uppercase tracking-wide">
                                Candidate
                              </span>
                            ) : isInside ? (
                              <span className="bg-emerald-950 border border-emerald-900 text-emerald-400 px-2 py-0.5 rounded-[4px] text-[9px] uppercase tracking-wide">
                                Inside
                              </span>
                            ) : (
                              <span className="bg-red-950 border border-red-900 text-red-400 px-2 py-0.5 rounded-[4px] text-[9px] uppercase tracking-wide">
                                Removed
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
