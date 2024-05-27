// import React, { useEffect, useState } from 'react';
// import SideBar from '../components/SideBar';
// import attendanceService from '../services/attendance.service';

// const Home = () => {
//   const [hamActive, setHamActive] = useState(false);
//   const [currentUser, setCurrentUser] = useState('');
//   const [date, setDate] = useState('');
//   const [isWorkingRemotely, setIsWorkingRemotely] = useState('');
//   const [totalTime, setTotalTime] = useState('');
//   const [sessionEndTime, setSessionEndTime] = useState('');
//   const [sessionStartTime, setSessionStartTime] = useState('');

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user')); // Assuming user is stored as a JSON string
//     setCurrentUser(user);

//     setDate(localStorage.getItem('lastSessionDate'));
//     setIsWorkingRemotely(localStorage.getItem('isWorkingRemotely'));
//     setTotalTime(localStorage.getItem('time'));
//     setSessionEndTime(localStorage.getItem('endTime'));
//     setSessionStartTime(localStorage.getItem('startTime'));
//   }, []);
  
//   const updateEmpAttendance = async () => {
//     // const formattedDate = date.split('T')[0]; // Extracting date part from ISO 8601 format
//     // const formattedWorkHours = parseFloat(totalTime / 3600).toFixed(1); // Converting totalTime from seconds to hours with one decimal point
//     // const formattedSessionTimeIn = formatTime(sessionStartTime); // Formatting sessionStartTime
//     // const formattedSessionTimeOut = formatTime(sessionEndTime); // Formatting sessionEndTime

//     const data = {
//       workDetails: [
//         {
//           date: date,
//           workHours: totalTime,
//           sessionTimeIn: sessionStartTime,
//           sessionTimeOut: sessionEndTime,
//           isWorkingRemotely: isWorkingRemotely


//           // date: formattedDate,
//           // workHours: formattedWorkHours,
//           // sessionTimeIn: formattedSessionTimeIn,
//           // sessionTimeOut: formattedSessionTimeOut,
//           // isWorkingRemotely: isWorkingRemotely


//           // date: "2024-05-01",
//           // workHours: "7.5",
//           // sessionTimeIn: "9:15 am",
//           // sessionTimeOut: "4:45 pm",
//           // isWorkingRemotely: true
//         }
//       ]
      
//     };
//     console.log(data)
    
//     await attendanceService.handleUpdateEmpAttendance(currentUser.employeeId, data)
//       .then((response) => {
//         console.log(response);
        
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // Clock
//   const [time, setTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [timer, setTimer] = useState(null);
//   const [sessionStarted, setSessionStarted] = useState(false);
//   const [startDisabled, setStartDisabled] = useState(false);
//   const [endDisabled, setEndDisabled] = useState(true);
//   const [startSessionWarningModalState, setStartSessionWarningModalState] = useState(false);
//   const [endSessionWarningModalState, setEndSessionWarningModalState] = useState(false);
 
//   useEffect(() => {
//     const storedTime = localStorage.getItem('time');
//     const storedIsRunning = localStorage.getItem('isRunning');
//     const storedSessionStarted = localStorage.getItem('sessionStarted');
//     const lastSessionDate = localStorage.getItem('lastSessionDate');
//     const today = new Date().toISOString().split('T')[0];

//     if (storedTime) {
//       setTime(parseInt(storedTime, 10));
//     }

//     if (storedIsRunning === 'true') {
//       startStopwatch();
//     }

//     if (storedSessionStarted === 'true') {
//       setSessionStarted(true);
//     }

//     if (lastSessionDate === today) {
//       setStartDisabled(true);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('time', time);
//     localStorage.setItem('isRunning', isRunning);
//     localStorage.setItem('sessionStarted', sessionStarted);
//   }, [time, isRunning, sessionStarted]);

