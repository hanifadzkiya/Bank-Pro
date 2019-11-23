import React, { Component } from "react";

class Logout extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        sessionStorage.clear();
    }

    render() {
        return (
            <div>
                <h2>Logout</h2>
                <p>Tekan tombol untuk logout</p>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}

export default Logout;
