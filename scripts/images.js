import { NO_DEPRESSION_ERROR, NO_IMAGES_ERROR } from "../utils/constants.js";
import { renderBody, renderErrorMessage, renderImagesContainer, renderImage } from "./renderer.js";
import { getDepressionByQuery, replaceImgSrc, setPageTitle } from "../utils/utils.js";

(() => {
    renderBody(true, renderImagesContainer());
    const container = document.getElementById('images-container');
    const depression = getDepressionByQuery(location.search.split('=')[1]);

    if (depression === undefined) {
        container.innerHTML = renderErrorMessage(NO_DEPRESSION_ERROR);
        return;
    }

    if (depression.images.length < 1) {
        container.innerHTML = renderErrorMessage(NO_IMAGES_ERROR);
        return;
    }

    depression.images.forEach(image => container.innerHTML += renderImage(image));
    
    setPageTitle(`Zdjęcia dotyczące zapadliska: ${depression.name}`);
    replaceImgSrc(document.getElementsByTagName('img'), true);
})();