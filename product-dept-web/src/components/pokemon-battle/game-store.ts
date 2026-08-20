import { create } from 'zustand';
import { Restaurant, fetchRealRestaurants, RestaurantAttributes, CUISINE_DETAILS } from './restaurant-data';
import { getNextQuestion, Question } from './question-engine';
import { CUISINE_TYPE_MAP, assignPokemonToRestaurant } from './pokemon-data';

export type UserMode = 'Cafe' | 'Healthy' | 'Indulgent' | 'Surprise Me';
export type GameStage = 'location' | 'quiz' | 'transition' | 'tournament' | 'champion' | 'pokedex';

export interface Matchup {
  id: string;
  r1: Restaurant;
  r2: Restaurant;
  winner?: Restaurant;
}

export interface TournamentRound {
  name: 'Preliminaries' | 'Quarterfinals' | 'Semifinals' | 'Finals';
  matchups: Matchup[];
}

export interface TrainerOption {
  trainerName: string;
  descriptor: string;
  buttonText: string;
  emoji: string;
  theme: string;
  symbol: string;
  pokemonTypes: string[];
  matchingCuisines: string[];
}

export interface TrainerQuestion {
  id: number;
  question: string;
  optionA: TrainerOption;
  optionB: TrainerOption;
}

export const TRAINER_QUESTIONS: TrainerQuestion[] = [
  {
    id: 1,
    question: "Which major element are you craving right now?",
    optionA: {
      trainerName: "Blaine",
      descriptor: "BBQ, Mexican, Thai, Spicy",
      buttonText: "🔥 FIRE TYPE",
      emoji: "🔥",
      theme: "from-orange-600 to-red-500",
      symbol: "🔥",
      pokemonTypes: ["Fire"],
      matchingCuisines: ["BBQ", "Texas BBQ", "Korean BBQ", "Brazilian Steakhouse", "Cajun / Creole", "Thai", "Indian", "Mexican", "Tex-Mex", "Middle Eastern", "Pizza", "Spanish Tapas", "Hot Pot", "Wings", "Seafood Boil", "Tacos", "Caribbean"]
    },
    optionB: {
      trainerName: "Misty",
      descriptor: "Sushi, Poke, Seafood, Fresh",
      buttonText: "💧 WATER TYPE",
      emoji: "💧",
      theme: "from-cyan-500 to-blue-400",
      symbol: "💧",
      pokemonTypes: ["Water"],
      matchingCuisines: ["Seafood", "Sushi", "Poke", "Oyster Bar", "Ramen", "Vietnamese", "Cajun / Creole", "Hot Pot", "Seafood Boil", "Caribbean"]
    }
  },
  {
    id: 2,
    question: "Do you want fresh greens or heavy protein?",
    optionA: {
      trainerName: "Erika",
      descriptor: "Vegan, Salad, Mediterranean, Fresh",
      buttonText: "🍃 GRASS TYPE",
      emoji: "🌸",
      theme: "from-emerald-500 to-green-400",
      symbol: "🍃",
      pokemonTypes: ["Grass"],
      matchingCuisines: ["Vegetarian", "Vegan", "Mediterranean", "Greek", "Salad", "Healthy Bowls", "Vietnamese", "Brazilian Steakhouse"]
    },
    optionB: {
      trainerName: "Bruno",
      descriptor: "Steakhouse, Korean BBQ, Meat-Heavy",
      buttonText: "💥 FIGHTING TYPE",
      emoji: "💪",
      theme: "from-amber-700 to-orange-850",
      symbol: "💥",
      pokemonTypes: ["Fighting"],
      matchingCuisines: ["Steakhouse", "Steakhouses", "Korean", "Korean BBQ", "Peruvian", "Turkish"]
    }
  },
  {
    id: 3,
    question: "Traditional/respected recipes or comfort classics?",
    optionA: {
      trainerName: "Lance",
      descriptor: "Chinese, Dim Sum, Ramen, Fusion",
      buttonText: "🐉 DRAGON TYPE",
      emoji: "🐉",
      theme: "from-red-800 to-purple-800",
      symbol: "🐉",
      pokemonTypes: ["Dragon"],
      matchingCuisines: ["Chinese", "Dim Sum", "Ramen", "Fusion"]
    },
    optionB: {
      trainerName: "Ash",
      descriptor: "Burgers, Comfort Food, Italian, Deli",
      buttonText: "⭐ NORMAL TYPE",
      emoji: "🧢",
      theme: "from-blue-600 to-red-500",
      symbol: "⭐",
      pokemonTypes: ["Normal"],
      matchingCuisines: ["Burgers", "American Comfort Food", "American", "Italian", "Sandwiches", "Deli"]
    }
  },
  {
    id: 4,
    question: "Upscale fine dining or guilty fast food cravings?",
    optionA: {
      trainerName: "Sabrina",
      descriptor: "Fine Dining, French, Refined",
      buttonText: "🔮 PSYCHIC TYPE",
      emoji: "🔮",
      theme: "from-indigo-750 to-purple-550",
      symbol: "👁️",
      pokemonTypes: ["Psychic"],
      matchingCuisines: ["French", "Indian", "Fine Dining", "Fusion"]
    },
    optionB: {
      trainerName: "Koga",
      descriptor: "Late Night Cravings, Fast Food",
      buttonText: "💀 DARK TYPE",
      emoji: "🥷",
      theme: "from-purple-850 to-zinc-850",
      symbol: "💀",
      pokemonTypes: ["Dark"],
      matchingCuisines: ["Fast Food", "Late Night"]
    }
  },
  {
    id: 5,
    question: "Do you want morning fuel or sweet desserts?",
    optionA: {
      trainerName: "Volkner",
      descriptor: "Breakfast, Coffee Shop, Morning energy",
      buttonText: "⚡ ELECTRIC TYPE",
      emoji: "⚡",
      theme: "from-yellow-400 to-amber-500",
      symbol: "⚡",
      pokemonTypes: ["Electric"],
      matchingCuisines: ["Breakfast / Brunch", "Breakfast", "Coffee Shop", "Coffee Shops", "Thai"]
    },
    optionB: {
      trainerName: "Dawn",
      descriptor: "Bakery, Dessert, Sweet Plates",
      buttonText: "🌸 FAIRY TYPE",
      emoji: "👧",
      theme: "from-pink-300 to-teal-200",
      symbol: "🌸",
      pokemonTypes: ["Fairy"],
      matchingCuisines: ["Dim Sum", "Spanish Tapas", "Bakery", "Bakeries", "Dessert", "Desserts", "Vegan"]
    }
  },
  {
    id: 6,
    question: "Hearty peasant-style food or precision craftsmanship?",
    optionA: {
      trainerName: "Giovanni",
      descriptor: "Southern, Tacos, Middle Eastern",
      buttonText: "⛰️ GROUND TYPE",
      emoji: "💼",
      theme: "from-amber-800 to-stone-600",
      symbol: "⛰️",
      pokemonTypes: ["Ground"],
      matchingCuisines: ["Southern Food", "Tex-Mex", "Middle Eastern", "Tacos", "Turkish"]
    },
    optionB: {
      trainerName: "Jasmine",
      descriptor: "Japanese, Steel-sharp craftsmanship",
      buttonText: "🛡️ STEEL TYPE",
      emoji: "🛡️",
      theme: "from-slate-400 to-slate-600",
      symbol: "🛡️",
      pokemonTypes: ["Steel"],
      matchingCuisines: ["Japanese (General)", "Japanese"]
    }
  },
  {
    id: 7,
    question: "Cool frozen desserts or crispy fried chicken?",
    optionA: {
      trainerName: "Candice",
      descriptor: "Ice Cream, Frozen treats",
      buttonText: "❄️ ICE TYPE",
      emoji: "❄️",
      theme: "from-sky-300 to-blue-500",
      symbol: "❄️",
      pokemonTypes: ["Ice"],
      matchingCuisines: ["Ice Cream"]
    },
    optionB: {
      trainerName: "Falkner",
      descriptor: "Wings, Fried Chicken, Flying poultry",
      buttonText: "💨 FLYING TYPE",
      emoji: "🦅",
      theme: "from-sky-200 to-indigo-300",
      symbol: "💨",
      pokemonTypes: ["Flying"],
      matchingCuisines: ["Wings", "Fried Chicken", "Peruvian"]
    }
  },
  {
    id: 8,
    question: "Choose a dual-type combo flavor profile:",
    optionA: {
      trainerName: "Flannery",
      descriptor: "Tex-Mex, Tacos, Spicy & Hearty",
      buttonText: "🔥⛰️ FIRE + GROUND",
      emoji: "🔥",
      theme: "from-orange-600 to-amber-700",
      symbol: "🔥",
      pokemonTypes: ["Fire", "Ground"],
      matchingCuisines: ["Tex-Mex", "Middle Eastern", "Tacos"]
    },
    optionB: {
      trainerName: "Wallace",
      descriptor: "Cajun, Hot Pot, Seafood Boils",
      buttonText: "💧🔥 WATER + FIRE",
      emoji: "🌊",
      theme: "from-teal-400 to-cyan-500",
      symbol: "🌊",
      pokemonTypes: ["Water", "Fire"],
      matchingCuisines: ["Cajun / Creole", "Hot Pot", "Seafood Boil", "Caribbean"]
    }
  },
  {
    id: 9,
    question: "Which dual-type experience matches your mood?",
    optionA: {
      trainerName: "Nurse Joy",
      descriptor: "Vegan, Salad, Healthy Bowls, Light",
      buttonText: "🍃🌸 GRASS + FAIRY",
      emoji: "👩‍⚕️",
      theme: "from-pink-400 to-rose-300",
      symbol: "❤️",
      pokemonTypes: ["Grass", "Fairy"],
      matchingCuisines: ["Vegan", "Salad", "Healthy Bowls"]
    },
    optionB: {
      trainerName: "Cynthia",
      descriptor: "Fusion, Creative tasting courses",
      buttonText: "🔮🐉 PSYCHIC + DRAGON",
      emoji: "👑",
      theme: "from-zinc-800 to-purple-800",
      symbol: "✨",
      pokemonTypes: ["Psychic", "Dragon"],
      matchingCuisines: ["Fusion"]
    }
  },
  {
    id: 10,
    question: "Final Matchup: Street style spice vs charming small plates",
    optionA: {
      trainerName: "Team Rocket",
      descriptor: "Tacos, Middle Eastern, Ground & Fire",
      buttonText: "⛰️🔥 GROUND + FIRE",
      emoji: "🕵️",
      theme: "from-zinc-900 to-zinc-800",
      symbol: "R",
      pokemonTypes: ["Ground", "Fire"],
      matchingCuisines: ["Tacos", "Middle Eastern"]
    },
    optionB: {
      trainerName: "Valerie",
      descriptor: "Spanish Tapas, Fairy-tale small plates",
      buttonText: "🌸🔥 FAIRY + FIRE",
      emoji: "🦋",
      theme: "from-pink-500 to-orange-400",
      symbol: "🎀",
      pokemonTypes: ["Fairy", "Fire"],
      matchingCuisines: ["Spanish Tapas"]
    }
  }
];

