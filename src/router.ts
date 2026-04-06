import { ViewAbout } from "./views/about";
import { ViewWork } from "./views/work";

type Route = "about" | "work";
const routes: Record<Route, () => HTMLElement> = {
  about: ViewAbout,
  work: ViewWork
};

export function navigate(route: Route) {
  const overlay = document.getElementById("overlay")!;
  overlay.innerHTML = "";
  overlay.appendChild(routes[route]());
  overlay.classList.add("visible");
}