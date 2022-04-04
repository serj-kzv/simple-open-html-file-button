'use strict';

browser.browserAction.onClicked.addListener(async () =>
    browser.tabs.create({url: await browser.runtime.getURL('/src/open-file.html')}));