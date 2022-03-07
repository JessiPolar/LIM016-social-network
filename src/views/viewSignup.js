import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getDatabase, set, ref } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
// import { createUser } from './firebase.js';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `
  <section id="modal" class="containerRegister">
  <a class="closeModal"href="#/">x</a>
  <h2 class="headerModal">Registro de Usuario </h2>
  <form id="container-modal" class="registrationForm">
    <input type="text" id="usuario" class="inputRegister" placeholder="Nombre de usuario" autocomplete="off"/>
    <p id="errorNameSignUp" class="errorRegister">Por favor ingrese su nombre</p>
    <input type="email" id="e-mail" class="inputRegister" placeholder="Email" autocomplete="off"/>
    <p id="errorEmailSignUp" class="errorRegister">Ingrese un correo electrónico</p>
    <input type="password" id="contraseña" class="inputRegister" placeholder="Contraseña" autocomplete="off"/>
    <p id="errorPassSignUp" class="errorRegister">Debe contener más de 6 caracteres</p>
    <input type="password" id="confirmarContraseña" class="inputRegister" placeholder="Confirmar contraseña" autocomplete="off"/>
    <p id="errorPassConfSignUp" class="errorRegister">Las contraseñas no coinciden</p>
    <!--<button type="submit" id="btnEnviar" class="buttonSendData">Enviar</button>-->
    <input type="submit" id="signUp" name="signup_submit" value="Registrarse" />
  </form>
  </section> `;

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

  // Registrarse
  const signUp = divElement.querySelector('#container-modal');
  signUp.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = divElement.querySelector('#e-mail').value;
    const password = divElement.querySelector('#contraseña').value;
    const name = divElement.querySelector('#usuario').value;
    const passconfirm = divElement.querySelector('#confirmarContraseña').value;
    // Constantes para activar o desactivar los string de errores
    const errorNameSignUp = divElement.querySelector('#errorNameSignUp');
    const errorEmailSignUp = divElement.querySelector('#errorEmailSignUp');
    const errorPassSignUp = divElement.querySelector('#errorPassSignUp');
    const errorPassConfSignUp = divElement.querySelector('#errorPassConfSignUp');
    // Verificación de inputs vacíos
    if (name === '') {
      errorNameSignUp.style.visibility = 'visible';
    } else {
      errorNameSignUp.style.visibility = 'hidden';
    }
    if (email === '') {
      errorEmailSignUp.style.visibility = 'visible';
    } else {
      errorEmailSignUp.style.visibility = 'hidden';
    }
    if (password === '') {
      errorPassSignUp.style.visibility = 'visible';
    } else {
      errorPassSignUp.style.visibility = 'hidden';
    }
    if (passconfirm === '') {
      errorPassConfSignUp.style.visibility = 'visible';
    } else {
      errorPassConfSignUp.style.visibility = 'hidden';
    }
    // Verificación de contraseñas iguales
    if (passconfirm !== password) {
      errorPassSignUp.textContent = 'Las contraseñas no coinciden';
      errorPassConfSignUp.textContent = 'Las contraseñas no coinciden';
      errorPassSignUp.style.visibility = 'visible';
      errorPassConfSignUp.style.visibility = 'visible';
    } else if (name !== '' && password !== '' && passconfirm !== '' && passconfirm === password) {
      errorPassSignUp.style.visibility = 'hidden';
      errorPassConfSignUp.style.visibility = 'hidden';
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          set(ref(database, `'users/' ${user.uid}`), {
            // name: name,
            // email: email
          });
          alert('user created!');
          window.location.hash = '#/';
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          alert(errorMessage, errorCode);
        });
    }
  });
  return divElement;
};
