browser.browserAction.onClicked.addListener(async () =>
    browser.tabs.create({url: await browser.runtime.getURL('/src/action/open-file.html')}));