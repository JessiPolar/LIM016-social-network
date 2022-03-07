import { navBarTemplate } from './navBar.js';

export default () => {
  const viewAyudaSocial = `${navBarTemplate}`;
  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewAyudaSocial;
  return divElemt;
};
