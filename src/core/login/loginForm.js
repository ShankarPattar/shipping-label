import React from 'react';
import PropTypes from 'prop-types';
export default class LoginForm extends React.Component {
    handleSignIn(e) {
        e.preventDefault()
        let username = this.refs.username.value
        let password = this.refs.password.value
        this.props.onSignIn(username, password)
    }

    render() {
        return (
            <form className="dynamic-form" onSubmit={this.handleSignIn.bind(this)}>
                <h3>Sign in </h3>
                <input className="form-input-login" type="text" ref="username" placeholder="enter you username" required/>
                <input className="form-input-login" type="password" ref="password" placeholder="enter password" required/>
                <input className="form-input-login" type="submit" value="Login"/>
            </form>
        )
    }

}
LoginForm.propTypes = {
    onSignIn: PropTypes.func.isRequired
};