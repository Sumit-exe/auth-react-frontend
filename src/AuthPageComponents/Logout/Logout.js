// import React, { useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { clearUserData } from '../../redux/slices/userSlice.js';
// import "./Logout.css";
// import { toast } from 'react-toastify';

// const Logout = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Clear local storage
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');

//     // Clear Redux state
//     dispatch(clearUserData());

//     // Show a toast notification
//     toast.success("Logout successful");

//     // Redirect to login page
//     setTimeout(() => {
//       navigate('/login');
//     }, 1000);
//   }, [dispatch, navigate]);

//   return (
//     <div className='logout-container d-flex justify-content-center align-items-center'>
//       <div className='logout-message text-center'>
//         <h2>You have been logged out</h2>
//         <p>Redirecting to login page...</p>
//       </div>
//     </div>
//   );
// }

// export default Logout;


// // import React, { useEffect } from 'react';
// // import { useNavigate } from "react-router-dom";
// // import { useDispatch } from 'react-redux';
// // import { clearUserData } from '../../redux/slices/userSlice.js';
// // import "./Logout.css";
// // import { toast } from 'react-toastify';

// // const Logout = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     // Clear local storage
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('user');

// //     // Clear Redux state
// //     dispatch(clearUserData());

// //     // Show a toast notification
// //     toast.success("Logout successful");

// //     // Redirect to login page
// //     setTimeout(() => {
// //       navigate('/login');
// //     }, 1000);
// //   }, [dispatch, navigate]);

// //   return (
// //     <div className='logout-container d-flex justify-content-center align-items-center'>
// //       <div className='logout-message text-center'>
// //         <h2>You have been logged out</h2>
// //         <p>Redirecting to login page...</p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Logout;
