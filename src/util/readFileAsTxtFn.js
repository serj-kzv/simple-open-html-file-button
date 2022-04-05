import readFileAsFn from "./readFileAsFn.js";

const readFileAsTxtFn = (file, encoding) => readFileAsFn(file, 'readAsText', encoding ? [encoding] : []);

export default readFileAsTxtFn;