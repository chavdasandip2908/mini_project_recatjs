import './App.css';
// imoort router 
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import components
import Home from "./mycomponents/Home";
import ExpenseTracker from "./mycomponents/Expense-Tracker/ExpenseTracker";
import StopWatch from "./mycomponents/StopWatch/StopWatch";
import ImageGallery from './mycomponents/ImageGallery/ImageGallery';
import KrishiCash from './mycomponents/KrishiCash/Dashboard/index';


import SideBar from "./mycomponents/SideBar/SideBar";
import Product from './mycomponents/KrishiCash/Dashboard/Product';

function App() {
  console.log(process.env.REACT_APP_PIXEBAY_API_KEY);
  return (
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/stop-watch" element={<StopWatch />} />
          <Route path="/image-gallery" element={<ImageGallery />} />
          <Route path="/krishi-cash" element={<KrishiCash/>} />
          <Route path="/krishi-cash/produt-details" element={<Product/>} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;
