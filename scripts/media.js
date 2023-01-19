import { DEFAULT_TITLE, NO_MEDIA_ERROR } from "../utils/constants.js";
import { renderBody, renderErrorMessage, renderMediaContainer, renderMedia } from "./renderer.js";
import { getDepressionByQuery } from "../utils/utils.js";

(() => {
    const depression = getDepressionByQuery(location.search.split('=')[1]);

    renderBody(depression !== undefined ? `Zapadlisko: ${depression.name}` : DEFAULT_TITLE, true, renderMediaContainer());

    const container = document.getElementById('list-group');

    if (depression === undefined || depression.media.length < 1) {
        container.innerHTML = renderErrorMessage(NO_MEDIA_ERROR);
        return;
    }
    
    depression.media.forEach(m => container.innerHTML += renderMedia(m));
})();