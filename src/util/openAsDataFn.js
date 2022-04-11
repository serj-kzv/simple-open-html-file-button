const openAsDataFn = async (
    content,
    {type, charset},
    {active, isNewTab, clearMemoryOnRemoved, clearMemoryOnReplaced, clearMemoryOnUpdated}) => {
    let options;

    if (charset) {
        type = charset ? `${type};charset=${charset}` : type;
        options = {type, encoding: charset};
    } else {
        options = {type};
    }

    let
        isCompleted = false,
        isMemoryCleared = false,
        currentTab = null,
        onRemovedListener,
        onReplacedListener,
        onUpdatedListener,
        url;
    const clearMemory = () => {
        if (!isMemoryCleared) {
            isMemoryCleared = true;
            browser.tabs.onRemoved.removeListener(onRemovedListener);
            browser.tabs.onReplaced.removeListener(onReplacedListener);
            browser.tabs.onUpdated.removeListener(onUpdatedListener);
            window.URL.revokeObjectURL(url);
        }
    };

    // clear memory on a tab is closed event
    onRemovedListener = tabId => {
        const isRunAndCurrent = currentTab != null && currentTab.id === tabId;

        if (isRunAndCurrent) {
            clearMemory();
        }
    };

    // clear memory on a tab is replaced event
    onReplacedListener = (addedTabId, removedTabId) => {
        const isRunAndCurrent = currentTab != null && currentTab.id === removedTabId;

        if (isRunAndCurrent) {
            clearMemory();
        }
    };

    // clear memory on a tab content is replaced event
    onUpdatedListener = (tabId, changeInfo, tab) => {
        const isRunAndCurrent = currentTab != null && currentTab.id === tabId;

        if (isRunAndCurrent) {
            const {url: tabUrl} = tab;

            // checks if an original tab content was replaced
            if (!isCompleted && tab.status === 'complete' && url === tabUrl) {
                isCompleted = true;
            } else if (url !== tabUrl) {
                clearMemory();
            }
        }
    };

    if (clearMemoryOnRemoved) {
        browser.tabs.onRemoved.addListener(onRemovedListener);
    }
    if (clearMemoryOnReplaced) {
        browser.tabs.onReplaced.addListener(onReplacedListener);
    }
    if (clearMemoryOnUpdated) {
        browser.tabs.onUpdated.addListener(onUpdatedListener);
    }
    url = window.URL.createObjectURL(new Blob([content], options));

    try {
        if (isNewTab) {
            return currentTab = await browser.tabs.create({url, active});
        } else {
            const {id: tabId} = await browser.tabs.getCurrent();

            return currentTab = await browser.tabs.update(tabId, {url, active});
        }
    } catch (e) {
        // clear memory on a tab open event error
        clearMemory();

        return false;
    }
};

export default openAsDataFn;
