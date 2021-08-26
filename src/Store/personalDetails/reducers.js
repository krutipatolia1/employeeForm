import { PERSONAL } from './type';

export const intialState = {
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
            console.log("action.payload",action.payload)
        return {
            ...state,
           employeeFormResponce: [...state, action.payload],
        };        
        default:
            return state;
    };

};