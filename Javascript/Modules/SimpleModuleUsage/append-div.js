export const appendDiv = (message) => {
  const div = document.createElement('div');
  div.textContent = message;
  document.body.appendChild(div);
};
