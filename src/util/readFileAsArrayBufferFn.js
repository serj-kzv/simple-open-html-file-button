import readFileAsFn from "./readFileAsFn.js";

const readFileAsArrayBufferFn = file => readFileAsFn(file, 'readAsArrayBuffer');

export default readFileAsArrayBufferFn;