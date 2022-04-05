import openAsDataFn from "./openAsDataFn.js";

const openAsHtmlFn = async (content, charset, isNewTab = true) => {
    return await openAsDataFn(content, 'text/html', charset, isNewTab, null);
};

export default openAsHtmlFn;