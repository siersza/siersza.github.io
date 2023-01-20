import { depressions } from "../data/depressions.js";
import { renderErrorMessage } from "../scripts/renderer.js";
import { COULD_NOT_LOAD_IMAGE_ERROR } from "./constants.js"

const getDepressionByQuery = query => depressions.filter(d => d.query === query)[0];

// Replace the src if the image failed to load (it does not exist, there is no access to it etc.).
const replaceImgSrc = (images, showMessage) => {
    for (let i = 0; i < images.length; i++) {
        images[i].onerror = () => {
            images[i].src = '../images/image-placeholder.png';
            images[i].style.pointerEvents = 'none';
            images[i].parentElement.href = '#';
            images[i].parentElement.target = '';
            if (showMessage) {
                images[i].parentElement.insertAdjacentHTML('afterend', renderErrorMessage(COULD_NOT_LOAD_IMAGE_ERROR));
            };
        };
    }
}

const setPageTitle = title => document.getElementById('title').innerHTML = title;

const setPageDescription = description => document.getElementById('description').innerHTML = description;

export {
    getDepressionByQuery,
    replaceImgSrc,
    setPageTitle,
    setPageDescription
}