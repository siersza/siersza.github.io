import { depressions } from "../data/depressions.js";

export const getDepressionByQuery = (query) => depressions.filter(d => d.query === query)[0];

// Replace the src if the image failed to load (it does not exist, there is no access to it etc.).
export const replaceImgSrc = (images) => {
    for (let i = 0; i < images.length; i++) {
        images[i].onerror = () => {
            images[i].src = '../images/image-placeholder.png';
            images[i].style.pointerEvents = 'none';
        };
    }
}