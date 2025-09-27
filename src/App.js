import React from 'react';
import './App.css';

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';

function App() {
  return (
    <div className="App">
      <Menu/>
      <Hero/>
      <HomePage/>
      <Footer/>
    </div>
  );
}

export default App;
