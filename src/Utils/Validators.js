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

export const phoneValidator = (text) => {
    text = text.trim();
    const regEx = /^([0-9]{11})$/;
    return regEx.test(text);
};

