import { Restaurant, RestaurantAttributes } from './restaurant-data';

export interface QuestionOption {
  label: string;
  emoji: string;
}

export interface Question {
  id: string;
  field: keyof RestaurantAttributes | 'deliveryAvailable' | 'openStatus';
  value: any;
  text: string;
  optionA: QuestionOption;
  optionB: QuestionOption;
}

// Helper to get emoji for various cuisines
function getCuisineEmoji(cuisine: string): string {
  const mapping: Record<string, string> = {
    'Sushi': '🍣',
    'Poke': '🐟',
    'Seafood': '🦀',
    'Mexican': '🌮',
    'BBQ': '🍖',
    'Indian': '🍛',
    'Thai': '🍜',
    'Vegetarian': '🥗',
    'Vegan': '🌱',
    'Mediterranean': '🫓',
    'Healthy Bowls': '🥦',
    'Desserts': '🍰',
    'Bakeries': '🥐',
    'Coffee Shops': '☕',
    'Breakfast': '🥞',
    'American': '🍔',
    'Italian': '🍝',
    'Korean': '🍲',
    'Steakhouses': '🥩',
    'Chinese': '🥟',
    'French': '🍷',
    'Fine Dining': '🥂',
    'Fusion': '🍱',
    'Fast Food': '🍟',
    'Late Night': '🌙'
  };
  return mapping[cuisine] || '🍽️';
}

