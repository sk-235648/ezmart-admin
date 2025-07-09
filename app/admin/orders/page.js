 
// app/orders/page.js
"use client";
import { useState, useEffect } from "react";
import { FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

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
            total: `$${order.totalAmount?.toFixed(2)}`,
            date: new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            }),
            avatar: '/avatar.jpg', // Default avatar
            items: order.products.map(product => {
              // Ensure we have a valid price
              const price = product.price || 0;
              return {
                name: product.productId ? 
                  (product.productId.name || (product.productId._id && typeof product.productId._id === 'string' ? `Product (${product.productId._id.substring(0, 6)}...)` : 'Product')) : 
                  'Product',
                price: `$${price.toFixed(2)}`,
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
          <span className="text-sm md:text-base">Kristina Evans</span>
          <img
            src="/avatar.jpg"
            alt="Kristina"
            className="w-7 h-7 md:w-8 md:h-8 rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 overflow-hidden">
        {/* Order List */}
        <div className={`${showDetails ? 'hidden lg:block lg:w-2/3' : 'w-full'} space-y-3 overflow-y-auto pr-1`}>
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
                onClick={() => {
                  setSelectedOrder(order);
                  setShowDetails(true);
                }}
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

        {/* Order Details */}
        {showDetails && selectedOrder && (
          <div className={`${showDetails ? 'w-full lg:w-1/3' : 'hidden'} bg-[#f9f9f9] p-3 md:p-4 rounded-lg shadow h-full overflow-y-auto`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm md:text-base">Order {selectedOrder.id}</h3>
              <button 
                onClick={() => setShowDetails(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
              {selectedOrder.status}
            </span>

            <div className="mt-3 md:mt-4 flex items-center gap-2">
              <img
                src={selectedOrder.avatar || '/avatar.jpg'}
                alt={selectedOrder.customer}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-sm md:text-base">{selectedOrder.customer}</p>
                <div className="flex gap-2 mt-1 text-gray-600">
                  <FiMail className="cursor-pointer h-4 w-4" />
                  <FiPhone className="cursor-pointer h-4 w-4" />
                  <FiMessageSquare className="cursor-pointer h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-6">
              <h4 className="font-semibold text-sm md:text-base">Order items</h4>
              <ul className="mt-1 md:mt-2 space-y-1">
                {selectedOrder.items && selectedOrder.items.map((item, index) => (
                  <li key={index} className="flex justify-between text-xs md:text-sm">
                    <div>
                      <span>{item.name}</span>
                      {item.quantity > 1 && <span className="text-gray-500 ml-1">x{item.quantity}</span>}
                    </div>
                    <span>{item.price}</span>
                  </li>
                ))}
              </ul>
              <hr className="my-2 md:my-3" />
              <div className="flex justify-between font-bold text-sm md:text-base">
                <span>Total</span>
                <span>{selectedOrder.total}</span>
              </div>
              <div className="flex justify-between mt-3 md:mt-4 gap-2">
                <button className="w-1/2 bg-black text-white py-1 md:py-2 rounded-lg text-xs md:text-sm">
                  Track
                </button>
                <button className="w-1/2 bg-yellow-200 text-yellow-800 py-1 md:py-2 rounded-lg text-xs md:text-sm">
                  Refund
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}