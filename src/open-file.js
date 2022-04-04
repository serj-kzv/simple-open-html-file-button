import openAsHtmlFn from "./util/openAsHtmlFn.js";
import readFileAsTxtFn from "./util/readFileAsTxtFn.js";

const openButton = document.getElementById('open');

openButton.addEventListener('change', async ({target: {files}}) => {
    await openAsHtmlFn(await readFileAsTxtFn(files[0]), false);
});

const openInNewTabButton = document.getElementById('open-in-new-tab');

openInNewTabButton.addEventListener('change', async ({target: {files}}) => {
    await openAsHtmlFn(await readFileAsTxtFn(files[0]));
});

const openWithReplaceButton = document.getElementById('open-with-replace');

openWithReplaceButton.addEventListener('change', async ({target: {files}}) => {
    const txt = await readFileAsTxtFn(files[0]);

    document.open();
    document.write(txt);
    document.close();
});

const openWithReplaceButtonInNewTabButton = document.getElementById('open-with-replace-in-new-tab');

openWithReplaceButtonInNewTabButton.addEventListener('change', async ({target: {files}}) => {
    let txt = await readFileAsTxtFn(files[0]);
    const tab = await browser.tabs.create({url: await browser.runtime.getURL('/src/blank.html')});

    txt = `document.open(); document.write(${escape(txt)}); document.close();`;
    try {
        await browser.tabs.executeScript(tab.id, {
            code: `            
            const script = document.createElement('script');
            script.async = false;
            script.innerText = ${txt};
            (document.head || document.documentElement).appendChild(script);
        `
        });
    } catch (e) {
        console.log(e);
    }
});