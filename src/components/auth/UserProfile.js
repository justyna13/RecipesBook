import React from "react";
import {connect} from "react-redux";


const UserProfile = ({auth, profile, ...props}) => {



    const userId = props.match.params.id;

    return (
        <div className="card">
            <h2>Welcome {profile.firstName} {profile.lastName}!</h2>


        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
};

export default connect(mapStateToProps)(UserProfile);
