import { routes } from "../data/routes.js";
import { getQueryParams, getDepressionById, setDocumentTitle, redirectToIndex, setActivePage, setActivePaginationItem, clearActivePages } from "../utils/utils.js";
import { depressions } from "../data/depressions.js";
import { info } from "../data/info.js";
import { videos } from "../data/videos.js";
import { memes } from "../data/memes.js";
import * as CONSTANT from "../utils/constants.js";

const scrollToTopButton = document.getElementById('scroll-to-top-btn');

export function renderContent() {
    const currentRoute = window.location.hash.includes('?') ? window.location.hash.split('?')[0] : window.location.hash;
    const routeHandler = routes[currentRoute];
    
    if (routeHandler === undefined) {
        redirectToIndex();
        return;
    }

    const contentDiv = document.getElementById('content');
    const pagination = document.getElementById('pagination');
    const params = getQueryParams(window.location.hash.substring(1));

    scrollToTopButton.onclick = scrollToTop;

    // Render the pagination for the home page and remove it for other pages.
    if (window.location.hash.includes('/home')) {
        pagination.innerHTML = renderPagination();
       
        const paginationElements = document.getElementsByClassName('page-link');
       
        for (let e of paginationElements) {
            e.addEventListener('click', function() {
                setTimeout(() => {
                    window.scroll(0, 0);
                }, 150);
            });
        }

        if (params !== undefined && params['id'] > Math.ceil(depressions.length / CONSTANT.MAX_PER_PAGE)) {
            redirectToIndex();
            return;
        }

        setActivePaginationItem(params === undefined ? 1 : params['id']);
    } else {
        pagination.innerHTML = '';
    }

    // TODO: Refactor those if statements.
    if (window.location.hash.includes('/gallery/depression')) {
        const depression = getDepressionById(params['id']);

        if (depression === undefined) {
            redirectToIndex();
            return;
        }

        contentDiv.innerHTML = routeHandler(depression);

        return;
    }

    if (window.location.hash.includes('/media/depression')) {
        const depression = getDepressionById(params['id']);
        
        if (depression === undefined) {
            redirectToIndex();
            return;
        }

        contentDiv.innerHTML = routeHandler(depression);

        return;
    }

    // Render the depressions for the specific id range.
    if (window.location.hash.includes('/page')) {
        let from = depressions.length - (params['id'] - 1) * CONSTANT.MAX_PER_PAGE;
        let to = from - CONSTANT.MAX_PER_PAGE < 1 ? 0 : from - CONSTANT.MAX_PER_PAGE;

        contentDiv.innerHTML = routeHandler(from, to);

        return;
    }
    
    setActivePage(currentRoute.split('/')[1]);

    contentDiv.innerHTML = routeHandler();
}

