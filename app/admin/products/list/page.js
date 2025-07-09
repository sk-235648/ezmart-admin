"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";

export default function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/admin/products");
        const data = await response.json();

        if (data.success) {
          // Format product data
          const formattedProducts = data.products.map(product => ({
            id: product._id,
            name: product.name || product.title || 'Product',
            price: product.price || 0,
            category: product.category || 'Uncategorized',
            stock: product.stock || 0,
            image: product.images && product.images.length > 0 ? product.images[0] : '/product-placeholder.jpg'
          }));
          setProducts(formattedProducts);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError("Error connecting to the server");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    // In a real application, you would call an API to delete the product
    const filtered = products.filter((p) => p.id !== id);
    setProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h1 className="text-xl sm:text-2xl font-semibold">Products</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full sm:w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Link
              href="/admin/products"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </Link>
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
        {!loading && !error && products.length > 0 && (
          <div className="block sm:hidden space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="text-gray-600 text-sm">${product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">{product.category}</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">Stock: {product.stock}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/products/edit/${product.id}`} className="text-blue-600 p-1 rounded hover:bg-blue-50">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 p-1 rounded hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Desktop Table */}
        {!loading && !error && products.length > 0 && (
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.stock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/products/edit/${product.id}`} className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
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

        {/* No products state */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-10">
            <div className="text-gray-500 text-lg">No products found</div>
            <Link
              href="/admin/products"
              className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}