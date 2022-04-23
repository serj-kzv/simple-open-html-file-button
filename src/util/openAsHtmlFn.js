import openAsDataFn from "./openAsDataFn.js";

const openAsHtmlFn = (
    content,
    charset,
    active = false,
    isNewTab = true,
    clearMemoryOnRemoved = true,
    clearMemoryOnReplaced = true,
    clearMemoryOnUpdated = true
) => openAsDataFn(
    content,
    {type: 'text/html', charset},
    {
        active,
        isNewTab,
        clearMemoryOnRemoved,
        clearMemoryOnReplaced,
        clearMemoryOnUpdated
    }
);

export default openAsHtmlFn;