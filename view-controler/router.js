import { components } from '../view/index.js';

export const changeTmp = (hash) => {
//   const id = hash.split('/')[1];
  const setionMain = document.getElementById('container');
  setionMain.innerHTML = '';
  switch (hash) {
    // case '':
    // case '#':
    case '': { return setionMain.appendChild(components.home()); }
    case '#/': { return setionMain.appendChild(components.home()); }
    case '#/perdidos': { return setionMain.appendChild(components.perdidos()); }
    case '#/adopcion': { return setionMain.appendChild(components.adopcion()); }
    case '#/ayuda-social': { return setionMain.appendChild(components.ayudaSocial()); }
    // case '#/catalogo':
    // case '#/accesorios':
    // case '#/lugares': {return setionMain.appendChild(components.[id]()),}
    default: return setionMain.appendChild(components.different());
  }
};
