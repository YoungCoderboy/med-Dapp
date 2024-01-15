// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCDlvsl-D7V1lrypkstl3W27K-RamFuMV0',
  authDomain: 'authentication-react-js-84e3c.firebaseapp.com',
  projectId: 'authentication-react-js-84e3c',
  storageBucket: 'authentication-react-js-84e3c.appspot.com',
  messagingSenderId: '978280059499',
  appId: '1:978280059499:web:d39858f67847da6510172e',
  measurementId: 'G-72BKJNLGF8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
