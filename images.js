import { renderHeader, renderFooter, renderErrorMessage, renderImage } from "./renderer.js";
import { depressions } from "./depressions.js";

const ERROR_MESSAGE = 'Na ten moment nie ma większej ilości zdjęć dla tego zapadliska. :(';

(() => {
    const body = document.getElementsByTagName('body')[0];
    body.insertAdjacentHTML('afterbegin', renderHeader());
    body.insertAdjacentHTML('beforeend', renderFooter());

    const container = document.getElementById('main-row');
    const query = location.search.split('=')[1];
    let images;

    depressions.forEach(d => {
        if (d.query === query) {
            images = d.images;
            return;
        }
    });

    if (images.length < 1) {
        container.innerHTML = renderErrorMessage(ERROR_MESSAGE);
        return;
    }
    
    images.forEach(image => container.innerHTML += renderImage(image));
})();