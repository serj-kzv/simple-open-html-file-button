const NAMES = {
    quantityOfBytesToDetectEncoding: 'quantityOfBytesToDetectEncoding'
};
const CONTEXT = {
    bytes: document.getElementById(NAMES.quantityOfBytesToDetectEncoding)
};
let config;
const getOrDefaultFn = async () => {
    let config;

    try {
        config = await browser.storage.local.get();

        if (config === undefined || Object.keys(config).length === 0) {
            throw new Error('config is undefined');
        }
    } catch (e) {
        config = await (await fetch(browser.runtime.getURL('/src/assets/config.json'))).json();
        await browser.storage.local.set(config);
    }

    return config;
};
const initFn = () => {
    CONTEXT.bytes.value = Number(config[NAMES.quantityOfBytesToDetectEncoding]);
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
        browser.storage.local.set(config);
    });
};

mainFn();
