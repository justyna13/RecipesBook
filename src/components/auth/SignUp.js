import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/actions/authActions";


class SignUp extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.signUp(this.state);
    };

    render() {

        const { auth, authError } = this.props;

        if(auth.uid) return <Redirect to="/" />
        else return (
            <div className="card">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text darken-3">
                        Sign Up
                    </h5>
                    <br/>
                    <div className="form-group col-md-6">
                        <input
                          id="firstName"
                          type="text"
                          value={this.state.firstName}
                          required
                          onChange={this.handleChange} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="firstName">First Name</label>
                    </div>

                    <div className="form-group col-md-6">
                        <input
                          id="lastName"
                          type="text"
                          value={this.state.lastName}
                          required
                          onChange={this.handleChange} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="lastName">Last Name</label>
                    </div>

                    <div className="form-group col-md-6">
                        <input
                          id="email"
                          type="text"
                          value={this.state.email}
                          required
                          onChange={this.handleChange} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="email">E-mail</label>
                    </div>

                    <div className="form-group col-md-6">
                        <input
                          id="password"
                          type="password"
                          value={this.state.password}
                          required
                          onChange={this.handleChange} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="password">Password</label>
                    </div>

                    <div className="input-field btn-submit col-md-6">
                        <button className="btn btn-blue">Sign up</button>
                    </div>

                    <div className="red-text center">
                        {authError ? <p>{authError}</p>: null}
                    </div>

                </form>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
