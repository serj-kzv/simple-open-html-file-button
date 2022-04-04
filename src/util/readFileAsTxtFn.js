import readFileAsFn from "./readFileAsFn.js";

const readFileAsTxtFn = file => readFileAsFn(file, 'readAsText');

export default readFileAsTxtFn;