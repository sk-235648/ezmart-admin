// app/settings/page.js
"use client";
import { FiUser } from "react-icons/fi";

export default function SettingsPage() {
  return (
    <div className="flex-1 p-6 bg-[#fdfcf9] flex flex-col overflow-hidden rounded-2xl">
      <div className="flex justify-between mb-6 shrink-0">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <div className="flex items-center gap-2">
          <span>Kristina Evans</span>
          <img
            src="/avatar.jpg"
            alt="Kristina"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-3 mb-6">
            <FiUser className="text-gray-500" />
            <h3 className="font-semibold">Profile Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                defaultValue="Kristina"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                defaultValue="Evans"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue="kristina@example.com"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <img
                  src="/avatar.jpg"
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
                <div className="space-x-2">
                  <button className="px-3 py-1.5 text-sm border rounded-md">
                    Change
                  </button>
                  <button className="px-3 py-1.5 text-sm text-red-600">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button className="px-4 py-2 bg-black text-white rounded-md">
              Save Changes
            </button>
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="bg-white p-6 rounded-lg border border-red-100">
          <h3 className="font-semibold text-red-600 mb-4">Delete Account</h3>
          
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="font-medium">Permanently delete your account</h4>
                <p className="text-sm text-red-600 mt-1">
                  This action cannot be undone. All your data will be permanently removed.
                </p>
              </div>
              <button className="px-4 py-2 text-sm text-white bg-red-600 rounded-md whitespace-nowrap">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}