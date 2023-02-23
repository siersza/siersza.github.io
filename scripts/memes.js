import { MEMES_PAGE_TITLE, MEMES_PAGE_DESCRIPTION } from "../utils/constants.js";
import { renderBody, renderGalleryContainer, renderGalleryImage } from "./renderer.js";
import { setActivePage, setPageTitle, setPageDescription } from "../utils/utils.js";
import { memes } from "../data/memes.js";

(() => {
    renderBody(true, renderGalleryContainer());
    const container = document.getElementById('images-container');
    memes.forEach(meme => container.innerHTML += renderGalleryImage(meme.href));
    setPageTitle(MEMES_PAGE_TITLE);
    setPageDescription(MEMES_PAGE_DESCRIPTION);
    setActivePage('memes');
})();