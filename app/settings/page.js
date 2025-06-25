// app/settings/page.js
"use client";
import { FiUser, FiMail, FiLock, FiBell, FiCreditCard } from "react-icons/fi";

export default function SettingsPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 bg-[#fdfcf9] flex flex-col overflow-hidden rounded-none sm:rounded-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h2 className="text-xl sm:text-2xl font-semibold">Settings</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base">Kristina Evans</span>
          <img
            src="/avatar.jpg"
            alt="Kristina"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
          />
        </div>
      </div>

      <div className="flex-1 space-y-4 sm:space-y-6 overflow-y-auto">
        {/* Navigation Tabs - Mobile */}
        <div className="block sm:hidden overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {['Profile', 'Security', 'Notifications', 'Billing'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                  tab === 'Profile' 
                    ? 'bg-black text-white' 
                    : 'bg-white border text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Sidebar Navigation - Desktop */}
          <div className="hidden sm:block w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg border space-y-1">
              {[
                { name: 'Profile', icon: <FiUser className="w-4 h-4" /> },
                { name: 'Security', icon: <FiLock className="w-4 h-4" /> },
                { name: 'Notifications', icon: <FiBell className="w-4 h-4" /> },
                { name: 'Billing', icon: <FiCreditCard className="w-4 h-4" /> }
              ].map((item) => (
                <button
                  key={item.name}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left ${
                    item.name === 'Profile'
                      ? 'bg-gray-100 font-medium'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            {/* Profile Section */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <FiUser className="text-gray-500 w-5 h-5" />
                <h3 className="font-semibold text-lg">Profile Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Kristina"
                    className="w-full px-3 py-2 border rounded-md text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Evans"
                    className="w-full px-3 py-2 border rounded-md text-sm sm:text-base"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      defaultValue="kristina@example.com"
                      className="flex-1 px-3 py-2 border rounded-md text-sm sm:text-base"
                    />
                    <button className="px-3 py-2 text-sm border rounded-md whitespace-nowrap">
                      Verify
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Photo
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img
                      src="/avatar.jpg"
                      alt="Profile"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full"
                    />
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button className="px-3 py-1.5 text-sm border rounded-md whitespace-nowrap">
                        Change Photo
                      </button>
                      <button className="px-3 py-1.5 text-sm text-red-600 whitespace-nowrap">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                <button className="px-4 py-2 border rounded-md">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-black text-white rounded-md">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Delete Account Section */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-red-100">
              <h3 className="font-semibold text-red-600 mb-3 sm:mb-4">Delete Account</h3>
              
              <div className="p-3 sm:p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">Permanently delete your account</h4>
                    <p className="text-xs sm:text-sm text-red-600 mt-1">
                      This action cannot be undone. All your data will be permanently removed.
                    </p>
                  </div>
                  <button className="px-4 py-2 text-sm text-white bg-red-600 rounded-md whitespace-nowrap mt-2 sm:mt-0">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}