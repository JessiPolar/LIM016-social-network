/* COMANDOS FIREBASE */

// Crear usuario
export function crearUsuario(email, password) {
  const auth = firebase.auth();
  return auth.createUserWithEmailAndPassword(email, password);
}

// Login
export function ingresarEmail(email, password) {
  const auth = firebase.auth();
  return auth.signInWithEmailAndPassword(email, password); 
}

// Ingresar con Google
export function ingresarConGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

// Enviar correo para verificacion
export function enviarEmail() {
  const auth = firebase.auth();
  return auth.currentUser.sendEmailVerification();
}
// en Estado de autenticación cambiado
export const onAuthStateChanged = (callback) => firebase.auth().onAuthStateChanged(callback);
// desconectar
export const signOut = () => firebase.auth().signOut();

//FIRESTORE 

export function addDataUser(usuario) {
  const db = firebase.firestore();
  let nameRegister = 0;
  let photoRegister = '';
  if (usuario.displayName !== null && usuario.photoURL !== null) {
    nameRegister = usuario.displayName;
    photoRegister = usuario.photoURL;
  }
  return db.collection('users').add({
    NameRegister: nameRegister,
    EmailRegister: usuario.email,
    IdUserActive: usuario.uid,
    PhotoRegister: photoRegister,
  });
}

// Agregando a la coleccion "users" data que el usuario ingrese al momento de registrarse con correo
export function addDataUserCorreo(name, email, user) {
  const db = firebase.firestore();
  return db.collection('users').add({
    NameRegister: name,
    EmailRegister: email,
    IdUserActive: user.uid,
    PhotoRegister: 'img/userPhoto-default.png',
  });
}