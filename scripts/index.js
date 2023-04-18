// TODO: Refactor.
import * as CONSTANT from "../utils/constants.js";
import { renderCard, renderURL, renderImage, renderGalleryImage, renderErrorMessage } from "./renderer.js";
import { depressions } from "../data/depressions.js";
import { info } from "../data/info.js";
import { videos } from "../data/videos.js";
import { memes } from "../data/memes.js";
import { setPageTitle, setPageDescription, setDocumentTitle, setActivePage, getDepressionById } from "../utils/utils.js";

// const mediaContainer = document.getElementById('media-container');
// const imagesContainer = document.getElementById('images-container');

// const routes = {
//     "": {
//         renderer: renderHome,
//         page: 'home',
//         title: CONSTANT.DEFAULT_TITLE,
//         description: `${CONSTANT.DEFAULT_DESCRIPTION}. Na dzień dzisiejszy strona zawiera informacje na temat <b>${depressions.length}</b> zapadlisk.`,
//         documentTitle: 'Trzebinia Siersza | Zapadliska'
//     },
//     "/about": {
//         renderer: renderAbout,
//         page: 'about',
//         title: CONSTANT.ABOUT_PAGE_TITLE,
//         description: CONSTANT.ABOUT_PAGE_DESCRIPTION,
//         documentTitle: 'Trzebinia Siersza | O Zapadliskach'
//     },
//     "/video": {
//         renderer: renderVideos,
//         page: 'video',
//         title: CONSTANT.VIDEOS_PAGE_TITLE,
//         description: '',
//         documentTitle: 'Trzebinia Siersza | Materiały Wideo'
//     },
//     "/meme": {
//         renderer: renderMemes,
//         page: 'meme',
//         title: CONSTANT.MEMES_PAGE_TITLE,
//         description: CONSTANT.MEMES_PAGE_DESCRIPTION,
//         documentTitle: 'Trzebinia Siersza | Memy'
//     },
//     "/gallery/depression": {
//         renderer: renderGallery,
//         page: '',
//         title: 'Zdjęcia dotyczące zapadliska:',
//         description: '',
//         documentTitle: 'Galeria |'
//     },
//     "/media/depression": {
//         renderer: renderUrls,
//         page: '',
//         title: 'Artykuły dotyczące zapadliska:',
//         description: '',
//         documentTitle: 'Media |'
//     }
// };

// function handleRouteChange() {
//     clearContainers();

//     const url = window.location.hash.substring(1);
//     const params = getQueryParams(url);
//     const baseUrl = url.split('?')[0];
//     const routeData = routes[baseUrl];
//     let depression;

//     if (params !== undefined && params['id']) {
//         depression = getDepressionById(params['id']);
//     }

//     if (routeData === undefined) {
//         redirectToIndex();
//     }

//     routeData.renderer(depression);
//     setActivePage(routeData.page);
//     setPageTitle(depression === undefined ? routeData.title : `${routeData.title} ${depression.name}`);
//     setPageDescription(routeData.description);
//     setDocumentTitle(depression === undefined ? routeData.documentTitle : `${routeData.documentTitle} ${depression.name}`);
// }

// handleRouteChange();

// function getQueryParams(url) {
//     if (!url.includes('?')) {
//         return;
//     }

//     const params = [];
//     const queryString = url.split('?')[1];
//     const queryParams = queryString.split('&');

//     queryParams.forEach(param => {
//         const [key, value] = param.split('=');
//         params[key] = value;
//     });

//     return params;
// }

// window.route = route;
// window.onpopstate = handleRouteChange;

// function route(event) {
//     event = event || window.event;
//     event.preventDefault();
//     window.history.pushState({}, '', event.target.href);
//     handleRouteChange();
// }

// function redirectToIndex() {
//     window.location.href = './';
// }

// function renderHome() {
//     depressions.forEach(d => imagesContainer.innerHTML += renderCard(d));
// }

// function renderAbout() {
//     mediaContainer.innerHTML = `<p>${info.about}</p>`;
//     info.urls.forEach(u => mediaContainer.innerHTML += renderURL(u));
//     mediaContainer.innerHTML += renderImage("../../images/map.png");
//     mediaContainer.innerHTML += '<iframe src="https://www.google.com/maps/d/embed?mid=1bbmXIbYZiiDqiAi9_VR9d22BVzNGTi4&ehbc=2E312F" height="700" style="margin-top: 30px"></iframe>';
//     mediaContainer.innerHTML += '<iframe src="https://geologia.pgi.gov.pl/zapadliska/" height="700" style="margin-top: 30px"></iframe>';
// }

// function renderVideos() {
//     videos.forEach(v => mediaContainer.innerHTML += renderURL(v));
// }

// function renderMemes() {
//     memes.forEach(meme => imagesContainer.innerHTML += renderGalleryImage(meme.href));
// }

// function renderGallery(depression) {
//     if (depression === undefined) {
//         redirectToIndex();
//     }

//     depression.images.forEach(image => imagesContainer.innerHTML += renderGalleryImage(image));

//     if (depression.images.length < 1) {
//         mediaContainer.innerHTML = renderErrorMessage(CONSTANT.NO_IMAGES_ERROR);
//     }
// }

// function renderUrls(depression) {
//     if (depression === undefined) {
//         redirectToIndex();
//     }

//     depression.media.forEach(m => mediaContainer.innerHTML += renderURL(m));

