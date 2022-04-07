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

export default getOrDefaultFn;