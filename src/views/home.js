// import { getDatabase, set, ref, get, update } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
// import {getFirestore, collection, addDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
import { navBarTemplate } from './navBar.js';
import { saveTask, getTask, onGetTasks, deleteTask, updateTask } from './firebase.js';
// import { db, auth } from './main.js';

export default () => {
  const viewHome = navBarTemplate;
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'containerInicio');
  divElement.innerHTML = viewHome;
  divElement.innerHTML += `
  <form id="bloquePost">
    <div id="escribirPost">
      <label for="postear">Postear</label>
      <textarea id="text-ToPost" class="textToPost" placeholder="¿Que quieres compartir?"></textarea>
      <div id= "icons">
          <button id="shareButton">Compartir</button>
      </div>
    </div>
  </form>
  <div id="tablaInicio"></div>
  <hr>
  
  <section id="pantallaView">
    <section id="infoUsuario">
      <!--<img class="portada">-->
      <div id="datosUser" class="datosUser">
        <figure class="contenedorFoto">
          <img id="userphoto" class="userPhoto" src="">
        </figure>
        <section id="nameDescription">
          <h4 id="userName" class="userName"></h4>
          <p id="userDescription" class="userDescription"></p>
        </section>
      </div>
      <!--<img class="publicidad" src="../../view/img/perro_gato5.png">-->
      <img class="publicidad" src="../../view/img/perro_gato12.png">
      <!--<img class="publicidad" src="../../view/img/perro_gato4.png">-->
    </section>

    BLOQUE MODIFICANDO

    <section id="bloquePost2">
      <section id="escribirPost2">
        <label for="postear2">Postear</label>
        <textarea id="textToPost2" class="textToPost2" placeholder="¿Que quieres compartir?"></textarea>
        <div id= "icons2">
          <button id="shareButton2">Compartir</button>
        </div>
      </section>
      <section id="sectionPosts2">
          <table id="tablaPosts2"></table>
      </section>
    </section>
  </section>
  <hr>
  </section>
      BLOQUE CORRIENDO
    <div id="">
      <div id="">
        
        
        
      </div>
      <div id=""></div>
      <div id="sectionPosts">
          
          <table id="tablaPosts"></table>
      </div>
    </div>
    `;

  // Templates de publicaciones
  function postTemplate(photoUser, nameUser, datePublication,
    postUser, IDdocumento, upLike, colorLike) {
    const tabla = divElement.querySelector('#tablaPosts');
    tabla.innerHTML += `
      <tbody class="cuerpoTabla">
        <tr>
          <th class="headPost">
            <div class="userWhoPost">
              <img class="userPhotoPost" src="${photoUser}" alt="Foto del usuario"><p>${nameUser}</p>
            </div> 
            <div class="editYdelete">  
              <img data-edit="${IDdocumento}" class="icono-conf iconoEdit" src="../../view/img/btn-edit.png" alt="icono de editar" style="">
              <img data-post="${IDdocumento}" class="icono-conf iconoDelete" src="../../view/img/btn-delete.png" alt="icono delete" style="">
            </div>
          </th>
        </tr>
        <tr>
          <td id="textPost" class="textPost">
            <pre class="datePost">${datePublication}</pre>
            <textarea id="publicacion-${IDdocumento}" class="publicacion" data-texto="${IDdocumento}" rows="5" readonly >${postUser}</textarea>
            <button id="editar-${IDdocumento}" class="editar" data-edicion="${IDdocumento}"  >Guardar</button>
          </td>
        </tr>
        <tr>
          <td id="picturePost" style="display: none;"></td>
        </tr>
        <tr>
          <td>
            <img id="like-${IDdocumento}" class="iconoLike ${colorLike}" data-like="${IDdocumento}" src="../../view/img/megusta (2).png" style="margin-right: 5px;" alt="Botón me gusta">
            <span style="margin-right: 10px; align-self: center;">${upLike}</span>
            <img id="logoComent" src="../../view/img/like.png" style="margin-right: 5px;" alt="Botón comentar">
            <span style="margin-right: 10px; align-self: center; ">0</span>
          </td>
        </tr>
      </tbody>
    `;
    return tabla;
  }

  const taskForm = divElement.querySelector('#bloquePost');
  const taskContainer = divElement.querySelector('#tablaInicio');
  // const bloquePost = divElement.querySelector('#bloquePost');
  // const tablaPosts = divElement.querySelector('#tablaInicio');
  let editStatus = false;
  let id = '';
  // console.log(taskContainer);
  // console.log(taskForm);
  const showPosts = () => {
    onGetTasks((querySnapshot) => {
      let html = '';
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        html += `
          <div>
            <p>${post.Post}</p>
            <button class='btn-delete' data-id='${doc.id}'>Delete</button>
            <button class='btn-edit' data-id='${doc.id}'>Update</button>
          </div>`;
      });
      taskContainer.innerHTML = html;

      const btnsDelete = taskContainer.querySelectorAll('.btn-delete');
      btnsDelete.forEach((btn) => {
        btn.addEventListener('click', ({ target: { dataset } }) => {
          // console.log(event.target.dataset.id);
          // console.log(dataset.id);
          deleteTask(dataset.id);
        });
      });

      const btnsEdit = taskContainer.querySelectorAll('.btn-edit');
      btnsEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          // console.log(event.target.dataset.id);
          // console.log(dataset.id);
          const doc = await getTask(e.target.dataset.id);
          const post = doc.data();
          console.log(doc.data());
          taskForm['text-ToPost'].value = post.Post;
          editStatus = true;
          id = doc.id;
        });
      });
    });
  };
  showPosts();

  // GUARDAR DATOS
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const post = taskForm['text-ToPost'];
    if (!editStatus) {
      saveTask(post.value);
    } else {
      updateTask(id, { Post: post.value });
      editStatus = false;
    }
    taskForm.reset();
    // console.log(taskContainer);
    showPosts();
  });
  
  return divElement;
};

/*
  // LISTAR LOS DATOS EN LA PAGINA
  window.addEventListener('load', async () => {
    onGetTasks((querySnapshot) => {
      let html = '';
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        html += `
          <div>
            <p>${post.Post}</p>
            <button class='btn-delete' data-id='${doc.id}'>Delete</button>
          </div>`;
      });
      taskContainer.innerHTML = html;
    });
  });

  // Mostrar todos los posts de la colección
  const tabla = divElement.querySelector('#tablaPosts');
  // const x = onSnapshotPosts();
  tabla.innerHTML = '';
  // console.log(x);
  onSnapshotPosts().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  });
  */