export const checkRestaurantMatch = (r: Restaurant, qId: number, choice: 'A' | 'B'): boolean => {
  const q = TRAINER_QUESTIONS.find(tq => tq.id === qId);
  if (!q) return false;
  const option = choice === 'A' ? q.optionA : q.optionB;

  const restCuisine = r.attributes.cuisine;
  const hasCuisineMatch = option.matchingCuisines.some(c => 
    restCuisine.toLowerCase() === c.toLowerCase() ||
    restCuisine.toLowerCase().includes(c.toLowerCase()) ||
    c.toLowerCase().includes(restCuisine.toLowerCase())
  );
  if (hasCuisineMatch) return true;

  const restCuisinePrimaryType = CUISINE_TYPE_MAP[restCuisine] || CUISINE_TYPE_MAP[restCuisine.split(' ')[0]] || 'Normal';
  const restPokemonTypes = r.pokemon?.types || [restCuisinePrimaryType];

  return restPokemonTypes.some(t => option.pokemonTypes.includes(t));
};

export function getActiveQuestions(mode: UserMode): TrainerQuestion[] {
  if (mode === 'Surprise Me') return [];

  let permittedCuisines: string[] = [];
  if (mode === 'Cafe') {
    permittedCuisines = ['Coffee Shops', 'Coffee Shop', 'Bakeries', 'Bakery', 'Desserts', 'Dessert', 'Breakfast', 'Breakfast / Brunch', 'Ice Cream'];
  } else if (mode === 'Healthy') {
    permittedCuisines = ['Vegetarian', 'Vegan', 'Mediterranean', 'Greek', 'Salad', 'Healthy Bowls', 'Vietnamese'];
  } else if (mode === 'Indulgent') {
    permittedCuisines = [
      'BBQ', 'Texas BBQ', 'Korean BBQ', 'Brazilian Steakhouse', 'Steakhouse', 'Steakhouses',
      'Burgers', 'American Comfort Food', 'American', 'Southern Food', 'Cajun / Creole',
      'Seafood', 'Sushi', 'Poke', 'Oyster Bar', 'Ramen', 'Chinese', 'Dim Sum',
      'Japanese (General)', 'Japanese', 'Korean', 'Thai', 'Indian', 'Mexican', 'Tex-Mex',
      'Mediterranean', 'Greek', 'Middle Eastern', 'Italian', 'Pizza', 'French', 'Spanish Tapas',
      'Fine Dining', 'Fusion', 'Hot Pot', 'Wings', 'Seafood Boil', 'Tacos',
      'Caribbean', 'Peruvian', 'Turkish', 'Fast Food', 'Late Night'
    ];
  } else {
    return TRAINER_QUESTIONS;
  }

  return TRAINER_QUESTIONS.filter(q => {
    const hasMatchA = q.optionA.matchingCuisines.some(c => 
      permittedCuisines.some(p => p.toLowerCase() === c.toLowerCase() || c.toLowerCase().includes(p.toLowerCase()))
    );
    const hasMatchB = q.optionB.matchingCuisines.some(c => 
      permittedCuisines.some(p => p.toLowerCase() === c.toLowerCase() || c.toLowerCase().includes(p.toLowerCase()))
    );
    return hasMatchA || hasMatchB;
  });
}

