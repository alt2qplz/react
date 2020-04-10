//Функция глубокого копирования

const deepCopy = (inObject) => {

    let outObject, key, value;

    if (typeof inObject !== "object" || inObject === null) {
        return inObject;
    }

    outObject = Array.isArray(outObject) ? [] : {};

    for (key in inObject) {
        value = inObject[key];

        outObject[key] = (typeof value === 'object' && value !== null) ? deepCopy(value) : value;

    }

    return outObject;
};
