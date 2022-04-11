import CONSTANTS from "../common/CONSTANTS.js";
import getOrDefaultFn from "../ext-lib/getOrDefaultFn.js";
import fileToTxtWithEncodingDetectionFn from '../util/fileToTxtWithEncodingDetectionFn.js';
import openAsHtmlFn from "../util/openAsHtmlFn.js";
import readFileAsTxtFn from "../util/readFileAsTxtFn.js";

document.getElementById(CONSTANTS.openInNewTab).addEventListener('change', async ({target: {files}}) => {
        const config = await getOrDefaultFn();
        const readHtmlAsTxtFn = Boolean(config[CONSTANTS.detectEncodingEnabled]) ? fileToTxtWithEncodingDetectionFn : readFileAsTxtFn;
        const openHtmlPromises = Array.from(files).map(async file => await openAsHtmlFn(
            await readHtmlAsTxtFn(file, config[CONSTANTS.quantityOfBytesToDetectEncoding]),
            'UTF-8',
            false,
            true,
            Boolean(config[CONSTANTS.clearMemoryOnRemoved]),
            Boolean(config[CONSTANTS.clearMemoryOnReplaced]),
            Boolean(config[CONSTANTS.clearMemoryOnUpdated])
        ));

        console.log(openHtmlPromises);

        // if (config[CONSTANTS.sequentialOpening]) {
        //     for (const openHtmlPromise of openHtmlPromises) {
        //         try {
        //             await openHtmlPromise;
        //         } catch (e) {
        //
        //         }
        //     }
        // } else {
        //     Promise.allSettled(openHtmlPromises);
        // }
    });