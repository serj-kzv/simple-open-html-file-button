import openAsDataFn from "./openAsDataFn.js";

const openAsHtmlFn = async (content, isNewTab = true) => {
    return await openAsDataFn(content, 'text/html', isNewTab, null);
};

export default openAsHtmlFn;