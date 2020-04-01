const initialState = {
    recipes: [
        {id: '1', name: 'soup', content: 'ble ble ble'},
        {id: '2', name: 'chicken', content: 'ble ble ble'},
        {id: '3', name: 'milky way', content: 'ble ble ble'}
    ]
};


const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_RECIPE':
            console.log('created', action.recipe);
            return state;
        case 'ADD_RECIPE_ERROR':
            console.log(action.error);
            return state;
        default:
            return state;
    }
};

export default recipeReducer;
