import { components } from '../views/index.js';

export const changeTmp = (hash) => {
  // const id = hash.split('/')[1];
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';
  switch (hash) {
    case '':
    case '#/': { return sectionMain.appendChild(components.login()); }
    case '#/signup': { return sectionMain.appendChild(components.signup()); }
    case '#/home': { return sectionMain.appendChild(components.home()); }
    case '#/perdidos': { return sectionMain.appendChild(components.perdidos()); }
    case '#/adopcion': { return sectionMain.appendChild(components.adopcion()); }
    case '#/ayuda-social': { return sectionMain.appendChild(components.ayudaSocial()); }
    //default: return sectionMain.appendChild(components.different());
    default:
      break;
  }
  return sectionMain;
};
/*
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
*/