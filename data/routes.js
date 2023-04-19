import { renderHome, renderAbout, renderVideos, renderMemes, renderGallery, renderMedia } from "../scripts/renderer.js";

export const routes = {
    '#/home': renderHome,
    '#/about': renderAbout,
    '#/video': renderVideos,
    '#/meme': renderMemes,
    '#/gallery/depression': renderGallery,
    '#/media/depression': renderMedia,
    '#/home/page': renderHome
};