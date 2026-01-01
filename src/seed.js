import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./models/item.model.js";

dotenv.config();

const seedItems = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);  
    console.log("MongoDB connected");

    const categories = ["books", "electronics", "tools", "courses"];

    const items = Array.from({ length: 30 }).map((_, i) => ({
      name: `Backend Item ${i + 1}`,
      description: `Sample description for backend item ${i + 1}`,
      category: categories[i % categories.length],
      price: Math.floor(Math.random() * 500) + 50,
    }));

    await Item.deleteMany(); // optional: clears old data
    await Item.insertMany(items);

    console.log("Items seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedItems();
