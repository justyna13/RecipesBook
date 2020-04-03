import React from "react";
import { Redirect } from "react-router-dom";
import {addRecipe} from "../../store/actions/recipesActions";
import {connect} from "react-redux";


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

    handleChange = (e) => {

        if (['name', 'amount'].includes(e.target.className)) {
            console.log('yes', e.target.value);
            let ingredients = [...this.state.ingredients];
            ingredients[e.target.dataset.id][e.target.className] = e.target.value;
            this.setState({ingredients}, () => console.log(this.state.ingredients));
        } else {
            this.setState({
                [e.target.id]: e.target.value
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
                    <form onSubmit={this.handleSubmit}>
                        <h3>Add new recipe</h3> <br/> <br/>

                        <div className="input-field">
                            <label htmlFor="name">Name</label> <br/>
                            <input
                                type="text"
                                id="name"
                                onChange={this.handleChange}/> <br/>
                        </div>

                        <div className="input-field">
                            <label htmlFor="description">Description</label> <br/>
                            <textarea
                                id="description"
                                onChange={this.handleChange}/>  <br/>
                        </div>

                        <div className="input-field">
                            <h5>Ingredients</h5> <br/> <br/>
                            {
                                ingredients.map( (val, idx) => {
                                    let ingredId = `ingredient-${idx}`, amountId = `amount-${idx}`;
                                    return (
                                        <div key={idx}>
                                            <label htmlFor={ingredId}>{`Ingredient #${idx + 1}`}</label> <br/>
                                            <input
                                                type="text"
                                                name={ingredId}
                                                data-id={idx}
                                                id={ingredId}
                                                className="name"
                                                onChange={this.handleChange}
                                            />
                                            <br/>
                                            <label htmlFor={amountId}>Amount</label> <br/>
                                            <input
                                                type="number"
                                                data-id={idx}
                                                name={amountId}
                                                id={amountId}
                                                className="amount"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    )
                                })
                            }
                            <button onClick={this.addIngredient}>Add new </button>
                        </div>

                        <div className="input-field">
                            <label htmlFor="difficultyLevel">Difficulty level</label> <br/>
                            <input
                                type="number"
                                id="difficultyLevel"
                                max={5}
                                min={1}
                                onChange={this.handleChange}/> <br/>
                        </div>

                        <div className="input-field">
                            <button>Add</button>
                        </div>

                    </form>
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
