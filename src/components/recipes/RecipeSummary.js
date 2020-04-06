import React, {useState} from "react";
import moment from "moment";
import Modal from 'react-bootstrap/Modal';
import {deleteRecipe} from "../../store/actions/recipesActions";
import {connect} from "react-redux";
import Recipe from "./Recipe";


const RecipeSummary = ({recipe, deleteRecipeDispatch }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    if (recipe.createdAt) {
        return (
            <div className="recipe__summary">

                <div className="recipe__title recipe__summary--title">
                    <h4 className="m-auto">{recipe.name}</h4>
                    <button className="btn circle" onClick={handleShow}>
                        <i className="fa fa-edit fa-lg"> </i>
                    </button>
                    <button className="btn circle"
                            onClick={(e) => deleteRecipeDispatch(e,recipe.id)}>
                            <i className="fa fa-trash fa-lg"> </i>
                    </button>

                </div>

                <div className="recipes__list--details">
                    <h5>Ingredients:</h5> <br/>

                    {recipe.ingredients.map( (item) => {
                         return <li key={Date.now()+ item.name}>{item.name}: {item.amount}</li>
                    })}
                    <h5>Directions:</h5> <br/>
                    <p>{recipe.description}</p>
                    <h5>Added:</h5>
                    <p>{moment(recipe.createdAt.toDate()).calendar()}</p>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Recipe recipe={recipe} />
                    </Modal.Body>
                </Modal>
            </div>
        )
    } else {
        return (
            <div className="recipe__summary ">
                <div className="pick-recipe">
                    Pick recipe from list above
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
