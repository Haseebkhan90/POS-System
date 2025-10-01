import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, BarChart2, Home, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-[#2e3e4e] text-white h-screen w-64 fixed left-0 top-0 shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-10">
          <ShoppingBag size={28} />
          <h1 className="text-xl font-bold">Fashion POS</h1>
        </div>
        
        <ul className="space-y-2">
          <li>
            <Link 
              to="/" 
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive('/') ? 'bg-indigo-800' : 'hover:bg-indigo-600'
              }`}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/pos" 
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive('/pos') ? 'bg-indigo-800' : 'hover:bg-indigo-600'
              }`}
            >
              <ShoppingBag size={20} />
              <span>Point of Sale</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/sales" 
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive('/sales') ? 'bg-indigo-800' : 'hover:bg-indigo-600'
              }`}
            >
              <BarChart2 size={20} />
              <span>Sales Summary</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/settings" 
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive('/settings') ? 'bg-indigo-800' : 'hover:bg-indigo-600'
              }`}
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
            <span className="font-bold">AS</span>
          </div>
          <div>
            <p className="font-medium">Admin</p>
            <p className="text-xs text-indigo-200">Store Manager</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;