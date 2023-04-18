import { renderContent } from "./renderer.js";

window.addEventListener('hashchange', renderContent);
renderContent();