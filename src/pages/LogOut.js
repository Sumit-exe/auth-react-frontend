import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearUserData } from '../redux/slices/userSlice.js'; // Updated path
import { toast } from 'react-toastify';
import SideBar from '../components/SideBar';

const LogOut = () => {
    const [hamActive, setHamActive] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Clear Redux state
        dispatch(clearUserData());

        // Show a toast notification
        toast.success("Logout successful");

        // Redirect to login page
        navigate('/login');
    };

    return (

        <div className='w-full flex justify-between'>
            <div>
                <SideBar hamActive={hamActive} setHamActive={setHamActive} />
            </div>
            <div className={` ${hamActive ? 'w-[75%]' : 'w-full'} flex vh-100 align-items-center justify-content-center`}>
                <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                </button>
            </div>
        </div>

    );
}

export default LogOut;


// import React, { useState } from 'react';
// import SideBar from '../components/SideBar';

// const LogOut = () => {

//     const [hamActive, setHamActive] = useState(true);

//     return (
//         <div className='w-full flex justify-between ' >
//       <div>
//       <SideBar hamActive={hamActive} setHamActive={setHamActive}/>
//       </div>
//       <div className={` ${hamActive ? 'w-[75%]' : 'w-full'} flex vh-100`}>
//         LogOut

//       </div>

//     </div>
//     );
// }

// export default LogOut;
