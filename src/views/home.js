import { navBarTemplate } from "./navBar.js";

export default () => {
  const viewHome = navBarTemplate;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewHome;
  return divElemt;
}