import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import Home from './components/Home';
import Kolcsonzes from './components/Kolcsonzes';
import KolcsonzesTorles from './components/KolcsonzesTorles';
import UjKonyv from './components/UjKonyv';
import './App.css'

const App = () => {
    return (
        <Router>
            <CustomNavbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/kolcsonzes" element={<Kolcsonzes />} />
                <Route path="/kolcsonzestorles" element={<KolcsonzesTorles />} />
                <Route path="/ujkonyv" element={<UjKonyv />} />
            </Routes>
        </Router>
    );
};

export default App;
