import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "../utils/constants.js";
import { renderBody, renderCard } from "./renderer.js";
import { depressions } from "../data/depressions.js";
import { setPageTitle, setPageDescription, replaceImgSrc, setActivePage } from "../utils/utils.js";

(() => {
    renderBody(false);

    const container = document.getElementById('main-row');
    depressions.forEach(d => container.innerHTML += renderCard(d));

    setActivePage('home');
    setPageTitle(DEFAULT_TITLE);
    setPageDescription(`${DEFAULT_DESCRIPTION}. Na dzień dzisiejszy strona zawiera informacje na temat <b>${depressions.length}</b> zapadlisk.`);
    replaceImgSrc(document.getElementsByTagName('img'), false);
})();
