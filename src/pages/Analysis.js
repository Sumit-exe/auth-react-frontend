import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import CustomBarChart from '../components/CustomBarChart';

const Analysis = () => {
    const [hamActive, setHamActive] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    useEffect(() => {
        if (user && user.employeeId) {
            console.log(user.employeeId);
        }
    }, [user]);

    return (
        <div className='w-full flex justify-between'>
            <div>
                <SideBar hamActive={hamActive} setHamActive={setHamActive} />
            </div>
            <div className={`${hamActive ? 'w-[75%]' : 'w-full'} flex vh-100`}>
                {user && user.employeeId &&
                    <CustomBarChart className="h-full w-52" empId={user.employeeId} />
                }
            </div>
        </div>
    );
}

export default Analysis;
