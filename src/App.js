import './App.css';
// imoort router 
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import components
import Home from "./mycomponents/Home";
import ExpenseTracker from "./mycomponents/Expense-Tracker/ExpenseTracker";
import StopWatch from "./mycomponents/StopWatch/StopWatch";
import ImageGallery from './mycomponents/ImageGallery/ImageGallery';

import SideBar from "./mycomponents/SideBar/SideBar";

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
        </Routes>
      </BrowserRouter>
  );
}

export default App;
