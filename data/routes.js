import { renderHome, renderAbout, renderVideos, renderMemes, renderGallery, renderMedia } from "../scripts/renderer.js";

export const routes = {
    '#/home': renderHome,
    '#/home/page': renderHome,
    '#/about': renderAbout,
    '#/videos': renderVideos,
    '#/memes': renderMemes,
    '#/gallery/depression': renderGallery,
    '#/media/depression': renderMedia,
};