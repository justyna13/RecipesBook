import React from "react";
import {Link} from "react-router-dom";
import RecipeSummary from "./RecipeSummary";

const RecipesList = ({recipes}) => {
    return (
        <div className="recipes__list card">
            {recipes && recipes.map(recipe => {
                return  (
                        <Link to={'/recipe/' + recipe.id} key={recipe.id}>
                            <RecipeSummary recipe={recipe} />
                        </Link>
                    )

            })}
        </div>
    )
};

export default RecipesList;
