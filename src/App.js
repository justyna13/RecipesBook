import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Recipe from "./components/recipes/Recipe";
import './styles/navbar.css';
import UserProfile from "./components/auth/UserProfile";

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path={['/', '/recipe/:id']} component={Dashboard} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/add' component={Recipe} />
                    <Route path='/user/:id' component={UserProfile} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