//     if (depression.media.length < 1) {
//         mediaContainer.innerHTML = renderErrorMessage(CONSTANT.NO_MEDIA_ERROR);
//     }
// }

// function clearContainers() {
//     imagesContainer.innerHTML = '';
//     mediaContainer.innerHTML = '';
// }

const homePageListElements = [
    "List Element 1",
    "List Element 2",
    "List Element 3"
];

// function to generate HTML code for home page
function generateHomePage() {
    const listItems = homePageListElements.map((element, index) => `
      <li>
        <a href="#/page?id=${index + 1}" class="list-item" data-id="${index + 1}">${element}</a>
      </li>
    `).join('');

    return `
        <div class="px-4 py-1 my-1 text-center">
        <h1 id="title" class="fw-bold">${CONSTANT.DEFAULT_TITLE}</h1>
        <div class="col-lg-6 mx-auto">
            <p id="description" class="lead mb-4">${CONSTANT.DEFAULT_DESCRIPTION}. Na dzień dzisiejszy strona zawiera informacje na temat <b>${depressions.length}</b> zapadlisk.</p>
        </div>
    </div>
      <ul>
        ${listItems}
      </ul>
      <div id="selectedItem"></div>
    `;
}

// function to generate HTML code for about page
function generateAboutPage() {
    //mediaContainer.innerHTML = `<p>${info.about}</p>`;
    //info.urls.forEach(u => mediaContainer.innerHTML += renderURL(u));
    //mediaContainer.innerHTML += renderImage("../../images/map.png");
    //mediaContainer.innerHTML += '<iframe src="https://www.google.com/maps/d/embed?mid=1bbmXIbYZiiDqiAi9_VR9d22BVzNGTi4&ehbc=2E312F" height="700" style="margin-top: 30px"></iframe>';
    //mediaContainer.innerHTML += '<iframe src="https://geologia.pgi.gov.pl/zapadliska/" height="700" style="margin-top: 30px"></iframe>';
    return `
    <div class="px-4 py-1 my-1 text-center">
    <h1 id="title" class="fw-bold">${CONSTANT.ABOUT_PAGE_TITLE}</h1>
    <div class="col-lg-6 mx-auto">
        <p id="description" class="lead mb-4">${CONSTANT.ABOUT_PAGE_DESCRIPTION}</p>
    </div>
</div>
        <div class="list-group" style="overflow-wrap: break-word;">
            <p>${info.about}</p>
            <iframe src="https://www.google.com/maps/d/embed?mid=1bbmXIbYZiiDqiAi9_VR9d22BVzNGTi4&ehbc=2E312F" height="700" style="margin-top: 30px"></iframe>
            <iframe src="https://geologia.pgi.gov.pl/zapadliska/" height="700" style="margin-top: 30px"></iframe>
        </div>
    `;
}

// function to generate HTML code for gallery page
function generateVideoPage() {
    const listItems = videos.map((element, index) => `
      <a href="${element.href}" target="_blank" class="list-group-item list-group-item-action">${element.title !== '' ? element.title : element.href}</a>
  `).join('');

    return `
    <div class="px-4 py-1 my-1 text-center">
    <h1 id="title" class="fw-bold">${CONSTANT.VIDEOS_PAGE_TITLE}</h1>
    <div class="col-lg-6 mx-auto">
        <p id="description" class="lead mb-4"></p>
    </div>
</div>
    <ul>
      ${listItems}
    </ul>
    <div id="selectedItem"></div>
  `;
}
//
// function to generate HTML code for gallery page
function generateMemePage() {
    const listItems = memes.map((element, index) => `
    <div class="col-md-4">
        <div class="mb-4 box-shadow">
            <a href="${element.href}" target="_blank"><img class="card-img-top" src="${element.href}"></a>
        </div>
    </div>`).join('');

    return `
    <div class="px-4 py-1 my-1 text-center">
    <h1 id="title" class="fw-bold">${CONSTANT.MEMES_PAGE_TITLE}</h1>
    <div class="col-lg-6 mx-auto">
        <p id="description" class="lead mb-4">${CONSTANT.MEMES_PAGE_DESCRIPTION}</p>
    </div>
</div>
        <div class="row">
${listItems}
    </div>
        `;
}

// object containing mapping of hash to corresponding HTML generating functions
const routes = {
    '': generateHomePage,
    '#/about': generateAboutPage,
    '#/video': generateVideoPage,
    '#/meme': generateMemePage,
};

// function to render page content
function renderContent() {
    const currentRoute = window.location.hash;
    const routeHandler = routes[currentRoute] || generateHomePage;
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = routeHandler();
}

// add listener for hash changes in URL
window.addEventListener('hashchange', renderContent);

// render initial page content
renderContent();

// handle list elements click
const listItems = document.getElementsByClassName('list-item');

for (let i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener('click', function(event) {
        event.preventDefault(); // prevent default browsers action

        const itemId = this.getAttribute('data-id'); // get id of the selected element

        // Change the URL using id of the selected element
        window.location.hash = `#/page?id=${itemId}`;

        // update the content of selectedItem based on id of the selected element
        updateSelectedItem(itemId);
    });
}

// handle url hash change
window.addEventListener('hashchange', function() {
    const itemId = window.location.hash.match(/\?id=(\d+)/)[1]; // get the id of the actual hash
    updateSelectedItem(itemId);
});

// function that updates content of selectedItem
function updateSelectedItem(itemId) {
    const selectedItem = document.getElementById('selectedItem');
    selectedItem.innerText = `Content of List Element ${itemId}`;
}