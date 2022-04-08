import migration1Fn from "./migration1Fn.js";
import migration2Fn from "./migration2Fn.js";
import migration3Fn from "./migration3Fn.js";
import migration4Fn from "./migration4Fn.js";

const mainFn = async () => {
    await migration1Fn();
    await migration2Fn();
    await migration3Fn();
    await migration4Fn();
};

browser.runtime.onInstalled.addListener(async ({reason}) => {
    if (reason === 'update') {
        await mainFn();
    }
});