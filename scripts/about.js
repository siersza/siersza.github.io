import { ABOUT_PAGE_TITLE, ABOUT_PAGE_DESCRIPTION } from "../utils/constants.js";
import { renderBody, renderURLContainer, renderURL, renderImage } from "./renderer.js";
import { setPageTitle, setActivePage, setPageDescription } from "../utils/utils.js";
import { info } from "../data/info.js";

(() => {
    renderBody(true, renderURLContainer());

    const container = document.getElementById('media-container');
    container.innerHTML = `
        <p>${info.about}</p>
    `;

    info.urls.forEach(u => container.innerHTML += renderURL(u));
    container.innerHTML += renderImage("../images/map.png");

    setActivePage('about');
    setPageTitle(ABOUT_PAGE_TITLE);
    setPageDescription(ABOUT_PAGE_DESCRIPTION);
})();