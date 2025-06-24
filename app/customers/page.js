'use client';
import { useState } from 'react';
import { Pencil, Trash2, Eye } from 'lucide-react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      address: '123 Main St, New York',
      orders: 2,
      orderId: 'ORD-1001',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 98765 43210',
      address: '456 Market Rd, Delhi',
      orders: 1,
      orderId: 'ORD-1002',
    },
  ]);

  const handleDelete = (id) => {
    const filtered = customers.filter((c) => c.id !== id);
    setCustomers(filtered);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6 border-b pb-2">Customers</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b">
                <td className="px-4 py-3">{customer.name}</td>
                <td className="px-4 py-3">{customer.email}</td>
                <td className="px-4 py-3">{customer.phone}</td>
                <td className="px-4 py-3">{customer.address}</td>
                <td className="px-4 py-3">{customer.orders}</td>
                <td className="px-4 py-3">{customer.orderId}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button className="text-blue-600 hover:underline">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:underline">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(customer.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {customers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}