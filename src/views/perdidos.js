import { navBarTemplate } from './navBar.js';

export default () => {
  const viewPerdidos = `${navBarTemplate}`;
  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewPerdidos;
  return divElemt;
};
