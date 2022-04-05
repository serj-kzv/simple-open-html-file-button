import readFileAsFn from "./readFileAsFn.js";

const readFileAsBinaryStringFn = file => readFileAsFn(file, 'readAsBinaryString');

export default readFileAsBinaryStringFn;