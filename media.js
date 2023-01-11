import { renderHeader, renderFooter, renderErrorMessage, renderMedia } from "./renderer.js";
import { depressions } from "./depressions.js";

const ERROR_MESSAGE = 'Na ten moment nie ma odnośników dotyczących zapadliska. :(';

(() => {
    const body = document.getElementsByTagName('body')[0];
    body.insertAdjacentHTML('afterbegin', renderHeader());
    body.insertAdjacentHTML('beforeend', renderFooter());

    const container = document.getElementById('list-group');
    const query = location.search.split('=')[1];
    let media;

    depressions.forEach(d => {
        if (d.query === query) {
            media = d.media;
            return;
        }
    });

    if (media.length < 1) {
        container.innerHTML = renderErrorMessage(ERROR_MESSAGE);
        return;
    }
    
    media.forEach(m => container.innerHTML += renderMedia(m));
})();