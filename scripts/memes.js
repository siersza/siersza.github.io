import { renderBody, renderGalleryContainer, renderGalleryImage } from "./renderer.js";
import { setActivePage } from "../utils/utils.js";
import { memes } from "../data/memes.js";

(() => {
    renderBody(true, renderGalleryContainer());
    const container = document.getElementById('images-container');
    memes.forEach(meme => container.innerHTML += renderGalleryImage(meme.href));
    setActivePage('memes');
})();