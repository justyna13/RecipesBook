import React, {useState} from "react";
import SignedInLinks from "./SignInLinks";
import SignedOutLinks from "./SignOutLinks";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';


const Navbar = (props) => {

    const { auth, profile } = props;
    const links = auth.uid ? <SignedInLinks profile={profile} auth={auth} /> : <SignedOutLinks />;

    return (
        <nav>
            <div className="nav__inner">
                <Link to='/home' className="nav__title">
                    <i className="fa fa-fire"> Recipes Book</i></Link>
                <div>
                    {links}
                </div>
            </div>
        </nav>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

export default connect(mapStateToProps)(Navbar);
