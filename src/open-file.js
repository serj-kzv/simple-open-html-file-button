import openAsHtmlFn from "./util/openAsHtmlFn.js";
import readFileAsBinaryStringFn from "./util/readFileAsBinaryStringFn.js";
import readFileAsTxtFn from "./util/readFileAsTxtFn.js";

document.getElementById('open-in-new-tab')
    .addEventListener('change', async ({target: {files}}) => {
        Promise.allSettled(Array.from(files).map(async file => {
            let content = await readFileAsBinaryStringFn(file);
            const encoding = jschardet.detect(content).encoding;

            content = await readFileAsTxtFn(file, encoding);
            openAsHtmlFn(content, 'UTF-8');
        }));
    });