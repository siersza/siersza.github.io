import { VIDEOS_PAGE_TITLE } from "../utils/constants.js";
import { renderBody, renderMediaContainer, renderMedia } from "./renderer.js";
import { videos } from "../data/videos.js";
import { setPageTitle } from "../utils/utils.js";

(() => {
    renderBody(true, renderMediaContainer());

    const container = document.getElementById('media-container');
    videos.forEach(v => container.innerHTML += renderMedia(v));

    setPageTitle(VIDEOS_PAGE_TITLE);
})();