// aqui exportaras las funciones que necesites

export const myFunction = () => {
  window.addEventListener('hashchange', () => console.log(window.location.hash));
};

window.addEventListener('load', myFunction);
