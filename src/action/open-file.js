import getOrDefaultFn from "../lib-ext/getOrDefaultFn.js";
import openAsHtmlFn from "../util/openAsHtmlFn.js";
import readFileAsBinaryStringFn from "../util/readFileAsBinaryStringFn.js";
import readFileAsTxtFn from "../util/readFileAsTxtFn.js";

document.getElementById('open-in-new-tab')
    .addEventListener('change', async ({target: {files}}) => {
        const config = await getOrDefaultFn();
        const quantityOfBytesToDetectEncoding = config['quantityOfBytesToDetectEncoding'] + 1;
        const detectEncodingEnabled = Boolean(config['detectEncodingEnabled']);

        Promise.allSettled(Array.from(files).map(async file => {
            let content;

            if (detectEncodingEnabled) {
                content = await readFileAsBinaryStringFn(file.slice(0, quantityOfBytesToDetectEncoding));
                const encoding = jschardet.detect(content).encoding;

                content = await readFileAsTxtFn(file, encoding);
                await openAsHtmlFn(content, 'UTF-8');
            } else {
                content = await readFileAsTxtFn(file);
                await openAsHtmlFn(content);
            }
        }));
    });