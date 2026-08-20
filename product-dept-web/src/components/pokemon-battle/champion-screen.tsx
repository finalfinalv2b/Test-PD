import { useEffect, useState } from 'react';
import { useGameStore } from './game-store';
import { motion } from 'framer-motion';
import { MapPin, Navigation, RefreshCw, BookOpen, Star, Trophy, Globe } from 'lucide-react';
import { handleImageError } from './battle-screen';

// Pre-generated confetti particles
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
  emoji?: string;
}

export function ChampionScreen() {
  const { 
    champion, 
    runnerUp, 
    defeatedPath, 
    resetGame, 
    goToPokedex 
  } = useGameStore();

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 45 random confetti particles on load
    const colors = ['#F41C06', '#FFB000', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'];
    const emojis = ['🏆', '🎉', '🌟', '🍕', '🍣', '🌮', '🍔'];
    const temp: Particle[] = [];
    
    for (let i = 0; i < 45; i++) {
      temp.push({
        id: i,
        x: Math.random() * 100, // percentage width
        y: Math.random() * -100 - 20, // initial height offset above screen
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.floor(Math.random() * 10 + 6),
        delay: Math.random() * 2,
        emoji: Math.random() > 0.8 ? emojis[Math.floor(Math.random() * emojis.length)] : undefined
      });
    }
    setParticles(temp);
  }, [champion]);

  if (!champion) return null;

  const { pokemon, name, rating, address, popularMenuItems, deliveryAvailable, deliveryProvider, website } = champion;
  
  // Google Maps directions search link
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + address)}`;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6 px-4 py-4 text-foreground relative min-h-screen pb-20">
      
      {/* Confetti Animation Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: p.y, x: `${p.x}%`, opacity: 1, rotate: 0 }}
            animate={{
              y: '110vh',
              x: `${p.x + (Math.sin(p.id) * 15)}%`,
              opacity: [1, 1, 0.8, 0],
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1)
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute"
            style={{
              width: p.emoji ? 'auto' : p.size,
              height: p.emoji ? 'auto' : p.size,
              backgroundColor: p.emoji ? 'transparent' : p.color,
              borderRadius: p.emoji ? '0' : '50%',
              fontSize: p.emoji ? `${p.size + 10}px` : '0px'
            }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </div>

      {/* Main Champion Card Banner */}
      <div className="text-center flex flex-col items-center gap-2 mt-4 z-10">
        <motion.div
          initial={{ scale: 0.5, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 10 }}
          className="relative"
        >
          <div className="w-16 h-16 bg-amber-400 border-4 border-foreground rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.5)]">
            <Trophy size={32} className="text-foreground fill-background" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-1 -right-1 text-base"
          >
            🌟
          </motion.div>
        </motion.div>
        
        <h2 className="text-3xl font-black tracking-tighter uppercase leading-none mt-2">
          CHAMPION CHOSEN!
        </h2>
        <p className="text-[10px] font-mono tracking-widest text-primary font-bold uppercase">
          [ DECREE OF THE TRAINER ]
        </p>
      </div>

      {/* Large Featured Artwork Card */}
      <div className="border-4 border-foreground bg-background rounded-3xl shadow-[0_5px_0_#000] relative overflow-hidden z-10 flex flex-col items-center">
        {/* Tech Corner details */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -translate-x-[2px] -translate-y-[2px]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary translate-x-[2px] -translate-y-[2px]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -translate-x-[2px] translate-y-[2px]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary translate-x-[2px] translate-y-[2px]" />

        {/* Shiny background effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-amber-400/5 to-primary/5 z-0" />

        {/* Artwork Display */}
        <div className="relative w-full aspect-square max-w-[280px] flex items-center justify-center p-6 mt-4 z-10">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            src={pokemon.artwork}
            alt={pokemon.name}
            onError={handleImageError}
            className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] select-none"
            draggable="false"
          />
        </div>

        {/* Champion Pokemon Name Banner */}
        <div className="w-full border-t-2 border-b-2 border-foreground bg-foreground/5 py-2.5 px-6 flex justify-between items-center z-10 font-mono">
          <div className="flex flex-col items-start">
            <span className="text-[8px] font-bold text-foreground/45 uppercase tracking-wider">CHAMPION AVATAR</span>
            <span className="font-header font-black text-sm uppercase tracking-wider text-foreground">
              {pokemon.name}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[8px] font-bold text-foreground/45 uppercase tracking-wider block">rarity strength</span>
            <span className="text-xs font-bold text-primary uppercase">{pokemon.rarity}</span>
          </div>
        </div>

        {/* Restaurant Profile details */}
        <div className="w-full p-6 flex flex-col gap-4 z-10">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Star size={14} className="text-primary fill-primary" />
              <span className="font-mono text-xs font-bold text-primary">{rating} OUT OF 5 STARS</span>
            </div>
            <h3 className="font-header font-black text-3xl md:text-4xl text-foreground uppercase tracking-tight leading-none">
              {name}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3.5 border-t border-b border-foreground/10 py-3.5 font-mono text-xs">
            <div>
              <span className="text-foreground/45 uppercase block text-[9px] mb-0.5">Cuisine type</span>
              <span className="font-bold text-foreground">{champion.attributes.cuisine}</span>
            </div>
            <div>
              <span className="text-foreground/45 uppercase block text-[9px] mb-0.5">Budget category</span>
              <span className="font-bold text-foreground">
                {'$'.repeat(champion.priceTier)} (
                {champion.priceTier === 1 ? 'Budget' : champion.priceTier === 2 ? 'Moderate' : 'Premium'}
                )
              </span>
            </div>
            <div>
              <span className="text-foreground/45 uppercase block text-[9px] mb-0.5">Distance</span>
              <span className="font-bold text-foreground">{champion.distance} MILES AWAY</span>
            </div>
            <div>
              <span className="text-foreground/45 uppercase block text-[9px] mb-0.5">Delivery Status</span>
              <span className="font-bold text-foreground">
                {deliveryAvailable ? `Yes (${deliveryProvider})` : 'No Delivery'}
              </span>
            </div>
          </div>

          {/* Popular Menu Items */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono text-foreground/50 uppercase tracking-widest font-bold">
              [ POPULAR_DISHES_TO_ORDER ]
            </span>
            <div className="flex flex-wrap gap-1.5">
              {popularMenuItems.map((item: string, idx: number) => (
                <span key={idx} className="bg-foreground/[0.03] border border-foreground/10 px-2.5 py-1 text-[10px] font-mono font-medium rounded uppercase">
                  🔥 {item}
                </span>
              ))}
            </div>
          </div>

          {/* Address & Navigation */}
          <div className="flex items-center justify-between gap-4 p-3 bg-foreground/[0.02] border-2 border-foreground rounded-2xl mt-1 shadow-[0_2px_0_#000]">
            <div className="flex items-start gap-2 min-w-0">
              <MapPin size={16} className="text-foreground/50 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[8px] font-mono text-foreground/40 block uppercase">ADDRESS LOCATION</span>
                <span className="text-xs font-sans text-foreground/75 truncate block font-medium">{address}</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background text-foreground hover:bg-primary hover:text-white transition-colors p-2.5 rounded-xl border-2 border-foreground flex items-center justify-center cursor-pointer shadow-[0_2px_0_#000]"
                  title="Visit Website / Search Info"
                >
                  <Globe size={14} />
                </a>
              )}
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground text-background hover:bg-primary hover:text-white transition-colors p-2.5 rounded-xl border-2 border-foreground flex items-center justify-center cursor-pointer shadow-[0_2px_0_#000]"
                title="Get Directions"
              >
                <Navigation size={14} className="fill-current" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tournament Recap Path */}
      <div className="border-4 border-foreground bg-rose-50/20 p-5 flex flex-col gap-4 z-10 rounded-3xl shadow-[0_4px_0_#000]">
        <span className="text-[10px] font-mono tracking-widest text-foreground/50 uppercase font-bold">
          [ TOURNAMENT_RECAP ]
        </span>
        <div className="flex flex-col gap-3 font-mono text-xs">
          {/* Runner-Up */}
          {runnerUp && (
            <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
              <span className="text-foreground/45 uppercase">RUNNER-UP FINALS</span>
              <span className="font-bold text-foreground flex items-center gap-1.5">
                🥈 {runnerUp.name} (Lv. {runnerUp.level} {runnerUp.pokemon.name})
              </span>
            </div>
          )}

          {/* Defeated List */}
          <div>
            <span className="text-foreground/45 uppercase block mb-2">OPPONENTS DEFEATED IN ARENA</span>
            <div className="flex flex-col gap-1.5">
              {defeatedPath.slice(0, -1).map((r, idx) => (
                <div key={r.id} className="flex justify-between items-center text-[10px] bg-background border-2 border-foreground px-2.5 py-2 rounded-xl shadow-[0_2px_0_#000]">
                  <span className="text-foreground/60">ROUND {idx === 0 ? 'QUARTERFINALS' : 'SEMIFINALS'}</span>
                  <span className="font-bold text-foreground/80">
                    💥 {r.name} (Lv. {r.level} {r.pokemon.name})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3.5 z-10">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={goToPokedex}
          className="flex items-center justify-center gap-2 border-4 border-foreground bg-background text-foreground py-4 font-black text-xs tracking-widest uppercase cursor-pointer rounded-2xl shadow-[0_3px_0_#000]"
        >
          <BookOpen size={16} />
          OPEN POKEDEX
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={resetGame}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white py-4 font-black text-xs tracking-widest uppercase cursor-pointer border-4 border-foreground rounded-2xl shadow-[0_3px_0_#000]"
        >
          <RefreshCw size={14} />
          BATTLE AGAIN
        </motion.button>
      </div>

    </div>
  );
}
