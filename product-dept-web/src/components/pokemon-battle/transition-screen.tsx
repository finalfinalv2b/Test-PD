import { useEffect, useState } from 'react';
import { useGameStore } from './game-store';
import { motion, AnimatePresence } from 'framer-motion';
import { handleImageError } from './battle-screen';

export function TransitionScreen() {
  const { candidates, finishTransition, setMapCenterOverride } = useGameStore();
  const [revealedCount, setRevealedCount] = useState(0);
  const [logMessage, setLogMessage] = useState('ESTABLISHING RADAR CONNECTION...');

  const logs = [
    'ESTABLISHING RADAR CONNECTION...',
    'EVALUATING TRAINER archetype Craving PROFILE...',
    'RUNNING WEIGHTED RECOMMENDATION ENGINE...',
    'ASSIGNING DEFENDERS TO LOCAL RESTAURANT NODES...',
    'GENERATING LEAGUE TOURNAMENT SEEDINGS...',
    'LEAGUE BRACKETS READY! ENTERING THE LEAGUE...'
  ];

  // Pan map background to the newly revealed candidate
  useEffect(() => {
    if (revealedCount > 0 && revealedCount <= candidates.length) {
      const currentCand = candidates[revealedCount - 1];
      if (currentCand) {
        setMapCenterOverride([currentCand.latitude, currentCand.longitude]);
      }
    }
  }, [revealedCount, candidates, setMapCenterOverride]);

  useEffect(() => {
    // Scroll through retro logs
    const logIntervals = [0, 800, 1600, 2400, 3200, 4200];
    const logTimers = logIntervals.map((delay, idx) => 
      setTimeout(() => {
        setLogMessage(logs[idx]);
      }, delay)
    );

    // Reveal restaurants one by one
    const revealTimers = Array.from({ length: 12 }).map((_, idx) =>
      setTimeout(() => {
        setRevealedCount(prev => prev + 1);
      }, 500 + idx * 300)
    );

    // Auto-transition to tournament when done
    const finishTimer = setTimeout(() => {
      finishTransition();
    }, 5200);

    return () => {
      logTimers.forEach(clearTimeout);
      revealTimers.forEach(clearTimeout);
      clearTimeout(finishTimer);
      setMapCenterOverride(null); // Reset map center on unmount
    };
  }, [finishTransition, setMapCenterOverride]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-5 px-4 py-4 text-foreground font-mono">
      {/* Header */}
      <div className="flex flex-col items-center gap-1 border-b-2 border-dashed border-primary/20 pb-3 text-center">
        <span className="text-[10px] tracking-widest text-primary font-black animate-pulse">
          ⚡ SYSTEM INITIALIZING ⚡
        </span>
        <h2 className="text-xl font-header font-black tracking-tight uppercase text-foreground leading-none mt-1">
          BUILDING YOUR TEAM...
        </h2>
      </div>

      {/* Grid of 12 Restaurants */}
      <div className="grid grid-cols-3 gap-2.5 my-2">
        {candidates.map((rest, idx) => {
          const isRevealed = idx < revealedCount;
          return (
            <div
              key={rest.id}
              className={`border-2 rounded-xl p-2 flex flex-col items-center justify-between text-center min-h-[92px] transition-all duration-300 relative overflow-hidden ${
                isRevealed 
                  ? 'border-foreground bg-amber-50/20 shadow-sm' 
                  : 'border-foreground/20 bg-background/50'
              }`}
            >
              {/* Card Title (Seeding) */}
              <span className="absolute top-1 left-1.5 text-[8px] font-bold text-foreground/40 leading-none">
                #{idx + 1}
              </span>

              {/* Centered Pokemon Sprite / Pokéball */}
              <div className="flex-grow flex items-center justify-center relative w-12 h-12">
                <AnimatePresence mode="wait">
                  {isRevealed ? (
                    <motion.div
                      key="sprite"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="relative z-10"
                    >
                      {/* Cool white flash background */}
                      <motion.div
                        initial={{ opacity: 1, scale: 0.8 }}
                        animate={{ opacity: 0, scale: 2.2 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-white rounded-full -z-10"
                      />
                      <img
                        src={rest.pokemon.sprite}
                        alt={rest.pokemon.name}
                        onError={handleImageError}
                        className="w-11 h-11 object-contain drop-shadow"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="pokeball"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-6 h-6 border-2 border-foreground/30 rounded-full flex flex-col overflow-hidden relative opacity-40"
                    >
                      <div className="bg-primary h-1/2 w-full" />
                      <div className="bg-white h-1/2 w-full" />
                      <div className="absolute inset-0 m-auto w-1.5 h-1.5 border border-foreground/30 bg-background rounded-full" />
                      <div className="absolute inset-x-0 h-[1px] bg-foreground/30 top-[10px]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Restaurant Meta */}
              <div className="w-full flex flex-col justify-end">
                <span className="text-[11px] font-black uppercase tracking-tight truncate w-full text-foreground/90 leading-tight">
                  {rest.name}
                </span>
                <span className="text-[7px] text-primary/70 font-bold uppercase tracking-wider leading-none mt-0.5">
                  LV.{rest.level}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* GBA Style Log Dialogue Box */}
      <div className="border-4 border-foreground bg-white p-3.5 rounded-2xl shadow-[0_4px_0_#000] relative min-h-[72px] flex items-center">
        <div className="flex flex-col gap-1 w-full font-mono text-[10px] leading-snug font-bold">
          <span className="text-primary tracking-widest text-[8px] uppercase">
            ▶ POKÉ-RADAR PROCESSOR
          </span>
          <p className="text-foreground uppercase break-words pr-4 select-none">
            {logMessage}
          </p>
        </div>
        
        {/* Blinking Triangle Cursor */}
        <div className="absolute bottom-2.5 right-3 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-foreground animate-bounce" />
      </div>
    </div>
  );
}
