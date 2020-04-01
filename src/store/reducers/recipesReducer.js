const initialState = {
    recipes: [
        {id: '1', name: 'soup', content: 'ble ble ble'},
        {id: '2', name: 'chicken', content: 'ble ble ble'},
        {id: '3', name: 'milky way', content: 'ble ble ble'}
    ]
};


const recipeReducer = (state = initialState, action) => {
    return state;
};

export default recipeReducer;
