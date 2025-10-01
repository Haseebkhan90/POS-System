import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PointOfSale from './pages/PointOfSale';
import SalesSummary from './pages/SalesSummary';
import Settings from './pages/Settings';
import { SalesProvider } from './context/SalesContext';

function App() {
  return (
    <SalesProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-100">
          <Navbar />
          <div className="flex-1 ml-64">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pos" element={<PointOfSale />} />
              <Route path="/sales" element={<SalesSummary />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </Router>
    </SalesProvider>
  );
}

export default App;