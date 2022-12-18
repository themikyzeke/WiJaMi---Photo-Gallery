import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { Gallery } from "./Gallery";
import { Navbar } from "./Navbar";
import React from 'react';

function App() {
  return (
    <><React.Fragment>
      <Navbar />
    </React.Fragment>
    
    <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Gallery />} />
          </Routes>
        </Router>
      </div></>
  );
}

export default App;
