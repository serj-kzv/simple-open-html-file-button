import readFileAsBinaryStringFn from "./readFileAsBinaryStringFn.js";
import readFileAsTxtFn from "./readFileAsTxtFn.js";

const fileToTxtWithEncodingDetectionFn = async (file, quantityOfBytesToDetect) => {
    const content = quantityOfBytesToDetect < file.size ? file.slice(0, quantityOfBytesToDetect + 1) : file;

    return await readFileAsTxtFn(file, jschardet.detect(await readFileAsBinaryStringFn(content)).encoding);
};

export default fileToTxtWithEncodingDetectionFn;