// TODO: refactor this mess!
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION, ABOUT_PAGE_TITLE, ABOUT_PAGE_DESCRIPTION, VIDEOS_PAGE_TITLE, MEMES_PAGE_TITLE, MEMES_PAGE_DESCRIPTION } from "../utils/constants.js";
import { renderBody, renderCard, renderURL, renderImage, renderURLContainer, renderGalleryImage, renderGalleryContainer } from "./renderer.js";
import { depressions } from "../data/depressions.js";
import { info } from "../data/info.js";
import { videos } from "../data/videos.js";
import { memes } from "../data/memes.js";
import { setPageTitle, setPageDescription, replaceImgSrc, setActivePage, getDepressionById } from "../utils/utils.js";

(() => {
    renderBody(false);
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
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = renderGalleryContainer();

    const container = document.getElementById('images-container');
    depressions.forEach(d => container.innerHTML += renderCard(d));

    const galleryButtons = document.getElementsByClassName('btn btn-sm btn-outline-success');
    
    for (let btn of galleryButtons) {
        btn.addEventListener('click', () => {
            const mainContainer = document.getElementById('main-container');
            mainContainer.innerHTML = renderGalleryContainer();

            const container = document.getElementById('images-container');
            const depression = getDepressionById(btn.dataset.id);
            depression.images.forEach(image => container.innerHTML += renderGalleryImage(image));
            setPageTitle(`Zdjęcia dotyczące zapadliska: ${depression.name}`);
        });
    }

    const mediaButtons = document.getElementsByClassName('btn btn-sm btn-outline-danger');

    for (let btn of mediaButtons) {
        btn.addEventListener('click', () => {
            const mainContainer = document.getElementById('main-container');
            mainContainer.innerHTML = renderURLContainer();

            const container = document.getElementById('media-container');
            const depression = getDepressionById(btn.dataset.id);
            depression.media.forEach(m => {
                container.innerHTML += renderURL(m);
            });
            setPageTitle(`Artykuły dotyczące zapadliska: ${depression.name}`);
        });
    }

    setActivePage('home');
    setPageTitle(DEFAULT_TITLE);
    setPageDescription(`${DEFAULT_DESCRIPTION}. Na dzień dzisiejszy strona zawiera informacje na temat <b>${depressions.length}</b> zapadlisk.`);
    replaceImgSrc(document.getElementsByTagName('img'), false);
}

function renderAboutPage() {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = renderURLContainer();

    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = `
        <p>${info.about}</p>
    `;

    info.urls.forEach(u => mediaContainer.innerHTML += renderURL(u));
    mediaContainer.innerHTML += renderImage("../images/map.png");

    setActivePage('about');
    setPageTitle(ABOUT_PAGE_TITLE);
    setPageDescription(ABOUT_PAGE_DESCRIPTION);
}

function renderVideoPage() {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = renderURLContainer();

    const container = document.getElementById('media-container');
    videos.forEach(v => container.innerHTML += renderURL(v));

    setActivePage('video');
    setPageTitle(VIDEOS_PAGE_TITLE);
}

function renderMemesPage() {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = renderGalleryContainer();

    const container = document.getElementById('images-container');
    memes.forEach(meme => container.innerHTML += renderGalleryImage(meme.href));
    setPageTitle(MEMES_PAGE_TITLE);
    setPageDescription(MEMES_PAGE_DESCRIPTION);
    setActivePage('memes');
}