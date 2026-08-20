import { Pokemon, assignPokemonToRestaurant } from './pokemon-data';

export interface RestaurantAttributes {
  cuisine: string;
  protein: 'Seafood' | 'Beef' | 'Chicken' | 'Pork' | 'Vegetarian' | 'Vegan' | 'None';
  flavor: 'Sweet' | 'Savory' | 'Spicy' | 'Rich' | 'Fresh' | 'Smoky' | 'Tangy';
  format: 'Sandwich' | 'Burger' | 'Taco' | 'Pizza' | 'Bowl' | 'Plate' | 'Soup' | 'Shared Dishes';
  experience: 'Healthy' | 'Comfort Food' | 'Indulgent' | 'Filling' | 'Light';
  budget: 'Budget' | 'Moderate' | 'Premium';
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Dessert';
  temperature: 'Hot' | 'Cold';
  carbType: 'Bread' | 'Noodle' | 'Rice' | 'Starchy Veggie' | 'None';
  veggieType: 'Green' | 'Starchy' | 'None';
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  priceTier: number; // 1 = $, 2 = $$, 3 = $$$
  distance: number; // in miles
  distanceFeet?: number | null; // in feet when under 1 mile
  latitude: number;
  longitude: number;
  address: string;
  openStatus: boolean;
  website: string;
  deliveryAvailable: boolean;
  deliveryProvider: 'DoorDash' | 'UberEats' | 'Grubhub' | 'Direct' | 'None';
  popularMenuItems: string[];
  photos: string[];
  attributes: RestaurantAttributes;
  pokemon: Pokemon;
  level: number;
  powerRating: number;
}

