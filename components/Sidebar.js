"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { name: "Dashboard", path: "/" },
    { name: "Orders", path: "/orders" },
    { name: "Payments", path: "/payments" },
    { name: "Customers", path: "/customers" },
    { name: "Products", path: "/products" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Mobile menu button - now on the right side */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-[#0f1114] text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - now slides from right on mobile */}
      <aside
        className={`w-64 bg-[#0f1114] text-white p-6 space-y-4 fixed h-full transition-all duration-300 z-40
          ${isOpen ? "right-0" : "-right-64"} md:left-0 md:right-auto`}
      >
        <h1 className="text-xl font-bold">EZmart</h1>
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              href={tab.path}
              onClick={() => setIsOpen(false)}
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

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}