import { renderContent, showScrollToTopButton } from "./renderer.js";

window.addEventListener('hashchange', renderContent);
window.addEventListener('scroll', showScrollToTopButton);
renderContent();