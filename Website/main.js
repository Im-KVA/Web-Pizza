import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDT1wlf-bYdsP1p_pPwEOUuVWxD2DmXO6U",
  authDomain: "web-pizza-6000.firebaseapp.com",
  databaseURL: "https://web-pizza-6000-default-rtdb.firebaseio.com",
  projectId: "web-pizza-6000",
  storageBucket: "web-pizza-6000.appspot.com",
  messagingSenderId: "562026841250",
  appId: "1:562026841250:web:491d1efddf27fb3cf483fb",
  measurementId: "G-0BJSVKTWL1",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const dbRef = ref(getDatabase());

// Set up our register function
document.getElementById("submit-btn").addEventListener("click", function () {
  // Get all our input fields
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;
  const number = document.getElementById("number").value;

  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is Outta Line!!");
    return;
  }
  if (validate_field(username) == false || validate_field(number) == false) {
    alert("One or More Extra Fields is Outta Line!!");
    return;
  }
  // Move on with Auth
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("User Created!!");
      set(ref(db, "users/" + number), {
        username: username,
        password: password,
        email: email,
        last_login: Date.now(),
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});

// Set up our login function
document.getElementById("submit-login").addEventListener("click", function () {
  const email1 = document.getElementById("login-email").value;
  const password1 = document.getElementById("login-password").value;
  signInWithEmailAndPassword(auth, email1, password1)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("logged in!");
      alert("User Logged In!!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

// Validate Functions
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    alert("Valid email address!");
    return true;
  } else {
    alert("Invalid email address!");
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
