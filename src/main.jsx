import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Base from "./pages/base";
import Profile from "./pages/Profile";
import Channels from "./pages/Channels";
import Channel from "./pages/Channel";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Base content={Dashboard} />} />
        <Route path="/dashboard/profile" element={<Base content={Profile} />} />
        <Route path="/dashboard/channels" element={<Base content={Channels} />} />
        <Route path="/dashboard/channels/:channelId" element={<Base content={Channel} />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
