import './App.css';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeView from './views/HomeView/HomeView';

function App() {
  return (
      <div className="App">
          <Header />
          <Routes>
              <Route path="/" element={<HomeView />} />
              {/* <Route path="Where" element={<WhereView />} />
              <Route path="What" element={<WhatView />} />
              <Route path="Who" element={<WhoView />} /> */}
          </Routes>
          <Footer />
      </div>
  );
}

export default App;
