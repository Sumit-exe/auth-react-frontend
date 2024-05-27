import React, { useEffect, useState } from 'react'
import authService from '../../services/auth.js';
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setLoggedInUserData, setToken } from '../../redux/slices/userSlice.js';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [employee, setEmployee] = useState({ employeeEmail: '', employeePassword: '' });

 
  const handleLogin = async (e) => {
    e.preventDefault();

    await authService.handleLogin(employee)
      .then((response) => {
        console.log("Login successful", response);

        const { token, employee } = response;

        // Store token and user data in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(employee));

        dispatch(setToken(token))
        dispatch(setLoggedInUserData(employee))
        toast.success("login successful")
        setTimeout(() => {
          navigate('/work-location')
        }, 1000)
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        toast.error("Invalid credentials")
      })

  }

  return (
    <div className='login-form d-flex justify-content-center w-100'>
      <div className='w-100 d-flex flex-column align-items-center gap-4'>
        <form onSubmit={handleLogin} className='w-50 login-form login-form-container' >
          <h3 className='text-center py-2'>LOGIN</h3>
          <label> Email</label>
          <input className='w-100 p-1 mb-3' required onChange={(e) => { setEmployee({ ...employee, employeeEmail: e.target.value }) }} />
          <label>Password</label>
          <input className='w-100 p-1 mb-3' required onChange={(e) => { setEmployee({ ...employee, employeePassword: e.target.value }) }} />
          <p className='fw-medium forgot-password'>Forgot Password ?</p>
          <input type='submit' value='Login' className='w-100 login-btn py-1' />
        </form>
        <button onClick={() => navigate("/register")} className='border-0 register-tab '>Haven't registered yet? <span className='fw-medium '>Register Here</span></button>

      </div>
    </div>
  )
}

export default Login