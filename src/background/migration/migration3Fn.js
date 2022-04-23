import getOrDefaultFn from "../../ext-lib/getOrDefaultFn.js";
import CONSTANTS from "../../common/CONSTANTS.js";
import checkOrInitFn from './checkOrInitFn.js';

const MIGRATION_SCRIPT_NAME = 'migration3Fn';
const migration3Fn = async () => {
    const config = await getOrDefaultFn();

    if (checkOrInitFn(config, MIGRATION_SCRIPT_NAME, CONSTANTS.changelog)) {
        config[CONSTANTS.changelog][MIGRATION_SCRIPT_NAME] = true;

        config[CONSTANTS.clearMemoryOnUpdated] = true;
        config[CONSTANTS.sequentialOpening] = false;

        browser.storage.local.set(config);
    }
};

export default migration3Fn;