import React, { useState} from 'react'
import "./Work.css";
import workingRemotely from "../../assets/images/workRemote.svg";
import workOffice from "../../assets/images/workOffice.svg";
import ibmLogo from "../../assets/images/IBM_LOGO.png";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch} from 'react-redux';
import { setWorkLocation } from '../../redux/slices/userSlice';

const Work = () => {
    const navigate = useNavigate();
    const [workingRemote, setWorkingRemote] = useState(false);

    const dispatch = useDispatch();

    const handleWorkingRemote = () => {
        setWorkingRemote(true);
        // dispatch(setWorkLocation(workingRemote))
        localStorage.setItem("isWorkingRemotely" , workingRemote)
        toast.success("Have a Productive Day")
        navigate('/');
        // window.location.reload();
    }

    const workFromOffice = () => {
        function isInRange(myLat, myLon, targetLat, targetLon, range) {
            const R = 6371e3; // Radius of the Earth in meters
            const φ1 = myLat * Math.PI / 180; // φ, λ in radians
            const φ2 = targetLat * Math.PI / 180;
            const Δφ = (targetLat - myLat) * Math.PI / 180;
            const Δλ = (targetLon - myLon) * Math.PI / 180;

            const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const distance = R * c; // Distance in meters

            return distance <= range;
        }


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(`Your latitude is: ${position.coords.latitude}`);
                console.log(`Your longitude is: ${position.coords.longitude}`);
                const { latitude, longitude } = position.coords;
                //BCIT location
                const targetLat = 13.084852108082831; // Target latitude
                const targetLon = 77.64064313310752; // Target longitude
                //Home location
                // const targetLat = 13.084722; // Target latitude
                // const targetLon = 77.6404992; // Target longitude
                const range = 250; // Radius in meters

                if (isInRange(latitude, longitude, targetLat, targetLon, range)) {
                    setWorkingRemote(false)
                    console.log("You are in range.");
                    // dispatch(setWorkLocation(workingRemote))
                    localStorage.setItem("isWorkingRemotely" , workingRemote)
                    toast.success("Have a Productive Day")
                    navigate('/')
                } else {
                    console.log("You are out of range.");
                    toast("out of range From Office Premises. Redirecting to login page")
                    navigate('/login')
                }
                console.log(navigator);
            }, (error) => {
                console.log(error.message);
            });
        }

    };

    return (
        <div className='vh-100 vw-100 d-flex position-relative '>
            <div className='position-absolute top-0 start-0'>
                <img src={ibmLogo} alt='Ibm logo' className='px-5 m-2 col-2' />
                {/* <Logo /> */}
            </div>

            <div className='vh-100 w-100 d-flex '>

                <div className=' w-50 d-flex flex-column align-items-center justify-content-center' >
                    <div className='bg-light-blue w-75  d-flex flex-column align-items-center  rounded p-3 m-5 shadow'>
                        <img className='w-75 work-img' src={workingRemotely} />
                        <button className='bg-main-blue border-0 px-4 py-3 rounded-2 text-light fw-medium shadow hover ' onClick={handleWorkingRemote}>Working Remotely</button>
                    </div>
                </div>


                <div className='w-50 d-flex flex-column align-items-center justify-content-center' >
                    <div className='bg-light-green w-75  d-flex flex-column align-items-center  rounded p-3 m-5 shadow'>
                        <img className='w-75 work-img' src={workOffice} />
                        <button className='bg-main-green border-0 px-4 py-3 rounded-2 text-light fw-medium shadow hover ' onClick={workFromOffice}>Work From Office</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Work

{/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button> */}

{/* <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog  modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Are You Working Remotely
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                    <button type="button" className="btn btn-primary" onClick={handleWorkingRemoteData} >Continue</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
