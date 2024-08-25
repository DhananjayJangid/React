// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Calendar from './Calendar';
import './App.css'; // Optional, for global styles

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calendar" element={<Calendar />} /> {/* Example route */}
          <Route path="/" element={<Signup/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
