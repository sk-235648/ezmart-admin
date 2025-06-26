// app/dashboard/page.js
"use client";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, ShoppingBag, Users } from "lucide-react";

const data = [
  { month: "Jan", sales: 60 },
  { month: "Feb", sales: 275.93 },
  { month: "Mar", sales: 120 },
  { month: "Apr", sales: 140 },
  { month: "May", sales: 386 },
  { month: "Jun", sales: 0 },
  { month: "Jul", sales: 0 },
  { month: "Aug", sales: 0 },
  { month: "Sep", sales: 0 },
  { month: "Oct", sales: 0 },
  { month: "Nov", sales: 0 },
  { month: "Dec", sales: 0 },
];

export default function Dashboard() {
  return (
    <div className="flex-1 p-4 md:p-6 bg-[#fdfcf9] flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base">Kristina Evans</span>
          <img
            src="/avatar.jpg"
            alt="Kristina"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="border rounded-md p-3 md:p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm md:text-md font-semibold">Total Revenue</h2>
            <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
          </div>
          <p className="text-lg md:text-xl font-semibold mt-1 md:mt-2">
            $ 275.93
          </p>
        </div>
        <div className="border rounded-md p-3 md:p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm md:text-md font-semibold">Total Orders</h2>
            <ShoppingBag className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
          </div>
          <p className="text-lg md:text-xl font-semibold mt-1 md:mt-2">3</p>
        </div>
        <div className="border rounded-md p-3 md:p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm md:text-md font-semibold">
              Total Customers
            </h2>
            <Users className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
          </div>
          <p className="text-lg md:text-xl font-semibold mt-1 md:mt-2">1</p>
        </div>
      </div>

      {/* Chart */}
      <div className="border rounded-md p-3 md:p-4 flex-1 flex flex-col">
        <h2 className="text-sm md:text-md font-semibold mb-3 md:mb-4">
          Sales Chart ($)
        </h2>
        <div className="flex-1 min-h-[250px] md:min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
            >
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
    </div>
  );
}
