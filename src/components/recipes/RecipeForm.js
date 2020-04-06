import React from "react";

class RecipeForm extends React.Component {

    handleChange(field, e) {
        this.props.handleChange(field, e);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <h3>{this.props.title}</h3> <br/> <br/>

                    <label htmlFor="name">Name</label> <br/>
                    <input
                        type="text"
                        id="name"
                        required={true}
                        defaultValue={this.props.recipe.name}
                        onChange={this.handleChange.bind(this, 'name')}/> <br/>

                    <label htmlFor="description">Description</label> <br/>
                    <textarea
                        id="description"
                        required={true}
                        defaultValue={this.props.recipe.description}
                        onChange={this.handleChange.bind(this, 'description')}/>  <br/>

                    <h5>Ingredients</h5> <br/>
                    {
                        this.props.recipe.ingredients.map( (val, idx) => {
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
                                        defaultValue={val.name}
                                        onChange={this.handleChange.bind(this, 'name')}
                                    />
                                    <br/>
                                    <label htmlFor={amountId}>Amount</label> <br/>
                                    <input
                                        type="number"
                                        data-id={idx}
                                        name={amountId}
                                        id={amountId}
                                        className="amount"
                                        defaultValue={val.amount}
                                        onChange={this.handleChange.bind(this, 'amount')}
                                    />
                                </div>
                            )
                        })
                    }
                    <br/>
                    <button onClick={this.props.addIngredient.bind(this)}>Add new </button> <br/>

                    <label htmlFor="difficultyLevel">Difficulty level</label> <br/>
                    <input
                        type="number"
                        id="difficultyLevel"
                        max={5}
                        min={1}
                        defaultValue={this.props.recipe.difficultyLevel}
                        onChange={this.handleChange.bind(this,"difficultyLevel" )}/> <br/>

                    <button>{this.props.title}</button>
                </form>
            </div>
        );
    }
}

export default RecipeForm;
