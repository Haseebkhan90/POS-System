import React from 'react';
import { Save, Store, User, CreditCard, Printer, Bell } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button className="px-6 py-4 text-indigo-600 border-b-2 border-indigo-600 font-medium">
              Store
            </button>
            <button className="px-6 py-4 text-gray-500 hover:text-gray-700 font-medium">
              Users
            </button>
            <button className="px-6 py-4 text-gray-500 hover:text-gray-700 font-medium">
              Payment
            </button>
            <button className="px-6 py-4 text-gray-500 hover:text-gray-700 font-medium">
              Receipts
            </button>
            <button className="px-6 py-4 text-gray-500 hover:text-gray-700 font-medium">
              Notifications
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          <div className="max-w-3xl">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <Store size={24} />
              </div>
              <h2 className="ml-3 text-xl font-semibold">Store Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  defaultValue="Fashion Boutique"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="contact@fashionboutique.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="text"
                  defaultValue="www.fashionboutique.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                defaultValue="123 Fashion Street"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  defaultValue="New York"
                  placeholder="City"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  defaultValue="NY"
                  placeholder="State"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  defaultValue="10001"
                  placeholder="ZIP"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Logo
              </label>
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                  <Store size={32} className="text-gray-500" />
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  Upload New Logo
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Hours
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-24 text-sm text-gray-500">Monday</span>
                  <input
                    type="text"
                    defaultValue="9:00 AM"
                    className="w-24 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                  />
                  <span className="mx-2">-</span>
                  <input
                    type="text"
                    defaultValue="6:00 PM"
                    className="w-24 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                  />
                </div>
                
                <div className="flex items-center">
                  <span className="w-24 text-sm text-gray-500">Tuesday</span>
                  <input
                    type="text"
                    defaultValue="9:00 AM"
                    className="w-24 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                  />
                  <span className="mx-2">-</span>
                  <input
                    type="text"
                    defaultValue="6:00 PM"
                    className="w-24 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                  />
                </div>
                
                {/* More days would go here */}
                
                <div className="flex items-center">
                  <span className="w-24 text-sm text-gray-500">Sunday</span>
                  <input
                    type="text"
                    defaultValue="Closed"
                    className="w-24 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                  />
                  <span className="mx-2">-</span>
                  <input
                    type="text"
                    defaultValue="Closed"
                    className="w-24 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                <Save size={18} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;