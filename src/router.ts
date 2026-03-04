import { ViewAbout } from "./views/about";

type Route = "about";
const routes: Record<Route, () => HTMLElement> = {
  about: ViewAbout
};

export function navigate(route: Route) {
  const overlay = document.getElementById("overlay")!;
  overlay.innerHTML = "";
  overlay.appendChild(routes[route]());
  overlay.classList.add("visible");
}