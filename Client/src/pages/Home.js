import React from 'react';
import '../App.css'
import HeroSection from '../components/HeroSection/HeroSection.js';
import Cards from '../components/Card/Cards.js';
import Footer from '../components/Footer/Footer.js'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { loginSuccess } from '../ReduxToolkit/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle } from '../ReduxToolkit/action.js';



function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userProfile = JSON.parse(decodeURIComponent(queryParams.get('user')));
  const dispatch = useDispatch();



  if(userProfile){
    console.log("inside the login sucess")
    dispatch(loginSuccess(userProfile))
  }

  return (
    <>
              <HeroSection />
                 <Cards />
            </>
  );
}

export default Home;
















