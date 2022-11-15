import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './style/style.css';
import axios from 'axios';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import LoginOrRegistry from './components/LoginOrRegistry';
import SearchPage from './components/SearchPage';
import { User } from './model/User';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './store/interfaces';
import Profile from './components/Profile';
import SingleCard from './components/SingleCard';
import SellerPage from './components/SellerPage';
import ShoppingCart from './components/ShoppingCart';
import LoadingIndicator from './components/LoadingIndicator';
import CurrencyConversion from './components/CurrencyCoversion';
import { HotSales } from './store/action';
import TopSales from './components/TopSales';
import CardsForHome from './components/CardForHome';


function App() {


  return (
    <div className='Main'>
      <BrowserRouter>
      <LoadingIndicator />
      <Header/>

      
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="Home" element={<Home/>} />
          <Route path="Login" element={<LoginOrRegistry isLogin={true} />} />  
          <Route path="Register" element={<LoginOrRegistry isLogin={false} />} />  
          <Route path="Profile" element={<Profile />} />  
          <Route path="Search" element={<SearchPage />} />  
          <Route path="SingleCard" element={<SingleCard />} />  
          <Route path="SellerPage" element={<SellerPage />} />  
          <Route path="ShoppingCart" element={<ShoppingCart />} />  
          <Route path="CurrencyConversion" element={<CurrencyConversion />} /> 
          <Route path="TopSales" element={<TopSales/>} />
          <Route path="CardsForHome" element={<CardsForHome/>} />
        </Routes>
      </BrowserRouter>
    </div>


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <h1>
    //       Card Shop
    //     </h1>



    //   </header>
    // </div>
  );
}

export default App;
