import React from 'react';
import ibmLogo from "../../assets/images/IBM_LOGO.png";
import './logo.css'
const Logo = () => {
    return (
        <div >
            <img src={ibmLogo} alt='Ibm logo' className={`vw-25 px-5 m-2 w-25`} />
        </div>
    );
}

export default Logo;
