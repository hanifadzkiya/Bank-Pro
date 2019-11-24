import './App.css';
import './Home.css';
import React, { Component } from "react";
import { ShowDetailRekening } from '../services/ShowDetailRekening';
import { PostWithSOAP} from "../services/PostRequest";

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            detailRekening : null
        }
    }
    componentDidMount() {
        let baseUrl = 'https://cors-anywhere.herokuapp.com/3.1.12.44:8080/ws-bank_war/services/wsbank';

        PostWithSOAP(baseUrl, sessionStorage.getItem('rekening')).then((result) =>{
            ShowDetailRekening(result["rekening"]);
        });

    }
    render() {
        return (
            <div>
                <h2>Detail Rekening</h2>
                <table id="homeDetail">

                </table>
            </div>
        );
    }
}

export default Home;
