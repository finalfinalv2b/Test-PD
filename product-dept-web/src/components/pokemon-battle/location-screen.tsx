import { useState, useEffect } from 'react';
import { useGameStore, UserMode } from './game-store';
import { Compass, ShieldAlert, Sparkles, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function LocationScreen() {
  const { 
    latitude, 
    longitude, 
    userAddress,
    searchRadius, 
    candidates,
    userMode, 
    initLocation, 
    setRadius, 
    setUserMode, 
    startQuiz,
    walkableOnly,
    toggleWalkableOnly
  } = useGameStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addressInput, setAddressInput] = useState(userAddress || '');
  const [geocoding, setGeocoding] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  // Sync state if userAddress changes externally
  useEffect(() => {
    if (userAddress) {
      setAddressInput(userAddress);
    }
  }, [userAddress]);

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const res = await fetch(`/api/restaurants?action=reverse&lat=${lat}&lng=${lng}`);
      if (res.ok) {
        const data = await res.json();
        const displayName = data.formatted_address;
        if (displayName) {
          return displayName;
        }
      }
    } catch (err: any) {
      console.error('Failed to reverse geocode:', err?.message || String(err));
    }
    // Fallback Mock Address
    return `Trainer Area near ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  };

  const requestGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const resolvedAddress = await reverseGeocode(lat, lng);
        await initLocation(lat, lng, resolvedAddress);
        setIsEditingLocation(false);
        setLoading(false);
      },
      (err) => {
        console.warn('Geolocation error:', err.message || String(err));
        setError('Location permission denied or unavailable. Select a starting town or enter an address manually!');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleSelectPreset = async (name: string, lat: number, lng: number) => {
    setError(null);
    setLoading(true);
    await initLocation(lat, lng, name);
    setAddressInput(name);
    setLoading(false);
  };

  const handleManualSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) return;

    setGeocoding(true);
    setError(null);

    try {
      const res = await fetch(`/api/restaurants?action=geocode&address=${encodeURIComponent(addressInput)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.lat !== undefined && data.lng !== undefined) {
          const { lat, lng, formatted_address } = data;
          await initLocation(parseFloat(lat), parseFloat(lng), formatted_address);
          setAddressInput(formatted_address);
          setIsEditingLocation(false);
        } else {
          setError("Could not find this address. Please make it more specific (e.g. include city name) and try again!");
        }
      } else {
        setError("Address lookup service is temporarily unavailable. Please try presets.");
      }
    } catch (err: any) {
      console.error('Address search error:', err?.message || String(err));
      setError("Could not find this address. Please make it more specific (e.g. include city name) and try again!");
    } finally {
      setGeocoding(false);
    }
  };

  const modeDescriptions: Record<UserMode, string> = {
    Cafe: 'Morning fuel, coffee shops, bakeries, desserts, and ice cream.',
    Healthy: 'Filters for fresh greens, salads, bowls, and plant-based protein.',
    Indulgent: 'Hearty steaks, burgers, pizza, tacos, and savory comfort foods.',
    'Surprise Me': 'Skip the questions! Jump directly into an 8-competitor battle.'
  };

  const modeIcons: Record<UserMode, string> = {
    Cafe: '☕',
    Healthy: '🌱',
    Indulgent: '🍔',
    'Surprise Me': '🎲'
  };

  const hasApiKey = typeof process !== 'undefined' && !!process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6 px-4 py-4 text-foreground">
      {/* Cute Logo Header */}
      <div className="text-center flex flex-col items-center">
        {/* Animated Pokéball-inspired plate */}
        <motion.div 
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 bg-primary/10 border-4 border-foreground rounded-full flex items-center justify-center mb-2 shadow-[0_4px_0_#000] relative overflow-hidden"
        >
          <div className="text-4xl">🍳</div>
          <div className="absolute top-0 w-full h-[6px] bg-primary/20" />
        </motion.div>
        <h2 className="text-3xl font-black tracking-tighter uppercase leading-none mb-1 text-foreground">
          WHAT SHOULD I EAT?
        </h2>
        <span className="text-[9px] font-mono tracking-widest text-primary font-bold uppercase bg-primary/10 px-3 py-1 rounded-full">
          👾 POKÉMON RESTAURANT BATTLE EDITION
        </span>
      </div>

      {/* Missing API Key Mock Warning Banner */}
      {!hasApiKey && (
        <div className="border-4 border-foreground bg-amber-100 p-4 rounded-2xl font-mono text-[9px] font-bold text-amber-900 shadow-[0_3px_0_#000] leading-normal uppercase">
          ⚠️ Running in Mock Mode<br/>
          <span className="text-[8px] font-medium text-amber-800 normal-case block mt-1 leading-snug">
            Google Places API Key is not set. The map displays a <strong>"For development purposes only"</strong> watermark, and coordinates use OpenStreetMap (Overpass API) to discover real local restaurants. To remove the watermark and use official Places data, add your key to <strong>product-dept-web/.env.local</strong>:
            <code className="block mt-1 p-1 bg-amber-200/50 border border-amber-300 rounded font-mono text-[8px] select-all">
              NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=YOUR_KEY
            </code>
          </span>
        </div>
      )}

      {/* Geolocation & Address Entry Section */}
      <div className="border-4 border-foreground bg-rose-50/50 p-5 rounded-3xl relative overflow-hidden shadow-[0_6px_0_#000]">
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-foreground/50 uppercase font-bold">
              📡 TRAINER POSITION
            </span>
            <span className="text-[10px] font-mono tracking-widest text-emerald-600 font-bold uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              {latitude && !isEditingLocation ? 'LOCATED' : 'SCANNING'}
            </span>
          </div>

          {latitude && longitude && !isEditingLocation ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3.5 p-3.5 bg-emerald-50 border-2 border-foreground rounded-2xl shadow-[0_3px_0_#000]">
                <div className="p-2.5 bg-emerald-500 text-white rounded-full border-2 border-foreground shrink-0">
                  <Navigation size={16} className="animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono font-bold text-foreground uppercase">GPS POSITION LOCKED</div>
                  <p className="text-[10px] font-mono font-bold text-foreground/75 leading-tight mt-0.5 break-words">
                    {userAddress || `LAT: ${latitude.toFixed(4)} | LNG: ${longitude.toFixed(4)}`}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsEditingLocation(true)}
                  className="flex items-center justify-center gap-1.5 border-2 border-foreground bg-background hover:bg-foreground hover:text-background py-2 rounded-xl font-mono text-[9px] font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-[0_2px_0_#000]"
                >
                  ✏️ CHANGE ADDRESS
                </button>
                <Link
                  href="/test/debug"
                  className="flex items-center justify-center gap-1.5 border-2 border-foreground bg-amber-50 hover:bg-amber-100 py-2 rounded-xl font-mono text-[9px] font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-[0_2px_0_#000] text-amber-800 text-center"
                >
                  🛡️ ADMIN DEBUG
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <form onSubmit={handleManualSearch} className="flex flex-col gap-2">
                <span className="text-[9px] font-mono text-foreground/45 uppercase tracking-widest font-bold block">
                  ENTER YOUR ADDRESS MANUALLY:
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 123 Main St, New York"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    className="flex-1 min-w-0 border-2 border-foreground bg-background px-3 py-2 rounded-xl text-xs font-mono outline-none focus:border-primary shadow-[0_2px_0_#000] text-foreground placeholder-foreground/30"
                  />
                  <button
                    type="submit"
                    disabled={geocoding || !addressInput.trim()}
                    className="bg-primary hover:bg-primary/95 disabled:bg-foreground/10 disabled:text-foreground/30 text-white border-2 border-foreground px-4 py-2 rounded-xl text-xs font-mono font-black uppercase cursor-pointer shadow-[0_2px_0_#000] shrink-0"
                  >
                    {geocoding ? '...' : 'LOCK'}
                  </button>
                </div>
              </form>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-foreground/15"></div>
                <span className="flex-shrink mx-2 text-[9px] font-mono text-foreground/30 uppercase font-black">OR</span>
                <div className="flex-grow border-t border-foreground/15"></div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={requestGeolocation}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 border-4 border-foreground bg-background hover:bg-foreground hover:text-background py-3 rounded-2xl font-black text-xs tracking-widest uppercase cursor-pointer transition-colors shadow-[0_3px_0_#000]"
              >
                <Compass size={16} className={loading ? 'animate-spin' : ''} />
                {loading ? 'ACQUIRING POSITION...' : 'FIND MY LOCATION'}
              </motion.button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-foreground/15"></div>
                <span className="flex-shrink mx-2 text-[9px] font-mono text-foreground/30 uppercase font-black">OR CHOOSE A TOWN</span>
                <div className="flex-grow border-t border-foreground/15"></div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Pallet Town (Hoboken)', lat: 40.743991, lng: -74.032363, emoji: '🏡' },
                  { name: 'Saffron City (New York)', lat: 40.712776, lng: -74.005974, emoji: '🏙️' },
                  { name: 'Cerulean City (Seattle)', lat: 47.6062, lng: -122.3321, emoji: '🌊' },
                  { name: 'Cinnabar Island (San Francisco)', lat: 37.7749, lng: -122.4194, emoji: '🌋' },
                  { name: 'Celadon City (Chicago)', lat: 41.8781, lng: -87.6298, emoji: '🏢' },
                  { name: 'Fuchsia City (Miami)', lat: 25.7617, lng: -80.1918, emoji: '🌴' }
                ].map(preset => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleSelectPreset(preset.name, preset.lat, preset.lng)}
                    className="flex items-center gap-1.5 border-2 border-foreground bg-background hover:bg-foreground hover:text-background p-2 rounded-xl font-mono text-[8.5px] font-bold uppercase cursor-pointer transition-colors shadow-[0_2px_0_#000] text-foreground text-left"
                  >
                    <span className="text-sm">{preset.emoji}</span>
                    <span className="truncate flex-1">{preset.name.split(' ')[0]} ({preset.name.match(/\(([^)]+)\)/)?.[1] || ''})</span>
                  </button>
                ))}
              </div>

              {latitude && longitude && (
                <button
                  type="button"
                  onClick={() => setIsEditingLocation(false)}
                  className="mt-1 font-mono text-[9px] text-foreground/45 hover:text-foreground font-bold text-center uppercase tracking-wider cursor-pointer bg-transparent border-0 outline-none"
                >
                  ◀ Cancel and Keep Locked Address
                </button>
              )}
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 text-rose-600 border-2 border-rose-500/20 bg-rose-50 p-3 rounded-xl text-[10px] font-mono uppercase tracking-wider leading-tight">
              <ShieldAlert size={14} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Animated Munchlax & Snorlax */}
          <div className="flex justify-center items-end gap-6 mt-4 pt-4 border-t border-dashed border-foreground/15 h-32 relative">
            {/* Snorlax */}
            <motion.div
              animate={{ 
                y: [0, -3, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-28 h-28 flex items-center justify-center"
            >
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png"
                alt="Snorlax"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_0_rgba(0,0,0,0.15)]"
              />
              {/* ZZZ animations */}
              <motion.span 
                animate={{ opacity: [0, 1, 0], y: [0, -20], x: [0, 8] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                className="absolute top-2 right-1 text-xs font-bold text-primary font-mono"
              >
                Z
              </motion.span>
              <motion.span 
                animate={{ opacity: [0, 1, 0], y: [0, -24], x: [0, -6] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute top-4 right-5 text-[9px] font-bold text-primary/70 font-mono"
              >
                z
              </motion.span>
              <motion.span 
                animate={{ opacity: [0, 1, 0], y: [0, -16], x: [0, 4] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                className="absolute top-1 right-8 text-[8px] font-bold text-primary/50 font-mono"
              >
                z
              </motion.span>
            </motion.div>

            {/* Munchlax */}
            <motion.div
              animate={{ 
                y: [0, -14, 0],
                scaleY: [1, 0.88, 1.12, 1]
              }}
              transition={{ 
                duration: 1.0, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 0.1
              }}
              className="w-18 h-18 flex items-center justify-center"
            >
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/446.png"
                alt="Munchlax"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_0_rgba(0,0,0,0.15)]"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Radius Adjuster & User Mode - Only visible if location is loaded */}
      {latitude && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5"
        >
          {/* Radius Selector */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-baseline">
              <span className="text-[10px] font-mono tracking-widest text-foreground/50 uppercase font-bold">
                🔍 SCAN RADIUS
              </span>
              <span className="text-xs font-mono font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {searchRadius} MILES
              </span>
            </div>
            <div className="grid grid-cols-5 border-2 border-foreground p-1 bg-background rounded-2xl shadow-[0_3px_0_#000]">
              {([0.5, 1, 2, 5, 10] as number[]).map((r) => (
                <button
                  key={r}
                  disabled={walkableOnly}
                  onClick={() => setRadius(r)}
                  className={`py-2 text-[10px] font-mono font-bold rounded-xl transition-colors ${
                    walkableOnly ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                  } ${
                    searchRadius === r
                      ? 'bg-foreground text-background font-black'
                      : 'hover:bg-foreground/5 text-foreground/60'
                  }`}
                >
                  {r} MI
                </button>
              ))}
            </div>
          </div>

          {/* Walkable Only Toggle */}
          <div className="flex items-center justify-between p-3.5 border-2 border-foreground bg-amber-50/20 rounded-2xl shadow-[0_3px_0_#000]">
            <div className="flex flex-col pr-2">
              <span className="text-[10px] font-mono font-black tracking-widest text-foreground/90 uppercase flex items-center gap-1.5">
                🚶 WALKABLE ONLY MODE
              </span>
              <span className="text-[9px] font-sans font-light leading-snug text-foreground/60 mt-0.5">
                Lock search to 1 mile, sorted by walking distance & high rating
              </span>
            </div>
            <button
              type="button"
              onClick={() => toggleWalkableOnly()}
              className={`w-12 h-6 rounded-full p-1 border-2 border-foreground transition-colors cursor-pointer relative flex items-center shrink-0 ${
                walkableOnly ? 'bg-emerald-500' : 'bg-background'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-foreground transition-all absolute ${
                  walkableOnly ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* User Mode Picker */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-mono tracking-widest text-foreground/50 uppercase font-bold">
              🎒 SELECT ADVENTURE MODE
            </span>
            <div className="grid grid-cols-2 gap-3">
              {(['Cafe', 'Healthy', 'Indulgent', 'Surprise Me'] as UserMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setUserMode(mode)}
                  className={`flex flex-col items-start p-3 border-2 border-foreground rounded-2xl text-left transition-all cursor-pointer relative shadow-[0_3px_0_#000] ${
                    userMode === mode
                      ? 'bg-amber-100/30 border-primary ring-2 ring-primary/20 shadow-[0_3px_0_var(--primary)]'
                      : 'bg-background hover:bg-foreground/[0.01]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xl">{modeIcons[mode]}</span>
                    <span className="font-header font-black text-xs tracking-tight text-foreground uppercase leading-none">
                      {mode}
                    </span>
                  </div>
                  <span className="text-[9px] font-sans font-light leading-snug text-foreground/60">
                    {modeDescriptions[mode]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Start Battle Button */}
          {candidates.length < 2 && (
            <div className="text-[9px] font-mono font-bold text-red-600 bg-red-50 border-2 border-red-200 p-2.5 rounded-xl text-center leading-tight mb-2 uppercase">
              ⚠️ Only found {candidates.length} real restaurant(s) in range. Increase the scan radius or select another town to scan!
            </div>
          )}

          <motion.button
            disabled={candidates.length < 2}
            whileHover={candidates.length >= 2 ? { scale: 1.02 } : {}}
            whileTap={candidates.length >= 2 ? { scale: 0.98 } : {}}
            onClick={startQuiz}
            className={`w-full py-4 rounded-2xl font-black text-sm tracking-widest uppercase cursor-pointer transition-all shadow-[0_4px_0_#000] flex items-center justify-center gap-2 mt-2 border-4 border-foreground ${
              candidates.length < 2 
                ? 'bg-foreground/10 text-foreground/45 border-foreground/15 cursor-not-allowed shadow-[0_4px_0_#ccc]' 
                : 'bg-primary hover:bg-primary/95 text-white'
            }`}
          >
            <Sparkles size={16} className="fill-current" />
            INITIATE RESTAURANT SCAN
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
