import mongoose from 'mongoose';

const connections = {};

export async function connectDB(dbName = 'ezmart-admin') {
  if (connections[dbName]?.isConnected) return connections[dbName].connection;

  try {
    const db = await mongoose.createConnection(process.env.MONGODB_URI, {
      dbName,
    }).asPromise();

    connections[dbName] = {
      isConnected: db.readyState,
      connection: db
    };
    
    console.log(`✅ MongoDB connected to ${dbName}`);
    return db;
  } catch (error) {
    console.error(`❌ MongoDB connection error (${dbName}):`, error);
    throw error;
  }
}