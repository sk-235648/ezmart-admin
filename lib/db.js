//lib/db.js
import mongoose from 'mongoose';

const connection = {};

export  async function connectDB() {
  if (connection.isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'ezmart-admin',
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}