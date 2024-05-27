import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import authService from '../services/auth.js';
import { FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import WorkCharts from '../components/WorkCharts.js';

const AllEmployees = () => {
    const [allEmployees, setAllEmployees] = useState([]);
    const [viewToggleId, setViewToggleId] = useState(null);
    const [hamActive, setHamActive] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const handleGetAllEmployees = async () => {
        try {
            const response = await authService.handleGetAllEmps();
            setAllEmployees(response);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleToggleView = (employeeId) => {
        setViewToggleId(prevId => (prevId === employeeId ? null : employeeId));
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    }

    useEffect(() => {
        handleGetAllEmployees();
    }, []);

    const filteredEmployees = allEmployees.filter(emp => 
        emp.employeeId.toString().includes(searchQuery) || 
        emp.employeeFullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='w-full flex justify-between max-sm:flex-col' >
            <div>
                <SideBar hamActive={hamActive} setHamActive={setHamActive} />
            </div>
            <div className={` ${hamActive ? 'w-[75%] max-sm:w-full' : 'w-full'} flex vh-100`}>
                <div className='w-full flex flex-col items-center p-3'>
                    <div className='border-2 p-1 rounded-full w-full flex justify-between m-3'>
                        <input 
                            type="text" 
                            placeholder='Search by Name or ID' 
                            className='flex flex-1 border-0 outline-none ml-3' 
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button 
                            className='bg-main-green py-2 px-4 rounded-full text-white hover:bg-green-500'
                        >Search</button>
                    </div>
                    <div className='bg-gray-300 w-full h-[85vh] overflow-y-auto overflow-x-hidden rounded p-2'>
                        {filteredEmployees?.map((emp) => (
                            <div key={emp.employeeId} className='bg-white p-2 rounded m-1 flex flex-col justify-between w-full items-between shadow'>
                                <div className='flex justify-between items-center '>
                                    <div className='flex gap-52 max-md:gap-6 max-sm:flex-col max-sm:gap-2'>
                                        <p className='text-gray-400'>
                                            Employee Id : <br /> <span className='text-black'>{emp.employeeId}</span>
                                        </p>
                                        <p className='text-gray-400'>
                                            Employee Name : <br /><span className='text-black'>{emp.employeeFullName}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <button className={`border-2 ${viewToggleId !== emp.employeeId ? 'border-main-green bg-light-green text-main-green hover:bg-main-green hover:text-white ' : 'border-red-500 bg-red-200 text-red-500 hover:bg-red-500 hover:text-white '} p-2 shadow-sm rounded mx-1 `} title="View Analytics" onClick={() => handleToggleView(emp.employeeId)}>
                                            {viewToggleId !== emp.employeeId ? <GrView /> : <IoClose />}
                                        </button>
                                        {/* <button className='border-2 border-yellow-500 bg-yellow-200 text-yellow-500 hover:bg-yellow-500 hover:text-white p-2 shadow-sm rounded mx-1' title="Update Employee Details"><FaEdit /></button> */}
                                    </div>
                                </div>
                                {viewToggleId === emp.employeeId && (
                                    <div className='bg-gray-200 p-2 rounded-b'>
                                        <WorkCharts empId={emp.employeeId}/>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllEmployees;
