import { NO_DEPRESSION_ERROR, NO_MEDIA_ERROR } from "../utils/constants.js";
import { renderBody, renderErrorMessage, renderURLContainer, renderURL } from "./renderer.js";
import { getDepressionByQuery, setPageTitle } from "../utils/utils.js";

(() => {
    renderBody(true, renderURLContainer());
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

    depression.media.forEach(m => container.innerHTML += renderURL(m));
    
    setPageTitle(`Artykuły dotyczące zapadliska: ${depression.name}`);
})();