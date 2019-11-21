import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import "./submit.css";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(event.target.value);
  }

  handleSubmit(event) {
    var soap = require('soap');
    var url = 'https://cors-anywhere.herokuapp.com/3.1.12.44:8080/ws-bank_war/services/wsbank?wsdl';
    var args = {arg0: '089649993811'};
    soap.createClient(url, function(err, client) {
        console.log(client);
      client.isRekeningExist(args, function(err, result) {
          alert(result["return"]);
      });
    });

    event.preventDefault();
  }

  render() {
    return (
        <Row>
            <Col sm={4} className="left-side">
                <div className="welcome">
                    <h2>BankPro</h2>
                </div>
            </Col>
            <Col sm={8}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                      <input className="input-rekening" type="number" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input className="submit-rekening" type="submit" value="Login"/>
                </form>
            </Col>
        </Row>
    );
  }
}
export default Login;