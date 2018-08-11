import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { auth, googleAuthProvider } from './firebase'
import { todaysDate } from './utils'
import ListOfExercises from './components/ListOfExercises'
import { changeValue, changeDataAfterLogin, checkServerRepetitions } from "./utils/api"

// todo
// add timer for total exercise
// show list of exercises by day

class App extends Component {

  state = {
    counter: 0,
    user: null,
    listOfExercises: {}
  }

  addOne = () => {
    this.setState(oldState => {
      let value = oldState.counter + 1
      if (this.state.user) {
        let uid = this.state.user.uid
        changeValue({ uid, value })
      }
      return {
        counter: value
      }
    })
  }

  removeOne = () => {
    this.setState(oldState => {
      let value = oldState.counter - 1
      if (this.state.user) {
        let uid = this.state.user.uid
        changeValue({ uid, value })
      }
      return {
        counter: value
      }
    })
  }

  reset = () => {
    this.setState(() => {
      let value = 0
      if (this.state.user) {
        let uid = this.state.user.uid
        changeValue({ uid, value })
      }
      return {
        counter: value
      }
    })
  }

  signOut = (e) => {
    if (e) {
      e.preventDefault();
    }
    auth.signOut()
      .then(() => {
        this.setState(() => ({
          user: null
        }))
      }).then(() => {
        this.reset()
      })

  }

  signIn = (e) => {
    if (e) {
      e.preventDefault()
    }

    auth.signInWithPopup(googleAuthProvider)
      .then(result => {

        if (result.user) {
          // this.setState(() => ({
          //   user: result.user
          // }))
          changeDataAfterLogin(result.user, this.state.counter)

          let cb = (value, list) => this.setState({ counter: value, user: result.user, listOfExercises: list })
          checkServerRepetitions(result.user, cb)

        }



      })

  }



  render() {
    const { user, listOfExercises } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Counter for {todaysDate}</h1>
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
        <div>
          <button onClick={this.removeOne}>Remove one</button>
          <button onClick={this.reset}>Reset</button>
        </div>

        <div style={{maxWidth: 400, margin: "0 auto"}}>
          {user && <ListOfExercises listOfExercises={listOfExercises} />}
        </div>



      </div>
    );
  }
}

export default App;
