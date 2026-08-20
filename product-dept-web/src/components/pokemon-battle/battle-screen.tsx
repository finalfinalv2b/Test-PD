import { useState, useEffect } from 'react';
import { useGameStore } from './game-store';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Zap, Heart } from 'lucide-react';

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.currentTarget;
  if (target.src.includes('raw.githubusercontent.com')) {
    target.src = target.src.replace('raw.githubusercontent.com/PokeAPI/sprites/master', 'cdn.jsdelivr.net/gh/PokeAPI/sprites');
  } else if (target.src.includes('cdn.jsdelivr.net')) {
    target.src = 'https://cdn.jsdelivr.net/gh/PokeAPI/sprites/sprites/items/poke-ball.png';
  }
};

export function BattleScreen() {
  const { 
    rounds, 
    currentRoundIndex, 
    currentMatchupIndex, 
    selectBattleWinner,
    resetGame
  } = useGameStore();

  const currentRound = rounds[currentRoundIndex];
  
  const activeMatchup = currentRound?.matchups[currentMatchupIndex];
  const r1 = activeMatchup?.r1;
  const r2 = activeMatchup?.r2;

  // Normal matchup animation states (Quarterfinals & Finals)
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [loserId, setLoserId] = useState<string | null>(null);

  // Semifinals Brawl local states (displays all 4 competitors)
  const [winnerA, setWinnerA] = useState<string | null>(null);
  const [winnerB, setWinnerB] = useState<string | null>(null);
  const [animatingA, setAnimatingA] = useState(false);
  const [animatingB, setAnimatingB] = useState(false);

  useEffect(() => {
    // Reset all local animation/winner states on round change
    setAnimatingId(null);
    setWinnerId(null);
    setLoserId(null);
    setWinnerA(null);
    setWinnerB(null);
    setAnimatingA(false);
    setAnimatingB(false);
  }, [currentRoundIndex, currentMatchupIndex]);

  if (!currentRound) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <span className="text-xs font-mono animate-pulse">PREPARING BATTLEFIELD...</span>
      </div>
    );
  }

  // 1. SEMIFINALS BRAWL MODE (All 4 options rendered) - DISABLED by user request ("one battle at a time")
  const isSemifinals = false;
  
  const handleVoteSemiA = (selectedId: string) => {
    if (animatingA) return;

    const matchA = currentRound.matchups[0];
    const winId = selectedId;
    const loseId = selectedId === matchA.r1.id ? matchA.r2.id : matchA.r1.id;

    setWinnerA(winId);
    setAnimatingA(true);

    // If both matches are decided, submit to Zustand
    if (winnerB) {
      setTimeout(() => {
        selectBattleWinner(winId);
        setTimeout(() => {
          selectBattleWinner(winnerB);
        }, 300);
      }, 1000);
    }
  };

  const handleVoteSemiB = (selectedId: string) => {
    if (animatingB) return;

    const matchB = currentRound.matchups[1];
    const winId = selectedId;
    const loseId = selectedId === matchB.r1.id ? matchB.r2.id : matchB.r1.id;

    setWinnerB(winId);
    setAnimatingB(true);

    // If both matches are decided, submit to Zustand
    if (winnerA) {
      setTimeout(() => {
        selectBattleWinner(winnerA);
        setTimeout(() => {
          selectBattleWinner(winId);
        }, 300);
      }, 1000);
    }
  };

  // 2. NORMAL MATCH VOTE (Quarterfinals & Finals)
  const handleVoteNormal = (selectedId: string) => {
    if (animatingId || !activeMatchup) return;

    const { r1, r2 } = activeMatchup;
    const winId = selectedId;
    const loseId = selectedId === r1.id ? r2.id : r1.id;

    setAnimatingId(activeMatchup.id);
    setWinnerId(winId);
    setLoserId(loseId);

    setTimeout(() => {
      selectBattleWinner(winId);
    }, 1000);
  };

  const getRoundLabel = () => {
    if (currentRound.name === 'Preliminaries') return `PRELIMINARIES • BATTLE ${currentMatchupIndex + 1}/4`;
    if (currentRound.name === 'Quarterfinals') return `QUARTERFINALS • BATTLE ${currentMatchupIndex + 1}/4`;
    if (currentRound.name === 'Semifinals') return `SEMIFINALS • BATTLE ${currentMatchupIndex + 1}/2`;
    return '👑 THE GRAND CHAMPIONSHIP 👑';
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-4 px-4 py-4 text-foreground">
      {/* Round Header */}
      <div className="flex flex-col items-center gap-1 border-b-2 border-dashed border-primary/20 pb-3 text-center">
        <span className="text-[10px] font-mono tracking-widest text-primary font-bold uppercase">
          ⚔️ RESTAURANT BATTLE ARENA ⚔️
        </span>
        <h2 className="text-xl font-header font-black tracking-tight uppercase text-foreground leading-none mt-1">
          {getRoundLabel()}
        </h2>
      </div>

      {/* Bracket Progress */}
      <div className="flex justify-between px-2 text-[9px] font-bold text-foreground/45 uppercase tracking-wide bg-foreground/[0.02] border border-foreground/5 py-2 rounded-xl">
        <span className={currentRound.name === 'Preliminaries' ? 'text-primary font-black' : ''}>12 ROSTER</span>
        <span>➔</span>
        <span className={currentRound.name === 'Quarterfinals' ? 'text-primary font-black' : ''}>8 QUARTERS</span>
        <span>➔</span>
        <span className={currentRound.name === 'Semifinals' ? 'text-primary font-black' : ''}>4 SEMIS</span>
        <span>➔</span>
        <span className={currentRound.name === 'Finals' ? 'text-primary font-black' : ''}>2 FINALS</span>
        <span>➔</span>
        <span>🏆 GOLD</span>
      </div>

      {/* Arena Matchups View */}
      {isSemifinals ? (
        // Render both semifinal duels (all 4 options shown side-by-side)
        <div className="flex flex-col gap-6 py-2">
          {/* Match A */}
          <div className="flex flex-col gap-2 border-2 border-dashed border-foreground/10 p-3 rounded-2xl bg-amber-50/[0.05]">
            <span className="text-[9px] font-mono font-bold text-foreground/45 uppercase block tracking-wider">
              MATCH A: CHOOSE FIRST FINALIST
            </span>
            <div className="relative grid grid-cols-2 gap-4 items-stretch">
              <RestaurantBattleCard
                restaurant={currentRound.matchups[0].r1}
                isWinner={winnerA === currentRound.matchups[0].r1.id}
                isLoser={winnerA !== null && winnerA !== currentRound.matchups[0].r1.id}
                isAnimating={animatingA}
                onClick={() => handleVoteSemiA(currentRound.matchups[0].r1.id)}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <span className="w-8 h-8 rounded-full border-2 border-foreground bg-primary text-white text-[8px] font-black flex items-center justify-center shadow">VS</span>
              </div>
              <RestaurantBattleCard
                restaurant={currentRound.matchups[0].r2}
                isWinner={winnerA === currentRound.matchups[0].r2.id}
                isLoser={winnerA !== null && winnerA !== currentRound.matchups[0].r2.id}
                isAnimating={animatingA}
                onClick={() => handleVoteSemiA(currentRound.matchups[0].r2.id)}
              />
            </div>
          </div>

          {/* Match B */}
          <div className="flex flex-col gap-2 border-2 border-dashed border-foreground/10 p-3 rounded-2xl bg-amber-50/[0.05]">
            <span className="text-[9px] font-mono font-bold text-foreground/45 uppercase block tracking-wider">
              MATCH B: CHOOSE SECOND FINALIST
            </span>
            <div className="relative grid grid-cols-2 gap-4 items-stretch">
              <RestaurantBattleCard
                restaurant={currentRound.matchups[1].r1}
                isWinner={winnerB === currentRound.matchups[1].r1.id}
                isLoser={winnerB !== null && winnerB !== currentRound.matchups[1].r1.id}
                isAnimating={animatingB}
                onClick={() => handleVoteSemiB(currentRound.matchups[1].r1.id)}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <span className="w-8 h-8 rounded-full border-2 border-foreground bg-primary text-white text-[8px] font-black flex items-center justify-center shadow">VS</span>
              </div>
              <RestaurantBattleCard
                restaurant={currentRound.matchups[1].r2}
                isWinner={winnerB === currentRound.matchups[1].r2.id}
                isLoser={winnerB !== null && winnerB !== currentRound.matchups[1].r2.id}
                isAnimating={animatingB}
                onClick={() => handleVoteSemiB(currentRound.matchups[1].r2.id)}
              />
            </div>
          </div>
        </div>
      ) : activeMatchup ? (
        // Shared Battlefield Arena (Trainer Battle View)
        <div className="flex flex-col border-4 border-foreground rounded-3xl overflow-hidden bg-background shadow-[0_4px_0_#000] relative">
          {/* 1. Shared Battlefield Arena */}
          <div className="relative h-64 md:h-72 bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 border-b-4 border-foreground overflow-hidden">
            {/* Battlefield background decals: clouds/blur hills */}
            <div className="absolute top-8 left-6 w-24 h-10 bg-white/45 rounded-full blur-sm" />
            <div className="absolute top-12 right-12 w-32 h-12 bg-white/45 rounded-full blur-sm" />
            
            {/* Ellipse Ground platforms like in Pokémon */}
            {/* Top-Right (Opponent Platform) */}
            <div className="absolute top-[38%] right-[15%] w-[120px] h-[30px] bg-emerald-700/20 border border-emerald-800/10 rounded-full flex items-center justify-center">
              <div className="w-[100px] h-[20px] bg-emerald-600/30 rounded-full" />
            </div>

            {/* Bottom-Left (Player Platform) */}
            <div className="absolute bottom-[10%] left-[15%] w-[150px] h-[40px] bg-emerald-700/25 border border-emerald-800/10 rounded-full flex items-center justify-center">
              <div className="w-[130px] h-[30px] bg-emerald-600/35 rounded-full" />
            </div>

            {/* Opponent Pokemon (Top Right) */}
            <motion.div
              animate={
                winnerId === r2.id
                  ? {
                      x: [0, -25, 0],
                      y: [0, 15, 0],
                      scale: [1, 1.05, 1],
                      transition: { duration: 0.5, ease: 'easeInOut' }
                    }
                  : winnerId === r1.id
                  ? {
                      x: [0, 10, -10, 10, -10, 0],
                      opacity: [1, 1, 0.5, 0],
                      scale: [1, 0.8, 0.5],
                      transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' }
                    }
                  : {}
              }
              whileHover={!animatingId ? { scale: 1.06 } : {}}
              onClick={() => {
                if (!animatingId) handleVoteNormal(r2.id);
              }}
              className="absolute top-[14%] right-[18%] z-10 flex flex-col items-center select-none cursor-pointer"
            >
              <img
                src={r2.pokemon.sprite}
                alt={r2.pokemon.name}
                onError={handleImageError}
                className="w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]"
                draggable="false"
              />
            </motion.div>

            {/* Player Pokemon (Bottom Left) */}
            <motion.div
              animate={
                winnerId === r1.id
                  ? {
                      x: [0, 25, 0],
                      y: [0, -15, 0],
                      scale: [1, 1.05, 1],
                      transition: { duration: 0.5, ease: 'easeInOut' }
                    }
                  : winnerId === r2.id
                  ? {
                      x: [0, -10, 10, -10, 10, 0],
                      opacity: [1, 1, 0.5, 0],
                      scale: [1, 0.8, 0.5],
                      transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' }
                    }
                  : {}
              }
              whileHover={!animatingId ? { scale: 1.06 } : {}}
              onClick={() => {
                if (!animatingId) handleVoteNormal(r1.id);
              }}
              className="absolute bottom-[8%] left-[20%] z-10 flex flex-col items-center select-none cursor-pointer"
            >
              <img
                src={r1.pokemon.sprite}
                alt={r1.pokemon.name}
                onError={handleImageError}
                className="w-24 h-24 md:w-28 md:h-28 object-contain scale-x-[-1] filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]"
                draggable="false"
              />
            </motion.div>

            {/* Opponent Status Box (Top Left) */}
            <div className="absolute top-4 left-4 w-[180px] md:w-[220px] bg-amber-50/95 border-2 border-foreground rounded-2xl p-2 font-mono shadow-[2px_2px_0_#000] z-20 select-none">
              <div className="flex justify-between items-center text-[9px] font-black uppercase text-foreground leading-none">
                <span className="truncate max-w-[100px]">{r2.pokemon.name}</span>
                <span className="shrink-0 text-primary">Lv.{r2.level}</span>
              </div>
              <div className="text-[11px] text-foreground/75 mt-0.5 truncate uppercase font-black">
                {r2.name}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[7px] font-black bg-yellow-400 text-yellow-950 px-1 py-0.2 rounded leading-none border border-foreground/10">HP</span>
                <div className="flex-1 bg-gray-300 h-2 rounded-full overflow-hidden border border-foreground/10 relative">
                  <div
                    className="bg-emerald-400 h-full transition-all duration-1000 ease-out"
                    style={{ width: `${winnerId === r1.id ? 0 : Math.min((r2.pokemon.baseStats.hp / 150) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center text-[7px] text-foreground/60 font-bold mt-1">
                <span>Rating: {r2.rating} ★</span>
                <span>{'$'.repeat(r2.priceTier)}</span>
              </div>
            </div>

            {/* Player Status Box (Bottom Right) */}
            <div className="absolute bottom-4 right-4 w-[180px] md:w-[220px] bg-amber-50/95 border-2 border-foreground rounded-2xl p-2 font-mono shadow-[2px_2px_0_#000] z-20 select-none">
              <div className="flex justify-between items-center text-[9px] font-black uppercase text-foreground leading-none">
                <span className="truncate max-w-[100px]">{r1.pokemon.name}</span>
                <span className="shrink-0 text-primary">Lv.{r1.level}</span>
              </div>
              <div className="text-[11px] text-foreground/75 mt-0.5 truncate uppercase font-black">
                {r1.name}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[7px] font-black bg-yellow-400 text-yellow-950 px-1 py-0.2 rounded leading-none border border-foreground/10">HP</span>
                <div className="flex-1 bg-gray-300 h-2 rounded-full overflow-hidden border border-foreground/10 relative">
                  <div
                    className="bg-emerald-400 h-full transition-all duration-1000 ease-out"
                    style={{ width: `${winnerId === r2.id ? 0 : Math.min((r1.pokemon.baseStats.hp / 150) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center text-[7px] text-foreground/60 font-bold mt-1">
                <span>Dist: {r1.distance} MI</span>
                <span className="uppercase text-[6px] px-1 py-0.2 rounded bg-red-100 text-red-700 border border-red-200 font-mono font-black scale-90 origin-right">
                  {r1.deliveryProvider !== 'None' ? r1.deliveryProvider : 'Pick Up'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. GBA Dialogue & Action Box */}
          <div className="bg-[#f8f8f0] p-4 font-mono border-t-2 border-foreground grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch select-none relative shadow-[inset_0_4px_0_rgba(0,0,0,0.02)]">
            {/* Dialogue text box on the left */}
            <div className="border-4 border-dashed border-foreground/15 p-3 rounded-2xl flex flex-col justify-center gap-1 min-h-[70px]">
              <span className="text-[7px] uppercase font-black tracking-wider text-primary">TRAINER DIALOGUE</span>
              <p className="text-xs text-foreground font-black leading-snug">
                {animatingId 
                  ? `Critical hit! ${winnerId === r1.id ? r1.pokemon.name : r2.pokemon.name} wins the battle!`
                  : `A wild ${r2.pokemon.name} (${r2.attributes.cuisine}) challenges your ${r1.pokemon.name} (${r1.attributes.cuisine})!`}
              </p>
            </div>

            {/* GBA Battle Action Menu on the right */}
            <div className="grid grid-cols-2 gap-2 text-xs font-black">
              {/* Option A (FIGHT) */}
              <button
                disabled={animatingId !== null}
                onClick={() => handleVoteNormal(r1.id)}
                className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white border-2 border-foreground rounded-2xl p-2.5 flex flex-col items-center justify-center cursor-pointer shadow-[0_3px_0_#000] active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                <span className="text-[8px] uppercase opacity-80">🔥 FIGHT A</span>
                <span className="truncate max-w-[100px]">{r1.pokemon.name}</span>
              </button>

              {/* Option B (BAG) */}
              <button
                disabled={animatingId !== null}
                onClick={() => handleVoteNormal(r2.id)}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white border-2 border-foreground rounded-2xl p-2.5 flex flex-col items-center justify-center cursor-pointer shadow-[0_3px_0_#000] active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                <span className="text-[8px] uppercase opacity-80">⚡ FIGHT B</span>
                <span className="truncate max-w-[100px]">{r2.pokemon.name}</span>
              </button>

              {/* INFO (View info / search google) */}
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(r1.name + ' ' + r1.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white border-2 border-foreground rounded-2xl p-2.5 flex flex-col items-center justify-center cursor-pointer shadow-[0_3px_0_#000] active:translate-y-[3px] active:shadow-none text-center"
              >
                <span className="text-[8px] uppercase opacity-80">🎒 POKéDEX</span>
                <span>SEARCH</span>
              </a>

              {/* RUN (Skip match / randomize) */}
              <button
                disabled={animatingId !== null}
                onClick={() => {
                  const randWinner = Math.random() > 0.5 ? r1.id : r2.id;
                  handleVoteNormal(randWinner);
                }}
                className="bg-zinc-500 hover:bg-zinc-600 active:bg-zinc-700 text-white border-2 border-foreground rounded-2xl p-2.5 flex flex-col items-center justify-center cursor-pointer shadow-[0_3px_0_#000] active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                <span className="text-[8px] uppercase opacity-80">🏃 RUN</span>
                <span>RANDOMIZE</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Instruction Card */}
      <div className="text-center bg-amber-50/30 border-2 border-foreground p-3.5 rounded-2xl shadow-[0_3px_0_#000] flex flex-col gap-1">
        <span className="text-[9px] font-mono text-primary uppercase tracking-widest font-black">
          📢 TRAINER INSTRUCTION
        </span>
        <p className="text-xs font-sans font-medium text-foreground/80 leading-snug">
          {isSemifinals 
            ? 'Compare the 4 remaining semifinalists and tap a winner in both matchups simultaneously!' 
            : 'Compare levels, cuisines, base stats, and distances. Tap your favorite to KO the opponent!'}
        </p>
      </div>
    </div>
  );
}

interface CardProps {
  restaurant: any;
  isWinner: boolean;
  isLoser: boolean;
  isAnimating: boolean;
  onClick: () => void;
}

function RestaurantBattleCard({ restaurant, isWinner, isLoser, isAnimating, onClick }: CardProps) {
  const { pokemon, level, name, rating, distance, priceTier, deliveryAvailable, deliveryProvider } = restaurant;

  const maxStat = 150;
  const hpPercent = Math.min((pokemon.baseStats.hp / maxStat) * 100, 100);
  const atkPercent = Math.min((pokemon.baseStats.attack / maxStat) * 100, 100);
  const spdPercent = Math.min((pokemon.baseStats.speed / maxStat) * 100, 100);

  const typeColors: Record<string, string> = {
    Water: 'bg-blue-400 border-blue-500 text-white',
    Fire: 'bg-red-400 border-red-500 text-white',
    Grass: 'bg-emerald-400 border-emerald-500 text-white',
    Fairy: 'bg-pink-300 border-pink-400 text-white',
    Electric: 'bg-amber-300 border-amber-400 text-black',
    Normal: 'bg-gray-300 border-gray-400 text-white',
    Fighting: 'bg-orange-500 border-orange-600 text-white',
    Dragon: 'bg-indigo-500 border-indigo-600 text-white',
    Psychic: 'bg-purple-400 border-purple-500 text-white',
    Dark: 'bg-zinc-700 border-zinc-800 text-white',
    Ground: 'bg-amber-600 border-amber-700 text-white',
    Steel: 'bg-slate-400 border-slate-500 text-white',
    Ice: 'bg-cyan-250 border-cyan-350 text-black',
    Flying: 'bg-sky-400 border-sky-500 text-white',
    Rock: 'bg-stone-500 border-stone-600 text-white'
  };

  const badgeColor = typeColors[pokemon.types[0]] || 'bg-gray-300 border-gray-400';

  let animateState = {};
  if (isAnimating) {
    if (isWinner) {
      animateState = {
        y: [0, -35, 0, -15, 0],
        scale: [1, 1.06, 1.06, 1.02, 1],
        rotate: [0, -6, 6, 0],
        transition: { duration: 0.8, ease: 'easeInOut' }
      };
    } else if (isLoser) {
      animateState = {
        x: [0, -10, 10, -10, 10, -5, 5, 0],
        filter: ['brightness(1)', 'brightness(0.3) sepia(1) hue-rotate(-50deg)', 'brightness(0.1)'],
        opacity: [1, 1, 0.7, 0.4, 0],
        y: [0, 20, 40],
        scale: [1, 0.9, 0.7],
        transition: { duration: 0.9, ease: 'easeOut' }
      };
    }
  }

  return (
    <motion.div
      animate={animateState}
      whileHover={!isAnimating ? { y: -5, scale: 1.01 } : {}}
      onClick={onClick}
      className={`flex flex-col border-4 border-foreground cursor-pointer bg-background relative overflow-hidden transition-all duration-300 rounded-3xl shadow-[0_4px_0_#000] ${
        isAnimating
          ? isWinner
            ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] z-10'
            : 'border-rose-500 z-0 opacity-50'
          : 'hover:border-primary/80'
      }`}
    >
      {/* TCG Level Header */}
      <div className="flex justify-between items-center bg-foreground/5 border-b-2 border-foreground px-3 py-1.5 font-mono text-[9px] font-black uppercase">
        <span className="text-foreground/60">Lv. {level}</span>
        <span className="text-primary">{pokemon.rarity}</span>
      </div>

      {/* Card Illustration window */}
      <div className="h-28 md:h-36 bg-amber-50/20 border-b-2 border-foreground flex flex-col items-center justify-center relative p-3 shrink-0">
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          onError={handleImageError}
          className="w-20 h-20 md:w-28 md:h-28 object-contain select-none z-10 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
          draggable="false"
        />
        
        {/* Card Title Label */}
        <span className="font-header font-black text-xs md:text-sm uppercase tracking-wider text-foreground select-none mt-0.5">
          {pokemon.name}
        </span>

        {/* Pokemon Type Badge */}
        <span className={`absolute bottom-2 right-2 text-[8px] font-mono font-black px-1.5 py-0.5 rounded-full border-2 border-foreground uppercase ${badgeColor} select-none leading-none`}>
          {pokemon.types[0]}
        </span>
      </div>

      {/* Stats Bar Panel */}
      <div className="px-3 py-2 border-b-2 border-foreground bg-foreground/[0.01] flex flex-col gap-1.5 text-[8px] font-mono font-black">
        {/* HP */}
        <div className="flex items-center gap-1.5">
          <Heart size={8} className="text-rose-500 fill-current shrink-0" />
          <span className="w-5 text-foreground/50">HP</span>
          <div className="flex-1 bg-foreground/10 h-1.5 rounded-full overflow-hidden border border-foreground/5">
            <div className="bg-rose-500 h-full" style={{ width: `${hpPercent}%` }} />
          </div>
          <span className="w-5 text-right">{pokemon.baseStats.hp}</span>
        </div>

        {/* ATK */}
        <div className="flex items-center gap-1.5">
          <Zap size={8} className="text-amber-500 fill-current shrink-0" />
          <span className="w-5 text-foreground/50">ATK</span>
          <div className="flex-1 bg-foreground/10 h-1.5 rounded-full overflow-hidden border border-foreground/5">
            <div className="bg-amber-400 h-full" style={{ width: `${atkPercent}%` }} />
          </div>
          <span className="w-5 text-right">{pokemon.baseStats.attack}</span>
        </div>

        {/* SPD */}
        <div className="flex items-center gap-1.5">
          <Award size={8} className="text-sky-500 shrink-0" />
          <span className="w-5 text-foreground/50">SPD</span>
          <div className="flex-1 bg-foreground/10 h-1.5 rounded-full overflow-hidden border border-foreground/5">
            <div className="bg-sky-400 h-full" style={{ width: `${spdPercent}%` }} />
          </div>
          <span className="w-5 text-right">{pokemon.baseStats.speed}</span>
        </div>
      </div>

      {/* Restaurant description (Bottom half of card) */}
      <div className="flex-1 flex flex-col justify-between p-3 bg-background">
        <div>
          <span className="text-[8px] font-mono text-foreground/45 block uppercase font-bold tracking-wider mb-0.5">
            COMPETITOR SPOT
          </span>
          <h3 className="font-header font-black text-[16.5px] md:text-[18px] text-foreground uppercase tracking-tight leading-tight line-clamp-2">
            {name}
          </h3>
        </div>

        <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-dashed border-foreground/15 font-mono text-[9px] font-bold">
          <div className="flex justify-between items-center">
            <span className="text-foreground/45 uppercase">CUISINE</span>
            <span className="text-foreground truncate max-w-[65px]">{restaurant.attributes.cuisine}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground/45 uppercase">RATING</span>
            <span className="text-primary font-black">{rating} ★</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground/45 uppercase">DIST</span>
            <span className="text-foreground">{distance} MI</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground/45 uppercase">PRICE</span>
            <span className="text-foreground">
              {'$'.repeat(priceTier)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground/45 uppercase">DELIVERY</span>
            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase leading-none ${
              deliveryProvider === 'DoorDash' ? 'bg-red-500/10 text-red-600 border-red-500/30' :
              deliveryProvider === 'UberEats' ? 'bg-green-500/10 text-green-600 border-green-500/30' :
              deliveryProvider === 'Grubhub' ? 'bg-orange-500/10 text-orange-600 border-orange-500/30' :
              deliveryProvider === 'Direct' ? 'bg-blue-500/10 text-blue-600 border-blue-500/30' :
              'bg-gray-100 text-gray-500 border-gray-300'
            }`}>
              {deliveryProvider !== 'None' ? deliveryProvider : 'Pick Up'}
            </span>
          </div>
        </div>
      </div>

      {/* Visual damage red flash overlays */}
      <AnimatePresence>
        {isLoser && isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.7, 0, 0.7, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-rose-600/40 pointer-events-none z-30"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
