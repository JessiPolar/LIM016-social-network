import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged, signOut } from ' https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
// import { ingresarConGoogle, addDataUser } from './firebase.js';

export default () => {
  const divElement = document.createElement('div');
  // divElement.setAttribute('class', 'containerLogin');
  divElement.innerHTML = `
  <section class="containerLogin">
   <img  src="../view/img/perro-gato.png"/>
  </section>
  <div id="login-box" class="containerMainLogo">
    
    <!--Iniciar sesion-->
    <h2 class="logoFooter">Pet's Love</h2>
    <div id="dataLogIn" class="firstSubcontainerLogin"> 
      <p class="welcomePhrase">¡Bienvenid@ a Pet's Love!</p>
      <form id="signIn" class="loginForm" method='POST'>
        <input type="email" id="emailLogIn" class="inputLogin" placeholder="Email" minlength="5" required>
        <p id="errorEmailLogIn" class="errorLogin">Cuenta no encontrada o incorrecta</p>
        <input type="password" id="contraseñaLogIn" class="inputLogin" placeholder="Contraseña" minlength="5" required>
        <p id="errorPassLogIn" class="errorLogin">Contraseña de logueo incorrecta</p>
        <!--<button id="btnEntrar" class="loginButton">Ingresar</button>-->
        <input type="submit" id="btnEntrar" name="login" value="Iniciar sesion" /><br/>
        <input type="submit" id="logout" name="logout" value="Log out" />
      </form>
      <div >
        <p class="enterWith">O bien ingresa con:</p>
        <div id="logosRegister" class="registerWith">
          <img id="google" class="logoSN" src="../../view/img/google.png">
        </div>
        <p class="enterWith">¿No tienes una cuenta?<a id="btnRegistrar" class="registerButton"  href="#/signup" > Regístrate</a></p>
      </div>
    </div>
  </div>`;

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyAJhNCcSgFRoYtj1SBRqPa4QZJjc_16iNI',
    authDomain: 'pet-s-love.firebaseapp.com',
    databaseURL: 'https://pet-s-love-default-rtdb.firebaseio.com',
    projectId: 'pet-s-love',
    storageBucket: 'pet-s-love.appspot.com',
    messagingSenderId: '846233461258',
    appId: '1:846233461258:web:fa483252ddda0a84b2b5f3',
  };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();

  // Login
  const login = divElement.querySelector('#btnEntrar');
  login.addEventListener('click', (e) => {
    e.preventDefault();
    const email = divElement.querySelector('#emailLogIn').value;
    const password = divElement.querySelector('#contraseñaLogIn').value;
    const errorEmailLogIn = divElement.querySelector('#errorEmailLogIn');
    const errorPassLogIn = divElement.querySelector('#errorPassLogIn');

    // Verificación de inputs vacíos
    if (email === '') {
      errorEmailLogIn.textContent = 'Este campo es obligatorio';
      errorEmailLogIn.style.visibility = 'visible';
    } else {
      errorEmailLogIn.style.visibility = 'hidden';
    }
    if (password === '') {
      errorPassLogIn.textContent = 'Este campo es obligatorio';
      errorPassLogIn.style.visibility = 'visible';
    } else {
      errorPassLogIn.style.visibility = 'hidden';
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.emailVerified === false) {
          window.location.hash = '#/';
          errorEmailLogIn.textContent = 'Esta cuenta aún no está verificada';
          errorEmailLogIn.style.visibility = 'visible';
        } else {
          window.location.hash = '#/home';
        }

        const dt = new Date();

        update(ref(database, `'users/' ${user.uid}`), {
          last_login: dt,
        });

        alert('User logged in');
        window.location.hash = '#/home';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage, errorCode);
      });
  });

  // const user = auth.currentUser;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  const logout = divElement.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert('User logged out')
      }).catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage, errorCode);
      });
  });
  const btnGoogle = divElement.querySelector('#google');
  btnGoogle.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        window.location.hash = '#/home';
        // ingresarConGoogle()
        // .then((result) => {
        // addDataUser(result.user);
        // window.location.hash = '#/home';
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        // .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        //   console.log('error!=> ', errorCode, errorMessage);
        // });
      });
  });
  return divElement;
};
