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

const routes = {
    "": {
        renderer: renderHome,
        page: 'home',
        title: CONSTANT.DEFAULT_TITLE,
        description: `${CONSTANT.DEFAULT_DESCRIPTION}. Na dzień dzisiejszy strona zawiera informacje na temat <b>${depressions.length}</b> zapadlisk.`,
        documentTitle: 'Trzebinia Siersza | Zapadliska'
    },
    "/pages/about": {
        renderer: renderAbout,
        page: 'about',
        title: CONSTANT.ABOUT_PAGE_TITLE,
        description: CONSTANT.ABOUT_PAGE_DESCRIPTION,
        documentTitle: 'Trzebinia Siersza | O Zapadliskach'
    },
    "/pages/video": {
        renderer: renderVideos,
        page: 'video',
        title: CONSTANT.VIDEOS_PAGE_TITLE,
        description: '',
        documentTitle: 'Trzebinia Siersza | Materiały Wideo'
    },
    "/pages/meme": {
        renderer: renderMemes,
        page: 'meme',
        title: CONSTANT.MEMES_PAGE_TITLE,
        description: CONSTANT.MEMES_PAGE_DESCRIPTION,
        documentTitle: 'Trzebinia Siersza | Memy'
    },
    "/pages/gallery/depression": {
        renderer: renderGallery,
        page: '',
        title: 'Zdjęcia dotyczące zapadliska:',
        description: '',
        documentTitle: 'Galeria |'
    },
    "/pages/media/depression": {
        renderer: renderUrls,
        page: '',
        title: 'Artykuły dotyczące zapadliska:',
        description: '',
        documentTitle: 'Media |'
    }
};

function handleRouteChange() {
    clearContainers();
    
    const url = window.location.hash.substring(1);
    const params = getQueryParams(url);
    const baseUrl = url.split('?')[0];
    const routeData = routes[baseUrl];
    let depression;

    if (params !== undefined && params['id']) {
        depression = getDepressionById(params['id']);
    }

    if (routeData === undefined) {
        redirectToIndex();
    }

    routeData.renderer(depression);
    setActivePage(routeData.page);
    setPageTitle(depression === undefined ? routeData.title : `${routeData.title} ${depression.name}`);
    setPageDescription(routeData.description);
    setDocumentTitle(depression === undefined ? routeData.documentTitle : `${routeData.documentTitle} ${depression.name}`);
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

function redirectToIndex() {
    window.location.href = './';
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
    if (depression === undefined) {
        redirectToIndex();
    }

    depression.images.forEach(image => imagesContainer.innerHTML += renderGalleryImage(image));

    if (depression.images.length < 1) {
        mediaContainer.innerHTML = renderErrorMessage(CONSTANT.NO_IMAGES_ERROR);
    }
}

function renderUrls(depression) {
    if (depression === undefined) {
        redirectToIndex();
    }

    depression.media.forEach(m => mediaContainer.innerHTML += renderURL(m));

    if (depression.media.length < 1) {
        mediaContainer.innerHTML = renderErrorMessage(CONSTANT.NO_MEDIA_ERROR);
    }
}

function clearContainers() {
    imagesContainer.innerHTML = '';
    mediaContainer.innerHTML = '';
}