import React, { useState } from 'react';
import authService from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import attendanceService from '../../services/attendance.service';
import axios from 'axios';
import "./Register.css"
const Register = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    employeeFullName: '',
    employeeEmail: '',
    employeePhoneNo: '',
    employeeAadhar: '',
    employeePassword: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [subject, setSubject] = useState('NEW REGISTRATION');
  const [text, setText] = useState('Hi Admin, new user registered!');
  const [message, setMessage] = useState('');
  const validation = () => {
    if (!employee || !employee.employeeFullName || !employee.employeeEmail || !employee.employeePhoneNo || !employee.employeeAadhar || !employee.employeePassword || !confirmPassword) {
      setErrorMsg("All fields Required.");
      return false;
    }
    if (employee.employeePassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return false;
    }
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    if (!validateEmail(employee.employeeEmail)) {
      setErrorMsg("Enter Valid Email.");
      return false;
    }
    if (employee.employeePhoneNo.length !== 10) {
      setErrorMsg("Enter Valid Phone Number.");
      return false;
    }
    if (employee.employeeAadhar.length !== 12) {
      setErrorMsg("Enter Valid Aadhar number.");
      return false;
    }
    return true;
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        const response = await authService.handleRegister(employee);
        console.log("Register successful", response);
        await attendanceService.handleAddAttendance({ ...response, workDetails: [] });
        console.log("Attendance added successfully");
        toast.success("Registered Successfully !!! Navigating to Login Page");
        // Set email subject and text
        setSubject(`New Employee Registration ${employee.employeeFullName}`);
        setText(`Hi Admin, a new user has registered.\n\nName: ${employee.employeeFullName}\nEmail: ${employee.employeeEmail}`);
        // Send the email
        await sendEmail();
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } catch (error) {
        setErrorMsg(error.response);
        console.error("Error registering:", error);
        toast.error("Error Registering");
      }
    } else {
      toast.warning(errorMsg);
    }
  };
  const sendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:8000/send-mail', {
        subject,
        text
      });
      console.log(response);
      console.log(response.data);
      if (response.data.success) {
        setMessage('Email sent successfully!');
      } else {
        setMessage('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage('Failed to send email.');
    }
  };
  return (
    <div className='d-flex justify-content-center align-items-center w-100'>
      <div className='w-100 d-flex flex-column align-items-center gap-3'>
        <form onSubmit={handleRegister} className='w-75 login-form'>
          <h3 className='text-center py-2'>SIGN UP</h3>
          <label>Enter Full Name</label>
          <input type='text' className='w-100 p-1 mb-3' required onChange={(e) => setEmployee({ ...employee, employeeFullName: e.target.value })} />
          <label>Enter Email</label>
          <input type='email' className='w-100 p-1 mb-3' required onChange={(e) => setEmployee({ ...employee, employeeEmail: e.target.value })} />
          <div className='d-flex gap-2 w-100 phone-aadhaar'>
            <div className='w-50'>
              <label>Enter Phone Number</label>
              <input type='number' className='w-100 p-1 mb-3' required onChange={(e) => setEmployee({ ...employee, employeePhoneNo: e.target.value })} />
            </div>
            <div className='w-50'>
              <label>Enter Aadhar</label>
              <input type='number' className='w-100 p-1 mb-3' required onChange={(e) => setEmployee({ ...employee, employeeAadhar: e.target.value })} />
            </div>
          </div>
          <label>Password</label>
          <input type='password' className='w-100 p-1 mb-3' required onChange={(e) => setEmployee({ ...employee, employeePassword: e.target.value })} />
          <label>Confirm Password</label>
          <input type='password' className='w-100 p-1 mb-3' required onChange={(e) => setConfirmPassword(e.target.value)} />
          <input type='submit' value='SignUp' className='w-100 login-btn py-1' />
          {message && <p>{message}</p>}
        </form>
        <button onClick={() => navigate("/login")} className='border-0 register-tab'>Already Registered? <span className='fw-medium'>Login</span></button>
      </div>
    </div>
  );
};
export default Register;


//=======================================================================

// import React, { useState } from 'react'
// import authService from '../../services/auth';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import attendanceService from '../../services/attendance.service';

