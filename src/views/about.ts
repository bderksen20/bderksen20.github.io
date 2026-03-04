export function ViewAbout(): HTMLElement {
  const el = document.createElement("div");
  el.innerHTML = `
    <h1>About</h1>
    <p>all about billy!</p>
  `;
  return el;
}