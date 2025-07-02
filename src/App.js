import './App.css';
// imoort router 
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import components
import Home from "./mycomponents/Home";
import ExpenseTracker from "./mycomponents/Expense-Tracker/ExpenseTracker";
import StopWatch from "./mycomponents/StopWatch/StopWatch";
import ImageGallery from './mycomponents/ImageGallery/ImageGallery';
import KrishiCash from './mycomponents/KrishiCash/Dashboard/Index';
import KrishiCashForms from './mycomponents/KrishiCash/Forms/Index';
import UserForm from './mycomponents/MutiStepForm/UserForm';



import SideBar from "./mycomponents/SideBar/SideBar";
import Product from './mycomponents/KrishiCash/Dashboard/Product';
import Test from './mycomponents/KrishiCash/Dashboard/Test';

function App() {
  return (
    
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/stop-watch" element={<StopWatch />} />
          <Route path="/image-gallery" element={<ImageGallery />} />
          <Route path="/krishi-cash" element={<KrishiCashForms/>} />
          <Route path="/krishi-cash/home" element={<KrishiCash/>} />
          <Route path="/krishi-cash/produt-details" element={<Product/>} /> 
          <Route path="/muti-step-form" element={<UserForm/>} /> 
          <Route path="*" element={<Home/>}  /> 

        </Routes>
      </BrowserRouter>
  );
}

export default App;
