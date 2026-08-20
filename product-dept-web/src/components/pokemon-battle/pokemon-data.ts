export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Mythic';
  sprite: string;
  artwork: string;
  baseStats: PokemonStats;
  evolutionLine: string[];
}

// Cuisine to primary Pokemon Type mapping
export const CUISINE_TYPE_MAP: Record<string, string> = {
  'Sushi': 'Water',
  'Poke': 'Water',
  'Seafood': 'Water',
  'Japanese': 'Steel',
  'Mexican': 'Fire',
  'BBQ': 'Fire',
  'Indian': 'Psychic',
  'Thai': 'Electric',
  'Vegetarian': 'Grass',
  'Vegan': 'Grass',
  'Mediterranean': 'Grass',
  'Healthy Bowls': 'Grass',
  'Desserts': 'Fairy',
  'Bakeries': 'Fairy',
  'Coffee Shops': 'Electric',
  'Breakfast': 'Electric',
  'American': 'Normal',
  'Italian': 'Normal',
  'Korean': 'Fighting',
  'Steakhouses': 'Fighting',
  'Chinese': 'Dragon',
  'French': 'Psychic',
  'Fine Dining': 'Psychic',
  'Fusion': 'Psychic',
  'Fast Food': 'Dark',
  'Late Night': 'Dark',
};

