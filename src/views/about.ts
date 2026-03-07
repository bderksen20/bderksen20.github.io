export function ViewAbout(): HTMLElement {
  const el = document.createElement("div");
  el.innerHTML = `
    <h1>About</h1>
    <p>hello, I'm Billy - a software engineer specialized in realtime interactive media.</p>
    <p>currently, I'm a member of the Treyarch graphics team where I've been contributing to the Call of Duty engine and ecosystem.<p>
  `;
  return el;
}