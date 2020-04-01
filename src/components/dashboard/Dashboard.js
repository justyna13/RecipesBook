import React from "react";
import {Redirect} from "react-router-dom";
import RecipesList from "../recipes/RecipesList";
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";


class Dashboard extends React.Component {
    render() {

        const { recipes, auth } = this.props;

        if (!auth.uid) return <Redirect to="/signin" />
        else {
            return (
                <div>
                    <RecipesList recipes={recipes} />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        recipes: state.firestore.ordered.recipes,
        auth: state.firebase.auth,
    }
};


export default compose(connect(mapStateToProps), firestoreConnect([
    {collection: 'recipes', orderBy: ['createdAt', 'desc']}
]))(Dashboard);
