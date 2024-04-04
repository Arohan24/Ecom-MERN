import React from 'react';

import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/Home.jsx';
import NavBar from './components/Header/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer.jsx';
import ContactForm from './components/Contact/ContactForm.jsx';
import productDetails from './components/Product/ProductDetails.jsx'
import LoginSignUp from "./components/User/LoginSignUp.jsx";
import ProductDetails from './components/Product/ProductDetails.jsx';

function App() {

  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<h1>About Page</h1>}/>
          <Route path="product/:id" element={<ProductDetails/>}/>
          <Route path="contact" element={<ContactForm/>}/>
          <Route path="login-signup" element={<LoginSignUp/>}/>
          <Route path="cart" element={<h1>Cart Page</h1>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
