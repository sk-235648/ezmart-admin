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
    <div className="flex-1 p-6 bg-[#fdfcf9] flex flex-col overflow-hidden rounded-2xl">
      <div className="flex justify-between mb-4 shrink-0">
        <h2 className="text-2xl font-semibold">Payments</h2>
        <div className="flex items-center gap-2">
          <span>Kristina Evans</span>
          <img
            src="/avatar.jpg"
            alt="Kristina"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="border rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-md font-semibold">Total Income</h2>
            <FiDownload className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-xl font-semibold mt-2">$2,519.00</p>
        </div>
        <div className="border rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-md font-semibold">Total Expenses</h2>
            <FiUpload className="h-5 w-5 text-red-500" />
          </div>
          <p className="text-xl font-semibold mt-2">$450.00</p>
        </div>
        <div className="border rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-md font-semibold">Net Balance</h2>
            <FiDollarSign className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-xl font-semibold mt-2">$2,069.00</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        payment.type === "Income"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        payment.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.method}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FiDollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Payment received</p>
              <p className="text-sm text-gray-500">$1,620.00 from James Miller</p>
              <p className="text-xs text-gray-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <FiUpload className="h-5 w-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Payment sent</p>
              <p className="text-sm text-gray-500">$450.00 to Supplier Inc</p>
              <p className="text-xs text-gray-400">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}