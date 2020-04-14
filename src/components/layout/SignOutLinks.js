import React from "react";
import { NavLink } from "react-router-dom";


const SignedOutLinks = (props) => {
    return (
        <ul className="right navbar">
            <li><NavLink to='/signup'>Signup</NavLink></li>
            <li><NavLink to='/signin'>Login</NavLink></li>
        </ul>
    )
};

export default SignedOutLinks;