export function extractStreetName(address: string | null | undefined): string | null {
  if (!address) return null;
  if (address.startsWith("Trainer Area")) return null;
  const firstPart = address.split(',')[0].trim();
  const cleanPart = firstPart.replace(/^\d+\s+/, '').trim();
  if (cleanPart.startsWith("Trainer Area")) return null;
  return cleanPart;
}

export function getFilteredRestaurants(allRestaurants: Restaurant[], radius: number, mode: UserMode): Restaurant[] {
  const list = allRestaurants.filter(r => r.distance <= radius);
  
  let permittedCuisines: string[] = [];
  if (mode === 'Cafe') {
    permittedCuisines = ['Coffee Shops', 'Coffee Shop', 'Bakeries', 'Bakery', 'Desserts', 'Dessert', 'Breakfast', 'Breakfast / Brunch', 'Ice Cream'];
  } else if (mode === 'Healthy') {
    permittedCuisines = ['Vegetarian', 'Vegan', 'Mediterranean', 'Greek', 'Salad', 'Healthy Bowls', 'Vietnamese'];
  } else if (mode === 'Indulgent') {
    permittedCuisines = [
      'BBQ', 'Texas BBQ', 'Korean BBQ', 'Brazilian Steakhouse', 'Steakhouse', 'Steakhouses',
      'Burgers', 'American Comfort Food', 'American', 'Southern Food', 'Cajun / Creole',
      'Seafood', 'Sushi', 'Poke', 'Oyster Bar', 'Ramen', 'Chinese', 'Dim Sum',
      'Japanese (General)', 'Japanese', 'Korean', 'Thai', 'Indian', 'Mexican', 'Tex-Mex',
      'Mediterranean', 'Greek', 'Middle Eastern', 'Italian', 'Pizza', 'French', 'Spanish Tapas',
      'Fine Dining', 'Fusion', 'Hot Pot', 'Wings', 'Seafood Boil', 'Tacos',
      'Caribbean', 'Peruvian', 'Turkish', 'Fast Food', 'Late Night'
    ];
  }

  if (permittedCuisines.length === 0) return list;

  return list.filter(r => 
    permittedCuisines.some(p => 
      r.attributes.cuisine.toLowerCase() === p.toLowerCase() ||
      r.attributes.cuisine.toLowerCase().includes(p.toLowerCase()) ||
      p.toLowerCase().includes(r.attributes.cuisine.toLowerCase())
    )
  );
}