// Curated database of 156 completely unique restaurant brands divided across all 26 cuisine types
export const CUISINE_DETAILS: Record<string, {
  cuisine: string;
  protein: RestaurantAttributes['protein'];
  flavor: RestaurantAttributes['flavor'];
  format: RestaurantAttributes['format'];
  experience: RestaurantAttributes['experience'];
  mealType: RestaurantAttributes['mealType'];
  temperature: RestaurantAttributes['temperature'];
  carbType: RestaurantAttributes['carbType'];
  veggieType: RestaurantAttributes['veggieType'];
  popularItems: string[];
  names: string[];
}> = {
  Sushi: {
    cuisine: 'Sushi', protein: 'Seafood', flavor: 'Fresh', format: 'Plate', experience: 'Light', mealType: 'Dinner',
    temperature: 'Cold', carbType: 'Rice', veggieType: 'Green',
    popularItems: ['Chef\'s Omakase', 'Tuna Nigiri', 'Sea Urchin Uni', 'Dragon Roll', 'Salmon Sashimi'],
    names: ['Sushi Nakazawa', 'Sushi Yasuda', 'Umi Sushi Bar', 'Miyabi Omakase', 'Tsukiji Fish Corner', 'Sushi Zen']
  },
  Poke: {
    cuisine: 'Poke', protein: 'Seafood', flavor: 'Tangy', format: 'Bowl', experience: 'Healthy', mealType: 'Lunch',
    temperature: 'Cold', carbType: 'Rice', veggieType: 'Green',
    popularItems: ['Spicy Ahi Bowl', 'Salmon Poke Classic', 'Yuzu Albacore Bowl', 'Mango Tofu Bowl'],
    names: ['Sakura Blue Poke', 'Kai Poke Bowl', 'Wave Poke Shop', 'Aloha Surf Poke', 'WikiWiki Poke', 'Pacific Island Poke']
  },
  Seafood: {
    cuisine: 'Seafood', protein: 'Seafood', flavor: 'Savory', format: 'Plate', experience: 'Indulgent', mealType: 'Dinner',
    temperature: 'Hot', carbType: 'None', veggieType: 'None',
    popularItems: ['Lobster Roll', 'New England Clam Chowder', 'Oysters on the Half Shell', 'Grilled Salmon', 'Crab Cakes'],
    names: ['Blue Harbor Seafood', 'The Rusty Anchor', 'Oceanic Crab Shack', 'Claw & Shell Bistro', 'Marina Bay Grill', 'Seawind Catch']
  },
  Ramen: {
    cuisine: 'Japanese', protein: 'Pork', flavor: 'Rich', format: 'Soup', experience: 'Comfort Food', mealType: 'Dinner',
    temperature: 'Hot', carbType: 'Noodle', veggieType: 'Green',
    popularItems: ['Tonkotsu Shoyu Ramen', 'Spicy Miso Ramen', 'Pork Gyoza', 'Veggie Ramen Bowl'],
    names: ['Tokyo Ramen Bar', 'Shogun Tonkotsu', 'Miso Happy Ramen House', 'Ramen Ichiraku', 'Osaka Noodle Lab', 'Sapporo Bowl']
  },
  Mexican: {
    cuisine: 'Mexican', protein: 'Beef', flavor: 'Spicy', format: 'Taco', experience: 'Comfort Food', mealType: 'Lunch',
    temperature: 'Hot', carbType: 'Bread', veggieType: 'Green',
    popularItems: ['Carne Asada Tacos', 'Al Pastor Burrito', 'Chips & Guacamole', 'Quesabirria Tacos'],
    names: ['La Taqueria Diablo', 'Tres Amigos Cantina', 'El Fuego Taco Stand', 'Cactus Rose Mexican', 'Burrito Bandito', 'Taco Fiesta']
  },
  BBQ: {
    cuisine: 'BBQ', protein: 'Pork', flavor: 'Smoky', format: 'Plate', experience: 'Filling', mealType: 'Dinner',
    temperature: 'Hot', carbType: 'None', veggieType: 'None',
    popularItems: ['Smoked Brisket Plate', 'St. Louis Ribs', 'Pulled Pork Sandwich', 'Mac and Cheese Side'],
    names: ['Smokey Bones BBQ', 'Pitmaster Smokehouse', 'Hickory & Ash BBQ', 'Lone Star Pit', 'Smokey Bear BBQ', 'Sweet Heat Ribs']
  },
  Indian: {
    cuisine: 'Indian', protein: 'Chicken', flavor: 'Rich', format: 'Shared Dishes', experience: 'Comfort Food', mealType: 'Dinner',
    temperature: 'Hot', carbType: 'Rice', veggieType: 'None',
    popularItems: ['Butter Chicken', 'Garlic Naan', 'Lamb Vindaloo', 'Vegetable Samosas', 'Chicken Tikka Masala'],
    names: ['Tikka Masala Lounge', 'Curry Kingdom Palace', 'Taj Mahal Diner', 'Bombay Spice Kitchen', 'Saffron Indian Bistro', 'Ganesha Clay Pot']
  },
  Thai: {
    cuisine: 'Thai', protein: 'Chicken', flavor: 'Sweet', format: 'Plate', experience: 'Comfort Food', mealType: 'Dinner',
    temperature: 'Hot', carbType: 'Noodle', veggieType: 'Green',
    popularItems: ['Pad Thai Chicken', 'Green Curry Shrimp', 'Pineapple Fried Rice', 'Tom Yum Soup'],
    names: ['Golden Elephant Thai', 'Bangkok Spice Bistro', 'Siam Lotus Garden', 'Thai Basil Kitchen', 'Phuket Seafood Grill', 'Royal Orchid Thai']
  },
  Vegetarian: {
    cuisine: 'Vegetarian', protein: 'Vegetarian', flavor: 'Fresh', format: 'Bowl', experience: 'Healthy', mealType: 'Lunch',
    temperature: 'Cold', carbType: 'Starchy Veggie', veggieType: 'Green',
    popularItems: ['Avocado Toast Deluxe', 'Harvest Quinoa Salad', 'Sweet Potato Buddha Bowl', 'Hummus Toast'],
    names: ['The Green Garden Cafe', 'Purely Planted', 'The Salad Crop Kitchen', 'Greens & Grains Bar', 'Sweetgreen Oasis', 'Green Meadow Cafe']
  },
  Vegan: {
    cuisine: 'Vegan', protein: 'Vegan', flavor: 'Fresh', format: 'Burger', experience: 'Healthy', mealType: 'Lunch',
    temperature: 'Hot', carbType: 'Bread', veggieType: 'Green',
    popularItems: ['Vegan Jackfruit Tacos', 'Beyond Burger Extra', 'Kale Ginger Salad', 'Vegan Mac & Cheese'],
    names: ['Herbivore Bistro', 'The Vegan Joint', 'Green Lotus Kitchen', 'Plant-Based Fuel', 'Rooted Vegan Eats', 'No-Beef Burgers']
  },
  Mediterranean: {
    cuisine: 'Mediterranean', protein: 'Chicken', flavor: 'Savory', format: 'Plate', experience: 'Healthy', mealType: 'Lunch',
    temperature: 'Hot', carbType: 'Bread', veggieType: 'Green',
    popularItems: ['Chicken Shawarma Wrap', 'Falafel Platter', 'Hummus & Warm Pita', 'Greek Salad'],
    names: ['Oasis Mediterranean Grill', 'Olive Tree Meze', 'Acropolis Tavern', 'Sparta Greek Eats', 'Mediterranean Breeze', 'Sultan Shawarma']
  },
  HealthyBowls: {
    cuisine: 'Healthy Bowls', protein: 'Vegetarian', flavor: 'Fresh', format: 'Bowl', experience: 'Light', mealType: 'Breakfast',
    temperature: 'Cold', carbType: 'Rice', veggieType: 'Green',
    popularItems: ['Superfood Grain Bowl', 'Spicy Tofu Bowl', 'Açai Berry Power Bowl', 'Dragonfruit Smoothie Bowl'],
    names: ['Root & Leaf Bowls', 'Superfood Station', 'Daily Blend Bowls', 'Fit Food Bowl', 'Nourish Bowls Co', 'Healthy Habits Cafe']
  },
  Desserts: {
    cuisine: 'Desserts', protein: 'None', flavor: 'Sweet', format: 'Plate', experience: 'Indulgent', mealType: 'Dessert',
    temperature: 'Cold', carbType: 'None', veggieType: 'None',
    popularItems: ['Molten Lava Cake', 'Red Velvet Cupcake', 'Strawberry Macaron Stack', 'Gelato Waffle Cone'],
    names: ['Sweet Tooth Dessert Bar', 'Sugar High Donuts', 'Heavenly Crepes Café', 'Chocolatier Royale', 'The Velvet Cake Co.', 'Gelato Heaven']
  },
  Bakeries: {
    cuisine: 'Bakeries', protein: 'None', flavor: 'Sweet', format: 'Sandwich', experience: 'Light', mealType: 'Breakfast',
    temperature: 'Cold', carbType: 'Bread', veggieType: 'None',
    popularItems: ['Butter Croissant', 'Almond Pain au Chocolat', 'Sourdough Baguette', 'Cinnamon Roll'],
    names: ['La Petite Boulangerie', 'The Pastry Atelier', 'Cookie Monster Bakery', 'Macaron Maison', 'Bread & Butter Bakery', 'Warm Crusts Co.']
  },
  CoffeeShops: {
    cuisine: 'Coffee Shops', protein: 'None', flavor: 'Savory', format: 'Soup', experience: 'Light', mealType: 'Breakfast',
    temperature: 'Hot', carbType: 'Bread', veggieType: 'None',
    popularItems: ['Cold Brew Nitro', 'Vanilla Oat Milk Latte', 'Espresso Macchiato', 'Avocado Sourdough Toast'],
    names: ['Volt Coffee Roasters', 'Buzz Espresso Bar', 'The Caffeine Lab', 'Daily Grind Coffee', 'Neon Mug Café', 'Ampere Coffee Co.']
  },
  Breakfast: {
    cuisine: 'Breakfast', protein: 'Pork', flavor: 'Savory', format: 'Plate', experience: 'Filling', mealType: 'Breakfast',
    temperature: 'Hot', carbType: 'Bread', veggieType: 'None',
    popularItems: ['Buttermilk Pancake Stack', 'Classic Eggs Benedict', 'Bacon & Waffle Combo', 'French Toast Sticks'],
    names: ['Sunny Side Up Diner', 'Waffle Wonder Grill', 'Pancake Parlor Diner', 'Rise & Shine Breakfast', 'The Egg & I Diner', 'Early Bird Breakfast']
  },
  American: {
    cuisine: 'American', protein: 'Beef', flavor: 'Rich', format: 'Burger', experience: 'Comfort Food', mealType: 'Lunch',
    temperature: 'Hot', carbType: 'Bread', veggieType: 'None',
    popularItems: ['Truffle Beef Burger', 'Sweet Potato Fries', 'Bacon Cheddar Melt', 'Onion Rings'],
    names: ['Gourmet Burger Craft', 'Bleecker Street Burger', 'Liberty Tavern Diner', 'Cornerstone Grill', 'The Daily Diner', 'Patriot Burgers']
  },
  Italian: {
    cuisine: 'Italian', protein: 'Beef', flavor: 'Savory', format: 'Pizza', experience: 'Indulgent', mealType: 'Dinner',
    temperature: 'Hot', carbType: 'Bread', veggieType: 'None',
    popularItems: ['Fettuccine Alfredo', 'Woodfired Margherita Pizza', 'Lasagna Bolognese', 'Garlic Bread Knots'],
    names: ['Bella Italia Ristorante', 'Luigi\'s Pizzeria', 'Mama Mia Pasta Grill', 'Tuscany Trattoria', 'Pizza Suprema Diner', 'Milano Italian Eats']
  },
  Korean: {
    cuisine: 'Korean', protein: 'Beef', flavor: 'Savory', format: 'Shared Dishes', experience: 'Filling', mealType: 'Dinner',
    temperature: 'Hot', carbType: 'Rice', veggieType: 'Green',
    popularItems: ['Bulgogi Ribeye', 'Stone Pot Bibimbap', 'Kimchi Pancake', 'Korean Fried Chicken Wing'],
    names: ['Seoul BBQ House', 'K-Town Hotpot Grill', 'Gogi Korean BBQ Diner', 'Seoul Food Kitchen', 'Korean Fried Chicken Express', 'K-Town BBQ Pit']
  },
  Steakhouses: {
    cuisine: 'Steakhouses', protein: 'Beef', flavor: 'Savory', format: 'Plate', experience: 'Indulgent', mealType: 'Dinner',
    temperature: 'Hot', carbType: 'Starchy Veggie', veggieType: 'Starchy',
    popularItems: ['Dry-Aged Ribeye', 'Creamed Spinach', 'Truffle Mashed Potatoes', 'Filet Mignon'],
    names: ['Prime Cut Steakhouse', 'The Chop House Grill', 'Bull & Bear Steak', 'Iron Chef Steakhouse', 'Black Angus Grill', 'The Meat Lock Grill']
  },
  Chinese: {
    cuisine: 'Chinese', protein: 'Chicken', flavor: 'Sweet', format: 'Shared Dishes', experience: 'Comfort Food', mealType: 'Dinner',
    temperature: 'Hot', carbType: 'Rice', veggieType: 'Green',
    popularItems: ['Peking Duck', 'General Tso\'s Chicken', 'Steamed Pork Dumplings', 'Beef & Broccoli'],
    names: ['Dragon Palace', 'Red Lantern Bistro', 'Golden Dragon Express', 'Peking Duck House', 'Wok & Roll Chinese', 'Sichuan Dynasty House']
  },
  French: {
    cuisine: 'French', protein: 'Chicken', flavor: 'Rich', format: 'Plate', experience: 'Indulgent', mealType: 'Dinner',
    temperature: 'Hot', carbType: 'Bread', veggieType: 'None',
    popularItems: ['Coq au Vin', 'Escargot in Herb Butter', 'Crème Brûlée', 'French Onion Soup'],
    names: ['Le Papillon French Bistro', 'Chez Nous French Grill', 'Mon Ami Bistro Café', 'La Maison de Savor', 'Petit Savor French', 'Parisian Flavors']
  },
  FineDining: {
    cuisine: 'Fine Dining', protein: 'Beef', flavor: 'Rich', format: 'Plate', experience: 'Light', mealType: 'Dinner',
    temperature: 'Hot', carbType: 'None', veggieType: 'None',
    popularItems: ['Tasting Menu Selection', 'Foie Gras', 'Caviar Service', 'Truffle Risotto'],
    names: ['Elysian Fine Dining', 'Aura Fine Dining Lounge', 'The Celestial Table', 'Apex Tasting Menu', 'The Silver Fork', 'Zenith Gastronomy']
  },
  Fusion: {
    cuisine: 'Fusion', protein: 'Seafood', flavor: 'Savory', format: 'Shared Dishes', experience: 'Comfort Food', mealType: 'Dinner',
    temperature: 'Hot', carbType: 'Noodle', veggieType: 'None',
    popularItems: ['Kimchi Tacos', 'Miso Butter Salmon Noodles', 'Matcha Lava Tarts', 'Bulgogi Quesadilla'],
    names: ['Umami Fusion Lab', 'Pacific Rim Fusion', 'Zest Fusion Kitchen', 'East Meets West Diner', 'Intersection Fusion', 'Zen Garden Fusion']
  },
  FastFood: {
    cuisine: 'Fast Food', protein: 'Beef', flavor: 'Savory', format: 'Burger', experience: 'Comfort Food', mealType: 'Lunch',
    temperature: 'Hot', carbType: 'Bread', veggieType: 'None',
    popularItems: ['Double Cheeseburger Combo', 'Crispy Chicken Nuggets', 'Fries & Shake', 'Hot Dog Deluxe'],
    names: ['QuickBite Burgers', 'Fry Guys Express', 'Taco Express Shop', 'Speedy Slice Pizza', 'Burger Express', 'Drive Thru Bite']
  },
  LateNight: {
    cuisine: 'Late Night', protein: 'Pork', flavor: 'Rich', format: 'Sandwich', experience: 'Indulgent', mealType: 'Dinner',
    temperature: 'Hot', carbType: 'Starchy Veggie', veggieType: 'None',
    popularItems: ['Loaded Waffle Fries', 'Midnight Sliders', 'Chocolate Milkshake', 'Mozzarella Sticks'],
    names: ['Midnight Neon Diner', 'Night Owl Sliders', 'Neon Taco Stand', 'Craving Crusader Late Night', 'After Hours Pizza', 'The Munchie Box']
  }
};

