import { renderHeader, renderFooter, renderErrorMessage, renderImage } from "./renderer.js";
import { depressions } from "./depressions.js";

const ERROR_MESSAGE = 'Na ten moment nie ma większej ilości zdjęć dla tego zapadliska. :(';
const DEFAULT_TITLE = 'Strona o sierszańskich zapadliskach';

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
        container.innerHTML = renderErrorMessage(ERROR_MESSAGE);
        return;
    }
    
    depression.images.forEach(image => container.innerHTML += renderImage(image));
})();