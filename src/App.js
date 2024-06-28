import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterShipmentPage from './pages/RegisterShipmentPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShipperPage from './pages/ShipperMyPage';
import CompanyMyPage from './pages/CompanyMyPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import DriverMyPage from './pages/DriverMyPage';
import ReactTest from './Test-Not_Use/Test_MyPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register-shipment" element={<RegisterShipmentPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shipper" element={<ShipperPage />} />
        <Route path="/company" element={<CompanyMyPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/driver" element={<DriverMyPage />} />
        <Route path="/reacttest" element={<ReactTest />} />
      </Routes>
    </Router>
  );
}

export default App;
