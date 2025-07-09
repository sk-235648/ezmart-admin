import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/product';

export async function GET() {
  try {
    // Connect to ezmart database for products
    await connectDB('ezmart');
    
    // Fetch products without population
    const products = await Product.find({}).lean();
    
    return NextResponse.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}