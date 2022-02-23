import logIn from './viewLogin.js';
import signup from './viewSignup.js';
import home from './home.js';
import ayudaSocial from './ayudaSocial.js';
import perdidos from './perdidos.js';
import adopcion from './adopcion.js';
import different from './404.js';

const components = {
  login: logIn,
  signup: signup,
  home: home,
  ayudaSocial: ayudaSocial,
  perdidos: perdidos,
  adopcion: adopcion,
  different: different,
};

export { components };

/*
import Home from './home.js';
import AyudaSocial from './ayudaSocial.js';
import Perdidos from './perdidos.js';
import Adopcion from './adopcion.js';
import Different from './404.js';

export const components = {
  home: Home,
  ayudaSocial: AyudaSocial,
  perdidos: Perdidos,
  adopcion: Adopcion,
  different: Different,
};
*/