const RESTAURANT_TEMPLATES: {
  name: string;
  cuisine: string;
  popularItems: string[];
  attributes: Omit<RestaurantAttributes, 'budget'>;
  deliveryChance: number;
}[] = [];

Object.values(CUISINE_DETAILS).forEach(details => {
  details.names.forEach((name, idx) => {
    RESTAURANT_TEMPLATES.push({
      name,
      cuisine: details.cuisine,
      popularItems: details.popularItems,
      attributes: {
        cuisine: details.cuisine,
        protein: details.protein,
        flavor: details.flavor,
        format: details.format,
        experience: details.experience,
        mealType: details.mealType,
        temperature: details.temperature,
        carbType: details.carbType,
        veggieType: details.veggieType
      },
      deliveryChance: 0.4 + (idx * 0.1)
    });
  });
});

// Helper to calculate distance in miles between two coordinates (Haversine formula)
function getHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Radius of Earth in miles
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

// Generate 120 deterministic restaurants based on a user's location coordinates
export function generateRestaurants(userLat: number, userLng: number): Restaurant[] {
  const restaurants: Restaurant[] = [];
  const providers: Restaurant['deliveryProvider'][] = ['DoorDash', 'UberEats', 'Grubhub', 'Direct'];
  const assignedPokemonIds = new Set<number>();
  const generatedNames = new Set<string>();
  
  // Use a pseudo-random generator seeded by lat/lng so the list is stable per location
  const seed = Math.abs(Math.sin(userLat) * Math.cos(userLng));
  let randCount = 0;
  function random(): number {
    const x = Math.sin(seed + randCount++) * 10000;
    return x - Math.floor(x);
  }

  // Seeded deterministic shuffle of all templates
  const availableTemplates = [...RESTAURANT_TEMPLATES];
  for (let idx = availableTemplates.length - 1; idx > 0; idx--) {
    const j = Math.floor(random() * (idx + 1));
    const temp = availableTemplates[idx];
    availableTemplates[idx] = availableTemplates[j];
    availableTemplates[j] = temp;
  }

  // Generate 156 restaurants (using all 156 unique templates)
  for (let i = 0; i < 156; i++) {
    // 1. Pick a template (each is guaranteed unique since we take the i-th shuffled template)
    const template = availableTemplates[i] || availableTemplates[i % availableTemplates.length];

    // 2. Generate randomized offset coordinates within ~15 miles
    // Angle in radians
    const angle = random() * Math.PI * 2;
    // Concentrate coordinates closer to the center (simulating UberEats/Grubhub density)
    // 70% within 0.4 miles, 20% between 0.4 and 1.0 miles, 10% up to 3.0 miles.
    let distanceVal = 0;
    const rDist = random();
    if (rDist < 0.7) {
      distanceVal = random() * 0.4;
    } else if (rDist < 0.9) {
      distanceVal = 0.4 + random() * 0.6;
    } else {
      distanceVal = 1.0 + random() * 2.0;
    }
    // 1 degree latitude = ~69 miles, 1 degree longitude = ~69 miles * cos(lat)
    const latOffset = (distanceVal * Math.sin(angle)) / 69;
    const lngOffset = (distanceVal * Math.cos(angle)) / (69 * Math.cos((userLat * Math.PI) / 180));
    
    const restLat = userLat + latOffset;
    const restLng = userLng + lngOffset;
    const actualDistance = getHaversineDistance(userLat, userLng, restLat, restLng);

    // 3. Generate unique ID and Name modifiers to keep it unique
    const id = `rest_${i}_${template.cuisine.toLowerCase()}`;
    const locationModifiers = ['Heights', 'Downtown', 'Depot', 'Express', 'Avenue', 'Corner', 'Gourmet', 'Central', 'Plaza', 'Yard', 'Studio', 'Bistro', 'Kitchen', 'Bar', 'Grill', 'Lounge', 'Garden', 'Market', 'Boutique', 'House'];
    
    let name = template.name;
    let attempts = 0;
    while (attempts < 100) {
      const modifier = locationModifiers[Math.floor(random() * locationModifiers.length)];
      const candidateName = (attempts === 0 && random() > 0.5) 
        ? template.name 
        : `${template.name} ${modifier}`;
      
      if (!generatedNames.has(candidateName)) {
        name = candidateName;
        break;
      }
      attempts++;
    }
    
    if (generatedNames.has(name)) {
      name = `${name} #${i + 1}`;
    }
    generatedNames.add(name);

    // 4. Rating and reviews
    const rating = parseFloat((3.5 + random() * 1.5).toFixed(1)); // 3.5 to 5.0
    const reviewCount = Math.floor(20 + Math.pow(random(), 2.5) * 2500); // 20 to 2500+ reviews
    const priceTier = Math.floor(1 + random() * 3); // 1, 2, or 3

    // 5. Hidden Power Rating (0-100)
    // Formula weight: Rating (50%), Review Count log (30%), Price tier (20%)
    const reviewScore = Math.min(Math.log(reviewCount) / Math.log(2000) * 100, 100);
    const ratingScore = ((rating - 3.5) / 1.5) * 100;
    const priceScore = ((priceTier - 1) / 2) * 100;
    const powerRating = Math.round(ratingScore * 0.5 + reviewScore * 0.3 + priceScore * 0.2);

    // 6. Level = Rating * 10
    const level = Math.round(rating * 10);

    // 7. Delivery
    const isDelivery = random() < template.deliveryChance;
    const deliveryProvider = isDelivery ? providers[Math.floor(random() * providers.length)] : 'None';

    // 8. Budget Attribute mapping
    let budgetAttr: RestaurantAttributes['budget'] = 'Moderate';
    if (priceTier === 1) budgetAttr = 'Budget';
    if (priceTier === 3) budgetAttr = 'Premium';

    const attributes: RestaurantAttributes = {
      ...template.attributes,
      budget: budgetAttr
    };

    // 9. Assign Pokemon
    const pokemon = assignPokemonToRestaurant(id, template.cuisine, powerRating, rating, assignedPokemonIds);
    assignedPokemonIds.add(pokemon.id);

    // 10. Fake Address
    const stNames = ['Grand', 'Oak', 'Maple', 'Broadway', 'Pine', 'Washington', 'Lexington', 'Vanderbilt', 'Flatbush', 'Franklin'];
    const fakeAddress = `${Math.floor(100 + random() * 899)} ${stNames[Math.floor(random() * stNames.length)]} St, City Area`;

    restaurants.push({
      id,
      name,
      rating,
      reviewCount,
      priceTier,
      distance: parseFloat(actualDistance.toFixed(2)),
      latitude: restLat,
      longitude: restLng,
      address: fakeAddress,
      openStatus: random() > 0.15, // 85% open rate
      website: `https://example.com/${id}`,
      deliveryAvailable: isDelivery,
      deliveryProvider,
      popularMenuItems: template.popularItems,
      photos: [`/placeholder-food-${i % 5}.jpg`],
      attributes,
      pokemon,
      level,
      powerRating
    });
  }

  // Sort by distance
  return restaurants.sort((a, b) => a.distance - b.distance);
}

