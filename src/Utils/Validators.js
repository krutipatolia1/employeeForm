export const emailValidator = (text) => {
    text = text.trim();
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

