import React from "react";
import {connect} from "react-redux";
import {addRecipe, updateRecipe} from "../../store/actions/recipesActions";
import RecipeForm from "./RecipeForm";


class EditRecipe extends React.Component {


    componentDidMount() {
        this.setState({
            name: this.props.recipe.name,
            description: this.props.recipe.description,
            ingredients: this.props.recipe.ingredients,
            difficultyLevel: this.props.recipe.difficultyLevel
        })
    }


    addIngredient = (e) => {
        e.preventDefault();
        console.log(this.state.ingredients);
        this.setState((prevState) => ({
            ingredients: [...prevState.ingredients, {name: '', amount: 0}],
        }));
    };


    handleChange(field, e) {
        console.log(field, e.target.value);
        if (['name', 'amount'].includes(e.target.className)) {
            let ingredients = [...this.state.ingredients];
            ingredients[e.target.dataset.id][e.target.className] = e.target.value;
            this.setState({ingredients}, () => console.log(this.state.ingredients));
        } else {
            this.setState({
                [field]: e.target.value
            })
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateRecipe(e, this.props.recipe, this.state);
        // this.props.history.push('/');
    };


    render() {
        return (
            <div>
               <RecipeForm
                    title="Edit recipe"
                    recipe={this.props.recipe}
                    handleChange={this.handleChange.bind(this)}
                    handleSubmit={this.handleSubmit.bind(this)}
                    addIngredient={this.addIngredient.bind(this)}
                    />
            </div>
        );
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        addRecipe: (recipe) => dispatch(addRecipe(recipe)),
        updateRecipe: (e, recipeId, updatedRecipe) => dispatch(updateRecipe(recipeId, updatedRecipe))
    }
};


export default connect(null, mapDispatchToProps)(EditRecipe);
