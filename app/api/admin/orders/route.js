import { NextResponse } from 'next/server';
import Order from '@/models/order';
import Product from '@/models/product';

export async function GET() {
  try {
    // Fetch all orders and sort by createdAt in descending order
    // We're not using populate since it's causing schema registration issues
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}