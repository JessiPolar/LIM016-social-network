// import { getDatabase, set, ref, get, update } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
// import {getFirestore, collection, addDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
import { navBarTemplate } from './navBar.js';
import { saveTask, getTask, onGetTasks, deleteTask, updateTask, saveTask2, getTask2, onGetTasks2, deleteTask2, updateTask2 } from './firebase.js';
// import { db, auth } from './main.js';

export default () => {
  const viewHome = navBarTemplate;
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'containerInicio');
  divElement.innerHTML = viewHome;
  divElement.innerHTML += `
  <form id="task-form">
    <label for="title">Title</label>
    <input type="text" placeholder="Task Title" id="task-title">
    <label for="description">Description:</label>
    <textarea id="task-description" row="3" placeholder="Task Description"></textarea>
    <button id="btn-task-save">Save</button>
  </form>
  <div id="tasks-container"></div>
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
      BLOQUE CORRIENDO
    <form id="bloquePost">
      <section id="escribirPost">
        <label for="postear">Postear</label>
        <textarea id="text-ToPost" class="textToPost" placeholder="¿Que quieres compartir?"></textarea>
        <div id= "icons">
          <button id="shareButton">Compartir</button>
        </div>
      </section>
      <section id="sectionPosts">
          <table id="tablaInicio"></table>
          <table id="tablaPosts"></table>
      </section>
    </form>
    </section>`;

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

  const taskForm = divElement.querySelector('#task-form');
  const taskContainer = divElement.querySelector('#tasks-container');
  const bloquePost = divElement.querySelector('#bloquePost');
  const tablaPosts = divElement.querySelector('#tablaInicio');
  let editStatus = false;
  let id = '';
  // console.log(taskContainer);
  // console.log(taskForm);
  const showPosts = () => {
    onGetTasks((querySnapshot) => {
      let html = '';
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        html += `
          <div>
            <p>${task.title}</p>
            <p>${task.description}</p>
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
          const task = doc.data();
          console.log(doc.data());
          taskForm['task-title'].value = task.title;
          taskForm['task-description'].value = task.description;

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
    const title = taskForm['task-title'];
    const description = taskForm['task-description'];
    if (!editStatus) {
      saveTask(title.value, description.value);
    } else {
      updateTask(id, { title: title.value, description: description.value });
      editStatus = false;
    }
    taskForm.reset();
    // console.log(taskContainer);
    showPosts();
  });

  // LISTAR LOS DATOS EN LA PAGINA
  window.addEventListener('load', async () => {
    onGetTasks((querySnapshot) => {
      let html = '';
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        html += `
          <div>
            <p>${task.title}</p>
            <p>${task.description}</p>
            <button class='btn-delete' data-id='${doc.id}'>Delete</button>
          </div>`;
      });
      taskContainer.innerHTML = html;
    });
  });

  // CODIGO PARA EL POST
  const showPosts2 = () => {
    onGetTasks2((querySnapshot) => {
      let html = '';
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        html += `
        <div>
        <p>${post.Post}</p>
        <button class='btn-delete2' data-id='${doc.id}'>Delete</button>
        <button class='btn-edit2' data-id='${doc.id}'>Update</button>
      </div>`;
      });
      tablaPosts.innerHTML = html;

      const btnsDelete2 = tablaPosts.querySelectorAll('.btn-delete2');
      btnsDelete2.forEach((btn) => {
        btn.addEventListener('click', ({ target: { dataset } }) => {
          // console.log(event.target.dataset.id);
          // console.log(dataset.id);
          deleteTask2(dataset.id);
        });
      });

      const btnsEdit2 = tablaPosts.querySelectorAll('.btn-edit2');
      btnsEdit2.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          // console.log(event.target.dataset.id);
          // console.log(dataset.id);
          const doc = await getTask2(e.target.dataset.id);
          const post = doc.data();
          // console.log(doc.data());
          bloquePost['text-ToPost'].value = post.Post;
          editStatus = true;
          id = doc.id;
        });
      });
    });
  };
  showPosts2();

  // GUARDAR DATOS
  bloquePost.addEventListener('submit', (e) => {
    e.preventDefault();
    const post = bloquePost['text-ToPost'];
    if (!editStatus) {
      saveTask2(post.value);
    } else {
      updateTask2(id, { Post: post.value });
      editStatus = false;
    }
    bloquePost.reset();
    // console.log(taskContainer);
    showPosts2();
  });

  // LISTAR LOS DATOS EN LA PAGINA
  window.addEventListener('load', async () => {
    onGetTasks2((querySnapshot) => {
      let html = '';
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        html += `
          <div>
            <p>${post.Post}</p>
            <button class='btn-delete2' data-id='${doc.id}'>Delete</button>
          </div>`;
      });
      tablaPosts.innerHTML = html;
    });
  });
  /*
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
  return divElement;
};
