/* === Imports === */
// import { initializeApp } from "firebase/app"
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"
// import { getAuth } from "firebase/auth"
import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
 } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js'

/* === Firebase Setup === */
const firebaseConfig = {
    apiKey: "AIzaSyAcYGhAeivF1Q_0vkvq1uFpwqeko607Rtw",
    authDomain: "moody-27beb.firebaseapp.com",
    projectId: "moody-27beb",
    storageBucket: "moody-27beb.appspot.com"
  }

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

/* === Main Code === */

showLoggedOutView()

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    const email = emailInputEl.value
    const password = passwordInputEl.value
    /*  Challenge:
		Import the signInWithEmailAndPassword function from 'firebase/auth'

        Use the code from the documentaion to make this function work.
        
        Make sure to first create two consts, 'email' and 'password', to fetch the values from the input fields emailInputEl and passwordInputEl.
       
        If the login is successful then you should show the logged in view using showLoggedInView()
        If something went wrong, then you should log the error message using console.error.
    */
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    showLoggedInView()
  })
  .catch((error) => {
      console.error(error.message)
});
}

function authCreateAccountWithEmail() {
    const email = emailInputEl.value
    const password = passwordInputEl.value
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        // const user = userCredential.user
        showLoggedInView()
        console.log(userCredential)
    })
    .catch((error) => {
        console.error(error.message)
    });
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideElement(viewLoggedIn)
    showElement(viewLoggedOut)
}

function showLoggedInView() {
    hideElement(viewLoggedOut)
    showElement(viewLoggedIn)
}

function showElement(element) {
    element.style.display = "flex"
}

function hideElement(element) {
    element.style.display = "none"
}