import React from "react";
import moment from "moment";

const RecipeSummary = ({recipe}) => {

    if (recipe.createdAt) {
        return (
            <div className="recipe__summary">

                <div className="recipe__title recipe__summary--title">
                    <h4>{recipe.name}</h4>
                </div>

                <div className="recipes__list--details">
                    <h5>Ingredients:</h5> <br/>

                    {recipe.ingredients.map( (item) => {
                         return <li key={Date.now()+ item.name}>{item.name}: {item.amount}</li>
                    })}
                    <h5>Directions:</h5> <br/>
                    <p>{recipe.description}</p>
                    {/*<p>Author: {recipe.userFirstName} {recipe.userLastName}</p>*/}
                    <h5>Added:</h5>
                    <p>{moment(recipe.createdAt.toDate()).calendar()}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="recipe__summary card">
                click one
            </div>
        )
    }

};


export default RecipeSummary;
