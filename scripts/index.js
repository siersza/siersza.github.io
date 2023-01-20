import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "../utils/constants.js";
import { renderBody, renderCard } from "./renderer.js";
import { depressions } from "../data/depressions.js";
import { setPageTitle, setPageDescription, replaceImgSrc } from "../utils/utils.js";

(() => {
    renderBody(false);

    const container = document.getElementById('main-row');
    depressions.forEach(d => container.innerHTML += renderCard(d));

    setPageTitle(DEFAULT_TITLE);
    setPageDescription(DEFAULT_DESCRIPTION);
    replaceImgSrc(document.getElementsByTagName('img'), false);
})();