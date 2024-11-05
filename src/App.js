import './App.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route, BrowserRouter,
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import Test from './components/Test';

function App() {
  return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Router>
        <Navbar/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/test" element={<Test />} />
          </Routes>
        </div>
      </Router>
      </BrowserRouter>
  )
}

export default App;
