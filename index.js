/* === Imports === */
// import { initializeApp } from "firebase/app"
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"
// import { getAuth } from "firebase/auth"
import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
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
const provider = new GoogleAuthProvider()

/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const signOutButtonEl = document.getElementById("sign-out-btn")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

signOutButtonEl.addEventListener("click", authSignOut)

/* === Main Code === */
onAuthStateChanged(auth, (user) => {
    if (user) {
      showLoggedInView()
    } else {
      showLoggedOutView()
    }
  });

onAuthStateChanged(auth, (user) => {
  if (user) {
    showLoggedInView()
    // ...
  } else {
    showLoggedOutView()
  }
});


/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    /*  Challenge:
		Import the signInWithPopup function from 'firebase/auth'

        Use the code from the documentaion to make this function work.
       
        If the login is successful then you should console log "Signed in with Google"
        If something went wrong, then you should log the error message using console.error.
    */
        signInWithPopup(auth, provider)
        .then((result) => {
          console.log("Signed in with Google")
        }).catch((error) => {
            console.log(error.message)
        });


}

function authSignInWithEmail() {
    const email = emailInputEl.value
    const password = passwordInputEl.value
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            clearAuthFields()
        })
        .catch((error) => {
            console.error(error.message)
        })
}

function authCreateAccountWithEmail() {
    const email = emailInputEl.value
    const password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            clearAuthFields()
        })
        .catch((error) => {
            console.error(error.message) 
        })
}

function authSignOut() {
    signOut(auth)
        .then(() => {
            
        }).catch((error) => {
            console.error(error.message)
        })
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
}

function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
}

function showView(view) {
    view.style.display = "flex" 
}

function hideView(view) {
    view.style.display = "none"
}

function clearInputField(field) {
	field.value = ""
}

function clearAuthFields() {
	clearInputField(emailInputEl)
	clearInputField(passwordInputEl)
}