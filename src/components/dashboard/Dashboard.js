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
        recipe: [],
        recipeSelected: false,
    };

    handleClick = (recipe, e) => {


        if (recipe === this.state.recipe) {
            this.setState({recipe: []});
            this.setState({recipeSelected: false});
        } else {
            this.setState({recipe: recipe});
            this.setState({recipeSelected: true});
        }
        //
        // this.state.recipeSelected ?
        //     this.setState({recipe: []})
        // : this.setState({recipe: recipe});
    };

    render() {
        const { recipes, auth } = this.props;

        if (!auth.uid) return <Redirect to="/signin" />
        else {
            return (
                <div className="col-md-12">
                    <div className="row pr-3 pl-3">
                        <div className="col-md-10 mr-auto ml-auto recipes__list mb-5">
                            <RecipesList recipes={recipes} handleClick={this.handleClick}/>
                        </div>

                        <div className="col-md-9 m-auto recipe__summary">
                            <RecipeSummary recipe={this.state.recipe} recipeSelected={this.state.recipeSelected} />
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


export default compose(connect(mapStateToProps),
    firestoreConnect(props => {
        if (!props.auth.uid) { console.log('no uid error'); return []}
        else {
            console.log(props.auth.uid);


            return [
            {
                collection: 'recipes',
                where: [
                    ['userId', '==', props.auth.uid]
                ],

                orderBy: ['createdAt', 'desc']
            }
        ]}
    }))(Dashboard);
