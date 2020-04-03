import React from "react";
import { Redirect } from "react-router-dom";
import {addRecipe} from "../../store/actions/recipesActions";
import {connect} from "react-redux";
import RecipeForm from "./RecipeForm";


class AddRecipe extends React.Component {

    state = {
        name: '',
        description: '',
        ingredients: [{
            name: '',
            amount: 0
        }],
        difficultyLevel: 0
    };

    handleChange(field, e) {
        if (['name', 'amount'].includes(e.target.className)) {
            let ingredients = [...this.state.ingredients];
            ingredients[e.target.dataset.id][e.target.className] = e.target.value;
            this.setState({ingredients}, () => console.log(this.state.ingredients));
        } else {
            this.setState({
                [field]: e.target.value
            })
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addRecipe(this.state);
        this.props.history.push('/');
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
            return (
                <div className="card">
                    <RecipeForm
                        title="Add new recipe"
                        handleChange={this.handleChange.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)}
                        addIngredient={this.addIngredient.bind(this)}
                        ingredients={ingredients}/>
                </div>
            )
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
        addRecipe: (recipe) => dispatch(addRecipe(recipe))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
