// aqui exportaras las funciones que necesites
import { changeTmp } from './router.js';

const init = () => {
  changeTmp(window.location.hash);
  window.addEventListener('hashchange', () => changeTmp(window.location.hash));
};

window.addEventListener('load', init);
