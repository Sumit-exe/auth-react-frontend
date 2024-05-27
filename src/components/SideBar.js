import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';

const SideBar = ({ hamActive, setHamActive }) => {

    const navigate = useNavigate();
    const loggedInUserData = useSelector((state) => state.user.loggedInUserData);
    const currentUser = useSelector((state) => state.user);
    const [employee, setEmployee] = useState('');

    console.log(currentUser.loggedInUserData.employeeAvatar);
    const employeeUlElements = [
        { name: "Home", redirect: "/" },
        { name: "Analytics", redirect: "/analytics" },
        { name: "Logout", redirect: "/logout" }
    ];

    const adminUlElements = [
        { name: "Home", redirect: "/" },
        { name: "Analytics", redirect: "/analytics" },
        { name: "View All Employees", redirect: "/all-emps" },
        { name: "Logout", redirect: "/logout" }
    ];

    useEffect(() => {
        const storedEmployee = localStorage.getItem('user');
        if (storedEmployee) {
            setEmployee(JSON.parse(storedEmployee));
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <div className="relative">
            {!hamActive ? (
                <div className="h-screen bg-light-green border-r-2 border-main-green py-3">
                    <GiHamburgerMenu
                        title="Open Side Bar"
                        onClick={() => setHamActive(!hamActive)}
                        className="mx-3 h-10 w-10 text-main-green cursor-pointer"
                    />
                </div>
            ) : (
                <div className="fixed inset-0 bg-light-green transition-transform transform duration-300 ease-in-out" style={{ width: hamActive ? '25%' : '0' }}>
                    <RxCross2
                        title="Close Side Bar"
                        onClick={() => setHamActive(!hamActive)}
                        className="m-3 h-7 w-7 cursor-pointer"
                    />
                    <div className="flex flex-col items-center border-b-2 border-main-green p-3">
                        <img
                            src={currentUser.loggedInUserData.employeeAvatar}
                            alt="Profile"
                            className="bg-white h-28 w-28 rounded-full border-2 border-main-green"
                        />
                        <h2 className='p-2'>{currentUser.loggedInUserData.employeeFullName}</h2>
                        <p className="text-sm text-main-green underline cursor-pointer" onClick={() => { navigate("/profile") }}>View Profile</p>
                    </div>
                    <nav className="flex flex-col">
                        <ul>
                            {employee.employeeRole === "admin" ? adminUlElements.map((ele) => (
                                <li key={ele.name}
                                    onClick={() => { navigate(`${ele.redirect}`) }}
                                    className="p-3 border-b-2 border-main-green cursor-pointer hover:bg-main-green hover:text-white"
                                >
                                    {ele.name}
                                </li>
                            )) : employeeUlElements.map((ele) => (
                                <li key={ele.name}
                                    onClick={() => { navigate(`${ele.redirect}`) }}
                                    className="p-3 border-b-2 border-main-green cursor-pointer hover:bg-main-green hover:text-white"
                                >
                                    {ele.name}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}

export default SideBar;