function getOptionsForQuestion(field: string, value: any): { optionA: QuestionOption; optionB: QuestionOption } {
  switch (field) {
    case 'cuisine':
      return {
        optionA: { label: `${value} Food`, emoji: getCuisineEmoji(value) },
        optionB: { label: 'Other Cuisines', emoji: '🍱' }
      };
    case 'protein':
      if (value === 'Seafood') {
        return {
          optionA: { label: 'Fresh Seafood', emoji: '🦀' },
          optionB: { label: 'Meat & Veggies', emoji: '🥩' }
        };
      }
      if (value === 'Vegetarian' || value === 'Vegan') {
        return {
          optionA: { label: 'Plant-Based', emoji: '🌱' },
          optionB: { label: 'Meat & Seafood', emoji: '🍗' }
        };
      }
      return {
        optionA: { label: `${value} Options`, emoji: '🥩' },
        optionB: { label: 'Different Protein', emoji: '🥗' }
      };
    case 'flavor':
      if (value === 'Spicy') {
        return {
          optionA: { label: 'Spicy & Hot', emoji: '🔥' },
          optionB: { label: 'Mild & Mellow', emoji: '🍲' }
        };
      }
      if (value === 'Sweet') {
        return {
          optionA: { label: 'Sweet & Sugary', emoji: '🍩' },
          optionB: { label: 'Savory & Salty', emoji: '🧂' }
        };
      }
      if (value === 'Savory') {
        return {
          optionA: { label: 'Savory & Rich', emoji: '🥘' },
          optionB: { label: 'Fresh & Light', emoji: '🥬' }
        };
      }
      if (value === 'Rich') {
        return {
          optionA: { label: 'Rich & Heavy', emoji: '🧀' },
          optionB: { label: 'Fresh & Light', emoji: '🥬' }
        };
      }
      if (value === 'Fresh') {
        return {
          optionA: { label: 'Fresh & Clean', emoji: '🥬' },
          optionB: { label: 'Rich & Savory', emoji: '🥩' }
        };
      }
      return {
        optionA: { label: `${value} Flavor`, emoji: '🧂' },
        optionB: { label: 'Other Flavors', emoji: '🥣' }
      };
    case 'format':
      if (value === 'Pizza') {
        return {
          optionA: { label: 'Pizza Slices', emoji: '🍕' },
          optionB: { label: 'Burgers / Bowls', emoji: '🍔' }
        };
      }
      if (value === 'Burger') {
        return {
          optionA: { label: 'Gourmet Burgers', emoji: '🍔' },
          optionB: { label: 'Pizza / Plates', emoji: '🍕' }
        };
      }
      if (value === 'Taco') {
        return {
          optionA: { label: 'Tacos & Wraps', emoji: '🌮' },
          optionB: { label: 'Other Formats', emoji: '🍱' }
        };
      }
      if (value === 'Sandwich') {
        return {
          optionA: { label: 'Sandwiches', emoji: '🥪' },
          optionB: { label: 'Warm Plates', emoji: '🍛' }
        };
      }
      if (value === 'Bowl') {
        return {
          optionA: { label: 'Bowls & Grains', emoji: '🥣' },
          optionB: { label: 'Plated Meals', emoji: '🍽️' }
        };
      }
      if (value === 'Soup') {
        return {
          optionA: { label: 'Soup & Noodles', emoji: '🍲' },
          optionB: { label: 'Dry Dishes', emoji: '🍛' }
        };
      }
      if (value === 'Shared Dishes') {
        return {
          optionA: { label: 'Shared Plates', emoji: '🍢' },
          optionB: { label: 'Individual Plates', emoji: '🍽️' }
        };
      }
      return {
        optionA: { label: `${value}`, emoji: '🍽️' },
        optionB: { label: 'Other Format', emoji: '🥪' }
      };
    case 'experience':
      if (value === 'Healthy' || value === 'Light') {
        return {
          optionA: { label: 'Light & Healthy', emoji: '🥗' },
          optionB: { label: 'Hearty Comfort', emoji: '🍕' }
        };
      }
      if (value === 'Comfort Food') {
        return {
          optionA: { label: 'Comfort Food', emoji: '🍔' },
          optionB: { label: 'Light & Healthy', emoji: '🥗' }
        };
      }
      if (value === 'Indulgent') {
        return {
          optionA: { label: 'Indulgent Treat', emoji: '🍩' },
          optionB: { label: 'Lean & Clean', emoji: '🥦' }
        };
      }
      if (value === 'Filling') {
        return {
          optionA: { label: 'Big & Filling', emoji: '🍚' },
          optionB: { label: 'Light Bite', emoji: '🥪' }
        };
      }
      return {
        optionA: { label: `${value} Vibe`, emoji: '🌟' },
        optionB: { label: 'Other Vibe', emoji: '🎒' }
      };
    case 'budget':
      if (value === 'Budget') {
        return {
          optionA: { label: 'Budget Friendly ($)', emoji: '💵' },
          optionB: { label: 'Moderate / Splurge', emoji: '💳' }
        };
      }
      if (value === 'Premium') {
        return {
          optionA: { label: 'Premium Splurge ($$$)', emoji: '💎' },
          optionB: { label: 'Budget / Moderate', emoji: '💵' }
        };
      }
      return {
        optionA: { label: 'Moderate ($$)', emoji: '💳' },
        optionB: { label: 'Budget / Splurge', emoji: '💎' }
      };
    case 'mealType':
      if (value === 'Breakfast') {
        return {
          optionA: { label: 'Breakfast Spot', emoji: '🥞' },
          optionB: { label: 'Lunch / Dinner', emoji: '🍛' }
        };
      }
      if (value === 'Lunch') {
        return {
          optionA: { label: 'Lunch Spot', emoji: '🥪' },
          optionB: { label: 'Breakfast / Dinner', emoji: '🍛' }
        };
      }
      if (value === 'Dinner') {
        return {
          optionA: { label: 'Dinner Spot', emoji: '🍛' },
          optionB: { label: 'Breakfast / Lunch', emoji: '🥞' }
        };
      }
      if (value === 'Dessert') {
        return {
          optionA: { label: 'Sweet Treat', emoji: '🍨' },
          optionB: { label: 'Savory Meal', emoji: '🥘' }
        };
      }
      return {
        optionA: { label: `${value}`, emoji: '🍽️' },
        optionB: { label: 'Other Meal', emoji: '🍱' }
      };
    case 'deliveryAvailable':
      return {
        optionA: { label: 'Delivery Needed', emoji: '🚚' },
        optionB: { label: 'Pickup / Dine-in', emoji: '🍽️' }
      };
    case 'openStatus':
      return {
        optionA: { label: 'Open Right Now', emoji: '🔓' },
        optionB: { label: 'Show All Spots', emoji: '🔒' }
      };
    case 'temperature':
      if (value === 'Hot') {
        return {
          optionA: { label: 'Hot & Warm (Fire-type)', emoji: '🔥' },
          optionB: { label: 'Cold & Chilled (Ice-type)', emoji: '❄️' }
        };
      }
      return {
        optionA: { label: 'Cold & Chilled (Ice-type)', emoji: '❄️' },
        optionB: { label: 'Hot & Warm (Fire-type)', emoji: '🔥' }
      };
    case 'carbType':
      if (value === 'Bread') {
        return {
          optionA: { label: 'Bread, Buns & Wraps', emoji: '🥪' },
          optionB: { label: 'Rice, Noodles or Potatoes', emoji: '🍜' }
        };
      }
      if (value === 'Noodle') {
        return {
          optionA: { label: 'Noodles & Pasta', emoji: '🍜' },
          optionB: { label: 'Bread, Rice or Potatoes', emoji: '🥪' }
        };
      }
      if (value === 'Rice') {
        return {
          optionA: { label: 'Rice & Grain Bowls', emoji: '🍚' },
          optionB: { label: 'Bread, Noodles or Potatoes', emoji: '🥪' }
        };
      }
      if (value === 'Starchy Veggie') {
        return {
          optionA: { label: 'Potatoes & Starchy Veggies', emoji: '🥔' },
          optionB: { label: 'Bread, Rice or Noodles', emoji: '🍚' }
        };
      }
      return {
        optionA: { label: 'No Heavy Carbs', emoji: '🥗' },
        optionB: { label: 'Bread, Rice or Noodles', emoji: '🥪' }
      };
    case 'veggieType':
      if (value === 'Green') {
        return {
          optionA: { label: 'Green Veggies & Salads', emoji: '🥬' },
          optionB: { label: 'Potatoes / Starchy Veggies / No Veggies', emoji: '🥔' }
        };
      }
      if (value === 'Starchy') {
        return {
          optionA: { label: 'Starchy Veggies (Potatoes, Roots)', emoji: '🥔' },
          optionB: { label: 'Green Veggies & Salads / No Veggies', emoji: '🥬' }
        };
      }
      return {
        optionA: { label: 'No Veggie Focus (Meat/Carb Heavy)', emoji: '🥩' },
        optionB: { label: 'Includes Green/Starchy Veggies', emoji: '🥦' }
      };
    default:
      return {
        optionA: { label: 'Yes', emoji: '👍' },
        optionB: { label: 'No', emoji: '👎' }
      };
  }
}

