import React, { Component } from "react";
import {Redirect} from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            rekening:""
        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    //Set value of username and password
    onChange = (event) =>{
        event.preventDefault();
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    login(){
        sessionStorage.setItem('rekening', this.state.rekening);
        sessionStorage.setItem('authToken', 'testLoginToken');
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <p>Masukkan nomor rekening Anda</p>
                <form onSubmit = {this.login}>
                    <input
                        name="rekening"
                        placeholder="Masukan rekening..."
                        type="text"
                        maxLength = "20"
                        onChange={this.onChange}
                    />
                    <br />
                    <input type="submit" value="Login"/>
                </form>
            </div>
        );
    }
}
export default Login;
