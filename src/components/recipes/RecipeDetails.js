import React from "react";
import {Redirect} from "react-router-dom";
import moment from "moment";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";


const RecipesDetails = (props) => {

    const { recipe, auth } = props;

    if (!auth.uid) return <Redirect to="/signin" />
        if (recipe) {
            return (
                <div className="card">
                    <h3>{recipe.name}</h3>
                    <hr/>
                    <p>{recipe.description}</p>
                    <hr/>
                    <p>Author: {recipe.userFirstName} {recipe.userLastName}</p>
                    <p>{moment(recipe.createdAt.toDate()).calendar()}</p>
                </div>
            )
        }
    else {
        return (
            <div>
                <p>Loading....</p>
            </div>
        )

    }
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const recipes = state.firestore.data.recipes;
    const recipe = recipes ? recipes[id] : null;

    return {
        recipe: recipe,
        auth: state.firebase.auth
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'recipes'}
    ])
)(RecipesDetails);
