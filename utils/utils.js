import { depressions } from "../data/depressions.js";
// import { renderErrorMessage } from "../scripts/renderer.js";
// import { COULD_NOT_LOAD_IMAGE_ERROR } from "./constants.js"

export const getDepressionById = id => depressions.filter(d => d.id === id)[0];

// Replace the src if the image failed to load (it does not exist, there is no access to it etc.).
// export const replaceImgSrc = (images, showMessage) => {
//     for (let i = 0; i < images.length; i++) {
//         images[i].onerror = () => {
//             images[i].src = '../images/image-placeholder.png';
//             images[i].style.pointerEvents = 'none';
//             images[i].parentElement.href = '#';
//             images[i].parentElement.target = '';
//             if (showMessage) {
//                 images[i].parentElement.insertAdjacentHTML('afterend', renderErrorMessage(COULD_NOT_LOAD_IMAGE_ERROR));
//             };
//         };
//     }
// }

export const setPageTitle = title => document.getElementById('title').innerHTML = title;

export const setPageDescription = description => document.getElementById('description').innerHTML = description;

export const setDocumentTitle = title => document.title = title;

export const redirectToIndex = () => window.location.href = '#/home';

export const setActivePage = id => {
    if (id === '') {
        return;
    }
    
    const navElements = document.getElementsByClassName('nav-link');

    for (let element of navElements) {
        if (!element.classList.contains('link-dark')) {
            element.classList.add('link-dark');
        }
    }

    document.getElementById(id).classList.remove('link-dark')
};

export function setActivePaginationItem(index) {
    const paginationItem = document.getElementById(`pagination-item-${index}`);
    paginationItem.classList.toggle('active');
}

export function getQueryParams(url) {
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