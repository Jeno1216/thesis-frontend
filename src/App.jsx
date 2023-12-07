import React, { createContext, useEffect, useState } from "react" 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from "./Home";
import NavBar from "./NavBar";
import HeatMap from "./Heatmap";
import axios from 'axios';
import Login from "./Login";
import About from "./About";
import Analytics from "./Analytics";

function App() {

  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heatmap" element={<HeatMap />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/analytics" element={<Analytics />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