// const Register = () => {
//   const navigate = useNavigate()
//   const [employee, setEmployee] = useState({
//     employeeFullName: '',
//     employeeEmail: '',
//     employeePhoneNo: '',
//     employeeAadhar: '',
//     employeePassword: ''
//   });
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [errorMsg, setErrorMsg] = useState('');
//   const validation = () => {

//     if (!employee || !employee.employeeFullName || !employee.employeeEmail || !employee.employeePhoneNo || !employee.employeeAadhar || !employee.employeePassword || !confirmPassword) {
//       setErrorMsg("")
//       setErrorMsg("All fields Required.")
//       return false;
//     }

//     if (employee.employeePassword !== confirmPassword) {
//       setErrorMsg("")
//       setErrorMsg("Passwords does not match.")
//       return false;
//     }

//     function validateEmail(email) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       return emailRegex.test(email);
//     }

//     if (!validateEmail(employee.employeeEmail)) {
//       setErrorMsg("")
//       setErrorMsg("Enter Valid Password.")
//       return false;
//     }

//     if (employee.employeePhoneNo.length !== 10) {
//       setErrorMsg("")
//       setErrorMsg("Enter Valid Phone Number.")
//       return false;
//     }
//     if (employee.employeeAadhar.length !== 12) {
//       setErrorMsg("")
//       setErrorMsg("Enter Valid Aadhar number.")
//       return false;
//     }
//     return true;
//   }
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     console.log(employee);
//     if (validation()) {
//       await authService.handleRegister(employee)
//         .then(async (response) => {
//           console.log("Register successful", response);
//           await attendanceService.handleAddAttendance({...response,workDetails:[]})
//           .then((response) => {
//             console.log(response);
//             toast.success("Registered Successfully !!! Navigating to Login Page")
//             setTimeout(() => {
//               navigate('/login')
//             }, 1000);
//           }).catch((error) => {
//             setErrorMsg(error.response)
//             console.error("Error logging in:" + error);
//             toast.error("Error Registering ");
//           })
//         })
//         .catch((error) => {
//           setErrorMsg(error.response)
//           console.error("Error logging in:" + error);
//           toast.error("Error Registering ");
//         })
//     }
//     else {
//       console.log("error register :" + errorMsg);
//       toast.warning(errorMsg);
//     }

//   }


//   return (
//     <div className=' d-flex justify-content-center align-items-center w-100'>
//       <div className='w-100 d-flex flex-column align-items-center gap-3'>
//         <form onSubmit={handleRegister} className='w-75 login-form' >
//           <h3 className='text-center py-2'>SIGN UP</h3>

//           <label>Enter Full Name</label>
//           <input type='text' className='w-100 p-1 mb-3 ' required onChange={(e) => { setEmployee({ ...employee, employeeFullName: e.target.value }) }} />

//           <label>Enter Email</label>
//           <input type='email' className='w-100 p-1 mb-3' required onChange={(e) => { setEmployee({ ...employee, employeeEmail: e.target.value }) }} />

//           <div className='d-flex gap-2 w-100'>
//             <div className='w-50'>
//               <label>Enter Phone Number</label>
//               <input type='number' className='w-100 p-1 mb-3' required onChange={(e) => { setEmployee({ ...employee, employeePhoneNo: e.target.value }) }} />
//             </div>

//             <div className='w-50'>
//               <label>Enter Aadhar</label>
//               <input type='number' className='w-100 p-1 mb-3' required onChange={(e) => { setEmployee({ ...employee, employeeAadhar: e.target.value }) }} />
//             </div>
//           </div>

//           <label>Password</label>
//           <input type='password' className='w-100 p-1 mb-3' required onChange={(e) => { setEmployee({ ...employee, employeePassword: e.target.value }) }} />

//           <label>Confirm Password</label>
//           <input type='password' className='w-100 p-1 mb-3' required onChange={(e) => setConfirmPassword(e.target.value)} />

//           <input type='submit' value='SignUp' className='w-100 login-btn py-1' />
//         </form>
//         <button onClick={() => navigate("/login")} className='border-0 register-tab '>Already Registered? <span className='fw-medium'>Login</span></button>

//       </div>
//     </div>
//   )
// }

// export default Register