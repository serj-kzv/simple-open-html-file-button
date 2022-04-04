'use strict';

browser.browserAction.onClicked.addListener(async () => {
    const url = await browser.runtime.getURL('/src/open-file.html');

    browser.tabs.create({url});
});
