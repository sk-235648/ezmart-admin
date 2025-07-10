// app/admin/dashboard/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { DollarSign, ShoppingBag, Users } from "lucide-react";

// Initialize with empty data
const initialMonthlyData = [
  { month: "Jan", sales: 0 },
  { month: "Feb", sales: 0 },
  { month: "Mar", sales: 0 },
  { month: "Apr", sales: 0 },
  { month: "May", sales: 0 },
  { month: "Jun", sales: 0 },
  { month: "Jul", sales: 0 },
  { month: "Aug", sales: 0 },
  { month: "Sep", sales: 0 },
  { month: "Oct", sales: 0 },
  { month: "Nov", sales: 0 },
  { month: "Dec", sales: 0 },
];

export default function Dashboard() {
  const router = useRouter();
  const [salesData, setSalesData] = useState(initialMonthlyData);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        
        // Fetch orders data
        const ordersResponse = await fetch('/api/admin/orders');
        const ordersData = await ordersResponse.json();
        
        // Fetch customers data
        const customersResponse = await fetch('/api/admin/customers');
        const customersData = await customersResponse.json();
        
        // Fetch products data
        const productsResponse = await fetch('/api/admin/products');
        const productsData = await productsResponse.json();
        
        if (ordersData.success && customersData.success) {
          // Calculate total revenue and prepare monthly data
          let revenue = 0;
          const monthlyRevenue = {...Object.fromEntries(initialMonthlyData.map(item => [item.month, 0]))};
          
          // Process orders
          ordersData.orders.forEach(order => {
            if (order.totalAmount) {
              revenue += order.totalAmount;
              
              // Add to monthly data
              const orderDate = new Date(order.createdAt);
              const monthName = orderDate.toLocaleString('en-US', { month: 'short' });
              if (monthlyRevenue[monthName] !== undefined) {
                monthlyRevenue[monthName] += order.totalAmount;
              }
            }
          });
          
          // Format monthly data for chart
          const formattedMonthlyData = initialMonthlyData.map(item => ({
            month: item.month,
            sales: monthlyRevenue[item.month] || 0
          }));
          
          // Prepare category data if products exist
          const categories = {};
          if (productsData.success && productsData.products) {
            productsData.products.forEach(product => {
              const category = product.category || 'Uncategorized';
              if (!categories[category]) {
                categories[category] = 0;
              }
              categories[category]++;
            });
          }
          
          const formattedCategoryData = Object.entries(categories).map(([name, value]) => ({
            name,
            value
          }));
          
          // Update state
          setSalesData(formattedMonthlyData);
          setTotalRevenue(revenue);
          setTotalOrders(ordersData.orders.length);
          setTotalCustomers(customersData.customers.length);
          setCategoryData(formattedCategoryData);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchDashboardData();
  }, []);
  return (
    <div className="flex-1 p-4 md:p-6 bg-[#fdfcf9] flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base">Admin</span>
          <img
            src="/avatar.png"
            alt="Kristina"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && <div className="text-center py-10">Loading dashboard data...</div>}
      {error && <div className="text-center py-10 text-red-500">{error}</div>}
      
      {!loading && !error && (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="border rounded-md p-3 md:p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-md font-semibold">Total Revenue</h2>
                <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
              </div>
              <p className="text-lg md:text-xl font-semibold mt-1 md:mt-2">
                ₹ {totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="border rounded-md p-3 md:p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-md font-semibold">Total Orders</h2>
                <ShoppingBag className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
              </div>
              <p className="text-lg md:text-xl font-semibold mt-1 md:mt-2">{totalOrders}</p>
            </div>
            <div className="border rounded-md p-3 md:p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-md font-semibold">
                  Total Customers
                </h2>
                <Users className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
              </div>
              <p className="text-lg md:text-xl font-semibold mt-1 md:mt-2">{totalCustomers}</p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* Monthly Sales Chart */}
            <div className="border rounded-md p-3 md:p-4 flex flex-col">
              <h2 className="text-sm md:text-md font-semibold mb-3 md:mb-4">
                Monthly Sales (₹)
              </h2>
              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={salesData}
                    margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
                  >
                    <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toFixed(2)}`, 'Sales']} />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#6366F1"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Product Categories Chart */}
            <div className="border rounded-md p-3 md:p-4 flex flex-col">
              <h2 className="text-sm md:text-md font-semibold mb-3 md:mb-4">
                Product Categories
              </h2>
              <div className="flex-1 min-h-[250px] flex items-center justify-center">
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [value, props.payload.name]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-gray-500">No category data available</div>
                )}
              </div>
            </div>
          </div>
          
          {/* Recent Orders Summary */}
          <div className="border rounded-md p-3 md:p-4 flex-1 flex flex-col">
            <h2 className="text-sm md:text-md font-semibold mb-3 md:mb-4">
              Sales Overview
            </h2>
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toFixed(2)}`, 'Revenue']} />
                  <Bar dataKey="sales" fill="#8884d8" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
