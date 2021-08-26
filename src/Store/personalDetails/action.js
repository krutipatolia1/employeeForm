import { PERSONAL } from './type';

export const personalDetailsSuccess = (payload) => {
    return {
        type: PERSONAL.SET_PERSONAL_DETAILS,
        payload: payload
    }
}

export const bankDetailsSuccess = (payload) => {
    return {
        type: PERSONAL.SET_BANK_DETAILS,
        payload: payload
    }
}

export const professionalDetailsSuccess = (payload) => {
    return {
        type: PERSONAL.SET_PROFESSIONAL_DETAILS,
        payload: payload
    }
}

export const currentStatusSuccess = (payload) => {
    return {
        type: PERSONAL.SET_CURRENT_STATUS,
        payload: payload
    }
}

export const experienceDetailsSuccess = (payload) => {
    return {
        type: PERSONAL.SET_EXPERIENCE_DETAILS,
        payload: payload
    }
}

export const educationDetailsSuccess = (payload) => {
    return {
        type: PERSONAL.SET_EDUCATIONAL_DETAILS,
        payload: payload
    }
}

export const employeeFormSuccess = (payload) => {
    return {
        type: PERSONAL.SET_EMPLOYEEFORM,
        payload: payload
    }
}