// Generate the category prompt text dynamically based on the field
function getQuestionTextForField(field: string): string {
  switch (field) {
    case 'cuisine':
      return 'Which cuisine sounds better?';
    case 'protein':
      return 'Choose your protein path:';
    case 'flavor':
      return 'What flavor are you craving?';
    case 'format':
      return 'How would you like it served?';
    case 'experience':
      return 'What kind of meal vibe?';
    case 'budget':
      return 'What is the budget plan?';
    case 'mealType':
      return 'Which meal are we planning?';
    case 'deliveryAvailable':
      return 'How do you want to get it?';
    case 'openStatus':
      return 'Check restaurant status:';
    case 'temperature':
      return 'Craving a hot Fire-type meal, or a cold Ice-type refreshment?';
    case 'carbType':
      return 'Which type of energy-carb to power up your party?';
    case 'veggieType':
      return 'Looking for Grass-type green veggies, or starchy/no-veggie bulk?';
    default:
      return 'Which option sounds better?';
  }
}

export function getNextQuestion(
  candidates: Restaurant[],
  answeredQuestions: { field: string; value: any }[]
): Question | null {
  if (candidates.length <= 1) return null;

  const N = candidates.length;
  let bestField: Question['field'] | null = null;
  let bestValue: any = null;
  let closestDiff = 1.0;

  const candidatesAttributes = candidates.map(r => r.attributes);
  
  const fields: (keyof RestaurantAttributes)[] = [
    'cuisine',
    'protein',
    'flavor',
    'format',
    'experience',
    'budget',
    'mealType',
    'temperature',
    'carbType',
    'veggieType'
  ];

  for (const field of fields) {
    const alreadyAskedField = answeredQuestions.some(q => q.field === field);
    if (alreadyAskedField) continue;

    const uniqueValues = Array.from(new Set(candidatesAttributes.map(attr => attr[field])));

    for (const val of uniqueValues) {
      if (val === undefined || val === null) continue;

      const alreadyAsked = answeredQuestions.some(
        q => q.field === field && String(q.value) === String(val)
      );
      if (alreadyAsked) continue;

      const matchingCount = candidates.filter(r => String(r.attributes[field]) === String(val)).length;
      if (matchingCount === 0 || matchingCount === N) continue;

      const ratio = matchingCount / N;
      const diff = Math.abs(ratio - 0.5);

      if (diff < closestDiff) {
        closestDiff = diff;
        bestField = field;
        bestValue = val;
      }
    }
  }

  const askedDelivery = answeredQuestions.some(q => q.field === 'deliveryAvailable');
  if (!askedDelivery) {
    const deliveryCount = candidates.filter(r => r.deliveryAvailable).length;
    if (deliveryCount > 0 && deliveryCount < N) {
      const ratio = deliveryCount / N;
      const diff = Math.abs(ratio - 0.5);
      if (diff < closestDiff) {
        closestDiff = diff;
        bestField = 'deliveryAvailable';
        bestValue = true;
      }
    }
  }

  if (!bestField) return null;

  const text = getQuestionTextForField(bestField);
  const options = getOptionsForQuestion(bestField, bestValue);

  return {
    id: `${bestField}_${String(bestValue)}`,
    field: bestField,
    value: bestValue,
    text,
    optionA: options.optionA,
    optionB: options.optionB
  };
}
