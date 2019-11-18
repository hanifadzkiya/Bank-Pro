import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import "./submit.css";

class Login extends Component {
    constructor(props){
        super(props)
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          no_rekening: 'sw'
        };
    }

    login(event){
        // sessionStorage.setItem('authToken', 'testLoginToken');
        var soap = require('soap');
        var url = 'http://localhost:9000/wsbank?wsdl';
        var args = {arg0: '089649993811'};
        soap.createClient(url, function(err, client) {
          client.isRekeningExist(args, function(err, result) {
              alert(result["return"]);
          });
        });
        event.preventDefault()
        // alert(this.state.no_rekening);
    }

    handleChange(event){
        console.log(event);
        this.setState({no_rekening: event.target.value});
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <h2>Bank Pro Login</h2>
                <form onSubmit = {this.login}>
                    <input id="input-rekening" type="number" value={this.state.no_rekening} onChange={this.handleChange}/>
                    <input id="submit" type="submit" value="Login"/>
                </form>
            </div>
        );
    }
}
export default Login;