import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Child prefix="For get started" />
      </div>
    );
  }
}


let filepath = "src/App.js";

class Child extends Component {
  render() {
    return (
      <p className="App-intro">
        {this.props.prefix}, edit <code>{filepath}</code> and save to reload.
      </p>
    );
  }
}

export default App;
