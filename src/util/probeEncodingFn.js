import readFileAsBinaryStringFn from './readFileAsBinaryStringFn.js';

const CHUNK_POSITIONS = Object.freeze({
    middle: 'middle'
});
const probeEncodingFn = async (
    sourceFile,
    amount,
    size,
    left,
    right
) => {
    const file = sourceFile.slice(left, right + 1);
    const maxSize = Math.floor(file.size / amount);
    const actualSize = size < maxSize ? size : maxSize;

    const results = [];

    for (let index = 1; index < amount + 1; index++) {
        const chunkEndPosition = maxSize * index;
        const chunkMiddlePosition = chunkEndPosition - Math.floor(maxSize / 2);
        const actualChunkStartPosition = chunkMiddlePosition - Math.floor(actualSize / 2);
        const actualChunkEndPosition = actualChunkStartPosition * 2;
        const chunk = file.slice(actualChunkStartPosition, actualChunkStartPosition * 2);

        const encoding = results.push(jschardet.detect(await readFileAsBinaryStringFn(chunk)));
        const details = {
            index,
            chunkEndPosition,
            chunkMiddlePosition,
            actualChunkStartPosition,
            actualChunkEndPosition
        };

        results.push({encoding, details});
    }

    return results;
};

export default {CHUNK_POSITIONS, probeEncodingFn};