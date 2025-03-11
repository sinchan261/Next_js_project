import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://gsaikat261:0eTBOorkIDkpwmpA@cluster0.zmchl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function connect() {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected successfully");

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
