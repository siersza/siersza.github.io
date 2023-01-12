import { DEFAULT_TITLE, NO_IMAGES_ERROR } from "./constants.js";
import { renderHeader, renderFooter, renderErrorMessage, renderImage } from "./renderer.js";
import { depressions } from "./depressions.js";

(() => {
    const body = document.getElementsByTagName('body')[0];
    const container = document.getElementById('main-row');
    const query = location.search.split('=')[1];
    let depression;

    depressions.forEach(d => {
        if (d.query === query) {
            depression = d;
            return;
        }
    });

    body.insertAdjacentHTML('afterbegin', renderHeader(depression !== undefined ? `Zapadlisko: ${depression.name}` : DEFAULT_TITLE));
    body.insertAdjacentHTML('beforeend', renderFooter(true));

    if (depression === undefined || depression.images.length < 1) {
        container.innerHTML = renderErrorMessage(NO_IMAGES_ERROR);
        return;
    }
    
    depression.images.forEach(image => container.innerHTML += renderImage(image));
})();