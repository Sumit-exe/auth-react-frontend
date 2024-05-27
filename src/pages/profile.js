import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import { useNavigate } from 'react-router-dom';
import { setLoggedInUserData } from '../redux/slices/userSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';


const Profile = () => {
    const [hamActive, setHamActive] = useState(false);
    const [editProfileModal, setEditProfileModal] = useState(false);
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/login');
        }
    }, []);

    const [employee, setEmployee] = useState({
        employeeId: '',
        employeeFullName: '',
        employeeEmail: '',
        employeePhoneNo: '',
        employeeAadhar: '',
        employeeAvatar: ''
    });

    useEffect(() => {
        if (user) {
            setEmployee({
                employeeId: user.employeeId,
                employeeFullName: user.employeeFullName,
                employeeEmail: user.employeeEmail,
                employeePhoneNo: user.employeePhoneNo,
                employeeAadhar: user.employeeAadhar,
                employeeAvatar: user.employeeAvatar
            });
        }
    }, [user]);

    const navigate = useNavigate();

    const handleEditProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('employeeFullName', employee.employeeFullName);
        formData.append('employeeEmail', employee.employeeEmail);
        formData.append('employeePhoneNo', employee.employeePhoneNo);
        formData.append('employeeAadhar', employee.employeeAadhar);
        formData.append('employeeAvatar',employee.employeeAvatar)
        if (file) {
            formData.append('employeeAvatar', file);
        }

        try {
            const response = await axios.put('http://localhost:8000/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            dispatch(setLoggedInUserData(response.data));
            setEditProfileModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-full flex justify-between max-sm:flex-col'>
            <div>
                <SideBar hamActive={hamActive} setHamActive={setHamActive} />
            </div>
            <div className={`${hamActive ? 'w-[75%] max-sm:w-full h-[100vh]' : 'w-full '}  flex p-3 flex-col items-center`}>
                <div className='w-full h-full flex justify-center items-center'>
                    {!editProfileModal && (
                        <div className='bg-light-green p-8 rounded-lg shadow-lg border-2 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12'>
                            <div className='flex flex-col items-center'>
                                <img src={employee.employeeAvatar || "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} alt="profile" className='bg-white h-40 w-40 rounded-full shadow-md' />
                                <button className='bg-main-green text-white p-3 rounded mt-4' onClick={() => setEditProfileModal(!editProfileModal)}>Edit Profile</button>
                            </div>
                            <div className='flex flex-col space-y-4 w-full md:w-auto'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <ProfileDetail label="Employee ID" value={employee.employeeId} />
                                    <ProfileDetail label="Full Name" value={employee.employeeFullName} />
                                    <ProfileDetail label="Email" value={employee.employeeEmail} />
                                    <ProfileDetail label="Phone Number" value={employee.employeePhoneNo} />
                                    <ProfileDetail label="Aadhar" value={employee.employeeAadhar} />
                                </div>
                            </div>
                        </div>
                    )}
                    {editProfileModal && (
                        <div className='flex justify-center items-center my-5 md:w-[60%]'>
                            <form onSubmit={handleEditProfile} className='w-full border-2 p-3 login-form rounded shadow bg-light-green'>
                                <h3 className='text-center py-2 text-main-green text-xl'>Update Details</h3>
                                <ProfileInput label="Full Name" value={employee.employeeFullName} onChange={(e) => setEmployee({ ...employee, employeeFullName: e.target.value })} />
                                <ProfileInput label="Email" value={employee.employeeEmail} onChange={(e) => setEmployee({ ...employee, employeeEmail: e.target.value })} />
                                <ProfileInput label="Phone Number" value={employee.employeePhoneNo} onChange={(e) => setEmployee({ ...employee, employeePhoneNo: e.target.value })} />
                                <ProfileInput label="Aadhar" value={employee.employeeAadhar} onChange={(e) => setEmployee({ ...employee, employeeAadhar: e.target.value })} />
                                <ProfileInput label="Avatar" value={employee.employeeAvatar} onChange={(e) => setEmployee({ ...employee, employeeAvatar: e.target.value })} />

                                {/* <ProfileInput label="Change Profile Photo" type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
                                <div className='flex justify-between'>
                                    <button type='submit' className='bg-main-green py-2 px-4 text-white rounded hover:bg-green-600'>Update</button>
                                    <button type='button' className='border-2 py-2 px-4 rounded hover:bg-red-400 hover:text-white' onClick={() => setEditProfileModal(!editProfileModal)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const ProfileDetail = ({ label, value }) => (
    <div className='flex justify-between'>
        <span className='font-semibold text-gray-700'>{label}:</span>
        <span className='text-gray-900 truncate'>{value || "-"}</span>
    </div>
);

const ProfileInput = ({ label, value, type = "text", onChange }) => (
    <>
        <label>{label}</label>
        {type === "file" ? (
            <input type={type} className='w-100 p-1 mb-3' onChange={onChange} />
        ) : (
            <input type={type} className='w-100 p-1 mb-3' value={value} onChange={onChange} />
        )}
    </>
);

export default Profile;