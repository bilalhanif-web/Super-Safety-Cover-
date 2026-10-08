export interface ProductContentData {
  heading: string;
  paragraph: string;
  bullets: string[];
}

export const PRODUCT_DESCRIPTIONS: Record<string, ProductContentData> = {
  // 1. Bike Cover
  "bike-cover": {
    heading: "Product Description",
    paragraph:
      "The Super Safety Bike Cover is an all-weather protective cover designed specifically for motorcycles in Pakistan. It shields your bike from intense sunlight, heavy rain, dust, and scratch damage during daily parking. Made from high-density water-resistant parachute fabric with strong double stitching, it provides reliable everyday protection.",
    bullets: [
      "Waterproof & water-resistant fabric",
      "Dust, mud & scratch protection",
      "Durable UV-resistant material",
      "Strong double-stitched seams",
      "Easy fit for Honda, Yamaha & Suzuki",
      "Secure windproof bottom buckle lock",
      "Suitable for Pakistani weather",
    ],
  },

  // 2. Car Cover
  "car-cover": {
    heading: "Product Description",
    paragraph:
      "The Super Safety Car Cover is a heavy-duty exterior shield built to protect your car's body and original paint. It guards against scorching sunlight, rain, dust, bird droppings, and scratches. Crafted from durable parachute fabric with a soft protective inner surface, it keeps your vehicle protected in open parking and car porches.",
    bullets: [
      "Waterproof & rain protection",
      "Dust, UV & scratch resistant",
      "Durable material with soft inner lining",
      "Strong reinforced stitching",
      "Easy fit with mirror pockets & side door zipper",
      "Secure 4-wheel straps & under-body buckle",
      "Suitable for Pakistani weather",
    ],
  },

  // 3. AC Cover
  "ac-cover": {
    heading: "Product Description",
    paragraph:
      "The Super Safety AC Cover provides dependable off-season protection for split air conditioner units. It shields copper piping, condenser coils, and outer casings from rain rust, winter dust, and debris. Made from heavy-duty water-repellent parachute fabric, it keeps your AC clean and ready for summer.",
    bullets: [
      "Waterproof & rain protection",
      "Dust & rust protection for coils and fins",
      "Durable heavy-duty parachute material",
      "Strong stitching with rear pipe cutouts",
      "Easy fit for 1.0, 1.5 & 2.0 ton split units",
      "Secure elastic hem & fastening cords",
      "Suitable for outdoor weather",
    ],
  },

  // 4. Washing Machine Cover
  "washing-machine-cover": {
    heading: "Product Description",
    paragraph:
      "The Super Safety Washing Machine Cover protects top-load, front-load, and twin-tub appliances placed on balconies or verandas. It shields digital control panels, motors, and enamel finishes from sun fading, water splashes, and dust. Convenient top zippers allow easy laundry access without removing the cover.",
    bullets: [
      "Waterproof & water splash protection",
      "Dust & sun protection for control panels",
      "Durable tear-resistant fabric",
      "Strong stitching with dual operational zippers",
      "Easy fit for top load, front load & twin tub",
      "Secure rear pipe & wire openings",
      "Suitable for balcony & outdoor laundry areas",
    ],
  },

  // 5. Rain Dress
  "rain-dress": {
    heading: "Product Description",
    paragraph:
      "The Super Safety Rain Dress is a 2-piece waterproof suit designed for daily motorcycle riders and commuters. It protects you from heavy monsoon downpours, road splashes, and cold wind during travel. Made from durable ripstop nylon with sealed leakproof seams, it ensures comfortable and dry riding.",
    bullets: [
      "100% Waterproof protection with sealed seams",
      "Road splash, mud & wind protection",
      "Durable tear-resistant ripstop material",
      "Strong leakproof stitching",
      "Easy & comfortable fit over regular clothes",
      "Secure adjustable hood, cuffs & ankles",
      "Suitable for Pakistani monsoon & winter riding",
    ],
  },

  // 6. Mattress Cover
  "mattress-cover": {
    heading: "Product Description",
    paragraph:
      "The Super Safety Mattress Cover is a waterproof fitted protector that shields your mattress from liquid spills, sweat, stains, and dust mites. Featuring a soft breathable cotton surface with a noiseless waterproof backing, it maintains bed hygiene and comfort without crinkly plastic sounds.",
    bullets: [
      "100% Waterproof spill & leak protection",
      "Dust mite, allergen & stain protection",
      "Durable breathable fabric with soft cotton top",
      "Strong stretchable side stitching",
      "Easy fit for Single, Queen & King sizes",
      "Secure 360-degree all-around elastic grip",
      "Machine washable & easy to care for",
    ],
  },

  // 7. Fan Cover
  "fan-cover": {
    heading: "Product Description",
    paragraph:
      "The Super Safety Fan Cover is a protective off-season set for ceiling and pedestal fans during winter months. It shields fan blades and motor bodies from sticky dust accumulation, moisture, and corrosion. Made from stretchable washable fabric, it slips on quickly and eliminates tedious pre-summer cleaning.",
    bullets: [
      "Dust & grime protection",
      "Water-resistant & moisture protection",
      "Durable washable & reusable fabric",
      "Strong elastic hem stitching",
      "Easy slide-on & slide-off fit",
      "Secure snug fit for blades & motor canopy",
      "Suitable for off-season storage",
    ],
  },

  // 8. Air Cooler Cover
  "air-cooler-cover": {
    heading: "Product Description",
    paragraph:
      "The Super Safety Air Cooler Cover protects room coolers stored on roofs, balconies, and verandas during winter. It shields cooling pads, plastic bodies, and motors from harsh sun damage, rain rust, and dust accumulation. Crafted from UV-treated parachute fabric, it ensures your cooler stays ready for next season.",
    bullets: [
      "Waterproof & sun protection",
      "Dust & rust protection for cooling pads",
      "Durable UV-treated parachute fabric",
      "Strong weather-resistant stitching",
      "Easy slip-over fit for room & desert coolers",
      "Secure bottom fastening tie cords",
      "Suitable for outdoor storage",
    ],
  },
};

/**
 * Helper to fetch tailored product content by slug or category
 */
export function getProductDescription(slug: string, category?: string): ProductContentData {
  if (PRODUCT_DESCRIPTIONS[slug]) {
    return PRODUCT_DESCRIPTIONS[slug];
  }

  // Fallback map by category
  const categoryMap: Record<string, string> = {
    "bike-covers": "bike-cover",
    "car-covers": "car-cover",
    "ac-covers": "ac-cover",
    "washing-machine-covers": "washing-machine-cover",
    "rain-dress": "rain-dress",
    "mattress-covers": "mattress-cover",
    "fan-covers": "fan-cover",
    "air-cooler-covers": "air-cooler-cover",
  };

  if (category && categoryMap[category] && PRODUCT_DESCRIPTIONS[categoryMap[category]]) {
    return PRODUCT_DESCRIPTIONS[categoryMap[category]];
  }

  // Clean concise fallback
  return {
    heading: "Product Description",
    paragraph:
      "Constructed under strict quality standards in Pakistan to meet the extreme challenges of local climate conditions. Super Safety Cover preserves the factory finish, mechanical parts, and cleanliness of your equipment whether parked in intense summer sunlight, under dusty trees, or during heavy monsoon rain.",
    bullets: [
      "Waterproof & water-resistant protection",
      "Dust & scratch protection",
      "Durable high-grade material",
      "Strong reinforced stitching",
      "Easy & quick fitting",
      "Secure windproof fastening",
      "Suitable for Pakistani weather",
    ],
  };
}
