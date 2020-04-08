import React from "react";
import {connect} from "react-redux";


const UserProfile = ({auth, profile, recipes, ...props}) => {

    console.log('props', auth);


    const userId = props.match.params.id;

    return (
        <div className="card">
            <h2>Welcome {profile.firstName} {profile.lastName}!</h2>
            <h4>Check out some stats</h4>
            <div>
                <h5>Stored recipes:</h5>
            </div>

            {recipes}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        recipes: state.firestore.recipes,
    }
};

export default connect(mapStateToProps)(UserProfile);
