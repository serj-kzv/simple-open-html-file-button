import openAsDataFn from "./openAsDataFn.js";

const openAsHtmlFn = async (content, charset, active = false, isNewTab = true) => {
    return await openAsDataFn(content, 'text/html', charset, active, isNewTab, null);
};

export default openAsHtmlFn;