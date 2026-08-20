import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Local cache configuration
const CACHE_DIR = path.join(process.cwd(), '.next');
const CACHE_FILE = path.join(CACHE_DIR, 'places-cache.json');

interface CachedPlace {
  id: string;
  name: string;
  rating?: number;
  reviewCount?: number;
  priceLevel?: string;
  openNow?: boolean;
  address?: string;
  websiteUri?: string;
  photos?: any[];
  regularOpeningHours?: any;
  cuisineMapped?: string;
  timestamp: number;
}

// In-memory fallback cache
let inMemoryCache = new Map<string, CachedPlace>();

// Helper to load cache from file
function loadCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const raw = fs.readFileSync(CACHE_FILE, 'utf8');
      const data = JSON.parse(raw);
      Object.keys(data).forEach(key => {
        inMemoryCache.set(key, data[key]);
      });
      console.log(`[Cache] Loaded ${inMemoryCache.size} places from cache file.`);
    }
  } catch (err) {
    console.warn('[Cache] Failed to load cache file:', err);
  }
}

// Helper to save cache to file
function saveCache() {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
    const data: Record<string, CachedPlace> = {};
    inMemoryCache.forEach((value, key) => {
      data[key] = value;
    });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.warn('[Cache] Failed to save cache file:', err);
  }
}

// Initialize cache
loadCache();

// Haversine formula helper
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth's radius in miles
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

// Map Google Places types to our internal 26 cuisines
const CUISINE_MAP: Record<string, string> = {
  sushi_restaurant: 'Sushi',
  poke_restaurant: 'Poke',
  seafood_restaurant: 'Seafood',
  ramen_restaurant: 'Ramen',
  japanese_restaurant: 'Ramen',
  mexican_restaurant: 'Mexican',
  taco_restaurant: 'Mexican',
  barbecue_restaurant: 'BBQ',
  indian_restaurant: 'Indian',
  thai_restaurant: 'Thai',
  vegetarian_restaurant: 'Vegetarian',
  vegan_restaurant: 'Vegan',
  mediterranean_restaurant: 'Mediterranean',
  greek_restaurant: 'Mediterranean',
  lebanese_restaurant: 'Mediterranean',
  turkish_restaurant: 'Mediterranean',
  middle_eastern_restaurant: 'Mediterranean',
  falafel_restaurant: 'Mediterranean',
  cafe: 'Coffee Shops',
  coffee_shop: 'Coffee Shops',
  bakery: 'Bakeries',
  pastry_shop: 'Bakeries',
  donut_shop: 'Breakfast',
  pancake_house: 'Breakfast',
  american_restaurant: 'American',
  hamburger_restaurant: 'American',
  diner: 'American',
  steak_house: 'Steakhouses',
  italian_restaurant: 'Italian',
  pizza_restaurant: 'Italian',
  pizzeria: 'Italian',
  korean_restaurant: 'Korean',
  chinese_restaurant: 'Chinese',
  french_restaurant: 'French',
  bistro: 'French',
  fine_dining_restaurant: 'Fine Dining',
  fusion_restaurant: 'Fusion',
  fast_food_restaurant: 'Fast Food',
  sandwich_shop: 'American'
};

function mapGoogleTypesToCuisine(types: string[]): string {
  if (!types || types.length === 0) return 'American';
  for (const t of types) {
    if (CUISINE_MAP[t]) return CUISINE_MAP[t];
  }
  // Loose matching for other strings
  for (const t of types) {
    const lower = t.toLowerCase();
    if (lower.includes('sushi')) return 'Sushi';
    if (lower.includes('seafood')) return 'Seafood';
    if (lower.includes('pizza')) return 'Italian';
    if (lower.includes('burger')) return 'American';
    if (lower.includes('taco') || lower.includes('mexican')) return 'Mexican';
    if (lower.includes('steak')) return 'Steakhouses';
    if (lower.includes('cafe') || lower.includes('coffee')) return 'Coffee Shops';
    if (lower.includes('bakery')) return 'Bakeries';
    if (lower.includes('ramen') || lower.includes('noodle') || lower.includes('japanese')) return 'Ramen';
    if (lower.includes('korean')) return 'Korean';
    if (lower.includes('chinese')) return 'Chinese';
    if (lower.includes('thai')) return 'Thai';
    if (lower.includes('indian')) return 'Indian';
    if (lower.includes('fast_food')) return 'Fast Food';
  }
  return 'American'; // Default fallback
}

