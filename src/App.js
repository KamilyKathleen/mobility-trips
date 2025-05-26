import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ConsultaDados from './components/ConsultaDados';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consulta" element={<ConsultaDados />} />
      </Routes>
    </Router>
  );
}

export default App;
