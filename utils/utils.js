import { depressions } from "../data/depressions.js";

export const getDepressionByQuery = (query) => depressions.filter(d => d.query === query)[0];