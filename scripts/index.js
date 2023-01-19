import { DEFAULT_TITLE } from "../utils/constants.js";
import { renderBody, renderCard } from "./renderer.js";
import { depressions } from "../data/depressions.js";
import { replaceImgSrc } from "../utils/utils.js";

(() => {
    renderBody(DEFAULT_TITLE, false);

    const container = document.getElementById('main-row');
    depressions.forEach(d => container.innerHTML += renderCard(d));

    replaceImgSrc(document.getElementsByTagName('img'), false);
})();