import CONSTANTS from "../common/CONSTANTS.js";
import getOrDefaultFn from "../ext-lib/getOrDefaultFn.js";
import fileToTxtWithEncodingDetectionFn from '../util/fileToTxtWithEncodingDetectionFn.js';
import openAsHtmlFn from "../util/openAsHtmlFn.js";
import readFileAsTxtFn from "../util/readFileAsTxtFn.js";

document.getElementById(CONSTANTS.openInNewTab).addEventListener('change', async ({target: {files}}) => {
    files = Array.from(files);

    const config = await getOrDefaultFn();
    const readHtmlAsTxtFn = Boolean(config[CONSTANTS.detectEncodingEnabled]) ? fileToTxtWithEncodingDetectionFn : readFileAsTxtFn;

    if (config[CONSTANTS.sequentialOpening]) {
        for (const file of files) {
            try {
                await openAsHtmlFn(
                    await readHtmlAsTxtFn(file, config[CONSTANTS.quantityOfBytesToDetectEncoding]),
                    'UTF-8',
                    false,
                    true,
                    Boolean(config[CONSTANTS.clearMemoryOnRemoved]),
                    Boolean(config[CONSTANTS.clearMemoryOnReplaced]),
                    Boolean(config[CONSTANTS.clearMemoryOnUpdated])
                );
            } catch (e) {

            }
        }
    } else {
        Promise.allSettled(
            files.map(async file => openAsHtmlFn(
                await readHtmlAsTxtFn(file, config[CONSTANTS.quantityOfBytesToDetectEncoding]),
                'UTF-8',
                false,
                true,
                Boolean(config[CONSTANTS.clearMemoryOnRemoved]),
                Boolean(config[CONSTANTS.clearMemoryOnReplaced]),
                Boolean(config[CONSTANTS.clearMemoryOnUpdated])
            ))
        );
    }
});