//   const startStopwatch = () => {
//     if (!isRunning && !startDisabled) {
//       setStartSessionWarningModalState(false);
//       setIsRunning(true);
//       setSessionStarted(true);
//       setStartDisabled(true);
//       setEndDisabled(false);
//       const startTime = new Date().toISOString(); // Get current time in ISO format
//       localStorage.setItem('startTime', startTime); // Save start time in local storage
//       const today = new Date().toISOString().split('T')[0];
//       localStorage.setItem('lastSessionDate', today);

//       const intervalId = setInterval(() => {
//         setTime(prevTime => prevTime + 1);
//       }, 1000);
//       setTimer(intervalId);
//     }
//   };

//   const togglePauseResume = () => {
//     if (isRunning) {
//       clearInterval(timer);
//       setIsRunning(false);
//     } else {
//       setIsRunning(true);
//       const intervalId = setInterval(() => {
//         setTime(prevTime => prevTime + 1);
//       }, 1000);
//       setTimer(intervalId);
//     }
//   };

//   const endSessionwatch = () => {
//     if (!endDisabled) {
//       setEndSessionWarningModalState(false);
//       clearInterval(timer);
//       setIsRunning(false);
//       const endTime = new Date().toISOString(); // Get current time in ISO format
//       localStorage.setItem('endTime', endTime); // Save end time in local storage
//       setTotalTime(time);
//       setSessionStarted(false);
//       setEndDisabled(true);

//       // Call updateEmpAttendance to update the database
//       updateEmpAttendance();

//       // Clear local storage items
//       localStorage.removeItem('time');
//       localStorage.removeItem('isRunning');
//       localStorage.removeItem('sessionStarted');
//     }
//   };

//   useEffect(() => {
//     return () => {
//       clearInterval(timer);
//     };
//   }, [timer]);

//   const formatTime = (time) => {
//     const getSeconds = `0${(time % 60)}`.slice(-2);
//     const minutes = `${Math.floor(time / 60)}`;
//     const getMinutes = `0${minutes % 60}`.slice(-2);
//     const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

//     return `${getHours} : ${getMinutes} : ${getSeconds}`;
//   };

//   return (
//     <div className='w-full flex justify-between max-sm:flex-col'>
//       <div>
//         <SideBar hamActive={hamActive} setHamActive={setHamActive} />
//       </div>
//       <div className={` ${hamActive ? 'w-[75%] max-sm:w-full' : 'w-full'} flex p-3 flex-col items-center`}>
//         {/* Buttons */}
//         <div className='flex justify-center w-full '>
//           <button
//             className={` border-2 m-1 p-3 rounded ${startDisabled ? "bg-gray-400" : "bg-main-green hover:bg-green-600"} text-white `}
//             onClick={() => setStartSessionWarningModalState(true)}
//             disabled={startDisabled}
//           >Start Session
//           </button>
//           <button
//             className={` border-2 m-1 p-3 rounded ${sessionStarted ? (isRunning ? "bg-[#b39c1c] hover:bg-yellow-600" : "bg-main-green hover:bg-green-600") : "bg-gray-400"} text-white `}
//             onClick={togglePauseResume}
//             disabled={!sessionStarted}
//           >{isRunning ? "Pause Session" : "Resume Session"}
//           </button>
//           <button
//             className={` border-2 m-1 p-3 rounded ${endDisabled ? "bg-gray-400" : "bg-[#912f16] hover:bg-red-600"} text-white `}
//             onClick={() => setEndSessionWarningModalState(true)}
//             disabled={endDisabled}
//           >End Session
//           </button>
//         </div>

//         <div className='w-full h-[80vh] flex justify-center items-center'>
//           <div className='relative'>
//             <p>Total Work Hrs.</p>
//             <h1 className={`text-[800%] max-lg:text-[650%] max-md:text-[550%] max-sm:text-[370%] ${isRunning ? "text-gray-400" : "text-yellow-400"} text-gray-400`}>{formatTime(time)}</h1>
//             <p className={`${isRunning ? "hidden" : "block"} text-yellow-400 absolute right-0`}>paused.</p>
//           </div>
//         </div>
//       </div>

