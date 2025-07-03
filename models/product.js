import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';
// Connect to ezmart database for products
const conn = await connectDB('ezmart');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    expenses: { type: Number, required: true },
    images: { type: [String], required: true },
    category: { type: String, required: true },
    colors: String,
    sizes: String
  },
  { 
    collection: "products",
    timestamps: true
  }
);

productSchema.index({ title: 'text', category: 'text' });

const Product = conn.models.Product || conn.model('Product', productSchema);

export default Product;