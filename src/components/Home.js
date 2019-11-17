import React, { Component } from "react";

class Home extends Component {
    render() {
        return (
            <div>
                <h2>Home</h2>
                <p>Halaman utama menampilkan nama pemilik, nomor rekening, nama bank, dan saldo terakhir.
                    Pada menu utama, pengguna juga dapat memilih untuk transfer ke rekening lain dan melihat riwayat transaksi.</p>
            </div>
        );
    }
}

export default Home;