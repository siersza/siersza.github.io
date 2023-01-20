import { ABOUT_PAGE_TITLE } from "../utils/constants.js";
import { renderBody, renderMediaContainer, renderMedia } from "./renderer.js";
import { setPageTitle } from "../utils/utils.js";
import { info } from "../data/info.js";

(() => {
    renderBody(true, renderMediaContainer());

    const container = document.getElementById('media-container');
    container.innerHTML = `
        <p>${info.about}</p>
    `;

    setPageTitle(ABOUT_PAGE_TITLE);
})();