// Mock generator for fallback (when API key is missing)
function getMockRestaurants(lat: number, lng: number, radius: number): any[] {
  console.log(`[API Route] Generating mock fallback restaurants within ${radius} miles of ${lat}, ${lng}`);
  
  // Use a pseudo-random generator seeded by lat/lng so the list is stable per location
  const seed = Math.abs(Math.sin(lat) * Math.cos(lng));
  let randCount = 0;
  function random(): number {
    const x = Math.sin(seed + randCount++) * 10000;
    return x - Math.floor(x);
  }

  const cuisines = [
    { name: 'Sushi Nakazawa', type: 'sushi_restaurant' },
    { name: 'Taco Fiesta', type: 'mexican_restaurant' },
    { name: 'Tokyo Ramen Bar', type: 'japanese_restaurant' },
    { name: 'Volt Coffee Roasters', type: 'cafe' },
    { name: 'The Green Garden Cafe', type: 'vegetarian_restaurant' },
    { name: 'Prime Cut Steakhouse', type: 'steak_house' },
    { name: 'Bella Italia Ristorante', type: 'italian_restaurant' },
    { name: 'Oasis Mediterranean Grill', type: 'mediterranean_restaurant' },
    { name: 'La Petite Boulangerie', type: 'bakery' },
    { name: 'Smokey Bones BBQ', type: 'barbecue_restaurant' },
    { name: 'Curry Kingdom Palace', type: 'indian_restaurant' },
    { name: 'Golden Elephant Thai', type: 'thai_restaurant' },
    { name: 'Seoul BBQ House', type: 'korean_restaurant' },
    { name: 'Dragon Palace Chinese', type: 'chinese_restaurant' },
    { name: 'Chez Nous French Bistro', type: 'french_restaurant' },
    { name: 'QuickBite Burgers', type: 'fast_food_restaurant' }
  ];

  const results: any[] = [];
  // Generate 80 candidates and filter strictly by radius
  for (let i = 0; i < 80; i++) {
    const cuisine = cuisines[i % cuisines.length];
    const angle = random() * Math.PI * 2;
    // Concentrate coordinates closer, up to the maximum radius
    const distanceVal = random() * radius; 
    
    // 1 degree latitude = ~69 miles, 1 degree longitude = ~69 miles * cos(lat)
    const latOffset = (distanceVal * Math.sin(angle)) / 69;
    const lngOffset = (distanceVal * Math.cos(angle)) / (69 * Math.cos((lat * Math.PI) / 180));
    
    const restLat = lat + latOffset;
    const restLng = lng + lngOffset;
    const actualDistance = calculateDistance(lat, lng, restLat, restLng);

    // Skip if strictly outside radius
    if (actualDistance > radius) continue;

    const rating = parseFloat((3.5 + random() * 1.5).toFixed(1));
    const userRatingCount = Math.floor(20 + Math.pow(random(), 2.5) * 2000);
    const priceLevel = random() > 0.6 ? 'PRICE_LEVEL_MODERATE' : (random() > 0.5 ? 'PRICE_LEVEL_EXPENSIVE' : 'PRICE_LEVEL_INEXPENSIVE');
    
    results.push({
      id: `mock_places_api_${i}_${cuisine.type}`,
      displayName: { text: `${cuisine.name} #${i + 1}` },
      types: [cuisine.type, 'restaurant', 'food'],
      rating,
      userRatingCount,
      priceLevel,
      formattedAddress: `${Math.floor(100 + random() * 899)} Main St, Mock City`,
      location: { latitude: restLat, longitude: restLng },
      websiteUri: `https://example.com/mock_${i}`,
      photos: [{ name: `mock_photo_${i}` }],
      currentOpeningHours: { openNow: random() > 0.15 }
    });
  }

  return results;
}

