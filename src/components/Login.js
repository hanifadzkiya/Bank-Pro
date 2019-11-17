import React, { Component } from "react";
import {Redirect} from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props)
        this.login = this.login.bind(this);
    }

    login(){
        sessionStorage.setItem('authToken', 'testLoginToken');
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <p>Tekan tombol di bawah untuk login</p>
                <form onSubmit = {this.login}>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        );
    }
}
export default Login;