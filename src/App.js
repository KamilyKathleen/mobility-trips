import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ConsultaDados from './components/ConsultaDados';
import IncluirEvento from './components/IncluirEvento';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consulta" element={<ConsultaDados />} />
        <Route path="/inclusao" element={<IncluirEvento />} />
      </Routes>
    </Router>
  );
}

export default App;
