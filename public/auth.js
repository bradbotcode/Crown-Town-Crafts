// Initialize Firebase
var config = {
  apiKey: "AIzaSyCiaRXJar4m3jcAEM8P25YuS4ccFnsa6Io",
  authDomain: "brewery-app-306b6.firebaseapp.com",
  databaseURL: "https://brewery-app-306b6.firebaseio.com",
  projectId: "brewery-app-306b6",
  storageBucket: "brewery-app-306b6.appspot.com",
  messagingSenderId: "1082909881233"
};

firebase.initializeApp(config);
var database = firebase.database();
var user = null;
firebase.auth().onAuthStateChanged(function(firebUser) {
  console.log("authstatechanged");
  user = firebUser;

  if (user) {
    //show or hide what you want
    //ajax.post to api/newUser/:uid
    //from there on server side, api/newUser/:uid will look into db table for users, check for that UID. If its there, do nothing with post. it it isn't add them as new user.
    $.post("/api/newUser/" + user.uid, function(data) {
      console.log("created new user" + data);
    });
  } else {
    //show or hide what you want
  }
});

//Create a new account by passing the new user's email address and password to createUserWithEmailAndPassword:

//If the new account was created, the user is signed in automatically.
//Users remain signed in, even when browser closes.
$(".signUp").click(function(event) {
  event.preventDefault();

  var email = $("#signUpEmail")
    .val()
    .trim();
  console.log(email);
  var password = $("#signUpPassword").val();
  console.log(password);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(user) {
      var uid = user.uid;

      firebase
        .database()
        .ref("/" + uid)
        .set(userInfo);
      console.log(userInfo);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/email-already-in-use") {
        alert("Email already in use.");
      } else if (errorCode === "auth/invalid-email") {
        alert("Invalid email address.");
      } else if (errorCode === "auth/weak-password") {
        alert("Weak password. Please pick another.");
      } else {
        alert(errorMessage);
      }
      console.log(errorCode);
      console.log(errorMessage);
    });
});

//When a user signs in to the app, pass the user's email address and password to signInWithEmailAndPassword:
$("#signInEmail").blur(function() {
  $(".signIn").attr("data-close", "");
  console.log("blur");
});

$(".signIn").click(function(event) {
  event.preventDefault();

  var email = $("#signInEmail").val();
  var password = $("#signInPassword").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(user) {
      //var uid = user.uid;
      $("#signInEmail").removeClass("signInEmail");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === "auth/wrong-password") {
        console.log("wrong password");
      } else if (errorCode === "auth/invalid-email") {
        console.log("val error");
        $("#signInEmail").addClass("valStatus");
        $(".signIn").removeAttr("data-close");
      } else if (errorCode === "auth/user-not-found") {
        console.log("not valid user");
      } else {
      }
    });
});

//sign-out click function
$(".signOut").click(function(event) {
  event.preventDefault();
  console.log("hello");
  firebase.auth().signOut();
  //what to hide or show
});
