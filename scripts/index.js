// TODO: Refactor.
import * as CONSTANT from "../utils/constants.js";
import { renderCard, renderURL, renderImage, renderGalleryImage, renderErrorMessage } from "./renderer.js";
import { depressions } from "../data/depressions.js";
import { info } from "../data/info.js";
import { videos } from "../data/videos.js";
import { memes } from "../data/memes.js";
import { setPageTitle, setPageDescription, setDocumentTitle, setActivePage, getDepressionById } from "../utils/utils.js";

const mediaContainer = document.getElementById('media-container');
const imagesContainer = document.getElementById('images-container');

function handleRouteChange() {
    const route = window.location.hash.substr(1);
    const params = getQueryParams(route);

    clearContainers();

    if (route === '') {
        renderHome();
    }

    if (route === '/pages/about') {
        renderAbout();
    }

    if (route === '/pages/video') {
        renderVideos();
    }

    if (route === '/pages/meme') {
        renderMemes();
    }

    if (route.includes('/pages/gallery/depression')) {
        if (params === undefined || params.size === 0) {
            return;
        }

        renderGallery(getDepressionById(params['id']));
    }

    if (route.includes('/pages/media/depression')) {
        if (params === undefined) {
            return;
        }

        renderUrls(getDepressionById(params['id']));
    }
}

handleRouteChange();

function getQueryParams(url) {
    if (!url.includes('?')) {
        return;
    }

    const params = [];
    const queryString = url.split('?')[1];
    const queryParams = queryString.split('&');

    queryParams.forEach(param => {
        const [key, value] = param.split('=');
        params[key] = value;
    });

    return params;
}

window.route = route;
window.onpopstate = handleRouteChange;

function route(event) {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, '', event.target.href);
    handleRouteChange();
}

function renderHome() {
    depressions.forEach(d => imagesContainer.innerHTML += renderCard(d));
}

function renderAbout() {
    mediaContainer.innerHTML = `<p>${info.about}</p>`;
    info.urls.forEach(u => mediaContainer.innerHTML += renderURL(u));
    mediaContainer.innerHTML += renderImage("../../images/map.png");
    mediaContainer.innerHTML += '<iframe src="https://www.google.com/maps/d/embed?mid=1bbmXIbYZiiDqiAi9_VR9d22BVzNGTi4&ehbc=2E312F" height="700" style="margin-top: 30px"></iframe>';
}

function renderVideos() {
    videos.forEach(v => mediaContainer.innerHTML += renderURL(v));
}

function renderMemes() {
    memes.forEach(meme => imagesContainer.innerHTML += renderGalleryImage(meme.href));
}

function renderGallery(depression) {
    depression.images.forEach(image => imagesContainer.innerHTML += renderGalleryImage(image));

    if (depression.images.length < 1) {
        mediaContainer.innerHTML = renderErrorMessage(CONSTANT.NO_IMAGES_ERROR);
    }
}

function renderUrls(depression) {
    depression.media.forEach(m => mediaContainer.innerHTML += renderURL(m));

    if (depression.media.length < 1) {
        mediaContainer.innerHTML = renderErrorMessage(CONSTANT.NO_MEDIA_ERROR);
    }
}

function clearContainers() {
    imagesContainer.innerHTML = '';
    mediaContainer.innerHTML = '';
}