// Curated catalog of Pokemon by type to guarantee excellent variety and deterministic progression ladders
// Tiers match restaurant power rating (0-100)
export const POKEMON_BY_TYPE: Record<string, { id: number; name: string; types: string[]; rarity: Pokemon['rarity']; stats: PokemonStats; evolution: string[] }[]> = {
  Water: [
    { id: 129, name: 'Magikarp', types: ['Water'], rarity: 'Common', stats: { hp: 20, attack: 10, defense: 55, speed: 80 }, evolution: ['Magikarp', 'Gyarados'] },
    { id: 118, name: 'Goldeen', types: ['Water'], rarity: 'Common', stats: { hp: 45, attack: 67, defense: 60, speed: 63 }, evolution: ['Goldeen', 'Seaking'] },
    { id: 116, name: 'Horsea', types: ['Water'], rarity: 'Common', stats: { hp: 30, attack: 40, defense: 70, speed: 60 }, evolution: ['Horsea', 'Seadra', 'Kingdra'] },
    { id: 60, name: 'Poliwag', types: ['Water'], rarity: 'Common', stats: { hp: 40, attack: 50, defense: 40, speed: 90 }, evolution: ['Poliwag', 'Poliwhirl', 'Poliwrath'] },
    { id: 120, name: 'Staryu', types: ['Water'], rarity: 'Common', stats: { hp: 30, attack: 45, defense: 55, speed: 85 }, evolution: ['Staryu', 'Starmie'] },
    { id: 7, name: 'Squirtle', types: ['Water'], rarity: 'Common', stats: { hp: 44, attack: 48, defense: 65, speed: 43 }, evolution: ['Squirtle', 'Wartortle', 'Blastoise'] },
    { id: 54, name: 'Psyduck', types: ['Water'], rarity: 'Common', stats: { hp: 50, attack: 52, defense: 48, speed: 55 }, evolution: ['Psyduck', 'Golduck'] },
    { id: 79, name: 'Slowpoke', types: ['Water', 'Psychic'], rarity: 'Common', stats: { hp: 90, attack: 65, defense: 65, speed: 15 }, evolution: ['Slowpoke', 'Slowbro'] },
    { id: 98, name: 'Krabby', types: ['Water'], rarity: 'Common', stats: { hp: 30, attack: 105, defense: 90, speed: 50 }, evolution: ['Krabby', 'Kingler'] },
    { id: 8, name: 'Wartortle', types: ['Water'], rarity: 'Rare', stats: { hp: 59, attack: 63, defense: 80, speed: 58 }, evolution: ['Squirtle', 'Wartortle', 'Blastoise'] },
    { id: 134, name: 'Vaporeon', types: ['Water'], rarity: 'Rare', stats: { hp: 130, attack: 65, defense: 60, speed: 65 }, evolution: ['Eevee', 'Vaporeon'] },
    { id: 130, name: 'Gyarados', types: ['Water', 'Flying'], rarity: 'Rare', stats: { hp: 95, attack: 125, defense: 79, speed: 81 }, evolution: ['Magikarp', 'Gyarados'] },
    { id: 350, name: 'Milotic', types: ['Water'], rarity: 'Rare', stats: { hp: 95, attack: 60, defense: 79, speed: 81 }, evolution: ['Feebas', 'Milotic'] },
    { id: 226, name: 'Mantine', types: ['Water', 'Flying'], rarity: 'Rare', stats: { hp: 85, attack: 40, defense: 70, speed: 70 }, evolution: ['Mantine'] },
    { id: 131, name: 'Lapras', types: ['Water', 'Ice'], rarity: 'Legendary', stats: { hp: 130, attack: 85, defense: 80, speed: 60 }, evolution: ['Lapras'] },
    { id: 245, name: 'Suicune', types: ['Water'], rarity: 'Legendary', stats: { hp: 100, attack: 75, defense: 115, speed: 85 }, evolution: ['Suicune'] },
    { id: 382, name: 'Kyogre', types: ['Water'], rarity: 'Mythic', stats: { hp: 100, attack: 100, defense: 90, speed: 90 }, evolution: ['Kyogre'] },
  ],
  Fire: [
    { id: 4, name: 'Charmander', types: ['Fire'], rarity: 'Common', stats: { hp: 39, attack: 52, defense: 43, speed: 65 }, evolution: ['Charmander', 'Charmeleon', 'Charizard'] },
    { id: 58, name: 'Growlithe', types: ['Fire'], rarity: 'Common', stats: { hp: 55, attack: 70, defense: 45, speed: 60 }, evolution: ['Growlithe', 'Arcanine'] },
    { id: 77, name: 'Ponyta', types: ['Fire'], rarity: 'Common', stats: { hp: 50, attack: 85, defense: 55, speed: 90 }, evolution: ['Ponyta', 'Rapidash'] },
    { id: 218, name: 'Slugma', types: ['Fire'], rarity: 'Common', stats: { hp: 40, attack: 40, defense: 40, speed: 20 }, evolution: ['Slugma', 'Magcargo'] },
    { id: 255, name: 'Torchic', types: ['Fire'], rarity: 'Common', stats: { hp: 45, attack: 60, defense: 40, speed: 45 }, evolution: ['Torchic', 'Combusken', 'Blaziken'] },
    { id: 37, name: 'Vulpix', types: ['Fire'], rarity: 'Common', stats: { hp: 38, attack: 41, defense: 40, speed: 65 }, evolution: ['Vulpix', 'Ninetales'] },
    { id: 5, name: 'Charmeleon', types: ['Fire'], rarity: 'Rare', stats: { hp: 58, attack: 64, defense: 58, speed: 80 }, evolution: ['Charmander', 'Charmeleon', 'Charizard'] },
    { id: 136, name: 'Flareon', types: ['Fire'], rarity: 'Rare', stats: { hp: 65, attack: 130, defense: 60, speed: 65 }, evolution: ['Eevee', 'Flareon'] },
    { id: 59, name: 'Arcanine', types: ['Fire'], rarity: 'Rare', stats: { hp: 90, attack: 110, defense: 80, speed: 95 }, evolution: ['Growlithe', 'Arcanine'] },
    { id: 6, name: 'Charizard', types: ['Fire', 'Flying'], rarity: 'Rare', stats: { hp: 78, attack: 84, defense: 78, speed: 100 }, evolution: ['Charmander', 'Charmeleon', 'Charizard'] },
    { id: 38, name: 'Ninetales', types: ['Fire'], rarity: 'Rare', stats: { hp: 73, attack: 76, defense: 75, speed: 100 }, evolution: ['Vulpix', 'Ninetales'] },
    { id: 126, name: 'Magmar', types: ['Fire'], rarity: 'Rare', stats: { hp: 65, attack: 95, defense: 57, speed: 93 }, evolution: ['Magby', 'Magmar', 'Magmortar'] },
    { id: 257, name: 'Blaziken', types: ['Fire', 'Fighting'], rarity: 'Rare', stats: { hp: 80, attack: 120, defense: 70, speed: 80 }, evolution: ['Torchic', 'Combusken', 'Blaziken'] },
    { id: 146, name: 'Moltres', types: ['Fire', 'Flying'], rarity: 'Legendary', stats: { hp: 90, attack: 100, defense: 90, speed: 90 }, evolution: ['Moltres'] },
    { id: 244, name: 'Entei', types: ['Fire'], rarity: 'Legendary', stats: { hp: 115, attack: 115, defense: 85, speed: 100 }, evolution: ['Entei'] },
    { id: 250, name: 'Ho-Oh', types: ['Fire', 'Flying'], rarity: 'Mythic', stats: { hp: 106, attack: 130, defense: 90, speed: 90 }, evolution: ['Ho-Oh'] },
  ],
  Grass: [
    { id: 1, name: 'Bulbasaur', types: ['Grass', 'Poison'], rarity: 'Common', stats: { hp: 45, attack: 49, defense: 49, speed: 45 }, evolution: ['Bulbasaur', 'Ivysaur', 'Venusaur'] },
    { id: 43, name: 'Oddish', types: ['Grass', 'Poison'], rarity: 'Common', stats: { hp: 45, attack: 50, defense: 55, speed: 30 }, evolution: ['Oddish', 'Gloom', 'Vileplume'] },
    { id: 69, name: 'Bellsprout', types: ['Grass', 'Poison'], rarity: 'Common', stats: { hp: 50, attack: 75, defense: 35, speed: 40 }, evolution: ['Bellsprout', 'Weepinbell', 'Victreebel'] },
    { id: 152, name: 'Chikorita', types: ['Grass'], rarity: 'Common', stats: { hp: 45, attack: 49, defense: 65, speed: 45 }, evolution: ['Chikorita', 'Bayleef', 'Meganium'] },
    { id: 252, name: 'Treecko', types: ['Grass'], rarity: 'Common', stats: { hp: 40, attack: 45, defense: 35, speed: 70 }, evolution: ['Treecko', 'Grovyle', 'Sceptile'] },
    { id: 102, name: 'Exeggcute', types: ['Grass', 'Psychic'], rarity: 'Common', stats: { hp: 60, attack: 40, defense: 80, speed: 40 }, evolution: ['Exeggcute', 'Exeggutor'] },
    { id: 114, name: 'Tangela', types: ['Grass'], rarity: 'Common', stats: { hp: 65, attack: 55, defense: 115, speed: 60 }, evolution: ['Tangela', 'Tangrowth'] },
    { id: 387, name: 'Turtwig', types: ['Grass'], rarity: 'Common', stats: { hp: 55, attack: 68, defense: 64, speed: 31 }, evolution: ['Turtwig', 'Grotle', 'Torterra'] },
    { id: 2, name: 'Ivysaur', types: ['Grass', 'Poison'], rarity: 'Rare', stats: { hp: 60, attack: 62, defense: 63, speed: 60 }, evolution: ['Bulbasaur', 'Ivysaur', 'Venusaur'] },
    { id: 182, name: 'Bellossom', types: ['Grass'], rarity: 'Rare', stats: { hp: 75, attack: 80, defense: 95, speed: 50 }, evolution: ['Oddish', 'Gloom', 'Bellossom'] },
    { id: 254, name: 'Sceptile', types: ['Grass'], rarity: 'Rare', stats: { hp: 70, attack: 85, defense: 65, speed: 120 }, evolution: ['Treecko', 'Grovyle', 'Sceptile'] },
    { id: 3  , name: 'Venusaur', types: ['Grass', 'Poison'], rarity: 'Rare', stats: { hp: 80, attack: 82, defense: 83, speed: 80 }, evolution: ['Bulbasaur', 'Ivysaur', 'Venusaur'] },
    { id: 154, name: 'Meganium', types: ['Grass'], rarity: 'Rare', stats: { hp: 80, attack: 82, defense: 100, speed: 80 }, evolution: ['Chikorita', 'Bayleef', 'Meganium'] },
    { id: 251, name: 'Celebi', types: ['Grass', 'Psychic'], rarity: 'Legendary', stats: { hp: 100, attack: 100, defense: 100, speed: 100 }, evolution: ['Celebi'] },
    { id: 492, name: 'Shamin', types: ['Grass'], rarity: 'Legendary', stats: { hp: 100, attack: 100, defense: 100, speed: 100 }, evolution: ['Shamin'] },
    { id: 640, name: 'Virizion', types: ['Grass', 'Fighting'], rarity: 'Mythic', stats: { hp: 91, attack: 90, defense: 72, speed: 108 }, evolution: ['Virizion'] },
  ],
  Fairy: [
    { id: 35, name: 'Clefairy', types: ['Fairy'], rarity: 'Common', stats: { hp: 70, attack: 45, defense: 48, speed: 35 }, evolution: ['Cleffa', 'Clefairy', 'Clefable'] },
    { id: 175, name: 'Togepi', types: ['Fairy'], rarity: 'Common', stats: { hp: 35, attack: 20, defense: 65, speed: 20 }, evolution: ['Togepi', 'Togetic', 'Togekiss'] },
    { id: 280, name: 'Ralts', types: ['Psychic', 'Fairy'], rarity: 'Common', stats: { hp: 28, attack: 25, defense: 25, speed: 40 }, evolution: ['Ralts', 'Kirlia', 'Gardevoir'] },
    { id: 300, name: 'Skitty', types: ['Normal'], rarity: 'Common', stats: { hp: 50, attack: 45, defense: 45, speed: 50 }, evolution: ['Skitty', 'Delcatty'] },
    { id: 39, name: 'Jigglypuff', types: ['Normal', 'Fairy'], rarity: 'Common', stats: { hp: 115, attack: 45, defense: 20, speed: 20 }, evolution: ['Igglybuff', 'Jigglypuff', 'Wigglytuff'] },
    { id: 183, name: 'Marill', types: ['Water', 'Fairy'], rarity: 'Common', stats: { hp: 70, attack: 20, defense: 50, speed: 40 }, evolution: ['Azurill', 'Marill', 'Azumarill'] },
    { id: 36, name: 'Clefable', types: ['Fairy'], rarity: 'Rare', stats: { hp: 95, attack: 70, defense: 73, speed: 60 }, evolution: ['Cleffa', 'Clefairy', 'Clefable'] },
    { id: 176, name: 'Togetic', types: ['Fairy', 'Flying'], rarity: 'Rare', stats: { hp: 55, attack: 40, defense: 85, speed: 40 }, evolution: ['Togepi', 'Togetic', 'Togekiss'] },
    { id: 282, name: 'Gardevoir', types: ['Psychic', 'Fairy'], rarity: 'Rare', stats: { hp: 68, attack: 65, defense: 65, speed: 80 }, evolution: ['Ralts', 'Kirlia', 'Gardevoir'] },
    { id: 468, name: 'Togekiss', types: ['Fairy', 'Flying'], rarity: 'Rare', stats: { hp: 85, attack: 50, defense: 95, speed: 80 }, evolution: ['Togepi', 'Togetic', 'Togekiss'] },
    { id: 40, name: 'Wigglytuff', types: ['Normal', 'Fairy'], rarity: 'Rare', stats: { hp: 140, attack: 70, defense: 45, speed: 45 }, evolution: ['Igglybuff', 'Jigglypuff', 'Wigglytuff'] },
    { id: 184, name: 'Azumarill', types: ['Water', 'Fairy'], rarity: 'Rare', stats: { hp: 100, attack: 50, defense: 80, speed: 50 }, evolution: ['Azurill', 'Marill', 'Azumarill'] },
    { id: 716, name: 'Xerneas', types: ['Fairy'], rarity: 'Legendary', stats: { hp: 126, attack: 131, defense: 95, speed: 99 }, evolution: ['Xerneas'] },
    { id: 888, name: 'Zacian', types: ['Fairy'], rarity: 'Mythic', stats: { hp: 92, attack: 130, defense: 115, speed: 138 }, evolution: ['Zacian'] },
  ],
  Electric: [
    { id: 25, name: 'Pikachu', types: ['Electric'], rarity: 'Common', stats: { hp: 35, attack: 55, defense: 40, speed: 90 }, evolution: ['Pichu', 'Pikachu', 'Raichu'] },
    { id: 170, name: 'Chinchou', types: ['Water', 'Electric'], rarity: 'Common', stats: { hp: 75, attack: 38, defense: 38, speed: 67 }, evolution: ['Chinchou', 'Lanturn'] },
    { id: 100, name: 'Voltorb', types: ['Electric'], rarity: 'Common', stats: { hp: 40, attack: 30, defense: 50, speed: 100 }, evolution: ['Voltorb', 'Electrode'] },
    { id: 81, name: 'Magnemite', types: ['Electric', 'Steel'], rarity: 'Common', stats: { hp: 25, attack: 35, defense: 70, speed: 45 }, evolution: ['Magnemite', 'Magneton', 'Magnezone'] },
    { id: 179, name: 'Mareep', types: ['Electric'], rarity: 'Common', stats: { hp: 55, attack: 40, defense: 40, speed: 35 }, evolution: ['Mareep', 'Flaaffy', 'Ampharos'] },
    { id: 26, name: 'Raichu', types: ['Electric'], rarity: 'Rare', stats: { hp: 60, attack: 90, defense: 55, speed: 110 }, evolution: ['Pichu', 'Pikachu', 'Raichu'] },
    { id: 125, name: 'Electabuzz', types: ['Electric'], rarity: 'Rare', stats: { hp: 65, attack: 83, defense: 57, speed: 105 }, evolution: ['Elekid', 'Electabuzz', 'Electivire'] },
    { id: 135, name: 'Jolteon', types: ['Electric'], rarity: 'Rare', stats: { hp: 65, attack: 65, defense: 60, speed: 130 }, evolution: ['Eevee', 'Jolteon'] },
    { id: 466, name: 'Electivire', types: ['Electric'], rarity: 'Rare', stats: { hp: 75, attack: 123, defense: 67, speed: 95 }, evolution: ['Elekid', 'Electabuzz', 'Electivire'] },
    { id: 82, name: 'Magneton', types: ['Electric', 'Steel'], rarity: 'Rare', stats: { hp: 50, attack: 60, defense: 95, speed: 70 }, evolution: ['Magnemite', 'Magneton', 'Magnezone'] },
    { id: 181, name: 'Ampharos', types: ['Electric'], rarity: 'Rare', stats: { hp: 90, attack: 75, defense: 85, speed: 55 }, evolution: ['Mareep', 'Flaaffy', 'Ampharos'] },
    { id: 145, name: 'Zapdos', types: ['Electric', 'Flying'], rarity: 'Legendary', stats: { hp: 90, attack: 90, defense: 85, speed: 100 }, evolution: ['Zapdos'] },
    { id: 243, name: 'Raikou', types: ['Electric'], rarity: 'Legendary', stats: { hp: 90, attack: 85, defense: 75, speed: 115 }, evolution: ['Raikou'] },
    { id: 485, name: 'Heatran', types: ['Fire', 'Steel'], rarity: 'Legendary', stats: { hp: 91, attack: 90, defense: 106, speed: 77 }, evolution: ['Heatran'] },
    { id: 643, name: 'Reshiram', types: ['Dragon', 'Fire'], rarity: 'Mythic', stats: { hp: 100, attack: 120, defense: 100, speed: 90 }, evolution: ['Reshiram'] },
  ],
  Normal: [
    { id: 133, name: 'Eevee', types: ['Normal'], rarity: 'Common', stats: { hp: 55, attack: 55, defense: 50, speed: 55 }, evolution: ['Eevee'] },
    { id: 161, name: 'Sentret', types: ['Normal'], rarity: 'Common', stats: { hp: 35, attack: 46, defense: 34, speed: 20 }, evolution: ['Sentret', 'Furret'] },
    { id: 19, name: 'Rattata', types: ['Normal'], rarity: 'Common', stats: { hp: 30, attack: 56, defense: 35, speed: 72 }, evolution: ['Rattata', 'Raticate'] },
    { id: 52, name: 'Meowth', types: ['Normal'], rarity: 'Common', stats: { hp: 40, attack: 45, defense: 35, speed: 90 }, evolution: ['Meowth', 'Persian'] },
    { id: 16, name: 'Pidgey', types: ['Normal', 'Flying'], rarity: 'Common', stats: { hp: 40, attack: 45, defense: 40, speed: 56 }, evolution: ['Pidgey', 'Pidgeotto', 'Pidgeot'] },
    { id: 17, name: 'Pidgeotto', types: ['Normal', 'Flying'], rarity: 'Common', stats: { hp: 63, attack: 60, defense: 55, speed: 71 }, evolution: ['Pidgey', 'Pidgeotto', 'Pidgeot'] },
    { id: 137, name: 'Porygon', types: ['Normal'], rarity: 'Common', stats: { hp: 65, attack: 60, defense: 70, speed: 40 }, evolution: ['Porygon', 'Porygon2', 'Porygon-Z'] },
    { id: 108, name: 'Lickitung', types: ['Normal'], rarity: 'Rare', stats: { hp: 90, attack: 55, defense: 75, speed: 30 }, evolution: ['Lickitung', 'Lickilicky'] },
    { id: 143, name: 'Snorlax', types: ['Normal'], rarity: 'Rare', stats: { hp: 160, attack: 110, defense: 65, speed: 30 }, evolution: ['Munchlax', 'Snorlax'] },
    { id: 128, name: 'Tauros', types: ['Normal'], rarity: 'Rare', stats: { hp: 75, attack: 100, defense: 95, speed: 110 }, evolution: ['Tauros'] },
    { id: 242, name: 'Blissey', types: ['Normal'], rarity: 'Rare', stats: { hp: 255, attack: 10, defense: 10, speed: 55 }, evolution: ['Happiny', 'Chansey', 'Blissey'] },
    { id: 18, name: 'Pidgeot', types: ['Normal', 'Flying'], rarity: 'Rare', stats: { hp: 83, attack: 80, defense: 75, speed: 101 }, evolution: ['Pidgey', 'Pidgeotto', 'Pidgeot'] },
    { id: 486, name: 'Regigigas', types: ['Normal'], rarity: 'Legendary', stats: { hp: 110, attack: 160, defense: 110, speed: 100 }, evolution: ['Regigigas'] },
    { id: 493, name: 'Arceus', types: ['Normal'], rarity: 'Mythic', stats: { hp: 120, attack: 120, defense: 120, speed: 120 }, evolution: ['Arceus'] },
  ],
  Fighting: [
    { id: 66, name: 'Machop', types: ['Fighting'], rarity: 'Common', stats: { hp: 70, attack: 80, defense: 50, speed: 35 }, evolution: ['Machop', 'Machoke', 'Machamp'] },
    { id: 236, name: 'Tyrogue', types: ['Fighting'], rarity: 'Common', stats: { hp: 35, attack: 35, defense: 35, speed: 35 }, evolution: ['Tyrogue', 'Hitmonlee', 'Hitmonchan', 'Hitmontop'] },
    { id: 56, name: 'Mankey', types: ['Fighting'], rarity: 'Common', stats: { hp: 40, attack: 80, defense: 35, speed: 70 }, evolution: ['Mankey', 'Primeape'] },
    { id: 296, name: 'Makuhita', types: ['Fighting'], rarity: 'Common', stats: { hp: 72, attack: 60, defense: 30, speed: 25 }, evolution: ['Makuhita', 'Hariyama'] },
    { id: 447, name: 'Riolu', types: ['Fighting'], rarity: 'Common', stats: { hp: 40, attack: 70, defense: 40, speed: 60 }, evolution: ['Riolu', 'Lucario'] },
    { id: 67, name: 'Machoke', types: ['Fighting'], rarity: 'Rare', stats: { hp: 80, attack: 100, defense: 70, speed: 45 }, evolution: ['Machop', 'Machoke', 'Machamp'] },
    { id: 106, name: 'Hitmonlee', types: ['Fighting'], rarity: 'Rare', stats: { hp: 50, attack: 120, defense: 53, speed: 87 }, evolution: ['Tyrogue', 'Hitmonlee'] },
    { id: 107, name: 'Hitmonchan', types: ['Fighting'], rarity: 'Rare', stats: { hp: 50, attack: 105, defense: 79, speed: 76 }, evolution: ['Tyrogue', 'Hitmonchan'] },
    { id: 68, name: 'Machamp', types: ['Fighting'], rarity: 'Rare', stats: { hp: 90, attack: 130, defense: 80, speed: 55 }, evolution: ['Machop', 'Machoke', 'Machamp'] },
    { id: 448, name: 'Lucario', types: ['Fighting', 'Steel'], rarity: 'Rare', stats: { hp: 70, attack: 110, defense: 70, speed: 90 }, evolution: ['Riolu', 'Lucario'] },
    { id: 57, name: 'Primeape', types: ['Fighting'], rarity: 'Rare', stats: { hp: 65, attack: 105, defense: 60, speed: 95 }, evolution: ['Mankey', 'Primeape'] },
    { id: 297, name: 'Hariyama', types: ['Fighting'], rarity: 'Rare', stats: { hp: 144, attack: 120, defense: 60, speed: 50 }, evolution: ['Makuhita', 'Hariyama'] },
    { id: 639, name: 'Terrakion', types: ['Rock', 'Fighting'], rarity: 'Legendary', stats: { hp: 91, attack: 129, defense: 90, speed: 108 }, evolution: ['Terrakion'] },
    { id: 802, name: 'Marshadow', types: ['Fighting', 'Ghost'], rarity: 'Mythic', stats: { hp: 90, attack: 125, defense: 80, speed: 125 }, evolution: ['Marshadow'] },
  ],
  Dragon: [
    { id: 147, name: 'Dratini', types: ['Dragon'], rarity: 'Common', stats: { hp: 41, attack: 64, defense: 45, speed: 50 }, evolution: ['Dratini', 'Dragonair', 'Dragonite'] },
    { id: 328, name: 'Trapinch', types: ['Ground'], rarity: 'Common', stats: { hp: 45, attack: 100, defense: 45, speed: 10 }, evolution: ['Trapinch', 'Vibrava', 'Flygon'] },
    { id: 371, name: 'Bagon', types: ['Dragon'], rarity: 'Common', stats: { hp: 45, attack: 75, defense: 60, speed: 50 }, evolution: ['Bagon', 'Shelgon', 'Salamence'] },
    { id: 443, name: 'Gible', types: ['Dragon', 'Ground'], rarity: 'Common', stats: { hp: 58, attack: 70, defense: 45, speed: 42 }, evolution: ['Gible', 'Gabite', 'Garchomp'] },
    { id: 148, name: 'Dragonair', types: ['Dragon'], rarity: 'Rare', stats: { hp: 61, attack: 84, defense: 65, speed: 70 }, evolution: ['Dratini', 'Dragonair', 'Dragonite'] },
    { id: 330, name: 'Flygon', types: ['Ground', 'Dragon'], rarity: 'Rare', stats: { hp: 80, attack: 100, defense: 80, speed: 100 }, evolution: ['Trapinch', 'Vibrava', 'Flygon'] },
    { id: 149, name: 'Dragonite', types: ['Dragon', 'Flying'], rarity: 'Rare', stats: { hp: 91, attack: 134, defense: 95, speed: 80 }, evolution: ['Dratini', 'Dragonair', 'Dragonite'] },
    { id: 373, name: 'Salamence', types: ['Dragon', 'Flying'], rarity: 'Rare', stats: { hp: 95, attack: 135, defense: 80, speed: 100 }, evolution: ['Bagon', 'Shelgon', 'Salamence'] },
    { id: 372, name: 'Shelgon', types: ['Dragon'], rarity: 'Rare', stats: { hp: 65, attack: 95, defense: 100, speed: 50 }, evolution: ['Bagon', 'Shelgon', 'Salamence'] },
    { id: 444, name: 'Gabite', types: ['Dragon', 'Ground'], rarity: 'Rare', stats: { hp: 68, attack: 90, defense: 65, speed: 82 }, evolution: ['Gible', 'Gabite', 'Garchomp'] },
    { id: 445, name: 'Garchomp', types: ['Dragon', 'Ground'], rarity: 'Rare', stats: { hp: 108, attack: 130, defense: 95, speed: 102 }, evolution: ['Gible', 'Gabite', 'Garchomp'] },
    { id: 384, name: 'Rayquaza', types: ['Dragon', 'Flying'], rarity: 'Legendary', stats: { hp: 105, attack: 150, defense: 90, speed: 95 }, evolution: ['Rayquaza'] },
    { id: 644, name: 'Zekrom', types: ['Dragon', 'Electric'], rarity: 'Legendary', stats: { hp: 100, attack: 150, defense: 120, speed: 90 }, evolution: ['Zekrom'] },
    { id: 487, name: 'Giratina', types: ['Ghost', 'Dragon'], rarity: 'Mythic', stats: { hp: 150, attack: 100, defense: 120, speed: 90 }, evolution: ['Giratina'] },
  ],
  Psychic: [
    { id: 63, name: 'Abra', types: ['Psychic'], rarity: 'Common', stats: { hp: 25, attack: 20, defense: 15, speed: 90 }, evolution: ['Abra', 'Kadabra', 'Alakazam'] },
    { id: 96, name: 'Drowzee', types: ['Psychic'], rarity: 'Common', stats: { hp: 60, attack: 48, defense: 45, speed: 42 }, evolution: ['Drowzee', 'Hypno'] },
    { id: 177, name: 'Natu', types: ['Psychic', 'Flying'], rarity: 'Common', stats: { hp: 40, attack: 50, defense: 45, speed: 70 }, evolution: ['Natu', 'Xatu'] },
    { id: 374, name: 'Beldum', types: ['Steel', 'Psychic'], rarity: 'Common', stats: { hp: 40, attack: 55, defense: 80, speed: 30 }, evolution: ['Beldum', 'Metang', 'Metagross'] },
    { id: 64, name: 'Kadabra', types: ['Psychic'], rarity: 'Rare', stats: { hp: 40, attack: 35, defense: 30, speed: 105 }, evolution: ['Abra', 'Kadabra', 'Alakazam'] },
    { id: 65, name: 'Alakazam', types: ['Psychic'], rarity: 'Rare', stats: { hp: 55, attack: 50, defense: 45, speed: 120 }, evolution: ['Abra', 'Kadabra', 'Alakazam'] },
    { id: 196, name: 'Espeon', types: ['Psychic'], rarity: 'Rare', stats: { hp: 65, attack: 65, defense: 60, speed: 110 }, evolution: ['Eevee', 'Espeon'] },
    { id: 376, name: 'Metagross', types: ['Steel', 'Psychic'], rarity: 'Rare', stats: { hp: 80, attack: 135, defense: 130, speed: 70 }, evolution: ['Beldum', 'Metang', 'Metagross'] },
    { id: 80, name: 'Slowbro', types: ['Water', 'Psychic'], rarity: 'Rare', stats: { hp: 95, attack: 75, defense: 110, speed: 30 }, evolution: ['Slowpoke', 'Slowbro'] },
    { id: 178, name: 'Xatu', types: ['Psychic', 'Flying'], rarity: 'Rare', stats: { hp: 65, attack: 75, defense: 70, speed: 95 }, evolution: ['Natu', 'Xatu'] },
    { id: 281, name: 'Kirlia', types: ['Psychic', 'Fairy'], rarity: 'Rare', stats: { hp: 38, attack: 35, defense: 35, speed: 50 }, evolution: ['Ralts', 'Kirlia', 'Gardevoir'] },
    { id: 150, name: 'Mewtwo', types: ['Psychic'], rarity: 'Legendary', stats: { hp: 106, attack: 110, defense: 90, speed: 130 }, evolution: ['Mewtwo'] },
    { id: 151, name: 'Mew', types: ['Psychic'], rarity: 'Legendary', stats: { hp: 100, attack: 100, defense: 100, speed: 100 }, evolution: ['Mew'] },
    { id: 386, name: 'Deoxys', types: ['Psychic'], rarity: 'Mythic', stats: { hp: 50, attack: 150, defense: 50, speed: 150 }, evolution: ['Deoxys'] },
  ],
  Dark: [
    { id: 228, name: 'Houndour', types: ['Dark', 'Fire'], rarity: 'Common', stats: { hp: 45, attack: 60, defense: 30, speed: 65 }, evolution: ['Houndour', 'Houndoom'] },
    { id: 215, name: 'Sneasel', types: ['Dark', 'Ice'], rarity: 'Common', stats: { hp: 55, attack: 95, defense: 55, speed: 115 }, evolution: ['Sneasel', 'Weavile'] },
    { id: 302, name: 'Sableye', types: ['Dark', 'Ghost'], rarity: 'Common', stats: { hp: 50, attack: 75, defense: 75, speed: 50 }, evolution: ['Sableye'] },
    { id: 198, name: 'Murkrow', types: ['Dark', 'Flying'], rarity: 'Common', stats: { hp: 60, attack: 85, defense: 42, speed: 91 }, evolution: ['Murkrow', 'Honchkrow'] },
    { id: 261, name: 'Poochyena', types: ['Dark'], rarity: 'Common', stats: { hp: 35, attack: 55, defense: 35, speed: 35 }, evolution: ['Poochyena', 'Mightyena'] },
    { id: 197, name: 'Umbreon', types: ['Dark'], rarity: 'Rare', stats: { hp: 95, attack: 65, defense: 110, speed: 65 }, evolution: ['Eevee', 'Umbreon'] },
    { id: 229, name: 'Houndoom', types: ['Dark', 'Fire'], rarity: 'Rare', stats: { hp: 75, attack: 90, defense: 50, speed: 95 }, evolution: ['Houndour', 'Houndoom'] },
    { id: 248, name: 'Tyranitar', types: ['Rock', 'Dark'], rarity: 'Rare', stats: { hp: 100, attack: 134, defense: 110, speed: 61 }, evolution: ['Larvitar', 'Pupitar', 'Tyranitar'] },
    { id: 461, name: 'Weavile', types: ['Dark', 'Ice'], rarity: 'Rare', stats: { hp: 70, attack: 120, defense: 65, speed: 125 }, evolution: ['Sneasel', 'Weavile'] },
    { id: 262, name: 'Mightyena', types: ['Dark'], rarity: 'Rare', stats: { hp: 70, attack: 90, defense: 70, speed: 70 }, evolution: ['Poochyena', 'Mightyena'] },
    { id: 430, name: 'Honchkrow', types: ['Dark', 'Flying'], rarity: 'Rare', stats: { hp: 100, attack: 125, defense: 52, speed: 71 }, evolution: ['Murkrow', 'Honchkrow'] },
    { id: 249, name: 'Lugia', types: ['Psychic', 'Flying'], rarity: 'Legendary', stats: { hp: 106, attack: 90, defense: 130, speed: 110 }, evolution: ['Lugia'] },
    { id: 491, name: 'Darkrai', types: ['Dark'], rarity: 'Legendary', stats: { hp: 70, attack: 90, defense: 90, speed: 125 }, evolution: ['Darkrai'] },
    { id: 717, name: 'Yveltal', types: ['Dark', 'Flying'], rarity: 'Mythic', stats: { hp: 126, attack: 131, defense: 95, speed: 99 }, evolution: ['Yveltal'] },
  ],
  Ground: [
    { id: 27, name: 'Sandshrew', types: ['Ground'], rarity: 'Common', stats: { hp: 50, attack: 75, defense: 85, speed: 40 }, evolution: ['Sandshrew', 'Sandslash'] },
    { id: 28, name: 'Sandslash', types: ['Ground'], rarity: 'Rare', stats: { hp: 75, attack: 100, defense: 110, speed: 65 }, evolution: ['Sandshrew', 'Sandslash'] },
    { id: 50, name: 'Diglett', types: ['Ground'], rarity: 'Common', stats: { hp: 10, attack: 55, defense: 25, speed: 95 }, evolution: ['Diglett', 'Dugtrio'] },
    { id: 51, name: 'Dugtrio', types: ['Ground'], rarity: 'Rare', stats: { hp: 35, attack: 80, defense: 50, speed: 120 }, evolution: ['Diglett', 'Dugtrio'] },
    { id: 231, name: 'Phanpy', types: ['Ground'], rarity: 'Common', stats: { hp: 90, attack: 60, defense: 60, speed: 40 }, evolution: ['Phanpy', 'Donphan'] },
    { id: 232, name: 'Donphan', types: ['Ground'], rarity: 'Rare', stats: { hp: 90, attack: 120, defense: 120, speed: 50 }, evolution: ['Phanpy', 'Donphan'] },
    { id: 383, name: 'Groudon', types: ['Ground'], rarity: 'Legendary', stats: { hp: 100, attack: 150, defense: 140, speed: 90 }, evolution: ['Groudon'] }
  ],
  Steel: [
    { id: 304, name: 'Aron', types: ['Steel', 'Rock'], rarity: 'Common', stats: { hp: 50, attack: 70, defense: 100, speed: 30 }, evolution: ['Aron', 'Lairon', 'Aggron'] },
    { id: 305, name: 'Lairon', types: ['Steel', 'Rock'], rarity: 'Rare', stats: { hp: 60, attack: 90, defense: 140, speed: 40 }, evolution: ['Aron', 'Lairon', 'Aggron'] },
    { id: 306, name: 'Aggron', types: ['Steel', 'Rock'], rarity: 'Rare', stats: { hp: 70, attack: 110, defense: 180, speed: 50 }, evolution: ['Aron', 'Lairon', 'Aggron'] },
    { id: 208, name: 'Steelix', types: ['Steel', 'Ground'], rarity: 'Rare', stats: { hp: 75, attack: 85, defense: 200, speed: 30 }, evolution: ['Onix', 'Steelix'] },
    { id: 483, name: 'Dialga', types: ['Steel', 'Dragon'], rarity: 'Legendary', stats: { hp: 100, attack: 120, defense: 120, speed: 90 }, evolution: ['Dialga'] }
  ],
  Ice: [
    { id: 220, name: 'Swinub', types: ['Ice', 'Ground'], rarity: 'Common', stats: { hp: 50, attack: 50, defense: 40, speed: 50 }, evolution: ['Swinub', 'Piloswine', 'Mamoswine'] },
    { id: 221, name: 'Piloswine', types: ['Ice', 'Ground'], rarity: 'Common', stats: { hp: 100, attack: 100, defense: 80, speed: 50 }, evolution: ['Swinub', 'Piloswine', 'Mamoswine'] },
    { id: 473, name: 'Mamoswine', types: ['Ice', 'Ground'], rarity: 'Rare', stats: { hp: 110, attack: 130, defense: 80, speed: 80 }, evolution: ['Swinub', 'Piloswine', 'Mamoswine'] },
    { id: 363, name: 'Spheal', types: ['Ice', 'Water'], rarity: 'Common', stats: { hp: 70, attack: 40, defense: 50, speed: 25 }, evolution: ['Spheal', 'Sealeo', 'Walrein'] },
    { id: 364, name: 'Sealeo', types: ['Ice', 'Water'], rarity: 'Common', stats: { hp: 90, attack: 60, defense: 70, speed: 45 }, evolution: ['Spheal', 'Sealeo', 'Walrein'] },
    { id: 365, name: 'Walrein', types: ['Ice', 'Water'], rarity: 'Rare', stats: { hp: 110, attack: 80, defense: 90, speed: 65 }, evolution: ['Spheal', 'Sealeo', 'Walrein'] },
    { id: 378, name: 'Regice', types: ['Ice'], rarity: 'Legendary', stats: { hp: 80, attack: 50, defense: 200, speed: 50 }, evolution: ['Regice'] }
  ]
};

