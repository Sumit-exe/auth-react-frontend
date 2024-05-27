import React from 'react';
import "./Auth.css"
import Register from '../../AuthPageComponents/Register/Register';
import ibmLogo from "../../assets/images/IBM_LOGO.png";
import Carosal from '../../AuthPageComponents/carosal';
const RegisterPage = () => {
    return (
        <div className='vh-100 w-100 d-flex position-relative '>
      <div className='ibm-logo-nav position-absolute'>
        <img src={ibmLogo} alt='Ibm logo' />
      </div>


      <div className='w-100 d-flex justify-content-center align-items-center'>
        <Register />
      </div>
      <Carosal />
    </div>
    );
}

export default RegisterPage;
