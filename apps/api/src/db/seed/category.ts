import Category from "../../models/category.model";

const categories = [
  {
    name: "Televisions",
    slug: "televisions",
    attributeSchema: {
      screenSize: {
        type: "string",
        label: "Screen Size",
        options: ['32"', '43"', '50"', '55"', '65"', '75"'],
      },
      technology: {
        type: "string",
        label: "Display Technology",
        options: ["LED", "OLED", "QLED", "LCD"],
      },
      resolution: {
        type: "string",
        label: "Resolution",
        options: ["HD", "Full HD", "4K", "8K"],
      },
      brand: {
        type: "string",
        label: "Brand",
        options: ["Samsung", "LG", "Sony", "TCL", "Hisense", "Panasonic"],
      },
      smartTV: {
        type: "boolean",
        label: "Smart TV",
      },
    },
  },
  {
    name: "Running Shoes",
    slug: "running-shoes",
    attributeSchema: {
      size: {
        type: "string",
        label: "Size",
        options: ["6", "7", "8", "9", "10", "11", "12"],
      },
      color: {
        type: "string",
        label: "Color",
        options: ["Black", "White", "Red", "Blue", "Grey", "Green"],
      },
      brand: {
        type: "string",
        label: "Brand",
        options: ["Nike", "Adidas", "Puma", "Reebok", "New Balance", "Asics"],
      },
      type: {
        type: "string",
        label: "Type",
        options: ["Road Running", "Trail Running", "Cross Training", "Walking"],
      },
      gender: {
        type: "string",
        label: "Gender",
        options: ["Men", "Women", "Unisex"],
      },
    },
  },
];

export default async () => {
  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await Category.deleteMany({});

    // Create categories
    console.log("Creating categories...");
    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories`);
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
};
