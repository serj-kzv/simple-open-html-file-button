import openAsHtmlFn from "./util/openAsHtmlFn.js";
import readFileAsBinaryStringFn from "./util/readFileAsBinaryStringFn.js";
import readFileAsTxtFn from "./util/readFileAsTxtFn.js";

document.getElementById('open-in-new-tab')
    .addEventListener('change', async ({target: {files}}) => {
        Promise.allSettled(Array.from(files).map(async file => {
            var start = new Date().getTime();
            let content;
            // content = await readFileAsBinaryStringFn(file);
            content = await readFileAsBinaryStringFn(file.slice(0, 1025));
            const encoding = jschardet.detect(content).encoding;

            content = await readFileAsTxtFn(file, encoding);
            await openAsHtmlFn(content, 'UTF-8');
            console.log(new Date().getTime() - start);
        }));
    });