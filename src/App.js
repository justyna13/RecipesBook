import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import RecipesDetails from "./components/recipes/RecipeDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AddRecipe from "./components/recipes/AddRecipe";
import './styles/navbar.css';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route path='/recipe/:id' component={RecipesDetails} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/recipes/add' component={AddRecipe} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
