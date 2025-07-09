"use client";
import { useState, useEffect } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch("/api/admin/customers");
        const data = await response.json();

        if (data.success) {
          // Format customer data
          const formattedCustomers = data.customers.map(customer => ({
            id: customer._id,
            name: customer.name || 'Customer',
            email: customer.email || 'customer@example.com',
            phone: customer.phone || 'N/A',
            orders: customer.orders || 0,
            totalSpent: customer.totalSpent || 0,
            lastOrder: customer.lastOrder || 'N/A',
            joinDate: new Date(customer.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
          }));
          setCustomers(formattedCustomers);
        } else {
          setError("Failed to fetch customers");
        }
      } catch (err) {
        setError("Error connecting to the server");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  const handleDelete = (id) => {
    // In a real application, you would call an API to delete the customer
    const filtered = customers.filter((c) => c.id !== id);
    setCustomers(filtered);
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h1 className="text-xl sm:text-2xl font-semibold">Customers</h1>
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full sm:w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-10">
            <div className="text-red-500 text-lg">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Mobile Cards */}
        {!loading && !error && customers.length > 0 && (
          <div className="block sm:hidden space-y-4">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{customer.name}</h3>
                    <p className="text-gray-600 text-sm">{customer.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 p-1 rounded hover:bg-blue-50">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 p-1 rounded hover:bg-green-50">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 p-1 rounded hover:bg-red-50"
                      onClick={() => handleDelete(customer.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p>{customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Orders</p>
                    <p>{customer.orders}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Address</p>
                    <p>{customer.address}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Order ID</p>
                    <p>{customer.orderId}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Desktop Table */}
        {!loading && !error && customers.length > 0 && (
          <div className="hidden sm:block overflow-x-auto rounded-lg border shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500">
                        {customer.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {customer.orders}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-3">
                        <button
                          title="View"
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          title="Edit"
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          title="Delete"
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          onClick={() => handleDelete(customer.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && customers.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{customers.length}</span> of{" "}
              <span className="font-medium">{customers.length}</span> results
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
