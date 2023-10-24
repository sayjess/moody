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

const userProfilePictureEl = document.getElementById("user-profile-picture")

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
    showProfilePicture(userProfilePictureEl, user)
    // ...
  } else {
    showLoggedOutView()
  }
});


/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
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

function showProfilePicture(imgElement, user) {
    /*  Challenge:
        Use the documentation to make this function work.
        This function has two parameters: imgElement and user
        We will call this function inside of onAuthStateChanged when the user is logged in.
        The function will be called with the following arguments:
        showProfilePicture(userProfilePictureEl, user)
        
        If the user has a profile picture URL, set the src of imgElement to that URL.
        
        Otherwise, you should set the src of imgElement to "assets/images/default-profile-picture.jpeg"
    */
        // const user = auth.currentUser;
        if (user.photoURL) {
          imgElement.src = user.photoURL
        } else {
            imgElement.src = 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'
        }
}