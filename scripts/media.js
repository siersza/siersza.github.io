import { NO_DEPRESSION_ERROR, NO_MEDIA_ERROR } from "../utils/constants.js";
import { renderBody, renderErrorMessage, renderMediaContainer, renderMedia } from "./renderer.js";
import { getDepressionByQuery, setPageTitle } from "../utils/utils.js";

(() => {
    renderBody(true, renderMediaContainer());
    const container = document.getElementById('media-container');
    const depression = getDepressionByQuery(location.search.split('=')[1]);

    if (depression === undefined) {
        container.innerHTML = renderErrorMessage(NO_DEPRESSION_ERROR);
        return;
    }
    
    if (depression.media.length < 1) {
        container.innerHTML = renderErrorMessage(NO_MEDIA_ERROR);
        return;
    }

    depression.media.forEach(m => container.innerHTML += renderMedia(m));
    
    setPageTitle(`Artykuły dotyczące zapadliska: ${depression.name}`);
})();