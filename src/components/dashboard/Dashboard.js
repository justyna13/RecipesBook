import React from "react";
import {Redirect} from "react-router-dom";
import RecipesList from "../recipes/RecipesList";
import {connect} from "react-redux";
import {compose} from "redux";
import '../../styles/recipes.css';
import {firestoreConnect} from "react-redux-firebase";
import RecipeSummary from "../recipes/RecipeSummary";


class Dashboard extends React.Component {
    state = {
        recipe: []
    };

    handleClick = (recipe, e) => {
        console.log(recipe);
        this.setState({recipe: recipe});
    };
    render() {

        const { recipes, auth } = this.props;
        console.log(recipes);

        if (!auth.uid) return <Redirect to="/signin" />
        else {
            return (
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-10 mr-auto ml-auto recipes__list mb-5">
                            <RecipesList recipes={recipes} handleClick={this.handleClick}/>
                        </div>

                        <div className="col-md-9 m-auto recipe__summary">
                            <RecipeSummary recipe={this.state.recipe} />
                        </div>
                    </div>
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