// Map OSM cuisine tags to our internal 26 cuisine categories
const CUISINE_MAP: Record<string, string> = {
  sushi: 'Sushi',
  poke: 'Poke',
  seafood: 'Seafood',
  fish: 'Seafood',
  oyster: 'Seafood',
  crab: 'Seafood',
  lobster: 'Seafood',
  ramen: 'Japanese',
  noodle: 'Japanese',
  japanese: 'Japanese',
  udon: 'Japanese',
  soba: 'Japanese',
  mexican: 'Mexican',
  taco: 'Mexican',
  burrito: 'Mexican',
  cantina: 'Mexican',
  bbq: 'BBQ',
  barbecue: 'BBQ',
  grill: 'BBQ',
  smokehouse: 'BBQ',
  indian: 'Indian',
  curry: 'Indian',
  thai: 'Thai',
  vegetarian: 'Vegetarian',
  salad: 'Vegetarian',
  vegan: 'Vegan',
  mediterranean: 'Mediterranean',
  greek: 'Mediterranean',
  lebanese: 'Mediterranean',
  turkish: 'Mediterranean',
  falafel: 'Mediterranean',
  bowl: 'Healthy Bowls',
  healthy: 'Healthy Bowls',
  smoothie: 'Healthy Bowls',
  acai: 'Healthy Bowls',
  dessert: 'Desserts',
  ice_cream: 'Desserts',
  cake: 'Desserts',
  sweet: 'Desserts',
  gelato: 'Desserts',
  bakery: 'Bakeries',
  pastry: 'Bakeries',
  bread: 'Bakeries',
  croissant: 'Bakeries',
  coffee: 'Coffee Shops',
  cafe: 'Coffee Shops',
  tea: 'Coffee Shops',
  espresso: 'Coffee Shops',
  breakfast: 'Breakfast',
  donut: 'Breakfast',
  pancake: 'Breakfast',
  waffle: 'Breakfast',
  american: 'American',
  burger: 'American',
  diner: 'American',
  steak: 'Steakhouses',
  steakhouse: 'Steakhouses',
  beef: 'Steakhouses',
  italian: 'Italian',
  pizza: 'Italian',
  pasta: 'Italian',
  pizzeria: 'Italian',
  korean: 'Korean',
  chinese: 'Chinese',
  dumpling: 'Chinese',
  wok: 'Chinese',
  sichuan: 'Chinese',
  cantonese: 'Chinese',
  french: 'French',
  bistro: 'French',
  fine_dining: 'Fine Dining',
  gastronomy: 'Fine Dining',
  fusion: 'Fusion',
  asian: 'Fusion',
  fast_food: 'Fast Food',
  fries: 'Fast Food',
  hotdog: 'Fast Food',
  sandwich: 'American',
  subway: 'Fast Food'
};

