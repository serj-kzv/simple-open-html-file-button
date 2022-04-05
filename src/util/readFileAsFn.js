const readFileAsFn = (file, converterName, parameters = []) => new Promise(resolve => {
    const fileReader = new FileReader();

    fileReader.addEventListener('loadend', event => resolve(event.target.result));
    fileReader[converterName](file, ...parameters);
});

export default readFileAsFn;