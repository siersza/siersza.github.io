import { VIDEOS_PAGE_TITLE } from "../utils/constants.js";
import { renderBody, renderMediaContainer, renderMedia } from "./renderer.js";
import { videos } from "../data/videos.js";

(() => {
    renderBody(VIDEOS_PAGE_TITLE, true, renderMediaContainer());
    
    const container = document.getElementById('list-group');
    videos.forEach(v => container.innerHTML += renderMedia(v));
})();