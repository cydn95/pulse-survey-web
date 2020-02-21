export const defaultMenuClassName = 'me';
export const defaultStartPath = '/app/me'; 

export const defaultLocale='en';
export const localeOptions=[
    {id:'en',name:'English'},
    {id:'es',name:'Español'},
];

export const apiUrl ="http://3.15.16.117/api/v1"

export const controlType = {
    TEXT: 1,
    SLIDER: 2,
    TWO_OPTIONS: 3,
    MULTI_OPTIONS: 4,
    SMART_TEXT: 5
}

export const controlTypeText = (type) => {
    if (type === 1) {
        return 'TEXT';
    } else if (type === 2) {
        return 'SLIDER'
    } else if (type === 3) {
        return 'TWO_OPTIONS';
    } else if (type === 4) {
        return 'MULTI_OPTIONS';
    } else if (type === 5) {
        return 'SMART_TEXT';
    }
}

export const loginErrorType = {
    AUTH_SUCCESS: 9999,
    USERNAME: 1,
    PASSWORD: 2,
    INVALID_PASSWORD: 3
}

export const loginErrorTypeText = type => {
    if (type === loginErrorType.AUTH_SUCCESS) {
        return '';
    } else if (type === loginErrorType.USERNAME) {
        return 'Username is required';
    } else if (type === loginErrorType.PASSWORD) {
        return 'Password is required';
    } else if (type === loginErrorType.INVALID_PASSWORD) {
        return 'The ID and password do not match. Please try again';
    } else {
        return 'Unknown Error';
    }
}