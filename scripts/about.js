import { ABOUT_PAGE_TITLE } from "../utils/constants.js";
import { renderBody, renderURLContainer, renderURL } from "./renderer.js";
import { setPageTitle, setActivePage } from "../utils/utils.js";
import { info } from "../data/info.js";

(() => {
    renderBody(true, renderURLContainer());

    const container = document.getElementById('media-container');
    container.innerHTML = `
        <p>${info.about}</p>
    `;

    info.urls.forEach(u => container.innerHTML += renderURL(u));

    setActivePage('about');
    setPageTitle(ABOUT_PAGE_TITLE);
})();