import React from "react";
import { Redirect } from "react-router-dom";
import {addRecipe} from "../../store/actions/recipesActions";
import {connect} from "react-redux";


class AddRecipe extends React.Component {

    state = {
        name: '',
        description: '',
        ingredients: '',
        difficultyLevel: 0
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addRecipe(this.state);
        this.props.history.push('/');
    };

    render() {

        const { auth } = this.props;

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
                            <label htmlFor="ingredient">Ingredients</label> <br/> <br/>
                            <input
                                type="text"
                                id="ingredients"
                                onChange={this.handleChange}/>
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
