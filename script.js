import { renderHeader, renderFooter, renderCard } from "./renderer.js";
import { depressions } from "./depressions.js";

(() => {
    const body = document.getElementsByTagName('body')[0];
    body.insertAdjacentHTML('afterbegin', renderHeader());
    body.insertAdjacentHTML('beforeend', renderFooter());

    const container = document.getElementById('main-row');
    depressions.forEach(d => {
        const depression = {
            name: d.name,
            description: d.description,
            date: d.date,
            query: d.query,
            imgSrc: d.imgSrc,
            latitude: d.latitude,
            longitude: d.longitude
        };

        container.innerHTML += renderCard(depression);
    });
})();