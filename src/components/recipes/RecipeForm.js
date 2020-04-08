import React from "react";

class RecipeForm extends React.Component {

    handleChange(field, e) {
        this.props.handleChange(field, e);
    }

    render() {
        return (
            <div className="recipe__form">
                <form onSubmit={this.props.handleSubmit}>
                    <label htmlFor="name">Name</label> <br/>
                    <input
                        type="text"
                        id="name"
                        required={true}
                        defaultValue={this.props.recipe.name}
                        style={{padding: '5px'}}
                        onChange={this.handleChange.bind(this, 'name')}/> <br/>

                    <label htmlFor="description">Description</label> <br/>
                    <textarea
                        id="description"
                        required={true}
                        defaultValue={this.props.recipe.description}
                        onChange={this.handleChange.bind(this, 'description')}/>  <br/>
                    <hr/>
                    <br/>
                    {
                        this.props.recipe.ingredients.map( (val, idx) => {
                            let ingredId = `ingredient-${idx}`, amountId = `amount-${idx}`;
                            return (
                                <div>
                                    <legend><span className="number">{idx + 1}</span> Ingredient</legend>
                                    <div key={idx} className="ingredients">
                                        <div>

                                            <label htmlFor={ingredId}>Name</label> <br/>
                                            <input
                                                type="text"
                                                name={ingredId}
                                                data-id={idx}
                                                id={ingredId}
                                                className="name"
                                                defaultValue={val.name}
                                                min={0}
                                                onChange={this.handleChange.bind(this, 'name')}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={amountId}>Amount</label> <br/>
                                            <input
                                                type="number"
                                                data-id={idx}
                                                name={amountId}
                                                id={amountId}
                                                className="amount"
                                                defaultValue={val.amount}
                                                min={0}
                                                maxLength={3}
                                                onChange={this.handleChange.bind(this, 'amount')}
                                            />
                                        </div>

                                    </div>
                                    <br/> <br/>
                                </div>

                            )
                        })
                    }
                    <br/>
                    <button className="btn btn-success btn-small" onClick={this.props.addIngredient.bind(this)}>Add more </button> <br/> <br/>
                    <hr/>
                    <label htmlFor="difficultyLevel">Difficulty level</label> <br/>
                    <input
                        type="number"
                        id="difficultyLevel"
                        max={5}
                        min={1}
                        defaultValue={this.props.recipe.difficultyLevel}
                        onChange={this.handleChange.bind(this,"difficultyLevel" )}/> <br/> <br/>

                    <button className="btn btn-success">{this.props.title}</button>
                </form>
            </div>
        );
    }
}

export default RecipeForm;
