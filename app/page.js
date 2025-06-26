"use client";
import { useState } from "react";

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name} - ${value}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-gray-200">
      {showLogin && (
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Welcome To Ezmart</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                onChange={handleChange}
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                name="password"
                onChange={handleChange}
                type="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