export function assignPokemonToRestaurant(
  id: string,
  cuisine: string,
  powerRating: number,
  rating: number,
  assignedIds?: Set<number>
): Pokemon {
  const primaryType = CUISINE_TYPE_MAP[cuisine] || CUISINE_TYPE_MAP[cuisine.split(' ')[0]] || 'Normal';
  const list = POKEMON_BY_TYPE[primaryType];
  
  let targetRarity: Pokemon['rarity'] = 'Common';
  if (powerRating >= 90) {
    targetRarity = 'Mythic';
  } else if (powerRating >= 75) {
    targetRarity = 'Legendary';
  } else if (powerRating >= 50) {
    targetRarity = 'Rare';
  }

  let matchedList = list.filter(p => p.rarity === targetRarity);
  
  if (assignedIds) {
    const unassignedMatched = matchedList.filter(p => !assignedIds.has(p.id));
    if (unassignedMatched.length > 0) {
      matchedList = unassignedMatched;
    } else {
      const unassignedOfType = list.filter(p => !assignedIds.has(p.id));
      if (unassignedOfType.length > 0) {
        matchedList = unassignedOfType;
      } else {
        const allPokemon: any[] = [];
        Object.values(POKEMON_BY_TYPE).forEach(typeList => {
          typeList.forEach(p => {
            if (!assignedIds.has(p.id)) {
              allPokemon.push(p);
            }
          });
        });
        if (allPokemon.length > 0) {
          matchedList = allPokemon;
        } else {
          matchedList = list.filter(p => p.rarity === targetRarity);
          if (matchedList.length === 0) matchedList = list;
        }
      }
    }
  } else {
    if (matchedList.length === 0) {
      matchedList = list.filter(p => p.rarity === 'Rare' || p.rarity === 'Common');
      if (matchedList.length === 0) matchedList = list;
    }
  }

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % matchedList.length;
  const base = matchedList[index];

  return {
    id: base.id,
    name: base.name,
    types: base.types,
    rarity: base.rarity,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${base.id}.png`,
    artwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${base.id}.png`,
    baseStats: base.stats,
    evolutionLine: base.evolution
  };
}
