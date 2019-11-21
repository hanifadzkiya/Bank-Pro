import React, { Component } from "react";
import { callTransactionService } from "../services/PostRequest";

class Transfer extends Component {
    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this);
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

    render() {
        return (
            <div>
                <h2>Transfer</h2>
                <p>Pengguna dapat mentransfer uang ke rekening lain di Bank Pro.
                    Tidak ada potongan tambahan ketika mentransfer ke rekening bank lain.
                    Saat transaksi selesai, ada pesan berhasil atau gagal yang muncul.</p>
                <div className="Transfer">
                    <div className="Home-body">
                        <form onSubmit = {callTransactionService(sessionStorage.getItem('rekening'),this.state.NomorPenerima,this.state.Nominal)}>
                            <input
                                name="NomorPenerima"
                                type="text"
                                onChange={this.onChange}
                            /><br></br>
                            <input
                                name="Nominal"
                                type="number"
                                onChange={this.onChange}
                            /><br></br>
                            <input type="submit" value="Transfer"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Transfer;
