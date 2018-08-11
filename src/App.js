import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { auth, database, googleAuthProvider } from './firebase'
import { todaysDate } from './utils'
import ListOfExercises from './components/ListOfExercises'

// todo
// add timer for total exercise
// show list of exercises by day

class App extends Component {

  state = {
    counter: 0,
    user: null
  }

  addOne = () => {
    this.setState(oldState => ({
      counter: oldState.counter + 1
    }))

    if (this.state.user) {
      database.ref(`users/${this.state.user.uid}/exercises/${todaysDate}`)
        .set({ repetitions: this.state.counter + 1, time: Date.now() });
    }

  }

  removeOne = () => {
    this.setState(oldState => ({
      counter: oldState.counter - 1
    }))

    if (this.state.user) {
      database.ref(`users/${this.state.user.uid}/exercises/${todaysDate}`)
        .set({ repetitions: this.state.counter - 1, time: Date.now() });
    }

  }

  reset = () => {
    this.setState(() => ({
      counter: 0
    }))

    if (this.state.user) {
      database.ref(`users/${this.state.user.uid}/exercises/${todaysDate}`)
        .set({ repetitions: 0, time: Date.now() });
    }

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
        console.log(result)
        if (result.user) {
          this.setState(() => ({
            user: result.user
          }))
        }

        this.loginStuff()
      })

  }


  loginStuff = () => {

    auth.onAuthStateChanged((user) => {

      if (user) {

        database.ref(`users/${user.uid}`).once("value", snapshot => {
          const email = snapshot.child("email").exists();
          if (email) { // if use exist

            if (snapshot.child(`exercises/${todaysDate}`).exists()) {
              let serverRepetitions = snapshot.child(`exercises/${todaysDate}/repetitions`).val();

              this.setState({ counter: serverRepetitions });

            } else {
              database.ref(`users/${user.uid}/exercises/${todaysDate}`)
                .set({ repetitions: this.state.counter, time: Date.now() });
            }

          } else { // add user to database
            database.ref('users')
              .child(user.uid)
              .set({ displayName: user.displayName, email: user.email, uid: user.uid, photoURL: user.photoURL });

            database.ref(`users/${user.uid}/exercises/${todaysDate}`)
              .set({ repetitions: this.state.counter, time: Date.now() });

          }
        });
      }

    });
  }


  render() {
    const { user } = this.state;

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
        <button onClick={this.removeOne}>Remove one</button>
        <button onClick={this.reset}>Reset</button>

        <ListOfExercises />

      </div>
    );
  }
}

export default App;
