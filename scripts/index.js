import * as CONSTANT from "../utils/constants.js";
import { renderCard, renderURL, renderImage, renderGalleryImage, renderErrorMessage } from "./renderer.js";
import { depressions } from "../data/depressions.js";
import { info } from "../data/info.js";
import { videos } from "../data/videos.js";
import { memes } from "../data/memes.js";
import { setPageTitle, setPageDescription, setActivePage, getDepressionById, replaceImgSrc } from "../utils/utils.js";

const mediaContainer = document.getElementById('media-container');
const imagesContainer = document.getElementById('images-container');

(() => {
    renderHomePage();

    const home = document.getElementById('home');
    home.addEventListener('click', renderHomePage);

    const about = document.getElementById('about');
    about.addEventListener('click', renderAboutPage);
    
    const video = document.getElementById('video');
    video.addEventListener('click', renderVideoPage);

    const memes = document.getElementById('memes');
    memes.addEventListener('click', renderMemesPage);
})();

function renderHomePage() {
    clearContainers();
    const galleryButtons = document.getElementsByClassName('btn btn-sm btn-outline-success');
    const mediaButtons = document.getElementsByClassName('btn btn-sm btn-outline-danger');

    depressions.forEach(d => imagesContainer.innerHTML += renderCard(d));

    for (let btn of galleryButtons) { btn.addEventListener('click', renderGalleryForSpecificDepression); }
    for (let btn of mediaButtons) { btn.addEventListener('click', renderUrlsForSpecificDepression); }

    setActivePage('home');
    setPageTitle(CONSTANT.DEFAULT_TITLE);
    setPageDescription(`${CONSTANT.DEFAULT_DESCRIPTION}. Na dzień dzisiejszy strona zawiera informacje na temat <b>${depressions.length}</b> zapadlisk.`);
    replaceImgSrc(document.getElementsByTagName('img'), false);
}

function renderGalleryForSpecificDepression() {
    clearContainers();

    const depression = getDepressionById(this.dataset.id);
    depression.images.forEach(image => imagesContainer.innerHTML += renderGalleryImage(image));
    
    setPageTitle(`Zdjęcia dotyczące zapadliska: ${depression.name}`);
    setPageDescription('');
    replaceImgSrc(document.getElementsByTagName('img'), true);

    if (depression.images.length < 1) {
        mediaContainer.innerHTML = renderErrorMessage(CONSTANT.NO_IMAGES_ERROR);
    }
}

function renderUrlsForSpecificDepression() {
    clearContainers();
    
    const depression = getDepressionById(this.dataset.id);
    depression.media.forEach(m => mediaContainer.innerHTML += renderURL(m));

    setPageTitle(`Artykuły dotyczące zapadliska: ${depression.name}`);
    setPageDescription('');

    if (depression.media.length < 1) {
        mediaContainer.innerHTML = renderErrorMessage(CONSTANT.NO_MEDIA_ERROR);
    }
}

function renderAboutPage() {
    clearContainers();

    mediaContainer.innerHTML = `<p>${info.about}</p>`;
    info.urls.forEach(u => mediaContainer.innerHTML += renderURL(u));
    mediaContainer.innerHTML += renderImage("../images/map.png");

    setActivePage('about');
    setPageTitle(CONSTANT.ABOUT_PAGE_TITLE);
    setPageDescription(CONSTANT.ABOUT_PAGE_DESCRIPTION);
}

function renderVideoPage() {
    clearContainers();

    videos.forEach(v => mediaContainer.innerHTML += renderURL(v));

    setActivePage('video');
    setPageTitle(CONSTANT.VIDEOS_PAGE_TITLE);
}

function renderMemesPage() {
    clearContainers();

    memes.forEach(meme => imagesContainer.innerHTML += renderGalleryImage(meme.href));

    setPageTitle(CONSTANT.MEMES_PAGE_TITLE);
    setPageDescription(CONSTANT.MEMES_PAGE_DESCRIPTION);
    setActivePage('memes');
}

function clearContainers() {
    imagesContainer.innerHTML = '';
    mediaContainer.innerHTML = '';
}