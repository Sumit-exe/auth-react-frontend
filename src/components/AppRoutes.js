import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Work from './Work/Work';
import LoginPage from '../pages/Auth/loginPage';
import Analysis from '../pages/Analysis';
import LogOut from '../pages/LogOut';
import RegisterPage from '../pages/Auth/registerPage';
import Profile from '../pages/profile';
import AllEmployees from '../pages/AllEmployees';

const AppRoutes = () => {

  
  return (
    
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/work-location' element={<Work />} />
        <Route path='/analytics' element={<Analysis />} />
        <Route path='/all-emps' element={<AllEmployees />} />
        <Route path='/logout' element={<LogOut />} />
      </Routes>
  

  )
}

export default AppRoutes