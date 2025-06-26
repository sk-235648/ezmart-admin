// app/payments/page.js
"use client";
import { FiDownload, FiUpload, FiDollarSign } from "react-icons/fi";

const payments = [
  {
    id: "#PAY-7890",
    type: "Income",
    amount: "$1,620.00",
    status: "Completed",
    date: "Jan 8, 2024",
    method: "Credit Card",
  },
  {
    id: "#PAY-6789",
    type: "Expense",
    amount: "$450.00",
    status: "Completed",
    date: "Jan 5, 2024",
    method: "Bank Transfer",
  },
  {
    id: "#PAY-5678",
    type: "Income",
    amount: "$899.00",
    status: "Pending",
    date: "Jan 3, 2024",
    method: "PayPal",
  },
];


export default function PaymentsPage() {
  return (
    <div className="flex-1 p-4 md:p-6 bg-[#fdfcf9] flex flex-col overflow-hidden rounded-none md:rounded-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-xl md:text-2xl font-semibold">Payments</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base">Kristina Evans</span>
          <img
            src="/avatar.jpg"
            alt="Kristina"
            className="w-7 h-7 md:w-8 md:h-8 rounded-full"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
        {[
          { title: "Total Income", value: "$2,519.00", icon: <FiDownload className="h-4 w-4 md:h-5 md:w-5 text-green-500" />, color: "green" },
          { title: "Total Expenses", value: "$450.00", icon: <FiUpload className="h-4 w-4 md:h-5 md:w-5 text-red-500" />, color: "red" },
          { title: "Net Balance", value: "$2,069.00", icon: <FiDollarSign className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />, color: "blue" }
        ].map((card, index) => (
          <div key={index} className="border rounded-md p-3 md:p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm md:text-md font-semibold">{card.title}</h2>
              {card.icon}
            </div>
            <p className="text-lg md:text-xl font-semibold mt-1 md:mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Payments Table */}
      <div className="border rounded-lg overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Payment ID", "Type", "Amount", "Status", "Date", "Method"].map((header) => (
                  <th 
                    key={header}
                    className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.id}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        payment.type === "Income"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.type}
                    </span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    {payment.amount}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        payment.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    {payment.date}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    {payment.method}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-4 md:mt-6 border rounded-lg p-3 md:p-4">
        <h3 className="font-semibold text-sm md:text-base mb-2 md:mb-3">Recent Activity</h3>
        <div className="space-y-2 md:space-y-3">
          {[
            { 
              type: "Payment received", 
              amount: "$1,620.00 from James Miller", 
              time: "2 hours ago",
              icon: <FiDollarSign className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />,
              bg: "bg-blue-100"
            },
            { 
              type: "Payment sent", 
              amount: "$450.00 to Supplier Inc", 
              time: "1 day ago",
              icon: <FiUpload className="h-4 w-4 md:h-5 md:w-5 text-red-600" />,
              bg: "bg-red-100"
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-start">
              <div className={`flex-shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full ${activity.bg} flex items-center justify-center`}>
                {activity.icon}
              </div>
              <div className="ml-2 md:ml-3">
                <p className="text-xs md:text-sm font-medium">{activity.type}</p>
                <p className="text-xs md:text-sm text-gray-500">{activity.amount}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}