var config = {
  apiKey: "AIzaSyCiaRXJar4m3jcAEM8P25YuS4ccFnsa6Io",
  authDomain: "brewery-app-306b6.firebaseapp.com",
  databaseURL: "https://brewery-app-306b6.firebaseio.com",
  projectId: "brewery-app-306b6",
  storageBucket: "brewery-app-306b6.appspot.com",
  messagingSenderId: "1082909881233"
};

// initialize Firebase
firebase.initializeApp(config);
var user = null;

firebase.auth().onAuthStateChanged(function (firebUser) {
  console.log("authstatechanged");
  user = firebUser;

  if (user) {
    $.post("/api/newUser/" + user.uid, function (data) {
      console.log("created new user" + data);
    });

    //we can also choose to show or hide dom items based on authstate
  } else {
    //show or hide what you want
  }
});

//create a new account with signup.
$(".signUp").click(function (event) {
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
    .then(function (user) {
      var uid = user.uid;
    })
    .catch(function (error) {
      // handle Errors here.
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

//firebase signIn method
$(".signIn").click(function (event) {
  event.preventDefault();

  var email = $("#signInEmail").val();
  var password = $("#signInPassword").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (user) {
      var uid = user.uid;
    })
    .catch(function (error) {
      // handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === "auth/wrong-password") {
        console.log("wrong password");
      } else if (errorCode === "auth/invalid-email") {
        console.log("val error");
      } else if (errorCode === "auth/user-not-found") {
        console.log("not valid user");
      } else {}
    });
});

//sign-out click function
$(".signOut").click(function (event) {
  event.preventDefault();
  console.log("hello");
  firebase.auth().signOut();
  //what to hide or show
});