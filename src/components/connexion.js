import firebase from 'firebase/app'
import  'firebase/database'

export const db = firebase
    .initializeApp( {
        databaseURL: "https://doityourself-aa4fb.firebaseio.com",
    projectId: "doityourself-aa4fb", }).database()

