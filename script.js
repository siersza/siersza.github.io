import { renderHeader, renderFooter, renderCard } from "./renderer.js";
import { depressions } from "./depressions.js";

(() => {
    const body = document.getElementsByTagName('body')[0];
    body.insertAdjacentHTML('afterbegin', renderHeader());
    body.insertAdjacentHTML('beforeend', renderFooter());

    const container = document.getElementById('main-row');
    depressions.forEach(d => container.innerHTML += renderCard(d));
})();