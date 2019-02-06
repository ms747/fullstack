import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch  } from  "react-router-dom"
import './App.css';
import Login from './pages/login';
import Inventory from './pages/inventory';

class App extends Component {
  render() {
    return (
     <Router>
       <Switch>
         <Route path="/" exact component={Login}/>
         <Route path="/inventory" exact component={Inventory}/>
       </Switch>
     </Router>
    );
  }
}

export default App;
