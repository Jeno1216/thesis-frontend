import React, { createContext, useEffect, useState } from "react" 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from "./Home";
import NavBar from "./NavBar";
import HeatMap from "./Heatmap";
import axios from 'axios';
import Register from "./Register";
import Login from "./Login";
import About from "./About";
import Analytics from "./Analytics";
import Dashboard from "./admin/Dashboard";

function App() {

  const username = localStorage.getItem('username');
  console.log(username);
  return (
    <>
      <BrowserRouter>
      {location.pathname !== '/dashboard' && location.pathname !== '/login'  && location.pathname !== '/register' && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heatmap" element={<HeatMap />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
