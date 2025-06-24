// app/page.js
'use client';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DollarSign, ShoppingBag, Users } from 'lucide-react';

const data = [
  { month: 'Jan', sales: 0 },
  { month: 'Feb', sales: 275.93 },
  { month: 'Mar', sales: 0 },
  { month: 'Apr', sales: 0 },
  { month: 'May', sales: 0 },
  { month: 'Jun', sales: 0 },
  { month: 'Jul', sales: 0 },
  { month: 'Aug', sales: 0 },
  { month: 'Sep', sales: 0 },
  { month: 'Oct', sales: 0 },
  { month: 'Nov', sales: 0 },
  { month: 'Dec', sales: 0 },
];

export default function Dashboard() {
  return (
    <div className="flex-1 p-6 bg-[#fdfcf9] flex flex-col overflow-hidden rounded-2xl">
      <h1 className="text-2xl font-semibold mb-6 border-b pb-2">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="border rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-md font-semibold">Total Revenue</h2>
            <DollarSign className="h-5 w-5 text-gray-500" />
          </div>
          <p className="text-xl font-semibold mt-2">$ 275.93</p>
        </div>
        <div className="border rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-md font-semibold">Total Orders</h2>
            <ShoppingBag className="h-5 w-5 text-gray-500" />
          </div>
          <p className="text-xl font-semibold mt-2">3</p>
        </div>
        <div className="border rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-md font-semibold">Total Customers</h2>
            <Users className="h-5 w-5 text-gray-500" />
          </div>
          <p className="text-xl font-semibold mt-2">1</p>
        </div>
      </div>

      {/* Chart */}
      <div className="border rounded-md p-4">
        <h2 className="text-md font-semibold mb-4">Sales Chart ($)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
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
  );
}