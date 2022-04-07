import getOrDefaultFn from "../../ext-lib/getOrDefaultFn.js";
import CONSTANTS from "../../common/CONSTANTS.js";

const MIGRATION_SCRIPT_NAME = 'migration1Fn';
const migration1Fn = async () => {
    const config = await getOrDefaultFn();

    if (config[CONSTANTS.changelog] === undefined
        || config[CONSTANTS.changelog][MIGRATION_SCRIPT_NAME] === undefined
        || config[CONSTANTS.changelog][MIGRATION_SCRIPT_NAME] === false) {
        config[CONSTANTS.quantityOfBytesToDetectEncoding] = 2097152;
        config[CONSTANTS.detectEncodingEnabled] = true;
        if (config[CONSTANTS.changelog] === undefined) {
            config[CONSTANTS.changelog] = {};
        }
        config[CONSTANTS.changelog][MIGRATION_SCRIPT_NAME] = true;

        browser.storage.local.set(config);
    }
};

export default migration1Fn;