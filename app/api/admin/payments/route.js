import { NextResponse } from 'next/server';
import Payment from '@/models/payment';

export async function GET() {
  try {
    // Fetch all payments and sort by paymentDate in descending order
    // Skip population for now to avoid User model error
    const payments = await Payment.find({})
      .sort({ paymentDate: -1 })
      .lean();

    return NextResponse.json({ success: true, payments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}