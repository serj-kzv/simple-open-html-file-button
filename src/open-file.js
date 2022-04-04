import openAsHtmlFn from "./util/openAsHtmlFn.js";
import readFileAsTxtFn from "./util/readFileAsTxtFn.js";

document.getElementById('open-in-new-tab')
    .addEventListener('change', async ({target: {files}}) =>
        Promise.allSettled(Array.from(files).map(async file => openAsHtmlFn(await readFileAsTxtFn(file))))
    );