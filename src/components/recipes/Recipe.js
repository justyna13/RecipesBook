import React from "react";
import { Redirect } from "react-router-dom";
import { addRecipe, updateRecipe } from "../../store/actions/recipesActions";
import {connect} from "react-redux";
import RecipeForm from "./RecipeForm";


class Recipe extends React.Component {

    state = {
        name: '',
        description: '',
        ingredients: [{
            name: '',
            amount: 0
        }],
        prepTime: 0,
        imgUrl: '',
        difficultyLevel: 1
    };

    componentDidMount() {
        if (this.props.recipe) {
            this.setState({
                name: this.props.recipe.name,
                description: this.props.recipe.description,
                ingredients: this.props.recipe.ingredients,
                prepTime: this.props.recipe.prepTime,
                imgUrl: this.props.recipe.imgUrl,
                difficultyLevel: this.props.recipe.difficultyLevel
            })
        }

    }

    handleChange(field, e) {

        if(field === 'imgUrl') {

            this.setState({imgUrl: e})
            console.log('img', this.state.imgUrl);
        } else {
            if (['name', 'amount'].includes(e.target.className)) {
                let ingredients = [...this.state.ingredients];
                ingredients[e.target.dataset.id][e.target.className] = e.target.value;
                this.setState({ingredients}, () => console.log(this.state.ingredients));
            }  else {
                this.setState({
                    [field]: e.target.value
                })
            }
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.props.recipe) {
            this.props.updateRecipe(e, this.props.recipe, this.state);
            this.props.handleUpdated(this.props.recipe)
        }
        else {
            this.props.addRecipe(this.state);
            this.props.history.push('/');
        }

    };

    addIngredient = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            ingredients: [...prevState.ingredients, {name: '', amount: 0}],
        }));
    };

    render() {

        const { auth } = this.props;
        let { ingredients } = this.state;

        if (!auth.uid) return <Redirect to="/signin" />
        else {
            if(this.props.recipe) {
                return (
                    <RecipeForm
                        recipe={this.state}
                        title="Edit"
                        handleChange={this.handleChange.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)}
                        addIngredient={this.addIngredient.bind(this)}
                        ingredients={ingredients}
                    />
                )
            } else {
                return (
                    <div className="recipe-add ">
                        <h3>Add new recipe</h3> <br/> <br/>
                        <RecipeForm
                            title="Add new recipe"
                            recipe={this.state}
                            handleChange={this.handleChange.bind(this)}
                            handleSubmit={this.handleSubmit.bind(this)}
                            addIngredient={this.addIngredient.bind(this)}
                            ingredients={ingredients}/>
                    </div>
                )
            }

        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addRecipe: (recipe) => dispatch(addRecipe(recipe)),
        updateRecipe: (e, recipeId, updatedRecipe) => dispatch(updateRecipe(recipeId, updatedRecipe))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
