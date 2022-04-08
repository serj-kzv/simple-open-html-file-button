import getOrDefaultFn from "../../ext-lib/getOrDefaultFn.js";
import CONSTANTS from "../../common/CONSTANTS.js";

const MIGRATION_SCRIPT_NAME = 'migration4Fn';
const migration4Fn = async () => {
    const config = await getOrDefaultFn();

    if (config[CONSTANTS.changelog] === undefined
        || config[CONSTANTS.changelog][MIGRATION_SCRIPT_NAME] === undefined
        || config[CONSTANTS.changelog][MIGRATION_SCRIPT_NAME] === false) {
        if (config[CONSTANTS.changelog] === undefined) {
            config[CONSTANTS.changelog] = {};
        }
        config[CONSTANTS.changelog][MIGRATION_SCRIPT_NAME] = true;

        config[CONSTANTS.clearMemoryOnUpdated] = true;
        config[CONSTANTS.sequentialOpening] = false;

        browser.storage.local.set(config);
    }
};

export default migration4Fn;