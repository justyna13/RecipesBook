import React from "react";
import moment from "moment";

const RecipeSummary = ({recipe}) => {
    return (
        <div>
            <h4>{recipe.name}</h4>
            <hr/>
            <p>{recipe.description}</p>
            <p>Author: {recipe.userFirstName} {recipe.userLastName}</p>
            <p>{moment(recipe.createdAt.toDate()).calendar()}</p>
        </div>
    )
};


export default RecipeSummary;
