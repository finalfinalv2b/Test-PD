"use client";

import { useGameStore } from './game-store';
import { LocationScreen } from './location-screen';
import { QuizScreen } from './quiz-screen';
import { TransitionScreen } from './transition-screen';
import { BattleScreen } from './battle-screen';
import { ChampionScreen } from './champion-screen';
import { PokedexScreen } from './pokedex-screen';
import { PokeMap } from './poke-map';
import { motion, AnimatePresence } from 'framer-motion';

export function BattleGameWrapper() {
  const { stage, latitude } = useGameStore();

  const renderActiveStage = () => {
    switch (stage) {
      case 'location':
        return <LocationScreen />;
      case 'quiz':
        return <QuizScreen />;
      case 'transition':
        return <TransitionScreen />;
      case 'tournament':
        return <BattleScreen />;
      case 'champion':
        return <ChampionScreen />;
      case 'pokedex':
        return <PokedexScreen />;
      default:
        return <LocationScreen />;
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col justify-start items-center bg-background text-foreground select-none relative">
      
      {/* Fullscreen Map Background (GPS radar covering the entire window) */}
      {latitude !== null && stage !== 'pokedex' && (
        <div className="absolute inset-0 w-full h-full z-0">
          <PokeMap />
        </div>
      )}

      {/* Screen Wrapper overlay with pointer events disabled on the wrapper
          so clicks pass through to Leaflet, but enabled on the inner forms/cards */}
      <div className="relative z-10 w-full h-full flex flex-col justify-start items-center overflow-y-auto pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }} // Satisfying <150ms transition
            className="w-full max-w-md min-h-full flex flex-col justify-center items-center p-4 pointer-events-auto"
          >
            {renderActiveStage()}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
