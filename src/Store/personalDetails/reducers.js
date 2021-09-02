import { PERSONAL } from './type';

export const intialState = {
    employeeFormResponce: []
};

export const PersonalDetailsReducer = (state = intialState, action) => {
    switch (action.type) {
        case PERSONAL.SET_PERSONAL_DETAILS:
            return {
                ...state,
                personalDetailsResponce: action.payload,
            };
        case PERSONAL.SET_BANK_DETAILS:
            return {
                ...state,
                bankDetailsResponce: action.payload,
            };
        case PERSONAL.SET_PROFESSIONAL_DETAILS:
            return {
                ...state,
                professionalDetailsResponce: action.payload,
            };
        case PERSONAL.SET_CURRENT_STATUS:
            return {
                ...state,
                currentStatusResponce: action.payload,
            };
        case PERSONAL.SET_EXPERIENCE_DETAILS:
            return {
                ...state,
                experienceDetailsResponce: action.payload,
            };
        case PERSONAL.SET_EDUCATIONAL_DETAILS:
            return {
                ...state,
                educationDetailsResponce: action.payload,
            };
        case PERSONAL.SET_EMPLOYEEFORM:
            let item = state.employeeFormResponce
            item.push(action.payload)
            return {
                ...state,
                employeeFormResponce: item,
            };
        case PERSONAL.USER_EDIT:
            return {
                ...state,
                employeeFormResponce: state.employeeFormResponce.map((item) => item.id === action.payload.id ? action.payload : item),
            };
        case PERSONAL.USER_DELETE:
            return {
                ...state,
                employeeFormResponce: state.employeeFormResponce.filter((item) => item.id !== action.payload.id),
            };
        case PERSONAL.DELETE_ALL:
            return {
                ...state,
                employeeFormResponce: []
            };
        default:
            return state;
    };

};