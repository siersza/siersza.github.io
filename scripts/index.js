import * as CONSTANT from "../utils/constants.js";
import { renderCard, renderURL, renderImage, renderGalleryImage, renderErrorMessage } from "./renderer.js";
import { depressions } from "../data/depressions.js";
import { info } from "../data/info.js";
import { videos } from "../data/videos.js";
import { memes } from "../data/memes.js";
import { setPageTitle, setPageDescription, setActivePage, getDepressionById } from "../utils/utils.js";

const routes = {
    "/": {
        renderer: home,
        page: 'home',
        title: CONSTANT.DEFAULT_TITLE,
        description: `${CONSTANT.DEFAULT_DESCRIPTION}. Na dzień dzisiejszy strona zawiera informacje na temat <b>${depressions.length}</b> zapadlisk.`
    },
    "/about": {
        renderer: about,
        page: 'about',
        title: CONSTANT.ABOUT_PAGE_TITLE,
        description: CONSTANT.ABOUT_PAGE_DESCRIPTION
    },
    "/video": {
        renderer: video,
        page: 'video',
        title: CONSTANT.VIDEOS_PAGE_TITLE,
        description: ''
    },
    "/meme": {
        renderer: meme,
        page: 'meme',
        title: CONSTANT.MEMES_PAGE_TITLE,
        description: CONSTANT.MEMES_PAGE_DESCRIPTION
    },
    "/gallery/depression": {
        renderer: gallery,
        page: '',
        title: 'Zdjęcia dotyczące zapadliska:',
        description: ''
    },
    "/media/depression": {
        renderer: urls,
        page: '',
        title: 'Artykuły dotyczące zapadliska:',
        description: ''
    }
};

const mediaContainer = document.getElementById('media-container');
const imagesContainer = document.getElementById('images-container');

window.route = route;
window.onpopstate = handleRoute;

handleRoute();

function route(event) {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, '', event.target.href);
    handleRoute();
}

function handleRoute() {
    const path = window.location.pathname;
    const id = window.location.search.split('=')[1];
    const routeData = routes[path];
    const render = routeData.renderer;
    const depression = getDepressionById(id);

    clearContainers();
    render(depression);
    setActivePage(routeData.page);
    setPageTitle(depression === undefined ? routeData.title : `${routeData.title} ${depression.name}`);
    setPageDescription(routeData.description);
}

function home() {
    depressions.forEach(d => imagesContainer.innerHTML += renderCard(d));
}

function about() {
    mediaContainer.innerHTML = `<p>${info.about}</p>`;
    info.urls.forEach(u => mediaContainer.innerHTML += renderURL(u));
    mediaContainer.innerHTML += renderImage("../images/map.png");
}

function video() {
    videos.forEach(v => mediaContainer.innerHTML += renderURL(v));
}

function meme() {
    memes.forEach(meme => imagesContainer.innerHTML += renderGalleryImage(meme.href));
}

function gallery(depression) {
    depression.images.forEach(image => imagesContainer.innerHTML += renderGalleryImage(image));
    
    if (depression.images.length < 1) {
        mediaContainer.innerHTML = renderErrorMessage(CONSTANT.NO_IMAGES_ERROR);
    }
}

function urls(depression) {
    depression.media.forEach(m => mediaContainer.innerHTML += renderURL(m));

    if (depression.media.length < 1) {
        mediaContainer.innerHTML = renderErrorMessage(CONSTANT.NO_MEDIA_ERROR);
    }
}

function clearContainers() {
    imagesContainer.innerHTML = '';
    mediaContainer.innerHTML = '';
}