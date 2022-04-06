import getOrDefaultFn from "../lib-ext/getOrDefaultFn.js";

const NAMES = {
    quantityOfBytesToDetectEncoding: 'quantityOfBytesToDetectEncoding',
    detectEncodingEnabled: 'detectEncodingEnabled'
};
const CONTEXT = {
    bytes: document.getElementById(NAMES.quantityOfBytesToDetectEncoding),
    detectEncodingEnabled: document.getElementById(NAMES.detectEncodingEnabled)
};
let config;
const initFn = () => {
    CONTEXT.bytes.value = Number(config[NAMES.quantityOfBytesToDetectEncoding]);
    CONTEXT.detectEncodingEnabled.checked = Boolean(config[NAMES.detectEncodingEnabled]);
};
const mainFn = async () => {
    config = await getOrDefaultFn();
    initFn();
    document.getElementById('reset').addEventListener('click', async () => {
        await browser.storage.local.clear();
        config = await getOrDefaultFn();
        initFn();
    });
    document.getElementById('save').addEventListener('click', () => {
        config[NAMES.quantityOfBytesToDetectEncoding] = Number(CONTEXT.bytes.value);
        config[NAMES.detectEncodingEnabled] = Boolean(CONTEXT.detectEncodingEnabled.checked);
        browser.storage.local.set(config);
    });
};

mainFn();
