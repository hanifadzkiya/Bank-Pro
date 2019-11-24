import './App.css';
import './History.css';
import React, { Component } from "react";
import { CreateTable } from '../services/CreateTable';
import { PostWithSOAP} from "../services/PostRequest";

class History extends Component {
    componentDidMount() {
        let baseUrl = 'https://cors-anywhere.herokuapp.com/3.1.12.44:8080/ws-bank_war/services/wsbank';

        PostWithSOAP(baseUrl, sessionStorage.getItem('rekening')).then((result) =>{
            result = result['listTransaksi'];

            var arr = [];
            var temp = [];
            for(let i = 0;i<result['length'];i++){
                temp = [];
                temp.push(result[i.toString()]['noRekening2']);
                temp.push(result[i.toString()]['jenis']);
                temp.push(result[i.toString()]['jumlah']);
                temp.push(result[i.toString()]['waktuTransaksi']);
                arr.push(temp);
            }
            CreateTable(arr);
        });

    }

    clearTable(){
        var parent = document.getElementById("tableID");
        while(parent.hasChildNodes()){
            parent.removeChild(parent.firstChild);
        }
    }

    //Generate Table
    render() {
        return (
            <div>
                <h2>History</h2>
                <p>Pada riwayat transaksi, pengguna dapat melihat daftar data berikut: waktu transaksi, jenis transaksi (debit/kredit),
                    jumlah transaksi, dan rekening terkait (jika ada).</p>
                <table id="tableID">

                </table>
            </div>
        );
    }
}

export default History;
