import { todaysDate } from './index.js'
import { database } from '../firebase'

export const changeValue = ({ uid, value }) => {
    database.ref(`users/${uid}/exercises/${todaysDate}`)
        .set({ repetitions: value, time: Date.now() });
}

// export const listOfExercises = (uid) => {

//         return database.ref(`users/${uid}/exercises/`)
//             .once("value")

// }

export const checkServerRepetitions = (user, cb) => {
    return database.ref(`users/${user.uid}`).once("value", snapshot => {
        const email = snapshot.child("email").exists()
        if (email) { // if user exist

            if (snapshot.child(`exercises/${todaysDate}`).exists()) {
                let value = snapshot.child(`exercises/${todaysDate}/repetitions`).val()
                let list = snapshot.child(`exercises/`).val()
                //listOfExercises(result.user.uid).then(snapshot => console.log(snapshot.val()) )
                cb(value, list)
            }

        }
    })
}

export const changeDataAfterLogin = (user, value) => {
    database.ref(`users/${user.uid}`).once("value", snapshot => {
        const email = snapshot.child("email").exists();
        if (!email) { // if user exist

            // add user to database

            database.ref('users')
                .child(user.uid)
                .set({ displayName: user.displayName, email: user.email, uid: user.uid, photoURL: user.photoURL });

            changeValue({ uid: user.uid, value })
        }
    });
}