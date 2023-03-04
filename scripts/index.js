import * as CONSTANT from "../utils/constants.js";
import { renderCard, renderURL, renderImage, renderGalleryImage, renderErrorMessage } from "./renderer.js";
import { depressions } from "../data/depressions.js";
import { info } from "../data/info.js";
import { videos } from "../data/videos.js";
import { memes } from "../data/memes.js";
import { setPageTitle, setPageDescription, setDocumentTitle, setActivePage, getDepressionById } from "../utils/utils.js";

const routes = {
    "/": {
        renderer: home,
        page: 'home',
        title: CONSTANT.DEFAULT_TITLE,
        description: `${CONSTANT.DEFAULT_DESCRIPTION}. Na dzień dzisiejszy strona zawiera informacje na temat <b>${depressions.length}</b> zapadlisk.`,
        documentTitle: 'Trzebinia Siersza | Zapadliska'
    },
    "/pages/about": {
        renderer: about,
        page: 'about',
        title: CONSTANT.ABOUT_PAGE_TITLE,
        description: CONSTANT.ABOUT_PAGE_DESCRIPTION,
        documentTitle: 'Trzebinia Siersza | O Zapadliskach'
    },
    "/pages/video": {
        renderer: video,
        page: 'video',
        title: CONSTANT.VIDEOS_PAGE_TITLE,
        description: '',
        documentTitle: 'Trzebinia Siersza | Materiały Wideo'
    },
    "/pages/meme": {
        renderer: meme,
        page: 'meme',
        title: CONSTANT.MEMES_PAGE_TITLE,
        description: CONSTANT.MEMES_PAGE_DESCRIPTION,
        documentTitle: 'Trzebinia Siersza | Memy'
    },
    "/pages/gallery/depression": {
        renderer: gallery,
        page: '',
        title: 'Zdjęcia dotyczące zapadliska:',
        description: '',
        documentTitle: 'Galeria |'
    },
    "/pages/media/depression": {
        renderer: urls,
        page: '',
        title: 'Artykuły dotyczące zapadliska:',
        description: '',
        documentTitle: 'Media |'
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

export function handleRoute() {
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
    setDocumentTitle(depression === undefined ? routeData.documentTitle : `${routeData.documentTitle} ${depression.name}`);
}

function home() {
    depressions.forEach(d => imagesContainer.innerHTML += renderCard(d));
}

function about() {
    mediaContainer.innerHTML = `<p>${info.about}</p>`;
    info.urls.forEach(u => mediaContainer.innerHTML += renderURL(u));
    mediaContainer.innerHTML += '<iframe src="https://www.google.com/maps/d/embed?mid=1bbmXIbYZiiDqiAi9_VR9d22BVzNGTi4&ehbc=2E312F" height="700" style="margin-top: 30px"></iframe>';
    mediaContainer.innerHTML += renderImage("../../images/map.png");
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
