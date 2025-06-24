// components/Sidebar.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const tabs = [
    { name: "Dashboard", path: "/" }, // Changed from "/dashboard" to "/"
    { name: "Orders", path: "/orders" },
    { name: "Payments", path: "/payments" },
    { name: "Customers", path: "/customers" },
    { name: "Products", path: "/products" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-[#0f1114] text-white p-6 space-y-4">
      <h1 className="text-xl font-bold">ProfitPulse</h1>
      <nav className="space-y-2">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            href={tab.path}
            className={`py-2 px-4 rounded-lg cursor-pointer transition-colors duration-200 block ${
              pathname === tab.path
                ? "bg-white text-black"
                : "hover:bg-gray-800"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
      <button className="text-sm text-gray-400 mt-8">Log out</button>
    </aside>
  );
}