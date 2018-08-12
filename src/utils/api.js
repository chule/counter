import { todaysDate } from './index.js'
import { database } from '../firebase'

export const changeValue = ({ uid, value, time, cb }) => {
    database.ref(`users/${uid}/exercises/${todaysDate}`)
        .set({ repetitions: value, time });

        database.ref(`users/${uid}`).once("value", snapshot => {

                    let list = snapshot.child(`exercises/`).val()
                    cb(list)
                
        })

}

// export const listOfExercises = (uid) => {

//         return database.ref(`users/${uid}/exercises/`)
//             .once("value")

// }

export const checkServerRepetitions = (user, cb) => {
    return database.ref(`users/${user.uid}`).once("value", snapshot => {
        const email = snapshot.child("email").exists()
        if (email) { // if user exist
            let list = snapshot.child(`exercises/`).val()
            if (snapshot.child(`exercises/${todaysDate}`).exists()) {

                let value = snapshot.child(`exercises/${todaysDate}/repetitions`).val()
                let time = snapshot.child(`exercises/${todaysDate}/time`).val()
                
                //listOfExercises(result.user.uid).then(snapshot => console.log(snapshot.val()) )
                cb(value, list, time)
            } else {

                cb(0, list, 0)
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