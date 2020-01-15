export const subHiddenBreakpoint=1440;
export const menuHiddenBreakpoint = 768;
export const defaultMenuType = 'menu-sub-hidden'; // 'menu-default'; //'menu-sub-hidden', 'menu-hidden'
export const defaultStartPath = '/app/about-me/start'; 


export const defaultLocale='en';
export const localeOptions=[
    {id:'en',name:'English'},
    {id:'es',name:'Español'},
];

export const firebaseConfig = {
    apiKey: "AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg",
    authDomain: "gogo-react-login.firebaseapp.com",
    databaseURL: "https://gogo-react-login.firebaseio.com",
    projectId: "gogo-react-login",
    storageBucket: "gogo-react-login.appspot.com",
    messagingSenderId: "216495999563"
};

export const apiUrl ="http://3.15.16.117/api/v1"

export const searchPath = "/app/about-me/start"

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