export function renderHome(from, to) {
    setDocumentTitle('Siersza | Zapadliska');

    if (from === undefined || to === undefined) {
        from = depressions.length;
        to = depressions.length - CONSTANT.MAX_PER_PAGE;
    }

    const items = depressions.filter(d => d.id <= from && d.id > to).map((depression) => `
        <div class="col-md-4">
            <div class="card mb-4 box-shadow">
                <img class="card-img-top" src="${depression.imgSrc}"/>
                <div class="card-body">
                    <p class="card-text"><strong>${depression.name}</strong>. ${depression.description}</p>
                    <ul class="list-group">
                        <li class="list-group-item">Id: <strong>${depression.id}</strong></li>
                        <li class="list-group-item">Data wystąpienia: <strong>${depression.date}</strong></li>
                        <li class="list-group-item">Głębokość: <strong>${depression.depth} ${depression.depth === 'b.d.' ? '' : 'metry/ów.'}</strong></li>
                        <li class="list-group-item">Średnica: <strong>${depression.diameter} ${depression.diameter === 'b.d.' ? '' : 'metry/ów.'}</strong></li>
                    </ul>
                    <div style="margin-top: 16px">
                        <div class="btn-group" style="width: 100%">
                            <a class="btn btn-sm btn-outline-danger" target='_blank' href="https://www.google.com/maps/search/${depression.latitude},+${depression.longitude}">Zobacz mapę</a>
                            <a class="btn btn-sm btn-outline-primary" data-id="${depression.id}" href="#/gallery/depression?id=${depression.id}">Więcej zdjęć <strong>(${depression.images.length})</strong></a>
                            <a class="btn btn-sm btn-outline-info" href="#/media/depression?id=${depression.id}">Media <strong>(${depression.media.length})</strong></a>
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
    setDocumentTitle('Siersza | O Zapadliskach');

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
            <div class="callout">
                ${info.about}
            </div>
            ${items}
            <img style="margin-top: 30px;" src="../../images/kwk-siersza.jpg" alt="KWK Siersza">
            <iframe src="https://geologia.pgi.gov.pl/zapadliska/" height="700" style="margin-top: 30px; border: 1px solid #32a71e"></iframe>
            <iframe src="https://www.google.com/maps/d/embed?mid=1bbmXIbYZiiDqiAi9_VR9d22BVzNGTi4&ehbc=2E312F" height="700" style="margin-top: 30px; border: 1px solid #32a71e"></iframe>
        </div>
    `;
}

export function renderVideos() {
    setDocumentTitle('Siersza | Materiały Wideo');

    const items = videos.map((element) => `
        <a href="${element.href}" target="_blank" class="list-group-item list-group-item-action" style="word-wrap: break-word">${element.title !== '' ? element.title : element.href}</a>`
    ).join('');

    return `
        <div class="px-4 py-1 my-1 text-center">
            <h1 id="title" class="fw-bold">${CONSTANT.VIDEOS_PAGE_TITLE}</h1>
            <div class="col-lg-6 mx-auto">
                <p id="description" class="lead mb-4"></p>
            </div>
        </div>
        <div class="list-group"
            <ul>
                ${items}
            </ul>
        </div>
  `;
}

export function renderMemes() {
    setDocumentTitle('Siersza | Memy');

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
    clearActivePages();

    let items = depression.images.map((element) => `
        <div class="col-md-4">
            <div class="mb-4 box-shadow">
                <a href="${element}" target="_blank"><img class="card-img-top gallery-img" src="${element}"></a>
            </div>
        </div>`
    ).join('');

    if (items === '') {
        items = renderError(CONSTANT.NO_IMAGES_ERROR);
    }

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
    setDocumentTitle(`Media | ${depression.name}`);
    clearActivePages();

    let items = depression.media.map((element) => `
        <a href="${element.href}" target="_blank" class="list-group-item list-group-item-action">${element.title !== '' ? element.title : element.href}</a>`
    ).join('');

    if (items === '') {
        items = renderError(CONSTANT.NO_MEDIA_ERROR);
    }

    return `
        <div class="px-4 py-1 my-1 text-center">
            <h1 id="title" class="fw-bold">Artykuły dotyczące zapadliska: ${depression.name}</h1>
            <div class="col-lg-6 mx-auto">
                <p id="description" class="lead mb-4"></p>
            </div>
        </div>
        ${items}
    `;
}

function renderError(message) {
    return `
        <div class="alert alert-danger" role="alert">
            ${message}
        </div>
    `;
}

function renderPaginationItem(index) {
    return `
        <li id="pagination-item-${index}" class="page-item">
            <a href="#/home/page?id=${index}" class="page-link">${index}</a>
        </li>
    `;
}

function renderPagination() {
    let items = '';

    for (let i = 0; i < Math.ceil(depressions.length / CONSTANT.MAX_PER_PAGE); i++) {
        items += renderPaginationItem(i + 1);
    }

    return items;
}

export function showScrollToTopButton() {
    scrollToTopButton.style.display = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? 'block' : 'none';
}

function scrollToTop() {
    document.body.scrollTop = 0; // Safari.
    document.documentElement.scrollTop = 0; // Chrome, FF, IE & Opera.
} 