export function ensureMinDensity(
  allRestaurants: Restaurant[],
  lat: number,
  lng: number,
  radius: number,
  mode: UserMode
): Restaurant[] {
  // Always return the unmodified list of real restaurants to guarantee 100% true and accurate data.
  // Never inject mock fillers or invented locations under any circumstances.
  return allRestaurants;
}

interface GameState {
  latitude: number | null;
  longitude: number | null;
  searchRadius: number; // 0.5, 1, 2, 5, 10
  allRestaurants: Restaurant[];
  candidates: Restaurant[];
  userMode: UserMode;
  stage: GameStage;
  
  // Legacy Quiz State
  currentQuestion: Question | null;
  answeredQuestions: { 
    field: string; 
    value: any; 
    answer: 'yes' | 'no';
    optionLabel?: string;
    optionEmoji?: string;
  }[];
  quizProgress: number; 
  isCappedQuiz: boolean;
  
  // Trainer Quiz State
  currentQuestionIndex: number;
  trainerAnswers: Record<number, 'A' | 'B'>;
  recommendationWeights: {
    craving: number;
    quality: number;
    distance: number;
    popularity: number;
  };
  
  userAddress: string | null;
  
  // Tournament State
  rounds: TournamentRound[];
  currentRoundIndex: number;
  currentMatchupIndex: number;
  byeCandidates: Restaurant[];
  defeatedPath: Restaurant[];
  runnerUp: Restaurant | null;
  champion: Restaurant | null;
  battleLog: string[];

  // Pokedex & History (Persisted)
  pokedex: number[];
  pastChampions: {
    restaurantId: string;
    restaurantName: string;
    pokemonId: number;
    pokemonName: string;
    rating: number;
    cuisine: string;
    date: string;
  }[];

  // Actions
  initLocation: (lat: number, lng: number, address?: string) => Promise<void>;
  setRadius: (radius: number) => Promise<void>;
  setUserMode: (mode: UserMode) => void;
  walkableOnly: boolean;
  toggleWalkableOnly: () => Promise<void>;
  startQuiz: () => void;
  answerQuestion: (answer: 'optionA' | 'optionB' | 'skip') => void;
  selectTrainer: (choice: 'A' | 'B') => void;
  setRecommendationWeights: (weights: Partial<GameState['recommendationWeights']>) => void;
  finishTransition: () => void;
  selectBattleWinner: (winnerId: string) => void;
  resetGame: () => void;
  goToPokedex: () => void;
  exitPokedex: () => void;
  computeCandidates: (answers: Record<number, 'A' | 'B'>) => Restaurant[];
  mapCenterOverride: [number, number] | null;
  setMapCenterOverride: (coords: [number, number] | null) => void;
}

