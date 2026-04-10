export function ViewAbout(): HTMLElement {
  const el = document.createElement("div");
  el.innerHTML = `
    <h1>About</h1>
    <p>Hello, I'm Billy - a software engineer experienced and interested in interactive media and computational visualization.</p>
    <p>Currently, I'm a member of the Treyarch graphics team where I've been contributing to the Call of Duty engine and shipping games since 2022!</p>
  `;
  return el;
}