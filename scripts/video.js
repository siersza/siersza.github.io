import { VIDEOS_PAGE_TITLE } from "../utils/constants.js";
import { renderBody, renderURL, renderURL } from "./renderer.js";
import { videos } from "../data/videos.js";
import { setPageTitle, setActivePage } from "../utils/utils.js";

(() => {
    renderBody(true, renderURLContainer());

    const container = document.getElementById('media-container');
    videos.forEach(v => container.innerHTML += renderURL(v));

    setActivePage('video');
    setPageTitle(VIDEOS_PAGE_TITLE);
})();