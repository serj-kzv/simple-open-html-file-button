import getOrDefaultFn from "../../ext-lib/getOrDefaultFn.js";
import CONSTANTS from "../../common/CONSTANTS.js";
import checkOrInitFn from './checkOrInitFn.js';

const MIGRATION_SCRIPT_NAME = 'migration1Fn';
const migration1Fn = async () => {
    const config = await getOrDefaultFn();

    if (checkOrInitFn(config, MIGRATION_SCRIPT_NAME, CONSTANTS.changelog)) {
        config[CONSTANTS.changelog][MIGRATION_SCRIPT_NAME] = true;

        config[CONSTANTS.quantityOfBytesToDetectEncoding] = 2097152;
        config[CONSTANTS.detectEncodingEnabled] = true;

        browser.storage.local.set(config);
    }
};

export default migration1Fn;