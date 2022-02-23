// aqui exportaras las funciones que necesites
// Import the functions you need from the SDKs you need
// En el video se usa version 9.4.0
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import { changeTmp } from './lib/router.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJhNCcSgFRoYtj1SBRqPa4QZJjc_16iNI",
  authDomain: "pet-s-love.firebaseapp.com",
  databaseURL: "https://pet-s-love-default-rtdb.firebaseio.com",
  projectId: "pet-s-love",
  storageBucket: "pet-s-love.appspot.com",
  messagingSenderId: "846233461258",
  appId: "1:846233461258:web:fa483252ddda0a84b2b5f3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const database = getDatabase(app);
const auth = getAuth();

/*
// Initialización de Firebase en la webapp
firebase.initializeApp(firebaseConfig);

// Comandos de firebase: autenticación, firestore y analytics
firebase.auth();
firebase.firestore();
firebase.analytics();
*/



// Cambio de vistas para el usuario actual
const init = () => {
  getAuth().onAuthStateChanged((user) => {
    if (user) {
      changeTmp(window.location.hash);
    } else {
      window.location.hash = '#/';
    }
  });
  window.addEventListener('hashchange', () => changeTmp(window.location.hash));
};
window.addEventListener('load', init);


/*
const init = () => {
  changeTmp(window.location.hash);
  window.addEventListener('hashchange', () => changeTmp(window.location.hash));
};

window.addEventListener('load', init);
*/
/*
const init = () => {
  */
  /*firebase.auth().onAuthStateChanged((user) => {
    console.log('hola')
    if (user) {
      changeTmp(window.location.hash);
    }else{
      window.location.hash = '#/'; 
    }
  });
  
  window.addEventListener('hashchange', () => changeTmp(window.location.hash));
  */
  //const user = auth.currentUser;
/*
  onAuthStateChanged(auth, (user) => {
      if (user) {
        changeTmp(window.location.hash);
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          //const uid = user.uid;
          // ...
      } else {
        window.location.hash = '#/';
          // User is signed out
          // ...
      }

  });
  window.addEventListener('hashchange', () => changeTmp(window.location.hash));
};

window.addEventListener('load', init);
*/
