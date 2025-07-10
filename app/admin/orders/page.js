 
// app/orders/page.js
"use client";
import { useState, useEffect } from "react";
import { FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/admin/orders');
        const data = await response.json();
        
        if (data.success) {
          const formattedOrders = data.orders.map(order => ({
            id: order._id,
            customer: order.userId?.name || 'Customer',
            status: order.paymentStatus,
            total: `₹${order.totalAmount?.toFixed(2)}`,
            date: new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            }),
            avatar: '/avatar.png', // Default avatar
            items: order.products.map(product => {
              // Ensure we have a valid price
              const price = product.price || 0;
              return {
                name: product.productId ? 
                  (product.productId.name || (product.productId._id && typeof product.productId._id === 'string' ? `Product (${product.productId._id.substring(0, 6)}...)` : 'Product')) : 
                  'Product',
                price: `₹${price.toFixed(2)}`,
                quantity: product.quantity
              };
            }),
            rawOrder: order // Keep the original order data
          }));
          
          setOrders(formattedOrders);
          if (formattedOrders.length > 0) {
            setSelectedOrder(formattedOrders[0]);
          }
        } else {
          setError('Failed to fetch orders');
        }
      } catch (err) {
        setError('Error connecting to the server');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-6 bg-[#fdfcf9] flex flex-col overflow-hidden rounded-none md:rounded-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-xl md:text-2xl font-semibold">Orders</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base">Admin</span>
          <img
            src="/avatar.png"
            alt="Kristina"
            className="w-7 h-7 md:w-8 md:h-8 rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 overflow-hidden">
        {/* Order List */}
        <div className={` w-full space-y-3 overflow-y-auto pr-1`}>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading orders...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-red-500">{error}</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p>No orders found</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className={`p-3 md:p-4 border rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 cursor-pointer ${
                  selectedOrder && selectedOrder.id === order.id
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <div>
                  <p className="font-semibold text-sm md:text-base">{order.id}</p>
                  <p className="text-xs md:text-sm text-gray-500">{order.customer}</p>
                </div>
                <div className="flex items-center justify-between sm:block">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "Paid"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Delivered"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                  <p className="text-sm md:text-base sm:text-right sm:mt-1">{order.total}</p>
                  <p className="text-xs text-gray-500 sm:text-right">{order.date}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}