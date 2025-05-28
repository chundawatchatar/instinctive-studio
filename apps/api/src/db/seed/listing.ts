import Listing from "../../models/listing.model";
import Category from "../../models/category.model";

const tvListings = [
  {
    title: '55" Samsung QLED 4K Smart TV',
    description:
      "Crystal clear 4K display with quantum dot technology. Smart TV features with built-in streaming apps.",
    price: 45000,
    location: "Mumbai",
    attributes: {
      screenSize: '55"',
      technology: "QLED",
      resolution: "4K",
      brand: "Samsung",
      smartTV: true,
    },
  },
  {
    title: '43" LG OLED Full HD TV',
    description:
      "Premium OLED display with perfect blacks and infinite contrast. Energy efficient design.",
    price: 35000,
    location: "Delhi",
    attributes: {
      screenSize: '43"',
      technology: "OLED",
      resolution: "Full HD",
      brand: "LG",
      smartTV: true,
    },
  },
  {
    title: '32" Sony LED HD TV',
    description:
      "Reliable LED TV with Sony's X-Reality PRO picture processing. Great for small rooms.",
    price: 18000,
    location: "Bangalore",
    attributes: {
      screenSize: '32"',
      technology: "LED",
      resolution: "HD",
      brand: "Sony",
      smartTV: false,
    },
  },
  {
    title: '65" TCL 4K Smart TV',
    description:
      "Large screen 4K TV with Android TV platform. HDR support for enhanced viewing.",
    price: 55000,
    location: "Chennai",
    attributes: {
      screenSize: '65"',
      technology: "LED",
      resolution: "4K",
      brand: "TCL",
      smartTV: true,
    },
  },
  {
    title: '50" Hisense QLED 4K TV',
    description:
      "Premium QLED technology with Dolby Vision. Voice remote included.",
    price: 42000,
    location: "Pune",
    attributes: {
      screenSize: '50"',
      technology: "QLED",
      resolution: "4K",
      brand: "Hisense",
      smartTV: true,
    },
  },
  {
    title: '75" Samsung 8K QLED TV',
    description:
      "Ultra-premium 8K resolution TV with AI upscaling. The ultimate viewing experience.",
    price: 125000,
    location: "Mumbai",
    attributes: {
      screenSize: '75"',
      technology: "QLED",
      resolution: "8K",
      brand: "Samsung",
      smartTV: true,
    },
  },
  {
    title: '43" Panasonic LED Full HD TV',
    description:
      "Reliable LED TV with Panasonic's VIERA Connect. Good for medium rooms.",
    price: 28000,
    location: "Kolkata",
    attributes: {
      screenSize: '43"',
      technology: "LED",
      resolution: "Full HD",
      brand: "Panasonic",
      smartTV: true,
    },
  },
  {
    title: '55" LG 4K Smart TV',
    description:
      "WebOS smart platform with magic remote. 4K Active HDR for better picture quality.",
    price: 48000,
    location: "Hyderabad",
    attributes: {
      screenSize: '55"',
      technology: "LED",
      resolution: "4K",
      brand: "LG",
      smartTV: true,
    },
  },
  {
    title: '32" TCL HD Smart TV',
    description:
      "Compact smart TV with Android TV. Perfect for bedrooms or small spaces.",
    price: 15000,
    location: "Ahmedabad",
    attributes: {
      screenSize: '32"',
      technology: "LED",
      resolution: "HD",
      brand: "TCL",
      smartTV: true,
    },
  },
  {
    title: '65" Sony 4K OLED TV',
    description:
      "Premium OLED TV with Sony's Cognitive Processor XR. Cinema-quality picture.",
    price: 98000,
    location: "Mumbai",
    attributes: {
      screenSize: '65"',
      technology: "OLED",
      resolution: "4K",
      brand: "Sony",
      smartTV: true,
    },
  },
  {
    title: '50" Samsung 4K Smart TV',
    description:
      "Crystal UHD 4K TV with Tizen OS. HDR10+ support for enhanced colors.",
    price: 40000,
    location: "Delhi",
    attributes: {
      screenSize: '50"',
      technology: "LED",
      resolution: "4K",
      brand: "Samsung",
      smartTV: true,
    },
  },
  {
    title: '43" Hisense Full HD TV',
    description:
      "Budget-friendly Full HD TV with good picture quality. Basic smart features.",
    price: 22000,
    location: "Jaipur",
    attributes: {
      screenSize: '43"',
      technology: "LED",
      resolution: "Full HD",
      brand: "Hisense",
      smartTV: true,
    },
  },
  {
    title: '55" Panasonic 4K TV',
    description:
      "VIERA 4K TV with HDR Bright Panel. My Home Screen for personalized content.",
    price: 52000,
    location: "Bangalore",
    attributes: {
      screenSize: '55"',
      technology: "LED",
      resolution: "4K",
      brand: "Panasonic",
      smartTV: true,
    },
  },
  {
    title: '32" LG HD TV',
    description:
      "Basic HD TV with good build quality. Simple and reliable for everyday use.",
    price: 14000,
    location: "Surat",
    attributes: {
      screenSize: '32"',
      technology: "LED",
      resolution: "HD",
      brand: "LG",
      smartTV: false,
    },
  },
  {
    title: '75" TCL 4K QLED TV',
    description:
      "Large QLED TV with Google TV platform. Quantum Dot technology for vibrant colors.",
    price: 85000,
    location: "Chennai",
    attributes: {
      screenSize: '75"',
      technology: "QLED",
      resolution: "4K",
      brand: "TCL",
      smartTV: true,
    },
  },
];

