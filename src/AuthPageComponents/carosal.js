import React from 'react';
import "./Carosal.css";
// images

import addAttendance from "../assets/images/add-attendance.png";
import workingRemotely from "../assets/images/working-remotely.png";
import confirmAttendance from "../assets/images/confirm-attendance.png"
import late from "../assets/images/late.png";


const Carosal = () => {
    return (
        <div className='bg-light-green col-6 custom-carosal'>
            <div className=' text-dark'></div>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className='carousel-item-container'>
                            <div className='auth-banner-img'>
                                <img src={workingRemotely} alt="..." />
                            </div>
                            <h4 className='fw-bold'>Real Time Attendance Tracking</h4>
                            <p>Monitor employee attendance in real-time with automated time-stamping, ensuring accurate and up-to-date records.</p>
                        </div>
                    </div>

                    <div className="carousel-item ">
                        <div className='carousel-item-container'>
                            <div className='auth-banner-img'>
                                <img src={addAttendance} alt="..." />
                            </div>
                            <h4 className='fw-bold'>Efficient Data Management</h4>
                            <p> Simplify attendance data management with intuitive dashboards and comprehensive reporting tools, enabling easy analysis and decision-making.
</p>
                        </div>
                    </div>

                    <div className="carousel-item ">
                        <div className='carousel-item-container'>
                            <div className='auth-banner-img'>
                                <img src={confirmAttendance}  alt="..." />
                            </div>
                            <h4 className='fw-bold'>Enhanced Security</h4>
                            <p>Protect sensitive employee data with authentication and robust security features, including encryption, and access controls, ensuring compliance with privacy regulations.</p>
                        </div>
                    </div>
                    <div className="carousel-item ">
                        <div className='carousel-item-container'>
                            <div className='auth-banner-img'>
                                <img src={late}  alt="..." />
                            </div>
                            <h4 className='fw-bold'>Location-Based Tracking</h4>
                            <p>Enable geo-fencing to track attendance based on specific locations, ensuring employees are where they need to be.</p>
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            
        </div>
    );
}

export default Carosal;
