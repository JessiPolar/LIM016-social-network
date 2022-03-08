/* COMANDOS FIREBASE */
// import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs, getDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';
// Crear usuario
export function createUser(email, password) {
  const auth = getAuth();
  return auth.createUserWithEmailAndPassword(email, password);
}

// Login
export function ingresarEmail(email, password) {
  const auth = getAuth();
  return auth.signInWithEmailAndPassword(email, password);
}

// Ingresar con Google
export function ingresarConGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithRedirect(auth, provider);
}

// Enviar correo para verificacion
export function enviarEmail() {
  const auth = getAuth();
  return auth.currentUser.sendEmailVerification();
}

/* ---------------- COMANDOS PARA CLOUD FIRESTORE -----------------  */
// Pruebas Fazt
// const db = getFirestore();
// guardamos la coleccion en la base de datos

export const saveTask = (Post) => {
  const db = getFirestore();
  addDoc(collection(db, 'posts'), { Post }); // title, description son los campos que estoy guardando en firebase
};

// obtenemos la coleccion de la base de datos
export const getTasks = () => getDocs(collection(getFirestore(), 'posts'));

// Evento  cuando se obtenga la coleccion de la base de datos
export const onGetTasks = (callback) => onSnapshot(collection(getFirestore(), 'posts'), callback);

// Eliminar el documento
export const deleteTask = (id) => deleteDoc(doc(getFirestore(), 'posts', id));

// Obtener el documento a borrar
export const getTask = (id) => getDoc(doc(getFirestore(), 'posts', id));

// actualizar datos
export const updateTask = (id, newFields) => updateDoc(doc(getFirestore(), 'posts', id), newFields);
/*
// Obteniendo la data de la colleccion "posts" en tiempo real
export async function onSnapshotPosts() {
  // const db = getFirestore();
  // return db.collection('tasks').get();
  return getDocs(collection(getFirestore(), 'posts'));
}
*/
/*
// BLOQUE CORRIENDO
export const saveTask2 = (Post) => {
  const db = getFirestore();
  addDoc(collection(db, 'posts'), { Post });
};

// obtenemos la coleccion de la base de datos
export const getTasks2 = () => getDocs(collection(getFirestore(), 'posts'));

// Evento  cuando se obtenga la coleccion de la base de datos
export const onGetTasks2 = (callback) => onSnapshot(collection(getFirestore(), 'posts'), callback);

// Eliminar el documento
export const deleteTask2 = (id) => deleteDoc(doc(getFirestore(), 'posts', id));

// Obtener el documento a borrar
export const getTask2 = (id) => getDoc(doc(getFirestore(), 'posts', id));

// actualizar datos
export const updateTask2 = (id, newFields) => updateDoc(doc(getFirestore(), 'posts', id), newFields);

// Obteniendo la data de la colleccion "posts" en tiempo real
export async function onSnapshotPosts2() {
  // const db = getFirestore();
  // return db.collection('tasks').get();
  return getDocs(collection(getFirestore(), 'posts'));
}
*/
