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
