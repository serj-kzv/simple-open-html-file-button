import migration1Fn from "./migration1Fn.js";

const mainFn = async () => {
    await migration1Fn();
};

browser.runtime.onInstalled.addListener(async ({reason}) => {
    if (reason === 'update') {
        await mainFn();
    }
});