export const useGameStore = create<GameState>((set, get) => {
  const getPersistedData = () => {
    if (typeof window === 'undefined') return { pokedex: [], pastChampions: [] };
    const pData = localStorage.getItem('poke_eat_pokedex');
    const cData = localStorage.getItem('poke_eat_champions');
    return {
      pokedex: pData ? JSON.parse(pData) : [],
      pastChampions: cData ? JSON.parse(cData) : []
    };
  };

  const persistPokedex = (pokedex: number[], pastChampions: any[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('poke_eat_pokedex', JSON.stringify(pokedex));
    localStorage.setItem('poke_eat_champions', JSON.stringify(pastChampions));
  };

  const initialPersisted = getPersistedData();

  return {
    latitude: null,
    longitude: null,
    userAddress: null,
    searchRadius: 2.0,
    allRestaurants: [],
    candidates: [],
    userMode: 'Indulgent',
    walkableOnly: false,
    stage: 'location',
    currentQuestion: null,
    answeredQuestions: [],
    quizProgress: 0,
    isCappedQuiz: false,
    
    currentQuestionIndex: 0,
    trainerAnswers: {},
    recommendationWeights: {
      craving: 0.40,
      quality: 0.30,
      distance: 0.20,
      popularity: 0.10
    },

    mapCenterOverride: null,
    rounds: [],
    currentRoundIndex: 0,
    currentMatchupIndex: 0,
    byeCandidates: [],
    defeatedPath: [],
    runnerUp: null,
    champion: null,
    battleLog: [],
    pokedex: initialPersisted.pokedex,
    pastChampions: initialPersisted.pastChampions,

    initLocation: async (lat, lng, address) => {
      const { searchRadius, walkableOnly, userMode } = get();
      const activeRadius = walkableOnly ? 1.0 : searchRadius;
      let allRests: Restaurant[] = [];
      try {
        allRests = await fetchRealRestaurants(lat, lng, activeRadius);
      } catch (err: any) {
        console.error('Error fetching real restaurants:', err?.message || String(err));
      }

      // We strictly use only the real restaurants from fetchRealRestaurants to ensure 100% accurate location data.
      // Do not generate mock restaurants, mock fillers, or mock cafes under any circumstances.
      const allRestsWithDensity = ensureMinDensity(allRests, lat, lng, activeRadius, userMode);
      const filtered = getFilteredRestaurants(allRestsWithDensity, activeRadius, userMode);

      set({
        latitude: lat,
        longitude: lng,
        allRestaurants: allRestsWithDensity,
        candidates: filtered,
        searchRadius: activeRadius,
        userAddress: address || null
      });
    },

    setRadius: async (radius) => {
      const { userMode, latitude, longitude, walkableOnly } = get();
      const nextWalkableOnly = walkableOnly && radius === 1.0;
      
      set({ searchRadius: radius, walkableOnly: nextWalkableOnly, candidates: [] });
      
      if (latitude !== null && longitude !== null) {
        let allRests: Restaurant[] = [];
        try {
          allRests = await fetchRealRestaurants(latitude, longitude, radius);
        } catch (err: any) {
          console.error('Error fetching restaurants by radius:', err);
        }
        
        const allRestsWithDensity = ensureMinDensity(allRests, latitude, longitude, radius, userMode);
        const filtered = getFilteredRestaurants(allRestsWithDensity, radius, userMode);
        
        set({
          allRestaurants: allRestsWithDensity,
          candidates: filtered
        });
      }
    },

    toggleWalkableOnly: async () => {
      const { walkableOnly, latitude, longitude, searchRadius, userMode } = get();
      const nextWalkableOnly = !walkableOnly;
      
      set({ walkableOnly: nextWalkableOnly });
      
      if (latitude !== null && longitude !== null) {
        const activeRadius = nextWalkableOnly ? 1.0 : searchRadius;
        
        set({ candidates: [] });
        
        let allRests: Restaurant[] = [];
        try {
          allRests = await fetchRealRestaurants(latitude, longitude, activeRadius);
        } catch (err) {
          console.error('Error fetching walkable restaurants:', err);
        }
        
        const allRestsWithDensity = ensureMinDensity(allRests, latitude, longitude, activeRadius, userMode);
        const filtered = getFilteredRestaurants(allRestsWithDensity, activeRadius, userMode);
        
        set({
          allRestaurants: allRestsWithDensity,
          candidates: filtered,
          searchRadius: activeRadius
        });
      }
    },

    setUserMode: (mode) => {
      const { allRestaurants, searchRadius, latitude, longitude } = get();
      let allRestsWithDensity = allRestaurants;
      if (latitude !== null && longitude !== null) {
        allRestsWithDensity = ensureMinDensity(allRestaurants, latitude, longitude, searchRadius, mode);
      }
      const filtered = getFilteredRestaurants(allRestsWithDensity, searchRadius, mode);
      set({
        allRestaurants: allRestsWithDensity,
        userMode: mode,
        candidates: filtered
      });
    },

    startQuiz: () => {
      const { userMode } = get();
      const activeQuestions = getActiveQuestions(userMode);

      if (userMode === 'Surprise Me' || activeQuestions.length === 0) {
        const randomAnswers: Record<number, 'A' | 'B'> = {};
        for (let i = 1; i <= 10; i++) {
          randomAnswers[i] = Math.random() < 0.5 ? 'A' : 'B';
        }
        
        const finalCandidates = get().computeCandidates(randomAnswers);
        
        set({
          stage: 'transition',
          trainerAnswers: randomAnswers,
          candidates: finalCandidates,
          quizProgress: 100
        });
        return;
      }

      set({
        stage: 'quiz',
        currentQuestionIndex: 0,
        trainerAnswers: {},
        quizProgress: 0
      });
    },

    answerQuestion: () => {},

    selectTrainer: (choice) => {
      const { currentQuestionIndex, trainerAnswers, userMode } = get();
      const activeQuestions = getActiveQuestions(userMode);
      const currentQuestion = activeQuestions[currentQuestionIndex];
      if (!currentQuestion) return;

      const newAnswers = {
        ...trainerAnswers,
        [currentQuestion.id]: choice
      };
      
      const nextIndex = currentQuestionIndex + 1;
      
      if (nextIndex >= activeQuestions.length) {
        const finalCandidates = get().computeCandidates(newAnswers);

        set({
          candidates: finalCandidates,
          trainerAnswers: newAnswers,
          stage: 'transition',
          quizProgress: 100
        });
        return;
      }

      const progress = Math.min(Math.round((nextIndex / activeQuestions.length) * 100), 95);

      set({
        currentQuestionIndex: nextIndex,
        trainerAnswers: newAnswers,
        quizProgress: progress
      });
    },

    computeCandidates: (answers) => {
      const { allRestaurants, searchRadius, userMode, recommendationWeights } = get();

      let permittedCuisines: string[] = [];
      if (userMode === 'Cafe') {
        permittedCuisines = ['Coffee Shops', 'Coffee Shop', 'Bakeries', 'Bakery', 'Desserts', 'Dessert', 'Breakfast', 'Breakfast / Brunch', 'Ice Cream'];
      } else if (userMode === 'Healthy') {
        permittedCuisines = ['Vegetarian', 'Vegan', 'Mediterranean', 'Greek', 'Salad', 'Healthy Bowls', 'Vietnamese'];
      } else if (userMode === 'Indulgent') {
        permittedCuisines = [
          'BBQ', 'Texas BBQ', 'Korean BBQ', 'Brazilian Steakhouse', 'Steakhouse', 'Steakhouses',
          'Burgers', 'American Comfort Food', 'American', 'Southern Food', 'Cajun / Creole',
          'Seafood', 'Sushi', 'Poke', 'Oyster Bar', 'Ramen', 'Chinese', 'Dim Sum',
          'Japanese (General)', 'Japanese', 'Korean', 'Thai', 'Indian', 'Mexican', 'Tex-Mex',
          'Mediterranean', 'Greek', 'Middle Eastern', 'Italian', 'Pizza', 'French', 'Spanish Tapas',
          'Fine Dining', 'Fusion', 'Hot Pot', 'Wings', 'Seafood Boil', 'Tacos',
          'Caribbean', 'Peruvian', 'Turkish', 'Fast Food', 'Late Night'
        ];
      }

      const getCompositeScore = (r: Restaurant) => {
        let matches = 0;
        let answeredCount = 0;
        const activeQuestions = getActiveQuestions(userMode);
        
        activeQuestions.forEach(q => {
          const ans = answers[q.id];
          if (ans) {
            answeredCount++;
            if (checkRestaurantMatch(r, q.id, ans)) {
              matches++;
            }
          }
        });
        const cravingScore = answeredCount > 0 ? (matches / answeredCount) * 100 : 100;
        const qualityScore = r.powerRating;
        const distanceScore = Math.max(0, 100 - r.distance * 10);
        const popularityScore = Math.min((r.reviewCount / 2000) * 100, 100);

        return (
          recommendationWeights.craving * cravingScore +
          recommendationWeights.quality * qualityScore +
          recommendationWeights.distance * distanceScore +
          recommendationWeights.popularity * popularityScore
        );
      };

      const filterByPermitted = (list: Restaurant[]) => {
        if (permittedCuisines.length === 0) return list;
        return list.filter(r => 
          permittedCuisines.some(p => 
            r.attributes.cuisine.toLowerCase() === p.toLowerCase() ||
            r.attributes.cuisine.toLowerCase().includes(p.toLowerCase()) ||
            p.toLowerCase().includes(r.attributes.cuisine.toLowerCase())
          )
        );
      };

      // 1. Get all restaurants strictly within the user's selected search radius
      const inRadius = allRestaurants.filter(r => r.distance <= searchRadius);

      // 2. Filter these in-radius options by the permitted cuisines of userMode
      const matchingMode = filterByPermitted(inRadius);

      // Sort matching mode restaurants by composite score
      const sortedMatching = [...matchingMode].sort((a, b) => {
        const { walkableOnly } = get();
        if (walkableOnly) {
          // Prioritize closest (walking distance). If distance difference > 0.05 miles, sort by distance.
          if (Math.abs(a.distance - b.distance) > 0.05) {
            return a.distance - b.distance;
          }
          // Then highest rated
          if (b.rating !== a.rating) {
            return b.rating - a.rating;
          }
          return b.reviewCount - a.reviewCount;
        }

        const aScore = getCompositeScore(a);
        const bScore = getCompositeScore(b);
        if (Math.abs(aScore - bScore) > 0.01) return bScore - aScore;
        if (Math.abs(a.distance - b.distance) > 0.01) return a.distance - b.distance;
        return b.powerRating - a.powerRating;
      });

      // Take up to 12
      let finalCandidates = sortedMatching.slice(0, 12);

      // 3. Fallback level 1: If we have fewer than 12 candidates, supplement from remaining in-radius restaurants matching permitted cuisines
      if (finalCandidates.length < 12) {
        const remainingInRadius = filterByPermitted(inRadius).filter(r => !finalCandidates.some(c => c.id === r.id));
        const sortedRemaining = [...remainingInRadius].sort((a, b) => {
          const { walkableOnly } = get();
          if (walkableOnly) {
            if (Math.abs(a.distance - b.distance) > 0.05) {
              return a.distance - b.distance;
            }
            if (b.rating !== a.rating) {
              return b.rating - a.rating;
            }
            return b.reviewCount - a.reviewCount;
          }

          const aScore = getCompositeScore(a);
          const bScore = getCompositeScore(b);
          if (Math.abs(aScore - bScore) > 0.01) return bScore - aScore;
          if (Math.abs(a.distance - b.distance) > 0.01) return a.distance - b.distance;
          return b.powerRating - a.powerRating;
        });
        
        finalCandidates = [...finalCandidates, ...sortedRemaining].slice(0, 12);
      }

      return finalCandidates;
    },

    setRecommendationWeights: (weights) => {
      set(state => ({
        recommendationWeights: {
          ...state.recommendationWeights,
          ...weights
        }
      }));
    },

    finishTransition: () => {
      const { candidates } = get();
      set({ stage: 'tournament' });
      initializeTournamentBrackets(candidates, set);
    },

    selectBattleWinner: (winnerId) => {
      const { rounds, currentRoundIndex, currentMatchupIndex, defeatedPath, pokedex, pastChampions } = get();
      const round = rounds[currentRoundIndex];
      const matchup = round.matchups[currentMatchupIndex];
      
      // Determine winner/loser
      const isR1Winner = matchup.r1.id === winnerId;
      const winner = isR1Winner ? matchup.r1 : matchup.r2;
      const loser = isR1Winner ? matchup.r2 : matchup.r1;

      // Update matchup winner
      const updatedMatchups = round.matchups.map((m, idx) => 
        idx === currentMatchupIndex ? { ...m, winner } : m
      );
      
      const updatedRounds = rounds.map((r, idx) => 
        idx === currentRoundIndex ? { ...r, matchups: updatedMatchups } : r
      );

      // Track logs and defeated path (if this is champion track, we keep building it)
      // For now, if we are in Finals, the loser is Runner-Up
      const isFinals = round.name === 'Finals';
      let nextRunnerUp = get().runnerUp;
      let nextDefeatedPath = [...defeatedPath];
      
      if (isFinals) {
        nextRunnerUp = loser;
      }
      
      // We add the loser to the defeated path
      nextDefeatedPath.push(loser);

      // Check if round is complete
      const isRoundComplete = currentMatchupIndex >= round.matchups.length - 1;

      if (isRoundComplete) {
        if (isFinals) {
          // WE HAVE A CHAMPION!
          const champ = winner;
          
          // Add Pokemon to Pokedex
          const nextPokedex = Array.from(new Set([...pokedex, champ.pokemon.id]));
          
          // Add to Past Champions
          const newChampionLog = {
            restaurantId: champ.id,
            restaurantName: champ.name,
            pokemonId: champ.pokemon.id,
            pokemonName: champ.pokemon.name,
            rating: champ.rating,
            cuisine: champ.attributes.cuisine,
            date: new Date().toLocaleDateString()
          };
          const nextPastChampions = [newChampionLog, ...pastChampions];

          // Persist data
          persistPokedex(nextPokedex, nextPastChampions);

          set({
            rounds: updatedRounds,
            champion: champ,
            runnerUp: nextRunnerUp,
            defeatedPath: nextDefeatedPath,
            pokedex: nextPokedex,
            pastChampions: nextPastChampions,
            stage: 'champion'
          });
        } else {
          // Advance to next round (Preliminaries -> Quarterfinals, or Quarterfinals -> Semifinals, or Semifinals -> Finals)
          const nextRoundIndex = currentRoundIndex + 1;
          const nextRoundWinners = updatedMatchups.map(m => m.winner!);
          const nextRoundMatchups: Matchup[] = [];
          
          let nextRoundName: TournamentRound['name'] = 'Quarterfinals';

          if (round.name === 'Preliminaries') {
            // Pair the 4 winners of Preliminaries with the 4 byeCandidates
            const byes = get().byeCandidates;
            // byes[0] vs nextRoundWinners[3] (Seed 1 vs lowest seed winner)
            // byes[1] vs nextRoundWinners[2] (Seed 2 vs next lowest seed winner)
            // byes[2] vs nextRoundWinners[1]
            // byes[3] vs nextRoundWinners[0]
            for (let i = 0; i < 4; i++) {
              nextRoundMatchups.push({
                id: `round_${nextRoundIndex}_match_${i}`,
                r1: byes[i],
                r2: nextRoundWinners[3 - i]
              });
            }
            nextRoundName = 'Quarterfinals';
          } else {
            // Standard division by 2
            for (let i = 0; i < nextRoundWinners.length; i += 2) {
              nextRoundMatchups.push({
                id: `round_${nextRoundIndex}_match_${i/2}`,
                r1: nextRoundWinners[i],
                r2: nextRoundWinners[i+1]
              });
            }
            if (nextRoundMatchups.length === 4) {
              nextRoundName = 'Quarterfinals';
            } else if (nextRoundMatchups.length === 2) {
              nextRoundName = 'Semifinals';
            } else {
              nextRoundName = 'Finals';
            }
          }

          const newRound: TournamentRound = {
            name: nextRoundName,
            matchups: nextRoundMatchups
          };

          set({
            rounds: [...updatedRounds, newRound],
            currentRoundIndex: nextRoundIndex,
            currentMatchupIndex: 0,
            defeatedPath: nextDefeatedPath
          });
        }
      } else {
        // Go to next matchup in same round
        set({
          rounds: updatedRounds,
          currentMatchupIndex: currentMatchupIndex + 1,
          defeatedPath: nextDefeatedPath
        });
      }
    },

    resetGame: () => {
      set({
        stage: 'location',
        candidates: [],
        currentQuestion: null,
        answeredQuestions: [],
        quizProgress: 0,
        currentQuestionIndex: 0,
        trainerAnswers: {},
        rounds: [],
        currentRoundIndex: 0,
        currentMatchupIndex: 0,
        byeCandidates: [],
        defeatedPath: [],
        runnerUp: null,
        champion: null,
        battleLog: []
      });
      
      // Refilter candidates based on active coords and searchRadius
      const { latitude, longitude, searchRadius, userAddress } = get();
      if (latitude !== null && longitude !== null) {
        get().initLocation(latitude, longitude, userAddress || undefined);
        get().setRadius(searchRadius);
      }
    },

    goToPokedex: () => {
      set({ stage: 'pokedex' });
    },

    exitPokedex: () => {
      // Return to whichever stage is appropriate, usually location
      set({ stage: 'location' });
    },

    setMapCenterOverride: (coords) => {
      set({ mapCenterOverride: coords });
    }
  };
});

// Helper function to build initial tournament matchups from candidates list
function initializeTournamentBrackets(candidates: Restaurant[], set: any) {
  let list = [...candidates];
  
  // If we have 12 candidates, create a 12-team bracket with 4 byes and 4 Preliminaries matches
  if (list.length >= 12) {
    list = list.slice(0, 12);
    const byeCandidates = list.slice(0, 4); // Seeds 1, 2, 3, 4 get byes
    const prelims = list.slice(4, 12); // Seeds 5 to 12 play in Preliminaries
    
    // Preliminaries matchups (4 matchups):
    // Match 0: Seed 5 vs Seed 12 (prelims[0] vs prelims[7])
    // Match 1: Seed 6 vs Seed 11 (prelims[1] vs prelims[6])
    // Match 2: Seed 7 vs Seed 10 (prelims[2] vs prelims[5])
    // Match 3: Seed 8 vs Seed 9  (prelims[3] vs prelims[4])
    const matchups: Matchup[] = [
      { id: 'round_0_match_0', r1: prelims[0], r2: prelims[7] },
      { id: 'round_0_match_1', r1: prelims[1], r2: prelims[6] },
      { id: 'round_0_match_2', r1: prelims[2], r2: prelims[5] },
      { id: 'round_0_match_3', r1: prelims[3], r2: prelims[4] }
    ];

    set({
      rounds: [{ name: 'Preliminaries', matchups }],
      currentRoundIndex: 0,
      currentMatchupIndex: 0,
      byeCandidates,
      defeatedPath: [],
      runnerUp: null,
      champion: null
    });
    return;
  }

  // Fallback old logic (for 8, 4, 2 candidates)
  let roundName: TournamentRound['name'] = 'Quarterfinals';
  if (list.length >= 8) {
    list = list.slice(0, 8);
    roundName = 'Quarterfinals';
  } else if (list.length >= 4) {
    list = list.slice(0, 4);
    roundName = 'Semifinals';
  } else {
    list = list.slice(0, 2);
    roundName = 'Finals';
  }

  const matchups: Matchup[] = [];
  for (let i = 0; i < list.length; i += 2) {
    matchups.push({
      id: `round_0_match_${i/2}`,
      r1: list[i],
      r2: list[i+1]
    });
  }

  const initialRound: TournamentRound = {
    name: roundName,
    matchups
  };

  set({
    rounds: [initialRound],
    currentRoundIndex: 0,
    currentMatchupIndex: 0,
    defeatedPath: [],
    runnerUp: null,
    champion: null
  });
}
