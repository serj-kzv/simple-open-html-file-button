import getOrDefaultFn from "../ext-lib/getOrDefaultFn.js";
import openAsHtmlFn from "../util/openAsHtmlFn.js";
import readFileAsBinaryStringFn from "../util/readFileAsBinaryStringFn.js";
import readFileAsTxtFn from "../util/readFileAsTxtFn.js";
import CONSTANTS from "../common/CONSTANTS.js";

const openHtmlWithoutEncodingDetectionFn = async file => openAsHtmlFn(await readFileAsTxtFn(file));
const openHtmlWithEncodingDetectionFn = async (file, config) => {
    const quantityOfBytesToDetectEncoding = config[CONSTANTS.quantityOfBytesToDetectEncoding] + 1;
    const fileSize = file.size + 1;
    const quantityOfBytesToDetectEncodingResult = quantityOfBytesToDetectEncoding > fileSize ? fileSize : quantityOfBytesToDetectEncoding;

    let content = file.slice(0, quantityOfBytesToDetectEncodingResult);

    content = await readFileAsBinaryStringFn(content);

    const encoding = jschardet.detect(content).encoding;

    content = await readFileAsTxtFn(file, encoding);
    await openAsHtmlFn(content, 'UTF-8');
};

document.getElementById('open-in-new-tab')
    .addEventListener('change', async ({target: {files}}) => {
        const config = await getOrDefaultFn();
        const detectEncodingEnabled = Boolean(config[CONSTANTS.detectEncodingEnabled]);
        const openHtmlFn = detectEncodingEnabled ? openHtmlWithEncodingDetectionFn : openHtmlWithoutEncodingDetectionFn;

        Promise.allSettled(Array.from(files).map(async file => openHtmlFn(file, config)));
    });