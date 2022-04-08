import getOrDefaultFn from "../ext-lib/getOrDefaultFn.js";
import CONSTANTS from "../common/CONSTANTS.js";

const CONTEXT = {
    bytes: document.getElementById(CONSTANTS.quantityOfBytesToDetectEncoding),
    detectEncodingEnabled: document.getElementById(CONSTANTS.detectEncodingEnabled),
    clearMemoryOnRemoved: document.getElementById(CONSTANTS.clearMemoryOnRemoved),
    clearMemoryOnReplaced: document.getElementById(CONSTANTS.clearMemoryOnReplaced),
    clearMemoryOnUpdated: document.getElementById(CONSTANTS.clearMemoryOnUpdated),
    sequentialOpening: document.getElementById(CONSTANTS.sequentialOpening),
    config: document.getElementById(CONSTANTS.config)
};
let config;
const initFn = () => {
    CONTEXT.config.value = JSON.stringify(config, null, 4);
    CONTEXT.bytes.value = Number(config[CONSTANTS.quantityOfBytesToDetectEncoding]);
    CONTEXT.detectEncodingEnabled.checked = Boolean(config[CONSTANTS.detectEncodingEnabled]);
    CONTEXT.clearMemoryOnRemoved.checked = Boolean(config[CONSTANTS.clearMemoryOnRemoved]);
    CONTEXT.clearMemoryOnReplaced.checked = Boolean(config[CONSTANTS.clearMemoryOnReplaced]);
    CONTEXT.clearMemoryOnUpdated.checked = Boolean(config[CONSTANTS.clearMemoryOnUpdated]);
    CONTEXT.sequentialOpening.checked = Boolean(config[CONSTANTS.sequentialOpening]);
};
let isTextConfigChanged = false;
const mainFn = async () => {
    config = await getOrDefaultFn();
    initFn();
    document.getElementById('reset').addEventListener('click', async () => {
        await browser.storage.local.clear();
        config = await getOrDefaultFn();
        initFn();
    });
    document.getElementById('save').addEventListener('click', async () => {
        if (isTextConfigChanged) {
            try {
                const newConfig = JSON.parse(CONTEXT.config.value);

                await browser.storage.local.clear();
                await browser.storage.local.set(newConfig);
            } catch (e) {

            }
        } else {
            config[CONSTANTS.quantityOfBytesToDetectEncoding] = Number(CONTEXT.bytes.value);
            config[CONSTANTS.detectEncodingEnabled] = Boolean(CONTEXT.detectEncodingEnabled.checked);
            config[CONSTANTS.clearMemoryOnRemoved] = Boolean(CONTEXT.clearMemoryOnRemoved.checked);
            config[CONSTANTS.clearMemoryOnReplaced] = Boolean(CONTEXT.clearMemoryOnReplaced.checked);
            config[CONSTANTS.clearMemoryOnUpdated] = Boolean(CONTEXT.clearMemoryOnUpdated.checked);
            config[CONSTANTS.sequentialOpening] = Boolean(CONTEXT.sequentialOpening.checked);
            browser.storage.local.set(config);
        }
        config = await getOrDefaultFn();
        initFn();
    });
    CONTEXT.config.addEventListener('input', async () => {
        if (!isTextConfigChanged) {
            isTextConfigChanged = true;
        }
    });
};

mainFn();
