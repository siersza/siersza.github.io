import { VIDEOS_PAGE_TITLE } from "../utils/constants.js";
import { renderHeader, renderFooter, renderMedia } from "./renderer.js";
import { videos } from "../data/videos.js";

(() => {
    const body = document.getElementsByTagName('body')[0];
    const container = document.getElementById('list-group');

    body.insertAdjacentHTML('afterbegin', renderHeader(VIDEOS_PAGE_TITLE));
    body.insertAdjacentHTML('beforeend', renderFooter(true));
    
    videos.forEach(v => container.innerHTML += renderMedia(v));
})();