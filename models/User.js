import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';

// Connect to ezmart database for users
const conn = await connectDB('ezmart');

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = conn.models.User || conn.model('User', userSchema);
export default User;