export default () => {
  const viewHome = `<h2 class = "text-center">Bienvenido a nuestra pagina!</h2>
        <figure class = "text-center">
            <img class = "image" href="/view/img/perro-gato.png" alt= "perro gato">
        </figure>`;
  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewHome;
  return divElemt;
};
