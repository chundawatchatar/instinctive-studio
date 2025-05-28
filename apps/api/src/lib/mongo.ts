// lib/db.ts
import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI || "";

if (!mongoUri) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

async function dbConnect() {
  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
