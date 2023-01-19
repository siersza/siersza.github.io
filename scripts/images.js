import { DEFAULT_TITLE, NO_IMAGES_ERROR } from "../utils/constants.js";
import { renderBody, renderErrorMessage, renderImagesContainer, renderImage } from "./renderer.js";
import { getDepressionByQuery, replaceImgSrc } from "../utils/utils.js";

(() => {
    const depression = getDepressionByQuery(location.search.split('=')[1]);

    renderBody(depression !== undefined ? `Zapadlisko: ${depression.name}` : DEFAULT_TITLE, true, renderImagesContainer());

    const container = document.getElementById('main-row');

    if (depression === undefined || depression.images.length < 1) {
        container.innerHTML = renderErrorMessage(NO_IMAGES_ERROR);
        return;
    }
    
    depression.images.forEach(image => container.innerHTML += renderImage(image));
    
    replaceImgSrc(document.getElementsByTagName('img'), true);
})();