import { NextResponse } from 'next/server';
import User from '@/models/User';
import Order from '@/models/order';
import Product from '@/models/product';
import Payment from '@/models/payment';

export async function GET() {
  try {
    // Check if we already have users
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'Seed data already exists' 
      });
    }

    // Create sample users
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 890',
        address: '123 Main St, New York'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+91 98765 43210',
        address: '456 Market Rd, Delhi'
      },
      {
        name: 'Robert Johnson',
        email: 'robert@example.com',
        phone: '+44 7911 123456',
        address: '789 Oxford St, London'
      }
    ]);

    // Create sample products
    const products = await Product.create([
      {
        name: 'Smartphone',
        description: 'Latest smartphone with advanced features',
        price: 999.99,
        category: 'Electronics',
        stock: 50,
        images: ['smartphone.jpg']
      },
      {
        name: 'Laptop',
        description: 'High-performance laptop for professionals',
        price: 1499.99,
        category: 'Electronics',
        stock: 30,
        images: ['laptop.jpg']
      },
      {
        name: 'Headphones',
        description: 'Noise-cancelling wireless headphones',
        price: 199.99,
        category: 'Electronics',
        stock: 100,
        images: ['headphones.jpg']
      }
    ]);

    // Create sample orders
    const orders = [];
    for (const user of users) {
      // Create 1-3 orders for each user
      const orderCount = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < orderCount; i++) {
        // Add 1-3 products to each order
        const orderProducts = [];
        const productCount = Math.floor(Math.random() * 3) + 1;
        let totalAmount = 0;
        
        for (let j = 0; j < productCount; j++) {
          const randomProduct = products[Math.floor(Math.random() * products.length)];
          const quantity = Math.floor(Math.random() * 3) + 1;
          const price = randomProduct.price;
          
          orderProducts.push({
            productId: randomProduct._id,
            quantity: quantity,
            price: price
          });
          
          totalAmount += price * quantity;
        }
        
        const paymentStatus = Math.random() > 0.2 ? 'Paid' : Math.random() > 0.5 ? 'Failed' : 'Refunded';
        const orderStatus = paymentStatus === 'Paid' ? 
          (Math.random() > 0.3 ? 'Delivered' : 'Shipped') : 
          'Pending';
        
        const order = await Order.create({
          userId: user._id,
          products: orderProducts,
          totalAmount: totalAmount,
          paymentStatus: paymentStatus,
          orderStatus: orderStatus,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Random date within last 30 days
        });
        
        orders.push(order);
        
        // Create payment for the order if status is Paid or Refunded
        if (paymentStatus !== 'Failed') {
          await Payment.create({
            userId: user._id,
            orderId: order._id,
            method: ['Credit Card', 'PayPal', 'Bank Transfer'][Math.floor(Math.random() * 3)],
            status: paymentStatus,
            amount: totalAmount,
            paymentDate: order.createdAt,
            txnId: 'TXN' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
          });
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Seed data created successfully',
      counts: {
        users: users.length,
        products: products.length,
        orders: orders.length
      }
    });
  } catch (error) {
    console.error('Error seeding data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed data' },
      { status: 500 }
    );
  }
}