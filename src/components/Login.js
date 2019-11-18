import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import "./submit.css";

class Login extends Component {
    constructor(props){
        super(props)
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleIOS = this.handleIOS.bind(this);
        this.state = {
          as:['','','',''],
          kolom:'0',
          no_rekening: '',
          disable: [false, true, true, true]
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
        this.setState({no_rekening: event.target.value});
    }

    handleIOS(event){
        // console.log(event.target.value);
        this.setState({disable: {kolom: true}});
        this.setState({as: {kolom: event.target.value}});
        if(event.target.value == ''){
            this.setState({kolom: Math.min(0,this.state.kolom-1)});
        } else {
            this.setState({kolom: Math.max(3,this.state.kolom+1)});
        }
        this.setState({disable: {kolom: false}});
        this.setState({as: event.target.value});
        console.log(this.state.disable);
    }
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <h2>Bank Pro Login</h2>
                <form onSubmit = {this.login}>
                    <input id="input-rekening" type="number" value={this.state.no_rekening} onChange={this.handleChange}/>
                    <input id="submit" type="submit" value="Login"/>
                </form>
                <form id="ios">
                    <input type="password" maxlength="1" value={this.state.as[0]} disabled = {this.state.disable[0]} onChange={this.handleIOS}/>
                    <input type="password" maxlength="1" value={this.state.as[1]} disabled = {this.state.disable[1]} onChange={this.handleIOS}/>
                    <input type="password" maxlength="1" value={this.state.as[2]} disabled = {this.state.disable[2]} onChange={this.handleIOS}/>
                    <input type="password" maxlength="1" value={this.state.as[3]} disabled = {this.state.disable[3]} onChange={this.handleIOS}/>
                </form> 
            </div>
        );
    }
}
export default Login;