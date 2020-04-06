export const addRecipe = (recipe) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;

        firestore.collection('recipes').add({
            ...recipe,
            userFirstName: profile.firstName,
            userLastName: profile.lastName,
            userId: userId,
            createdAt: new Date()
        }).then( () => {
            dispatch({type: 'ADD_RECIPE', recipe: recipe});
        }).catch( (error) => {
            dispatch({type: 'ADD_RECIPE_ERROR', error});
            console.log(error);
        });
    }
};

export const updateRecipe = (prevRecipe, updatedRecipe, e) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const recipe = {
            name: updatedRecipe.name,
            description: updatedRecipe.description,
            difficultyLevel: updatedRecipe.difficultyLevel,
            ingredients: updatedRecipe.ingredients,
            createdAt: prevRecipe.createdAt,
            userId: prevRecipe.userId,
            userLastName: prevRecipe.userLastName,
            userFirstName: prevRecipe.userFirstName
            // ...prevRecipe
        };

        firestore.collection('recipes').doc(prevRecipe.id).update(recipe).then( () => {
            dispatch({type: 'UPDATE_RECIPE', recipe: recipe})
        }).catch((error) => {
            dispatch({type: 'UPDATE_RECIPE_ERROR', error});
        });


    }
};


export const deleteRecipe = (recipeId, e) => {
    console.log(e, recipeId);
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('recipes').doc(recipeId).delete()
            .then(() => {
                console.log('deleted');
                dispatch({ type: 'DELETE_RECIPE' });
            }).catch(err => {
            dispatch({ type: 'DELETE_RECIPE_ERROR' });
        })
    }
};
