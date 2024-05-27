import React from 'react';

import Login from '../../AuthPageComponents/Login/Login';
import ibmLogo from "../../assets/images/IBM_LOGO.png";
import Carosal from '../../AuthPageComponents/carosal';
import "./Auth.css"
const LoginPage = () => {
  return (
    <div className='vh-100 w-100 d-flex position-relative '>
      <div className='ibm-logo-nav position-absolute'>
        <img src={ibmLogo} alt='Ibm logo' />
      </div>

      <Carosal />

      <div className='w-100 d-flex justify-content-center align-items-center'>
        <Login />
      </div>
    </div>
  );
}

export default LoginPage;
