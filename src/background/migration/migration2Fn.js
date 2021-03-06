import getOrDefaultFn from "../../ext-lib/getOrDefaultFn.js";
import CONSTANTS from "../../common/CONSTANTS.js";
import checkOrInitFn from './checkOrInitFn.js';

const MIGRATION_SCRIPT_NAME = 'migration2Fn';
const migration2Fn = async () => {
    const config = await getOrDefaultFn();

    if (checkOrInitFn(config, MIGRATION_SCRIPT_NAME, CONSTANTS.changelog)) {
        config[CONSTANTS.changelog][MIGRATION_SCRIPT_NAME] = true;

        config[CONSTANTS.clearMemoryOnRemoved] = true;
        config[CONSTANTS.clearMemoryOnReplaced] = true;
        config[CONSTANTS.clearMemoryOnUpdated] = false;
        config[CONSTANTS.sequentialOpening] = true;

        browser.storage.local.set(config);
    }
};

export default migration2Fn;