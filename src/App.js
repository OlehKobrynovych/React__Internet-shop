import './App.css';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeView from './views/HomeView/HomeView';
import ProductFilter from './components/ProductFilter/ProductFilter';
import AboutUs from './components/AboutUs/AboutUs';

function App() {
  return (
      <div className="App">
          <Header />
          <Routes>
              <Route path="/" element={<HomeView />} />
              {/* <Route path="/catalog/:id" element={<ProductFilter />} /> */}
              {/* <Route path="/:id" element={<ProductFilter />} /> */}
              <Route path="/unisex" element={<ProductFilter />} />
              <Route path="/man" element={<ProductFilter />} />
              <Route path="/woman" element={<ProductFilter />} />
              <Route path="/children" element={<ProductFilter />} />
              <Route path="/collections" element={<ProductFilter />} />
              <Route path="/discounts" element={<ProductFilter />} />
              <Route path="/about" element={<AboutUs />} />
              
              {/* <Route path="*" element={<PageNotFound />} /> */}
              {/* <Route path="*" element={<HomeView />} /> */}
          </Routes>
          <Footer />
      </div>
  );
}

export default App;
