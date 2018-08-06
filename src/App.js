import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { auth, database, googleAuthProvider } from './firebase';

class App extends Component {

  state = {
    counter: 0,
    user: null
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

  signOut = (e) => {
    if (e) {
      e.preventDefault();
    }
    auth.signOut().then(() => {
      this.setState(() => ({
        user: null
      }))
    })
    this.reset()
  }

  signIn = (e) => {
    if (e) {
      e.preventDefault()
    }



    auth.signInWithPopup(googleAuthProvider)
      .then(result => {
        console.log(result)
        if (result.user) {
          this.setState(() => ({
            user: result.user
          }))
        }
      })

  }


  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Counter</h1>
          {
            user
              ? <button onClick={this.signOut}>
                {"Sign Out " + user.displayName.split(" ")[0]}
              </button>

              : <button onClick={this.signIn}>
                Sign in
              </button>
          }
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
