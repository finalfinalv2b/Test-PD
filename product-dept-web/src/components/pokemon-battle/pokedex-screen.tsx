import { useState } from 'react';
import { useGameStore } from './game-store';
import { POKEMON_BY_TYPE, PokemonStats } from './pokemon-data';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Heart, Shield, Zap, Award, Star } from 'lucide-react';
import { handleImageError } from './battle-screen';

export function PokedexScreen() {
  const { pokedex, pastChampions, exitPokedex } = useGameStore();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedPoke, setSelectedPoke] = useState<any | null>(null);

  // Flatten all Pokemon from catalog
  const allPokemonList = Object.entries(POKEMON_BY_TYPE).flatMap(([type, list]) => 
    list.map(p => ({ ...p, primaryType: type }))
  );

  // Get total unique Pokemon in catalog
  const totalInCatalog = allPokemonList.length;
  const caughtCount = pokedex.length;

  const tabs = ['All', 'Water', 'Fire', 'Grass', 'Electric', 'Normal', 'Fighting', 'Dragon', 'Psychic', 'Dark', 'Fairy', 'Ground', 'Steel', 'Ice'];

  const filteredPokemon = allPokemonList.filter(p => {
    if (activeTab === 'All') return true;
    return p.primaryType === activeTab;
  });

  const isCaught = (id: number) => pokedex.includes(id);

  // Type color classes
  const typeColors: Record<string, string> = {
    Water: 'bg-blue-500 text-white',
    Fire: 'bg-red-500 text-white',
    Grass: 'bg-emerald-500 text-white',
    Fairy: 'bg-pink-400 text-white',
    Electric: 'bg-amber-400 text-black',
    Normal: 'bg-gray-400 text-white',
    Fighting: 'bg-orange-600 text-white',
    Dragon: 'bg-indigo-600 text-white',
    Psychic: 'bg-purple-500 text-white',
    Dark: 'bg-zinc-800 text-white',
    Ground: 'bg-yellow-600 text-white',
    Steel: 'bg-slate-500 text-white',
    Ice: 'bg-cyan-300 text-black',
    Flying: 'bg-sky-400 text-white',
    Rock: 'bg-stone-500 text-white'
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 px-4 py-4 text-foreground relative">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
        <button
          onClick={exitPokedex}
          className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <ArrowLeft size={12} />
          BACK TO MAP
        </button>
        <span className="text-[10px] font-mono tracking-widest text-primary font-bold uppercase flex items-center gap-1">
          <BookOpen size={10} />
          POKEDEX DATABASE
        </span>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-2 gap-4 border border-foreground/10 bg-foreground/[0.01] p-5 font-mono">
        <div>
          <span className="text-[9px] text-foreground/45 uppercase block mb-1">POKEMON COLLECTED</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-header font-black text-primary">{caughtCount}</span>
            <span className="text-foreground/40 text-xs">/ {totalInCatalog} CAUGHT</span>
          </div>
          <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden mt-2">
            <div 
              className="bg-primary h-full" 
              style={{ width: `${(caughtCount / totalInCatalog) * 100}%` }} 
            />
          </div>
        </div>

        <div>
          <span className="text-[9px] text-foreground/45 uppercase block mb-1">CHAMPIONS CROWNED</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-header font-black text-foreground">{pastChampions.length}</span>
            <span className="text-foreground/40 text-xs">TOURNAMENTS</span>
          </div>
          <span className="text-[8px] text-foreground/45 uppercase block mt-2">LOCAL FOOD TRAINER RANK: BRONZE</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSelectedPoke(null);
            }}
            className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase rounded-full border shrink-0 transition-colors cursor-pointer ${
              activeTab === tab
                ? 'bg-foreground border-foreground text-background'
                : 'bg-background border-foreground/10 hover:border-foreground/30 text-foreground/60'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid of Pokemon */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {filteredPokemon.map((poke) => {
          const caught = isCaught(poke.id);
          const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`;

          return (
            <button
              key={poke.id}
              onClick={() => caught && setSelectedPoke(poke)}
              disabled={!caught}
              className={`border p-2.5 flex flex-col items-center justify-between rounded relative aspect-square transition-all ${
                caught
                  ? 'border-foreground/10 bg-background hover:border-primary hover:shadow-md cursor-pointer'
                  : 'border-foreground/5 bg-foreground/[0.02] opacity-40 cursor-not-allowed'
              }`}
            >
              {/* Dex Number */}
              <span className="absolute top-1.5 left-1.5 text-[8px] font-mono text-foreground/30">
                #{String(poke.id).padStart(3, '0')}
              </span>

              {/* Sprite Image */}
              <div className="w-16 h-16 flex items-center justify-center relative my-auto">
                {caught ? (
                  <img
                    src={spriteUrl}
                    alt={poke.name}
                    onError={handleImageError}
                    className="w-full h-full object-contain select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                    draggable="false"
                  />
                ) : (
                  <div className="w-10 h-10 bg-foreground/40 rounded-full blur-[2px] flex items-center justify-center">
                    <span className="text-background font-mono font-black text-xs">?</span>
                  </div>
                )}
              </div>

              {/* Name */}
              <span className="text-[10px] font-header font-black uppercase tracking-wide truncate max-w-full text-center">
                {caught ? poke.name : '??????'}
              </span>

              {/* Small Rarity Dot */}
              {caught && (
                <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${
                  poke.rarity === 'Mythic' 
                    ? 'bg-pink-500 animate-pulse' 
                    : poke.rarity === 'Legendary' 
                    ? 'bg-amber-400' 
                    : poke.rarity === 'Rare' 
                    ? 'bg-blue-500' 
                    : 'bg-gray-400'
                }`} title={poke.rarity} />
              )}
            </button>
          );
        })}
      </div>

      {/* Expanded Pokemon Stats Sheet (Draw Modal) */}
      <AnimatePresence>
        {selectedPoke && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPoke(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-sm border-2 border-foreground bg-background p-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPoke(null)}
                className="absolute top-4 right-4 text-xs font-mono font-bold hover:text-primary cursor-pointer"
              >
                ✕ CLOSE
              </button>

              <div className="flex flex-col items-center gap-4 text-center">
                <span className="text-[9px] font-mono text-foreground/45 uppercase tracking-widest block">
                  #{String(selectedPoke.id).padStart(3, '0')} | {selectedPoke.rarity}
                </span>

                {/* Sprite & Name */}
                <div className="w-28 h-28 bg-foreground/[0.02] border border-foreground/5 rounded-full flex items-center justify-center relative p-3">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPoke.id}.png`}
                    alt={selectedPoke.name}
                    onError={handleImageError}
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
                  />
                </div>

                <h3 className="font-header font-black text-xl uppercase tracking-wider text-foreground">
                  {selectedPoke.name}
                </h3>

                {/* Types */}
                <div className="flex gap-1">
                  {selectedPoke.types.map((type: string) => (
                    <span 
                      key={type} 
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                        typeColors[type] || 'bg-gray-400 text-white'
                      }`}
                    >
                      {type}
                    </span>
                  ))}
                </div>

                {/* Stats Panel */}
                <div className="w-full border-t border-b border-foreground/10 py-3.5 mt-2 flex flex-col gap-2 font-mono text-[10px] font-bold">
                  {/* HP */}
                  <div className="flex items-center gap-2">
                    <Heart size={12} className="text-rose-500 shrink-0" />
                    <span className="w-10 text-foreground/50 text-left">HP</span>
                    <div className="flex-1 bg-foreground/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full" style={{ width: `${(selectedPoke.stats.hp / 150) * 100}%` }} />
                    </div>
                    <span className="w-6 text-right">{selectedPoke.stats.hp}</span>
                  </div>

                  {/* ATK */}
                  <div className="flex items-center gap-2">
                    <Zap size={12} className="text-amber-500 shrink-0" />
                    <span className="w-10 text-foreground/50 text-left">ATK</span>
                    <div className="flex-1 bg-foreground/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full" style={{ width: `${(selectedPoke.stats.attack / 150) * 100}%` }} />
                    </div>
                    <span className="w-6 text-right">{selectedPoke.stats.attack}</span>
                  </div>

                  {/* SPD */}
                  <div className="flex items-center gap-2">
                    <Award size={12} className="text-sky-500 shrink-0" />
                    <span className="w-10 text-foreground/50 text-left">SPD</span>
                    <div className="flex-1 bg-foreground/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full" style={{ width: `${(selectedPoke.stats.speed / 150) * 100}%` }} />
                    </div>
                    <span className="w-6 text-right">{selectedPoke.stats.speed}</span>
                  </div>
                </div>

                {/* Evolution Chain */}
                {selectedPoke.evolution && selectedPoke.evolution.length > 1 && (
                  <div className="w-full text-left font-mono text-[9px] text-foreground/50">
                    <span className="uppercase tracking-widest block mb-1">EVOLUTION LINE</span>
                    <div className="flex gap-1.5 items-center flex-wrap">
                      {selectedPoke.evolution.map((evo: string, idx: number) => (
                        <div key={evo} className="flex items-center gap-1.5">
                          {idx > 0 && <span>➔</span>}
                          <span className={`font-bold uppercase ${
                            evo.toLowerCase() === selectedPoke.name.toLowerCase() ? 'text-primary' : 'text-foreground/75'
                          }`}>
                            {evo}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Restaurants visited info */}
                <div className="w-full text-left font-mono text-[9px] text-foreground/50 mt-1 border-t border-foreground/5 pt-3.5">
                  <span className="uppercase tracking-widest block mb-1.5">PAST CHAMPION RESTAURANTS</span>
                  <div className="flex flex-col gap-1 max-h-[80px] overflow-y-auto pr-1">
                    {pastChampions.filter(c => c.pokemonId === selectedPoke.id).length > 0 ? (
                      pastChampions
                        .filter(c => c.pokemonId === selectedPoke.id)
                        .map((c, idx) => (
                          <div key={idx} className="flex justify-between items-center text-foreground/80 bg-foreground/[0.02] border border-foreground/5 px-2 py-1">
                            <span className="font-bold text-[13.5px] truncate max-w-[150px]">{c.restaurantName}</span>
                            <span className="text-foreground/45 text-[8px]">{c.date}</span>
                          </div>
                        ))
                    ) : (
                      <span className="text-foreground/40 italic">Never chosen as champion yet. Encounter in a battle to collect!</span>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chronological Championship Log (Only if no active tab or at the bottom of Pokedex) */}
      {pastChampions.length > 0 && (
        <div className="border border-foreground/10 bg-foreground/[0.01] p-5 flex flex-col gap-3 font-mono text-xs">
          <span className="text-[10px] font-mono tracking-widest text-foreground/50 uppercase flex items-center gap-1">
            <Clock size={12} />
            CHAMPIONS HALL OF FAME
          </span>
          <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
            {pastChampions.map((c, idx) => (
              <div key={idx} className="flex justify-between items-center bg-background border border-foreground/5 px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-lg">🏆</span>
                  <div className="min-w-0 leading-tight">
                    <span className="font-black text-foreground text-[18px] truncate block">{c.restaurantName}</span>
                    <span className="text-[8px] text-foreground/45 uppercase tracking-wide">
                      {c.cuisine} | {c.pokemonName} (LV. {Math.round(c.rating * 10)})
                    </span>
                  </div>
                </div>
                <span className="text-[8px] text-foreground/45 text-right font-bold shrink-0">{c.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
