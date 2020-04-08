import React from "react";
import { NavLink } from "react-router-dom";
import {signOut} from "../../store/actions/authActions";
import {connect} from "react-redux";


const SignedInLinks = (props) => {
    return (
        <ul className="right navbar">
            <li><NavLink to='/add'>New Recipe</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to={"/user/" + props.auth.uid} className="btn circle">
                {props.profile.initials}
            </NavLink></li>
        </ul>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default connect(null, mapDispatchToProps)(SignedInLinks);