const shoeListings = [
  {
    title: "Nike Air Max 90 Running Shoes",
    description:
      "Classic Nike Air Max with visible air cushioning. Comfortable for daily runs and casual wear.",
    price: 8500,
    location: "Mumbai",
    attributes: {
      size: "9",
      color: "White",
      brand: "Nike",
      type: "Road Running",
      gender: "Men",
    },
  },
  {
    title: "Adidas Ultraboost 22 Women's",
    description:
      "Premium running shoes with Boost midsole technology. Perfect for long distance running.",
    price: 12000,
    location: "Delhi",
    attributes: {
      size: "7",
      color: "Black",
      brand: "Adidas",
      type: "Road Running",
      gender: "Women",
    },
  },
  {
    title: "Puma Deviate Nitro Elite",
    description:
      "High-performance racing shoes with NITRO foam. Carbon fiber plate for energy return.",
    price: 15000,
    location: "Bangalore",
    attributes: {
      size: "10",
      color: "Red",
      brand: "Puma",
      type: "Road Running",
      gender: "Men",
    },
  },
  {
    title: "Reebok Zig Kinetica Trail",
    description:
      "Trail running shoes with zig-zag sole for traction. Durable construction for rough terrain.",
    price: 7500,
    location: "Chennai",
    attributes: {
      size: "8",
      color: "Grey",
      brand: "Reebok",
      type: "Trail Running",
      gender: "Unisex",
    },
  },
  {
    title: "New Balance Fresh Foam X",
    description:
      "Comfortable daily trainer with Fresh Foam midsole. Great for beginners and casual runners.",
    price: 9500,
    location: "Pune",
    attributes: {
      size: "11",
      color: "Blue",
      brand: "New Balance",
      type: "Road Running",
      gender: "Men",
    },
  },
  {
    title: "Asics Gel-Kayano 29",
    description:
      "Stability running shoes with GEL cushioning. Perfect for overpronators and long runs.",
    price: 11000,
    location: "Hyderabad",
    attributes: {
      size: "9",
      color: "Black",
      brand: "Asics",
      type: "Road Running",
      gender: "Women",
    },
  },
  {
    title: "Nike React Infinity Run",
    description:
      "Injury reduction focused running shoes. React foam for responsive cushioning.",
    price: 10500,
    location: "Kolkata",
    attributes: {
      size: "8",
      color: "White",
      brand: "Nike",
      type: "Road Running",
      gender: "Men",
    },
  },
  {
    title: "Adidas Terrex Agravic",
    description:
      "Technical trail running shoes with Continental rubber outsole. Built for mountain terrain.",
    price: 9800,
    location: "Mumbai",
    attributes: {
      size: "10",
      color: "Green",
      brand: "Adidas",
      type: "Trail Running",
      gender: "Men",
    },
  },
  {
    title: "Puma RS-X Sneakers",
    description:
      "Retro-inspired lifestyle sneakers. Comfortable for walking and casual wear.",
    price: 6500,
    location: "Ahmedabad",
    attributes: {
      size: "7",
      color: "White",
      brand: "Puma",
      type: "Walking",
      gender: "Women",
    },
  },
  {
    title: "Reebok CrossFit Nano X2",
    description:
      "Cross-training shoes built for gym workouts. Stable platform for weightlifting.",
    price: 8800,
    location: "Jaipur",
    attributes: {
      size: "9",
      color: "Black",
      brand: "Reebok",
      type: "Cross Training",
      gender: "Unisex",
    },
  },
  {
    title: "New Balance 1080v12",
    description:
      "Maximum cushioning running shoes. Fresh Foam X for plush comfort on long runs.",
    price: 13500,
    location: "Bangalore",
    attributes: {
      size: "11",
      color: "Blue",
      brand: "New Balance",
      type: "Road Running",
      gender: "Men",
    },
  },
  {
    title: "Asics GT-1000 11",
    description:
      "Affordable stability running shoes. GEL technology for shock absorption.",
    price: 7200,
    location: "Chennai",
    attributes: {
      size: "8",
      color: "Grey",
      brand: "Asics",
      type: "Road Running",
      gender: "Women",
    },
  },
  {
    title: "Nike Air Zoom Pegasus 39",
    description:
      "Versatile daily running shoes. Zoom Air units for responsive feel.",
    price: 9200,
    location: "Delhi",
    attributes: {
      size: "10",
      color: "Red",
      brand: "Nike",
      type: "Road Running",
      gender: "Men",
    },
  },
  {
    title: "Adidas Supernova+",
    description:
      "Comfortable daily trainer with Boost midsole. Great for easy runs and recovery.",
    price: 8000,
    location: "Pune",
    attributes: {
      size: "7",
      color: "White",
      brand: "Adidas",
      type: "Road Running",
      gender: "Women",
    },
  },
  {
    title: "Puma Velocity Nitro 2",
    description:
      "Lightweight running shoes with NITRO foam. Good for tempo runs and races.",
    price: 8500,
    location: "Surat",
    attributes: {
      size: "9",
      color: "Black",
      brand: "Puma",
      type: "Road Running",
      gender: "Unisex",
    },
  },
];

export default async () => {
  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await Listing.deleteMany({});

    // Create TV listings
    console.log("Creating TV listings...");
    const tvCategory = await Category.findOne({ slug: "televisions" });
    console.log({ tvCategory });
    const tvListingsWithCategory = tvListings.map((listing) => ({
      ...listing,
      categoryId: tvCategory!._id,
    }));
    await Listing.insertMany(tvListingsWithCategory);

    // Create shoe listings
    console.log("Creating shoe listings...");
    const shoeCategory = await Category.findOne({ slug: "running-shoes" });
    const shoeListingsWithCategory = shoeListings.map((listing) => ({
      ...listing,
      categoryId: shoeCategory!._id,
    }));
    await Listing.insertMany(shoeListingsWithCategory);

    console.log(`Created ${tvListings.length} TV listings`);
    console.log(`Created ${shoeListings.length} shoe listings`);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding listings:", error);
  }
};
