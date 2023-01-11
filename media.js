import { renderHeader, renderFooter } from "./renderer.js";
import { depressions } from "./depressions.js";

(() => {
    const body = document.getElementsByTagName('body')[0];
    body.insertAdjacentHTML('afterbegin', renderHeader());

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
        container.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Na ten moment nie ma odnośników dotyczących zapadliska. :(
            </div>
        `;
        return;
    }
    
    media.forEach(m => {
        container.innerHTML += `
            <a href=${m} target="_blank" class="list-group-item list-group-item-action">${m}
        `
    });

    body.insertAdjacentHTML('beforeend', renderFooter());
})();