export const emailValidator = (text) => {
    text = text.trim();
    const regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regEx.test(text);
};

export const onlyChar = (text) => {
    text = text.trim();
    const regEx = (/[^A-Za-z]/);
    return regEx.test(text);
};

export const ifscValidator = (text) => {
    text = text.trim();
    const regEx = /^[^\s]{4}\d{7}$/;
    return regEx.test(text);
};

export const panValidator = (text) => {
    text = text.trim();
    const regEx = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    return regEx.test(text);
};
