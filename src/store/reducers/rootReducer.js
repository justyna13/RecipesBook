import authReducer from "./authReducers";
import recipeReducer from "./recipesReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    auth: authReducer,
    recipes: recipeReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
});

export default rootReducer;
