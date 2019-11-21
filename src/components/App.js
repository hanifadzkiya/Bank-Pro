import React, { Component } from "react";
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Transfer from "./Transfer";
import History from "./History";
// import NotFound from "./NotFound";
import Login from "./Login";
import Logout from "./Logout";

class App extends Component {
  render() {
    let loggedIn = (sessionStorage.getItem('authToken'));
    if(loggedIn){
      return (
          <BrowserRouter basename={'/bank-pro/build'}>
            <div>
              <h1 className="title">Bank Pro</h1>
              <ul className="header">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/transfer">Transfer</NavLink></li>
                <li><NavLink to="/history">History</NavLink></li>
                <li><NavLink to="/logout">Logout</NavLink></li>
              </ul>
              <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/transfer" component={Transfer}/>
                <Route path="/history" component={History}/>
                <Route path="/logout" component={Logout}/>
                {/*<Route path="*" component={NotFound}/>*/}
              </div>
            </div>
          </BrowserRouter>
      );
    } else{
      return (
          <BrowserRouter basename={'/bank-pro/build'}>
            <div className="content">
              <Route path="*" component={Login}/>
            </div>
          </BrowserRouter>
      )
    }

  }
}

export default App;