export async function fetchRealRestaurants(userLat: number, userLng: number, radius: number = 2.0): Promise<Restaurant[]> {
  try {
    const res = await fetch(`/api/restaurants?lat=${userLat}&lng=${userLng}&radius=${radius}`);
    if (!res.ok) {
      console.warn(`API returned status: ${res.status}. Falling back to generated restaurants.`);
      return [];
    }
    const data = await res.json();
    const list = data.restaurants || [];
    
    const restaurants: Restaurant[] = [];
    const assignedPokemonIds = new Set<number>();
    const providers: Restaurant['deliveryProvider'][] = ['DoorDash', 'UberEats', 'Grubhub', 'Direct'];
    
    list.forEach((p: any, i: number) => {
      // Seeded random number generator unique to this restaurant ID to keep attributes stable
      const seed = Math.abs(p.id.split('').reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0));
      let randCount = 0;
      function random(): number {
        const x = Math.sin(seed + randCount++) * 10000;
        return x - Math.floor(x);
      }
      
      const cuisineType = p.cuisine || 'American';
      const detailsKey = Object.keys(CUISINE_DETAILS).find(
        key => CUISINE_DETAILS[key].cuisine === cuisineType
      ) || 'American';
      const details = CUISINE_DETAILS[detailsKey] || CUISINE_DETAILS['American'];
      
      const isDelivery = random() > 0.2;
      const deliveryProvider = isDelivery ? providers[Math.floor(random() * providers.length)] : 'None';
      
      let budgetAttr: RestaurantAttributes['budget'] = 'Moderate';
      if (p.priceTier === 1) budgetAttr = 'Budget';
      if (p.priceTier === 3) budgetAttr = 'Premium';
      
      const attributes: RestaurantAttributes = {
        cuisine: details.cuisine,
        protein: details.protein,
        flavor: details.flavor,
        format: details.format,
        experience: details.experience,
        mealType: details.mealType,
        temperature: details.temperature,
        carbType: details.carbType,
        veggieType: details.veggieType,
        budget: budgetAttr
      };
      
      const reviewScore = Math.min(Math.log(p.reviewCount || 10) / Math.log(1500) * 100, 100);
      const ratingScore = (((p.rating || 4.0) - 3.5) / 1.5) * 100;
      const priceScore = (((p.priceTier || 2) - 1) / 2) * 100;
      const powerRating = Math.round(ratingScore * 0.5 + reviewScore * 0.3 + priceScore * 0.2);
      const level = Math.round((p.rating || 4.0) * 10);
      
      const pokemon = assignPokemonToRestaurant(p.id, details.cuisine, powerRating, p.rating || 4.0, assignedPokemonIds);
      assignedPokemonIds.add(pokemon.id);
      
      restaurants.push({
        id: p.id,
        name: p.name,
        rating: p.rating || 4.0,
        reviewCount: p.reviewCount || 50,
        priceTier: p.priceTier || 2,
        distance: p.distance,
        distanceFeet: p.distanceFeet || null,
        latitude: p.latitude,
        longitude: p.longitude,
        address: p.address || 'Local Address',
        openStatus: p.openStatus !== undefined ? p.openStatus : true,
        website: p.website || `https://www.google.com/search?q=${encodeURIComponent(p.name + ' ' + (p.address || ''))}`,
        deliveryAvailable: isDelivery,
        deliveryProvider,
        popularMenuItems: details.popularItems,
        photos: p.photos && p.photos.length > 0 ? p.photos : [`/placeholder-food-${i % 5}.jpg`],
        attributes,
        pokemon,
        level,
        powerRating
      });
    });
    
    return restaurants.sort((a, b) => a.distance - b.distance);
  } catch (err: any) {
    console.error('Failed to fetch from /api/restaurants:', err?.message || String(err));
    return [];
  }
}

