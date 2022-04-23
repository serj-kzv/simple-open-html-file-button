import getOrDefaultFn from "../../ext-lib/getOrDefaultFn.js";
import CONSTANTS from "../../common/CONSTANTS.js";
import checkOrInitFn from './checkOrInitFn.js';

const MIGRATION_SCRIPT_NAME = 'migration5Fn';
const migration5Fn = async () => {
    const config = await getOrDefaultFn();

    if (checkOrInitFn(config, MIGRATION_SCRIPT_NAME, CONSTANTS.changelog)) {
        config[CONSTANTS.changelog][MIGRATION_SCRIPT_NAME] = true;

        config[CONSTANTS.useDistributionToDetectEncoding] = true;

        browser.storage.local.set(config);
    }
};

export default migration5Fn;