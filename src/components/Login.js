import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import { ValidasiRekening } from "../services/ValidasiRekening";

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

    login(e){
      let baseUrl = 'https://cors-anywhere.herokuapp.com/3.1.12.44:8080/ws-bank_war/services/wsbank';

        ValidasiRekening(baseUrl, this.state.rekening).then((result) =>{
            console.log('GOTCHA');
            console.log(result);
            if(result){
              sessionStorage.setItem('rekening', this.state.rekening);
              sessionStorage.setItem('authToken', 'testLoginToken');
              window.location.reload();
            } else {
              alert("Nomor rekening salah");
            }
        });
      e.preventDefault();
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
