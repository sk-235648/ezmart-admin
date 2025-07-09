import { NextResponse } from 'next/server';
import User from '@/models/User';

export async function GET() {
  try {
    // Fetch all users
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
    
    // Transform users to customers format
    const customers = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || 'N/A',
      address: user.address || 'N/A',
      orders: 0, // We'll update this later when Order model is working
      orderId: 'N/A',
      createdAt: user.createdAt
    }));

    return NextResponse.json({ success: true, customers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}