//       {startSessionWarningModalState &&
//         <div className='bg-black bg-opacity-50  w-full h-full absolute z-20 flex justify-center items-center'>
//           <div className='bg-white p-4 rounded shadow mx-3'>
//             <h1 className='mb-4'>Are you sure you want to Start the session? <br /> You can only Start one session per day</h1>
//             <div className='flex justify-end'>
//               <button className='py-2 px-4 border-2 mx-2 rounded hover:bg-red-500 hover:text-white' onClick={() => setStartSessionWarningModalState(false)}>No</button>
//               <button className='py-2 px-4 border bg-main-green text-white mx-2 rounded hover:bg-green-500' onClick={startStopwatch}>Start</button>
//             </div>
//           </div>
//         </div>}
//       {endSessionWarningModalState &&
//         <div className='bg-black bg-opacity-50  w-full h-full absolute z-20 flex justify-center items-center'>
//           <div className='bg-white p-4 rounded shadow mx-3'>
//             <h1 className='mb-4'>Are you sure you want to End the session?</h1>
//             <div className='flex justify-end'>
//               <button className='py-2 px-4 border-2 mx-2 rounded hover:bg-red-500 hover:text-white' onClick={() => setEndSessionWarningModalState(false)}>No</button>
//               <button className='py-2 px-4 border bg-main-green text-white mx-2 rounded hover:bg-green-500' onClick={endSessionwatch}>End</button>
//             </div>
//           </div>
//         </div>}
//     </div>
//   );
// }

// export default Home;
import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import attendanceService from '../services/attendance.service';

