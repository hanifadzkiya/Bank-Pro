import React, { Component } from "react";
import { callTransactionService } from "../services/PostRequest";

class Transfer extends Component {
    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this);
        this.callTS = this.callTS.bind(this);
        this.state = {
            NomorPenerima: '',
            Nominal: 0
        };
    }

    onChange = (event) =>{
        event.preventDefault();
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    callTS() {
        callTransactionService(sessionStorage.getItem('rekening'),this.state.NomorPenerima,this.state.Nominal);
    }

    render() {
        return (
            <div>
                <h2>Transfer</h2>
                <p>Pengguna dapat mentransfer uang ke rekening lain di Bank Pro.
                    Tidak ada potongan tambahan ketika mentransfer ke rekening bank lain.
                    Saat transaksi selesai, ada pesan berhasil atau gagal yang muncul.</p>
                <br/>
                <div className="Transfer">
                    <form>
                        Nomor tujuan :<br/>
                        <input
                            name="NomorPenerima"
                            type="text"
                            onChange={this.onChange}
                        /><br/><br/>
                        Nominal :<br/>
                        <input
                            name="Nominal"
                            type="number"
                            onChange={this.onChange}
                        /><br/><br/>
                    </form>
                </div>
                <input type="button" value="Transfer" onClick = {this.callTS}/>
            </div>
        );
    }
}

export default Transfer;
