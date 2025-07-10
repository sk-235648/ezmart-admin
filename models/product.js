import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';
// Connect to ezmart database for products
const conn = await connectDB('ezmart');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    images: { type: [String] },
    expenses: { type: Number, default: 0 },
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