async function getOverpassRestaurants(lat: number, lng: number, radiusMiles: number): Promise<any[]> {
  const radiusMeters = Math.round(radiusMiles * 1609.34);
  const query = `[out:json][timeout:15];
(
  nwr["amenity"="restaurant"](around:${radiusMeters}, ${lat}, ${lng});
  nwr["amenity"="fast_food"](around:${radiusMeters}, ${lat}, ${lng});
  nwr["amenity"="cafe"](around:${radiusMeters}, ${lat}, ${lng});
);
out center 150;`;

  console.log(`[API Route] Querying Overpass API for real restaurants within ${radiusMiles} miles of ${lat}, ${lng}`);
  try {
    const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'PokeEatApp/1.0 (contact: support@pokeeatapp.example.com)'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Overpass API responded with HTTP ${res.status}`);
    }

    const data = await res.json();
    const elements = data.elements || [];
    console.log(`[API Route] Overpass API returned ${elements.length} elements.`);

    const seenNames = new Set<string>();
    const places: any[] = [];

    elements.forEach((el: any) => {
      const name = el.tags?.name || el.tags?.brand;
      if (!name) return;

      const restLat = el.lat || el.center?.lat;
      const restLng = el.lon || el.center?.lon;
      if (!restLat || !restLng) return;

      // Deduplicate by name and proximity to prevent double-marking
      const nameKey = `${name.toLowerCase()}_${restLat.toFixed(4)}_${restLng.toFixed(4)}`;
      if (seenNames.has(nameKey)) return;
      seenNames.add(nameKey);

      // Seeded random for deterministic rating, review count, price tier
      const seed = el.id;
      let randCount = 0;
      function random(): number {
        const x = Math.sin(seed + randCount++) * 10000;
        return x - Math.floor(x);
      }

      const rating = parseFloat((3.5 + random() * 1.5).toFixed(1));
      const userRatingCount = Math.floor(20 + Math.pow(random(), 2.5) * 2000);
      const priceLevel = random() > 0.6 ? 'PRICE_LEVEL_MODERATE' : (random() > 0.5 ? 'PRICE_LEVEL_EXPENSIVE' : 'PRICE_LEVEL_INEXPENSIVE');
      
      const street = el.tags?.["addr:street"] || '';
      const num = el.tags?.["addr:housenumber"] || '';
      const city = el.tags?.["addr:city"] || '';
      const formattedAddress = (num || street) 
        ? `${num} ${street}`.trim() + (city ? `, ${city}` : '') 
        : 'Local Address';

      const website = el.tags?.website || el.tags?.["contact:website"] || '';
      const cuisineTag = el.tags?.cuisine || '';
      
      const types = [el.tags?.amenity || 'restaurant', 'restaurant', 'food'];
      if (cuisineTag) {
        cuisineTag.split(';').forEach((c: string) => types.push(c.trim().toLowerCase()));
      }

      places.push({
        id: `osm_${el.id}`,
        displayName: { text: name },
        types,
        rating,
        userRatingCount,
        priceLevel,
        formattedAddress,
        location: { latitude: restLat, longitude: restLng },
        websiteUri: website || undefined,
        currentOpeningHours: { openNow: random() > 0.15 }
      });
    });

    return places;
  } catch (err: any) {
    console.error('[API Route] Overpass fetch error:', err.message || String(err));
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || '';

  console.log(`[API Route] Action: ${action || 'search'}, API Key length: ${apiKey.length}`);

  // 1. Action: Geocode (Address -> Coordinates)
  if (action === 'geocode') {
    const address = searchParams.get('address');
    if (!address) {
      return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 });
    }

    if (!apiKey) {
      console.log('[Geocode API] No API Key found, trying Nominatim geocoding fallback');
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'PokeEatApp/1.0 (contact: support@pokeeatapp.example.com)'
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const firstResult = data[0];
            const lat = parseFloat(firstResult.lat);
            const lng = parseFloat(firstResult.lon);
            console.log(`[Geocode API] Nominatim resolved "${address}" to ${lat}, ${lng}`);
            return NextResponse.json({
              lat,
              lng,
              formatted_address: firstResult.display_name
            });
          }
        }
      } catch (err: any) {
        console.warn('[Geocode API] Nominatim fallback failed:', err.message || String(err));
      }

      // Return mock coordinates for common starting locations as final backup
      console.warn('[Geocode API] Nominatim failed/empty, returning local mock coordinates');
      if (address.toLowerCase().includes('hoboken')) {
        return NextResponse.json({ lat: 40.743991, lng: -74.032363, formatted_address: 'Hoboken, NJ, USA' });
      }
      if (address.toLowerCase().includes('jersey city')) {
        return NextResponse.json({ lat: 40.717754, lng: -74.043143, formatted_address: 'Jersey City, NJ, USA' });
      }
      return NextResponse.json({ lat: 40.712776, lng: -74.005974, formatted_address: `${address} (Mock Coordinate)` });
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Geocoding HTTP error: ${res.status}`);
      const data = await res.json();
      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return NextResponse.json({
          lat,
          lng,
          formatted_address: data.results[0].formatted_address
        });
      }
      return NextResponse.json({ error: `Geocoding failed: ${data.status}` }, { status: 400 });
    } catch (err: any) {
      return NextResponse.json({ error: err.message || 'Geocoding error occurred' }, { status: 500 });
    }
  }

  // 2. Action: Reverse Geocode (Coordinates -> Address)
  if (action === 'reverse') {
    const latStr = searchParams.get('lat');
    const lngStr = searchParams.get('lng');
    if (!latStr || !lngStr) {
      return NextResponse.json({ error: 'Latitude and Longitude parameters are required' }, { status: 400 });
    }

    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (!apiKey) {
      console.log('[Reverse Geocode API] No API Key found, trying Nominatim reverse geocoding fallback');
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'PokeEatApp/1.0 (contact: support@pokeeatapp.example.com)'
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.display_name) {
            console.log(`[Reverse Geocode API] Nominatim resolved coordinates to "${data.display_name}"`);
            return NextResponse.json({
              formatted_address: data.display_name
            });
          }
        }
      } catch (err: any) {
        console.warn('[Reverse Geocode API] Nominatim fallback failed:', err.message || String(err));
      }

      console.warn('[Reverse Geocode API] Nominatim failed/empty, returning local mock address');
      return NextResponse.json({ formatted_address: `Trainer Area near ${lat.toFixed(4)}, ${lng.toFixed(4)}` });
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Reverse Geocoding HTTP error: ${res.status}`);
      const data = await res.json();
      if (data.status === 'OK' && data.results.length > 0) {
        return NextResponse.json({
          formatted_address: data.results[0].formatted_address
        });
      }
      return NextResponse.json({ error: `Reverse Geocoding failed: ${data.status}` }, { status: 400 });
    } catch (err: any) {
      return NextResponse.json({ error: err.message || 'Reverse geocoding error occurred' }, { status: 500 });
    }
  }

  // 3. Action: Restaurant Search
  const latStr = searchParams.get('lat');
  const lngStr = searchParams.get('lng');
  const radiusStr = searchParams.get('radius');

  if (!latStr || !lngStr || !radiusStr) {
    return NextResponse.json({ error: 'lat, lng, and radius parameters are required' }, { status: 400 });
  }

  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);
  const radiusMiles = parseFloat(radiusStr);
  const radiusMeters = Math.round(radiusMiles * 1609.34);

  let rawPlaces: any[] = [];

  if (!apiKey) {
    // Try to get real restaurant data from Overpass API
    rawPlaces = await getOverpassRestaurants(lat, lng, radiusMiles);
  } else {
    // ----------------------------------------------------
    // GOOGLE PLACES API (NEW) - PAGINATED SEARCH
    // ----------------------------------------------------
    try {
      let pageToken: string | null = null;
      let hasMorePages = true;
      let pageCount = 0;
      const seenIds = new Set<string>();

      while (hasMorePages && pageCount < 10) { // Safety cap of 10 pages
        const body: any = {
          includedTypes: ['restaurant', 'cafe', 'fast_food'],
          locationRestriction: {
            circle: {
              center: { latitude: lat, longitude: lng },
              radius: radiusMeters
            }
          },
          maxResultCount: 20
        };

        if (pageToken) {
          body.pageToken = pageToken;
        }

        const url = 'https://places.googleapis.com/v1/places:searchNearby';
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.types,places.rating,places.userRatingCount,places.priceLevel,places.formattedAddress,places.location,places.websiteUri,places.photos,places.currentOpeningHours,nextPageToken'
        };

        console.log(`[Places Search] Fetching page ${pageCount + 1}. PageToken present: ${!!pageToken}`);
        
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          const errMsg = await response.text();
          throw new Error(`Google Places searchNearby failed with status ${response.status}: ${errMsg}`);
        }

        const data = await response.json();
        const places: any[] = data.places || [];
        
        console.log(`[Places Search] Page ${pageCount + 1} returned ${places.length} places.`);

        // Collect new places
        places.forEach(p => {
          if (p.id && !seenIds.has(p.id)) {
            seenIds.add(p.id);
            rawPlaces.push(p);
          }
        });

        // Check for next page
        pageToken = data.nextPageToken || null;
        hasMorePages = !!pageToken;
        pageCount++;

        // Add a slight delay if paginating to ensure server-side token availability
        if (hasMorePages) {
          await new Promise(resolve => setTimeout(resolve, 600));
        }
      }

      console.log(`[Places Search] Total unique restaurants collected: ${rawPlaces.length}`);

    } catch (err: any) {
      console.error('[Places Search] Critical Google Places fetch error:', err.message || String(err));
      // Do not fallback to mock data when API key is present, as user strictly wants real options
      rawPlaces = [];
    }
  }

  // ----------------------------------------------------
  // DATA ENRICHMENT & CACHE CHECK
  // ----------------------------------------------------
  const enrichedPlaces = await Promise.all(
    rawPlaces.map(async (place) => {
      const placeId = place.id;
      
      // If we don't have an API key, don't enrich Place Details since mock has it all
      if (!apiKey) {
        return place;
      }

      // Check cache first
      const cached = inMemoryCache.get(placeId);
      if (cached && Date.now() - cached.timestamp < 1000 * 60 * 60 * 24 * 7) { // 7 days TTL
        // Merge cached details into place object
        return {
          ...place,
          websiteUri: cached.websiteUri || place.websiteUri,
          regularOpeningHours: cached.regularOpeningHours || place.regularOpeningHours,
          formattedAddress: cached.address || place.formattedAddress
        };
      }

      // Fetch Details from Google Place Details API (New)
      try {
        console.log(`[Place Details] Fetching details for place ID: ${placeId}`);
        const detailsUrl = `https://places.googleapis.com/v1/places/${placeId}`;
        const res = await fetch(detailsUrl, {
          headers: {
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'id,name,formattedAddress,websiteUri,regularOpeningHours,currentOpeningHours'
          }
        });

        if (res.ok) {
          const details = await res.json();
          // Store in cache
          const entry: CachedPlace = {
            id: placeId,
            name: place.displayName?.text || 'Eatery',
            websiteUri: details.websiteUri,
            address: details.formattedAddress,
            regularOpeningHours: details.regularOpeningHours,
            timestamp: Date.now()
          };
          inMemoryCache.set(placeId, entry);
          saveCache(); // Save asynchronously
          
          return {
            ...place,
            ...details
          };
        }
      } catch (err: any) {
        console.warn(`[Place Details] Failed to fetch details for ${placeId}:`, err.message);
      }

      return place;
    })
  );

  // ----------------------------------------------------
  // DEDUPLICATION & GEOSPATIAL HA VERSINE FILTERING
  // ----------------------------------------------------
  const deduplicated = Array.from(new Map(enrichedPlaces.map(item => [item.id, item])).values());
  const finalCandidates: any[] = [];
  let totalFound = deduplicated.length;
  let totalRemoved = 0;

  deduplicated.forEach((p) => {
    if (!p.location || p.location.latitude === undefined || p.location.longitude === undefined) {
      totalRemoved++;
      return;
    }

    const restLat = p.location.latitude;
    const restLng = p.location.longitude;
    const distMiles = calculateDistance(lat, lng, restLat, restLng);

    // STRICT RADIUS FILTERING
    if (distMiles > radiusMiles) {
      totalRemoved++;
      return;
    }

    // Map photo URL
    let photoUrl = '/placeholder-food-0.jpg';
    if (p.photos && p.photos.length > 0 && apiKey) {
      // Construct Google Places photo media URL
      const photoName = p.photos[0].name; // format is places/*/photos/*
      photoUrl = `https://places.googleapis.com/v1/${photoName}/media?key=${apiKey}&maxWidthPx=400`;
    } else {
      // Mock placeholder deterministic by ID
      const idx = Math.abs(p.id.split('').reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0)) % 5;
      photoUrl = `/placeholder-food-${idx}.jpg`;
    }

    const distFeet = distMiles < 1.0 ? Math.round(distMiles * 5280) : null;
    const cuisine = mapGoogleTypesToCuisine(p.types);

    finalCandidates.push({
      id: p.id,
      name: p.displayName?.text || 'Eatery',
      rating: p.rating || 4.0,
      reviewCount: p.userRatingCount || 50,
      priceTier: p.priceLevel === 'PRICE_LEVEL_FREE' || p.priceLevel === 'PRICE_LEVEL_INEXPENSIVE' ? 1 
                 : (p.priceLevel === 'PRICE_LEVEL_EXPENSIVE' || p.priceLevel === 'PRICE_LEVEL_VERY_EXPENSIVE' ? 3 : 2),
      distance: parseFloat(distMiles.toFixed(2)),
      distanceFeet: distFeet,
      latitude: restLat,
      longitude: restLng,
      address: p.formattedAddress || 'Local Address',
      openStatus: p.currentOpeningHours ? p.currentOpeningHours.openNow : true,
      website: p.websiteUri || `https://www.google.com/search?q=${encodeURIComponent((p.displayName?.text || '') + ' ' + (p.formattedAddress || ''))}`,
      photos: [photoUrl],
      types: p.types,
      cuisine // Added cuisine mapping
    });
  });

  // Sort by distance
  finalCandidates.sort((a, b) => a.distance - b.distance);

  console.log(`[API Route] Search completed: Found=${totalFound}, Retained=${finalCandidates.length}, Removed=${totalRemoved}`);

  return NextResponse.json({
    userCoordinates: { latitude: lat, longitude: lng },
    selectedRadius: radiusMiles,
    totalFound,
    totalRemoved,
    restaurantsInsideRadius: finalCandidates.length,
    restaurantsOutsideRadius: totalRemoved,
    restaurants: finalCandidates
  });
}
