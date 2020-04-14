const initialState = {
    recipes: [ ]
};


const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_RECIPE':
            console.log('created', action.recipe);
            return state;
        case 'ADD_RECIPE_ERROR':
            console.log(action.error);
            return state;
        case 'UPDATE_RECIPE':
            console.log('created', action.recipe);
            return state;
        case 'UPDATE_RECIPE_ERROR':
            console.log(action.error);
            return state;
        case 'DELETE_RECIPE':
            console.log('deleted');
            return state;
        case 'DELETE_RECIPE_ERROR':
            console.log(action.error);
            return state;
        default:
            return state;
    }
};

export default recipeReducer;
