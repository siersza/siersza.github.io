import { ABOUT_PAGE_TITLE } from "../utils/constants.js";
import { renderBody, renderMediaContainer, renderMedia } from "./renderer.js";
import { setPageTitle, setActivePage } from "../utils/utils.js";
import { info } from "../data/info.js";

(() => {
    renderBody(true, renderMediaContainer());

    const container = document.getElementById('media-container');
    container.innerHTML = `
        <p>${info.about}</p>
    `;

    setActivePage('about');
    setPageTitle(ABOUT_PAGE_TITLE);
})();