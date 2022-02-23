import { navBarTemplate } from "./navBar.js";

export default () => {
  const viewPerdidos = `${navBarTemplate}
    <h2 class = "text-center">Accesorios</h2>
    <figure>
        <img class = "image" src="http://olegit.com/bin/gifs/00/39/56.gif" alt= "Conejo codeando">
    </figure>`;
  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewPerdidos;
  return divElemt;
};