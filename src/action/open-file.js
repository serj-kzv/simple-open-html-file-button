import getOrDefaultFn from "../ext-lib/getOrDefaultFn.js";
import openAsHtmlFn from "../util/openAsHtmlFn.js";
import readFileAsBinaryStringFn from "../util/readFileAsBinaryStringFn.js";
import readFileAsTxtFn from "../util/readFileAsTxtFn.js";
import CONSTANTS from "../common/CONSTANTS.js";

const openHtmlWithoutEncodingDetectionFn = async (
    file,
    config,
    clearMemoryOnRemoved,
    clearMemoryOnReplaced,
    clearMemoryOnUpdated) => {
    return await openAsHtmlFn(
        await readFileAsTxtFn(file),
        'UTF-8',
        false,
        true,
        clearMemoryOnRemoved,
        clearMemoryOnReplaced,
        clearMemoryOnUpdated
    );
};
const openHtmlWithEncodingDetectionFn = async (
    file,
    config,
    clearMemoryOnRemoved,
    clearMemoryOnReplaced,
    clearMemoryOnUpdated) => {
    const quantityOfBytesToDetectEncoding = config[CONSTANTS.quantityOfBytesToDetectEncoding];
    let content = quantityOfBytesToDetectEncoding < file.size ? file.slice(0, quantityOfBytesToDetectEncoding + 1) : file;

    content = await readFileAsBinaryStringFn(content);

    const encoding = jschardet.detect(content).encoding;

    content = await readFileAsTxtFn(file, encoding);

    return await openAsHtmlFn(
        content,
        'UTF-8',
        false,
        true,
        clearMemoryOnRemoved,
        clearMemoryOnReplaced,
        clearMemoryOnUpdated
    );
};

document.getElementById('open-in-new-tab')
    .addEventListener('change', async ({target: {files}}) => {
        const config = await getOrDefaultFn();
        const detectEncodingEnabled = Boolean(config[CONSTANTS.detectEncodingEnabled]);
        const clearMemoryOnRemoved = Boolean(config[CONSTANTS.clearMemoryOnRemoved]);
        const clearMemoryOnReplaced = Boolean(config[CONSTANTS.clearMemoryOnReplaced]);
        const clearMemoryOnUpdated = Boolean(config[CONSTANTS.clearMemoryOnUpdated]);
        const openHtmlFn = detectEncodingEnabled ? openHtmlWithEncodingDetectionFn : openHtmlWithoutEncodingDetectionFn;
        const openHtmlPromises = Array.from(files).map(file => openHtmlFn(
            file,
            config,
            clearMemoryOnRemoved,
            clearMemoryOnReplaced,
            clearMemoryOnUpdated
        ));

        if (config[CONSTANTS.sequentialOpening]) {
            for (const openHtmlPromise of openHtmlPromises) {
                await openHtmlPromise;
            }
        } else {
            Promise.allSettled(openHtmlPromises);
        }
    });