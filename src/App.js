import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    counter: 0
  }

  addOne = () => {
    this.setState(oldState => ({
      counter: oldState.counter + 1
    }))
  }

  reset = () => {
    this.setState(() => ({
      counter: 0
    }))
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Counter</h1>
        </header>
        <p className="App-intro">
          {this.state.counter}
        </p>

        <button className="Add-button" onClick={this.addOne}>Add one</button>
        <br />
        <button onClick={this.reset}>Reset</button>

      </div>
    );
  }
}

export default App;
