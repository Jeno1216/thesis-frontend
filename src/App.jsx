import React, { createContext, useEffect, useState } from "react" 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from "./Home";
import NavBar from "./NavBar";
import HeatMap from "./Heatmap";
import axios from 'axios';

function App() {

  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heatmap" element={<HeatMap />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
