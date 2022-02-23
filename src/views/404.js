export default () => {
    const viewDifferent = `
      <h2>404</h2>
      <h1>Pagina no encontrada</h1>
      <p>El archivo especificado no se encontro en el sitio web. por favor, compruebe la URL para entrar.`;
    const divElemt = document.createElement('div');
    divElemt.innerHTML = viewDifferent;
    return divElemt;
};