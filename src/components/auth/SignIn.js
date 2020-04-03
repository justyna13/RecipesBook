import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {signIn} from "../../store/actions/authActions";


class SignIn extends React.Component {
    state = {
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
        this.props.signIn(this.state);
    };

    render() {
        const { authError, auth } = this.props;

        if(auth.uid) return <Redirect to="/" />
        else return (
            <div className="card">
                <form onSubmit={this.handleSubmit}>
                    <h5 className="grey-text darken-3">
                        Login
                    </h5>
                    <br/>
                    <div className="form-group col-md-6">
                        <label htmlFor="email">Email</label> <br/>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="password">Password</label> <br/>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>

                    <div className="input-field btn-submit col-md-6">
                        <button className="btn btn-success">Login</button>
                    </div>
                    <div className="red-text">
                        { authError ? <p>{authError}</p>: null }
                    </div>

                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
