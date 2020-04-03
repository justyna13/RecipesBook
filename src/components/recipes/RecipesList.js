import React from "react";
import {Link} from "react-router-dom";
import RecipeSummary from "./RecipeSummary";

const RecipesList = ({recipes, handleClick}) => {
    return (
        <div className="recipes__list card">
            {recipes && recipes.map(recipe => {
                return  (
                        <div className="recipe">
                            <Link to={'/recipe/' + recipe.id} key={recipe.id} onClick={handleClick.bind(this, recipe)}>
                                {/*<RecipeSummary recipe={recipe} />*/}
                                <div className="recipe__title">
                                    <h4>{recipe.name}</h4>
                                </div>
                            </Link>
                        </div>
                    )

            })}
        </div>
    )
};

export default RecipesList;
