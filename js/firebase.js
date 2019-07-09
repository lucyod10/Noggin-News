
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB7bYstD6ysiMp6wsQc0bTqx3nlWR85R-E",
  authDomain: "nogginnews.firebaseapp.com",
  databaseURL: "https://nogginnews.firebaseio.com",
  projectId: "nogginnews",
  storageBucket: "",
  messagingSenderId: "850225517688",
  appId: "1:850225517688:web:62e07e14271fab99"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var auth = firebase.auth();
