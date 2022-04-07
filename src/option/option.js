import getOrDefaultFn from "../ext-lib/getOrDefaultFn.js";
import CONSTANTS from "../common/CONSTANTS.js";

const CONTEXT = {
    bytes: document.getElementById(CONSTANTS.quantityOfBytesToDetectEncoding),
    detectEncodingEnabled: document.getElementById(CONSTANTS.detectEncodingEnabled),
    config: document.getElementById(CONSTANTS.config)
};
let config;
const initFn = () => {
    CONTEXT.config.value = JSON.stringify(config, null, 4);
    CONTEXT.bytes.value = Number(config[CONSTANTS.quantityOfBytesToDetectEncoding]);
    CONTEXT.detectEncodingEnabled.checked = Boolean(config[CONSTANTS.detectEncodingEnabled]);
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
                await browser.storage.local.clear();
                await browser.storage.local.set(JSON.parse(CONTEXT.config.value));
            } catch (e) {

            }
        } else {
            config[CONSTANTS.quantityOfBytesToDetectEncoding] = Number(CONTEXT.bytes.value);
            config[CONSTANTS.detectEncodingEnabled] = Boolean(CONTEXT.detectEncodingEnabled.checked);
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
