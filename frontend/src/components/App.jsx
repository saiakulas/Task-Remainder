import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './Index';
import Home from './Home';
import Login from './Login';
import Register from './Register';


function App() {
  return (
    <div style={{ marginTop: '-3.5rem' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
