import React from "react";
import { NavLink } from "react-router-dom";


const SignedInLinks = (props) => {
    return (
        <ul>
            <li><NavLink to="/recipes/add">Add new recipe</NavLink></li>
            <li>Log Out</li>
            <li>Profile</li>
        </ul>
    )
};

export default SignedInLinks;
