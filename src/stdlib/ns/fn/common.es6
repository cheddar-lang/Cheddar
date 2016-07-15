// functions common to each of the items

const prefixes = (array) =>
    array.map((e, i) => array.slice(0, i + 1));

export { prefixes };
