// app/payments/page.js
"use client";
import { useState, useEffect } from "react";
import { FiDownload, FiUpload, FiDollarSign } from "react-icons/fi";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0
  });

  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await fetch('/api/admin/payments');
        const data = await response.json();
        
        if (data.success) {
          // Format the data for display
          const formattedPayments = data.payments.map(payment => ({
            id: `#PAY-${payment._id.substring(0, 4)}`,
            type: "Income", // Assuming all payments are income for now
            amount: `₹${payment.amount?.toFixed(2)}`,
            status: payment.status,
            date: new Date(payment.paymentDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            method: payment.method,
            rawPayment: payment // Keep the original payment data
          }));
          
          setPayments(formattedPayments);
          
          // Calculate summary
          const totalIncome = data.payments.reduce((sum, payment) => 
            payment.status === 'Paid' ? sum + (payment.amount || 0) : sum, 0);
          
          setSummary({
            totalIncome: totalIncome,
            totalExpenses: 0, // Assuming no expenses for now
            netBalance: totalIncome
          });
        } else {
          setError('Failed to fetch payments');
        }
      } catch (err) {
        setError('Error connecting to the server');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, []);
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
          { title: "Total Income", value: `₹${summary.totalIncome.toFixed(2)}`, icon: <FiDownload className="h-4 w-4 md:h-5 md:w-5 text-green-500" />, color: "green" },
          { title: "Total Expenses", value: `₹${summary.totalExpenses.toFixed(2)}`, icon: <FiUpload className="h-4 w-4 md:h-5 md:w-5 text-red-500" />, color: "red" },
          { title: "Net Balance", value: `₹${summary.netBalance.toFixed(2)}`, icon: <FiDollarSign className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />, color: "blue" }
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
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading payments...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-red-500">{error}</p>
            </div>
          ) : payments.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p>No payments found</p>
            </div>
          ) : (
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
                          payment.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "Failed"
                            ? "bg-red-100 text-red-800"
                            : payment.status === "Refunded"
                            ? "bg-blue-100 text-blue-800"
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
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-4 md:mt-6 border rounded-lg p-3 md:p-4">
        <h3 className="font-semibold text-sm md:text-base mb-2 md:mb-3">Recent Activity</h3>
        <div className="space-y-2 md:space-y-3">
          {loading ? (
            <p>Loading recent activity...</p>
          ) : error ? (
            <p className="text-red-500">Failed to load recent activity</p>
          ) : payments.length === 0 ? (
            <p>No recent activity</p>
          ) : (
            // Display the most recent 2 payments as activities
            payments.slice(0, 2).map((payment, index) => {
              const timeAgo = new Date(payment.rawPayment.paymentDate);
              const now = new Date();
              const diffTime = Math.abs(now - timeAgo);
              const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
              const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
              
              let timeDisplay;
              if (diffDays > 0) {
                timeDisplay = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
              } else if (diffHours > 0) {
                timeDisplay = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
              } else {
                timeDisplay = 'Just now';
              }
              
              return (
                <div key={index} className="flex items-start">
                  <div className={`flex-shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 flex items-center justify-center`}>
                    <FiDollarSign className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  </div>
                  <div className="ml-2 md:ml-3">
                    <p className="text-xs md:text-sm font-medium">
                      {payment.status === 'Paid' ? 'Payment received' : 
                       payment.status === 'Pending' ? 'Payment pending' : 
                       payment.status === 'Failed' ? 'Payment failed' : 
                       'Payment processed'}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {payment.amount} via {payment.method}
                    </p>
                    <p className="text-xs text-gray-400">{timeDisplay}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}