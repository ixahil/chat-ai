import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose.connect(process.env.DBURI);
    console.log("  Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
