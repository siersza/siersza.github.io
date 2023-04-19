import { routes } from "../data/routes.js";
import { getQueryParams, getDepressionById, setDocumentTitle } from "../utils/utils.js";
import { depressions } from "../data/depressions.js";
import { info } from "../data/info.js";
import { videos } from "../data/videos.js";
import { memes } from "../data/memes.js";
import * as CONSTANT from "../utils/constants.js";

export function renderContent() {
    const currentRoute = window.location.hash.includes('?') ? window.location.hash.split('?')[0] : window.location.hash;
    const routeHandler = routes[currentRoute] || renderHome;
    const contentDiv = document.getElementById('content');
    const params = getQueryParams(window.location.hash.substring(1));

    // TODO: Refactor those if statements.
    if (window.location.hash.includes('/gallery/depression')) {
        const depression = getDepressionById(params['id']);
        contentDiv.innerHTML = routeHandler(depression);
        return;
    }

    if (window.location.hash.includes('/media/depression')) {
        const depression = getDepressionById(params['id']);
        contentDiv.innerHTML = routeHandler(depression);
        return;
    }

    contentDiv.innerHTML = routeHandler();
}

export function renderHome() {
    setDocumentTitle('Trzebinia Siersza | Zapadliska');

    const items = depressions.map((depression) => `
        <div class="col-md-4">
            <div class="card mb-4 box-shadow">
                <img class="card-img-top" src="${depression.imgSrc}"/>
                <div class="card-body">
                    <p class="card-text">${depression.name}. ${depression.description}</p>
                    <ul class="list-group">
                        <li class="list-group-item">Data wystąpienia: ${depression.date}</li>
                        <li class="list-group-item">Głębokość: ${depression.depth} ${depression.depth === 'b.d.' ? '' : 'metry/ów.'}</li>
                        <li class="list-group-item">Średnica: ${depression.diameter} ${depression.diameter === 'b.d.' ? '' : 'metry/ów.'}</li>
                    </ul>
                    <div style="margin-top: 16px">
                        <div class="btn-group" style="width: 100%">
                            <a class="btn btn-sm btn-outline-primary" target='_blank' href="https://www.google.com/maps/search/${depression.latitude},+${depression.longitude}">Zobacz mapę</a>
                            <a class="btn btn-sm btn-outline-success" data-id="${depression.id}" href="#/gallery/depression?id=${depression.id}">Więcej zdjęć <strong>(${depression.images.length})</strong></a>
                            <a class="btn btn-sm btn-outline-danger" href="#/media/depression?id=${depression.id}">Media <strong>(${depression.media.length})</strong></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    ).join('');

    return `
        <div class="px-4 py-1 my-1 text-center">
            <h1 id="title" class="fw-bold">${CONSTANT.DEFAULT_TITLE}</h1>
            <div class="col-lg-6 mx-auto">
                <p id="description" class="lead mb-4">${CONSTANT.DEFAULT_DESCRIPTION}. Na dzień dzisiejszy strona zawiera informacje na temat <b>${depressions.length}</b> zapadlisk.</p>
            </div>
        </div>
        <div class="row">
            ${items}
        </div>
    `;
}

export function renderAbout() {
    setDocumentTitle('Trzebinia Siersza | O Zapadliskach');

    const items = info.urls.map((element) => `
        <a href="${element.href}" target="_blank" class="list-group-item list-group-item-action">${element.title !== '' ? element.title : element.href}</a>`
    ).join('');

    return `
        <div class="px-4 py-1 my-1 text-center">
            <h1 id="title" class="fw-bold">${CONSTANT.ABOUT_PAGE_TITLE}</h1>
            <div class="col-lg-6 mx-auto">
                <p id="description" class="lead mb-4">${CONSTANT.ABOUT_PAGE_DESCRIPTION}</p>
            </div>
        </div>
        <div class="list-group" style="overflow-wrap: break-word;">
            <p>${info.about}</p>
            ${items}
            <a href="../../images/map.png" target="_blank">
                <img src="../../images/map.png" class="rounded mx-auto d-block" style="margin: 30px"></img>
            </a>
            <iframe src="https://www.google.com/maps/d/embed?mid=1bbmXIbYZiiDqiAi9_VR9d22BVzNGTi4&ehbc=2E312F" height="700" style="margin-top: 30px"></iframe>
            <iframe src="https://geologia.pgi.gov.pl/zapadliska/" height="700" style="margin-top: 30px"></iframe>
        </div>
    `;
}

export function renderVideos() {
    setDocumentTitle('Trzebinia Siersza | Materiały Wideo');

    const items = videos.map((element) => `
        <a href="${element.href}" target="_blank" class="list-group-item list-group-item-action">${element.title !== '' ? element.title : element.href}</a>`
    ).join('');

    return `
        <div class="px-4 py-1 my-1 text-center">
            <h1 id="title" class="fw-bold">${CONSTANT.VIDEOS_PAGE_TITLE}</h1>
            <div class="col-lg-6 mx-auto">
                <p id="description" class="lead mb-4"></p>
            </div>
        </div>
        <ul>
            ${items}
        </ul>
  `;
}

export function renderMemes() {
    setDocumentTitle('Trzebinia Siersza | Memy');

    const items = memes.map((element) => `
        <div class="col-md-4">
            <div class="mb-4 box-shadow">
                <a href="${element.href}" target="_blank"><img class="card-img-top" src="${element.href}"></a>
            </div>
        </div>`
    ).join('');

    return `
        <div class="px-4 py-1 my-1 text-center">
            <h1 id="title" class="fw-bold">${CONSTANT.MEMES_PAGE_TITLE}</h1>
            <div class="col-lg-6 mx-auto">
                <p id="description" class="lead mb-4">${CONSTANT.MEMES_PAGE_DESCRIPTION}</p>
            </div>
        </div>
        <div class="row">
            ${items}
        </div>
    `;
}

export function renderGallery(depression) {
    setDocumentTitle(`Galeria | ${depression.name}`);

    const items = depression.images.map((element) => `
        <div class="col-md-4">
            <div class="mb-4 box-shadow">
                <a href="${element}" target="_blank"><img class="card-img-top" src="${element}"></a>
            </div>
        </div>`
    ).join('');

    return `
        <div class="px-4 py-1 my-1 text-center">
            <h1 id="title" class="fw-bold">Zdjęcia dotyczące zapadliska: ${depression.name}</h1>
            <div class="col-lg-6 mx-auto">
                <p id="description" class="lead mb-4"></p>
            </div>
        </div>
        <div class="row">
            ${items}
        </div>
    `;
}

export function renderMedia(depression) {
    setDocumentTitle(`Galeria | ${depression.name}`);

    const items = depression.media.map((element) => `
        <a href="${element.href}" target="_blank" class="list-group-item list-group-item-action">${element.title !== '' ? element.title : element.href}</a>`
    ).join('');

    return `
        <div class="px-4 py-1 my-1 text-center">
            <h1 id="title" class="fw-bold">Artykuły dotyczące zapadliska: ${depression.name}</h1>
            <div class="col-lg-6 mx-auto">
                <p id="description" class="lead mb-4"></p>
            </div>
        </div>
        <div class="row">
            ${items}
        </div>
    `;
}