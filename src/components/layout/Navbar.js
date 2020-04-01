import React from "react";
import SignedInLinks from "./SignInLinks";
import SignedOutLinks from "./SignOutLinks";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

const Navbar = (props) => {

    const { auth } = props;

    const links = auth.uid ? <SignedInLinks/>: <SignedOutLinks/>;

    return (
        <nav>
            <div>
                <Link>Recipes Book</Link>
                {links}
            </div>
        </nav>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,

    }
};

export default connect(mapStateToProps)(Navbar);
