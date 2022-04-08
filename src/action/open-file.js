import getOrDefaultFn from "../ext-lib/getOrDefaultFn.js";
import openAsHtmlFn from "../util/openAsHtmlFn.js";
import readFileAsBinaryStringFn from "../util/readFileAsBinaryStringFn.js";
import readFileAsTxtFn from "../util/readFileAsTxtFn.js";
import CONSTANTS from "../common/CONSTANTS.js";

const openHtmlWithoutEncodingDetectionFn = async file => openAsHtmlFn(await readFileAsTxtFn(file));
const openHtmlWithEncodingDetectionFn = async (file, config) => {
    const quantityOfBytesToDetectEncoding = config[CONSTANTS.quantityOfBytesToDetectEncoding];
    let content = quantityOfBytesToDetectEncoding < file.size ? file.slice(0, quantityOfBytesToDetectEncoding + 1) : file;

    content = await readFileAsBinaryStringFn(content);

    const encoding = jschardet.detect(content).encoding;

    content = await readFileAsTxtFn(file, encoding);
    await openAsHtmlFn(content, 'UTF-8', false, true);
};

document.getElementById('open-in-new-tab')
    .addEventListener('change', async ({target: {files}}) => {
        const config = await getOrDefaultFn();
        const detectEncodingEnabled = Boolean(config[CONSTANTS.detectEncodingEnabled]);
        const openHtmlFn = detectEncodingEnabled ? openHtmlWithEncodingDetectionFn : openHtmlWithoutEncodingDetectionFn;
        const openHtmlPromises = Array.from(files).map(async file => openHtmlFn(file, config));

        if (config[CONSTANTS.sequentialOpening]) {
            for (const openHtmlPromise of openHtmlPromises) {
                await openHtmlPromise;
            }
        } else {
            Promise.allSettled(Array.from(files).map(async file => openHtmlFn(file, config)));
        }
    });