const Home = () => {
  const [hamActive, setHamActive] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [date, setDate] = useState('');
  const [isWorkingRemotely, setIsWorkingRemotely] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [sessionEndTime, setSessionEndTime] = useState('');
  const [sessionStartTime, setSessionStartTime] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user is stored as a JSON string
    setCurrentUser(user);

    setDate(localStorage.getItem('lastSessionDate'));
    setIsWorkingRemotely(localStorage.getItem('isWorkingRemotely'));
    setTotalTime(localStorage.getItem('time'));
    setSessionEndTime(localStorage.getItem('endTime'));
    setSessionStartTime(localStorage.getItem('startTime'));
  }, []);
  
  const updateEmpAttendance = async () => {
    // const formattedDate = date.split('T')[0]; // Extracting date part from ISO 8601 format
    // const formattedWorkHours = parseFloat(totalTime / 3600).toFixed(1); // Converting totalTime from seconds to hours with one decimal point
    // const formattedSessionTimeIn = formatTime(sessionStartTime); // Formatting sessionStartTime
    // const formattedSessionTimeOut = formatTime(sessionEndTime); // Formatting sessionEndTime
    const formattedTotalTime = parseFloat(totalTime / 3600).toFixed(1);
    const data = {
      workDetails: [
        {
          date: date,
          workHours: formattedTotalTime,
          sessionTimeIn: sessionStartTime,
          sessionTimeOut: sessionEndTime,
          isWorkingRemotely: isWorkingRemotely


          // date: formattedDate,
          // workHours: formattedWorkHours,
          // sessionTimeIn: formattedSessionTimeIn,
          // sessionTimeOut: formattedSessionTimeOut,
          // isWorkingRemotely: isWorkingRemotely


          // date: "2024-05-01",
          // workHours: "7.5",
          // sessionTimeIn: "9:15 am",
          // sessionTimeOut: "4:45 pm",
          // isWorkingRemotely: true
        }
      ]
      
    };
    console.log(data)
    
    await attendanceService.handleUpdateEmpAttendance(currentUser.employeeId, data)
      .then((response) => {
        console.log(response);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Clock
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [startDisabled, setStartDisabled] = useState(false);
  const [endDisabled, setEndDisabled] = useState(true);
  const [startSessionWarningModalState, setStartSessionWarningModalState] = useState(false);
  const [endSessionWarningModalState, setEndSessionWarningModalState] = useState(false);
 
  useEffect(() => {
    const storedTime = localStorage.getItem('time');
    const storedIsRunning = localStorage.getItem('isRunning');
    const storedSessionStarted = localStorage.getItem('sessionStarted');
    const lastSessionDate = localStorage.getItem('lastSessionDate');
    const today = new Date().toISOString().split('T')[0];

    if (storedTime) {
      setTime(parseInt(storedTime, 10));
    }

    if (storedIsRunning === 'true') {
      startStopwatch();
    }

    if (storedSessionStarted === 'true') {
      setSessionStarted(true);
    }

    if (lastSessionDate === today) {
      setStartDisabled(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('time', time);
    localStorage.setItem('isRunning', isRunning);
    localStorage.setItem('sessionStarted', sessionStarted);
  }, [time, isRunning, sessionStarted]);

  // const startStopwatch = () => {
  //   if (!isRunning && !startDisabled) {
  //     setStartSessionWarningModalState(false);
  //     setIsRunning(true);
  //     setSessionStarted(true);
  //     setStartDisabled(true);
  //     setEndDisabled(false);
  //     const startTime = new Date().toISOString(); // Get current time in ISO format
  //     localStorage.setItem('startTime', startTime); // Save start time in local storage
  //     const today = new Date().toISOString().split('T')[0];
  //     localStorage.setItem('lastSessionDate', today);

  //     const intervalId = setInterval(() => {
  //       setTime(prevTime => prevTime + 1);
  //     }, 1000);
  //     setTimer(intervalId);
  //   }
  // };

  const startStopwatch = () => {
    if (!isRunning && !startDisabled) {
      setStartSessionWarningModalState(false);
      setIsRunning(true);
      setSessionStarted(true);
      setStartDisabled(true);
      setEndDisabled(false);
  
      // Get current time
      const currentDate = new Date();
      const startTime = currentDate.toTimeString().slice(0, 8); // Get time part only
      const today = formatDate(currentDate.toISOString().split('T')[0]); // Format today's date
  
      // Save start time and today's date in local storage
      localStorage.setItem('startTime', startTime);
      localStorage.setItem('lastSessionDate', today);
  
      // Set interval to update time every second
      const intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      setTimer(intervalId);
    }
  };
  
  // Function to format date
  const formatDate = (dateString) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    // Parse the date string
    const date = new Date(dateString);
  
    // Get the day, month, and year
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    // Get the day of the month
    const dayOfMonth = date.getDate();
  
    // Format the date string
    const formattedDate = `${day} ${month} ${dayOfMonth} ${year}`;
  
    return formattedDate;
  };
  

  const togglePauseResume = () => {
    if (isRunning) {
      clearInterval(timer);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      const intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      setTimer(intervalId);
    }
  };

  // const endSessionwatch = () => {
  //   if (!endDisabled) {
  //     setEndSessionWarningModalState(false);
  //     clearInterval(timer);
  //     setIsRunning(false);
  //     const endTime = new Date().toISOString(); // Get current time in ISO format
  //     localStorage.setItem('endTime', endTime); // Save end time in local storage
  //     setTotalTime(time);
  //     setSessionStarted(false);
  //     setEndDisabled(true);

  //     // Call updateEmpAttendance to update the database
  //     updateEmpAttendance();

  //     // Clear local storage items
  //     localStorage.removeItem('time');
  //     localStorage.removeItem('isRunning');
  //     localStorage.removeItem('sessionStarted');
  //   }
  // };

  const endSessionwatch = () => {
    if (!endDisabled) {
      setEndSessionWarningModalState(false);
      clearInterval(timer);
      setIsRunning(false);
  
      // Get current time
      const currentDate = new Date();
      const endTime = currentDate.toTimeString().slice(0, 8); // Get time part only
  
      // Save end time in local storage
      localStorage.setItem('endTime', endTime);
  
      setTotalTime(time);
      setSessionStarted(false);
      setEndDisabled(true);
  
      // Call updateEmpAttendance to update the database
      updateEmpAttendance();
  
      // Clear local storage items
      localStorage.removeItem('time');
      localStorage.removeItem('isRunning');
      localStorage.removeItem('sessionStarted');
    }
  };
  

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  const formatTime = (time) => {
    const getSeconds = `0${(time % 60)}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <div className='w-full flex justify-between max-sm:flex-col'>
      <div>
        <SideBar hamActive={hamActive} setHamActive={setHamActive} />
      </div>
      <div className={` ${hamActive ? 'w-[75%] max-sm:w-full' : 'w-full'} flex p-3 flex-col items-center`}>
        {/* Buttons */}
        <div className='flex justify-center w-full '>
          <button
            className={` border-2 m-1 p-3 rounded ${startDisabled ? "bg-gray-400" : "bg-main-green hover:bg-green-600"} text-white `}
            onClick={() => setStartSessionWarningModalState(true)}
            disabled={startDisabled}
          >Start Session
          </button>
          <button
            className={` border-2 m-1 p-3 rounded ${sessionStarted ? (isRunning ? "bg-[#b39c1c] hover:bg-yellow-600" : "bg-main-green hover:bg-green-600") : "bg-gray-400"} text-white `}
            onClick={togglePauseResume}
            disabled={!sessionStarted}
          >{isRunning ? "Pause Session" : "Resume Session"}
          </button>
          <button
            className={` border-2 m-1 p-3 rounded ${endDisabled ? "bg-gray-400" : "bg-[#912f16] hover:bg-red-600"} text-white `}
            onClick={() => setEndSessionWarningModalState(true)}
            disabled={endDisabled}
          >End Session
          </button>
        </div>

        <div className='w-full h-[80vh] flex justify-center items-center'>
          <div className='relative'>
            <p>Total Work Hrs.</p>
            <h1 className={`text-[800%] max-lg:text-[650%] max-md:text-[550%] max-sm:text-[370%] ${isRunning ? "text-gray-400" : "text-yellow-400"} text-gray-400`}>{formatTime(time)}</h1>
            <p className={`${isRunning ? "hidden" : "block"} text-yellow-400 absolute right-0`}>paused.</p>
          </div>
        </div>
      </div>

      {startSessionWarningModalState &&
        <div className='bg-black bg-opacity-50  w-full h-full absolute z-20 flex justify-center items-center'>
          <div className='bg-white p-4 rounded shadow mx-3'>
            <h1 className='mb-4'>Are you sure you want to Start the session? <br /> You can only Start one session per day</h1>
            <div className='flex justify-end'>
              <button className='py-2 px-4 border-2 mx-2 rounded hover:bg-red-500 hover:text-white' onClick={() => setStartSessionWarningModalState(false)}>No</button>
              <button className='py-2 px-4 border bg-main-green text-white mx-2 rounded hover:bg-green-500' onClick={startStopwatch}>Start</button>
            </div>
          </div>
        </div>}
      {endSessionWarningModalState &&
        <div className='bg-black bg-opacity-50  w-full h-full absolute z-20 flex justify-center items-center'>
          <div className='bg-white p-4 rounded shadow mx-3'>
            <h1 className='mb-4'>Are you sure you want to End the session?</h1>
            <div className='flex justify-end'>
              <button className='py-2 px-4 border-2 mx-2 rounded hover:bg-red-500 hover:text-white' onClick={() => setEndSessionWarningModalState(false)}>No</button>
              <button className='py-2 px-4 border bg-main-green text-white mx-2 rounded hover:bg-green-500' onClick={endSessionwatch}>End</button>
            </div>
          </div>
        </div>}
    </div>
  );
}

export default Home;

