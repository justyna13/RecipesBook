import React, {useState} from "react";
import moment from "moment";
import Modal from 'react-bootstrap/Modal';
import {deleteRecipe} from "../../store/actions/recipesActions";
import {connect} from "react-redux";
import Recipe from "./Recipe";


const RecipeSummary = ({recipe, deleteRecipeDispatch, recipeSelected, handleStateChange }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdate = () => {
        handleClose();
        handleStateChange();
    }

    const popUpDelete = (e, recipeId) => {
        // TODO:
        // add alert to confirm delete
        deleteRecipeDispatch(e, recipeId);
        handleUpdate();
    };




    if (recipeSelected) {
        return (
            <div className="recipe__summary">

                <div className="recipe__title recipe__summary-title">
                    <h4 className="m-auto">{recipe.name}</h4>

                    <button className="btn circle" onClick={handleShow}>
                        <i className="fa fa-edit fa-lg"> </i>
                    </button>
                    <button className="btn circle" onClick={(e) => popUpDelete(e,recipe.id)}>
                        <i className="fa fa-trash fa-lg"> </i>
                    </button>
                </div>

                <div className="recipes__list--details">
                    <img src={recipe.imgUrl} alt="recipe" className="recipe-img"/>

                    <div className="recipe-details-text">
                        <h5>Directions:</h5> <br/>
                        <p>{recipe.description}</p>

                        <h5>Ingredients:</h5> <br/>

                        {recipe.ingredients.map( (item, i) => {
                            return <li key={recipe.id + item.name + i}>{item.name}: {item.amount}</li>
                        })}
                        <br/>
                        <h5>Prep time: {recipe.prepTime}</h5>
                    </div>
                </div>

                <h5 className="recipe-added-date">Added: {moment(recipe.createdAt.toDate()).calendar()}</h5>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Recipe recipe={recipe} handleUpdated={handleUpdate} />
                    </Modal.Body>
                </Modal>
            </div>
        )
    } else {
        return (
            <div className="recipe__summary ">
                <div className="pick-recipe">
                    Pick recipe from the list above
                </div>
            </div>
        )
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteRecipeDispatch: (e, recipe) => {
            dispatch(deleteRecipe(recipe))
        }
    }
};




export default connect(null, mapDispatchToProps)(RecipeSummary);
