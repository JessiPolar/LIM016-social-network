import { navBarTemplate } from './navBar.js';

export default () => {
  const viewAdopcion = `${navBarTemplate}`;
  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewAdopcion;
  return divElemt;
};
