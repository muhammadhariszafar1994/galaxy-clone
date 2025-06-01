import { Dimensions } from "react-native";

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const colors = {
    purple: '#733C86',
    pink: '#B03982',
    transparentpink: '#b0398236',
    darkpink: '#af3981',
    lightpink: '#b78ea7',
    black: '#231F20',
    white: '#ffffff',
    lightgray: '#f9f9f9',
    midgray: '#f3f4f5',
    bordergray: '#cbcbcc',
    gray: 'gray',
    blacktransparent: '#0000008f'
};

export const routes = {
    baseUrl: `https://stage-api.nerdybuddy.com/`,
    login: `api/auth/login`,
    forgotPassword: `api/auth/forgetPassword`,
    resetPassword: `api/auth/resetPassword`,
    changePassword: `api/auth/tokenPassword`,
    supportCreate: `api/support/create`,
    getFeedbackForm: `api/feedback/form`,
    shareFeedback: `api/feedback/submitFeedback`,
    resetPasswordByEmail: `api/auth/resetPasswordByEmail`,

    streamResponse: `llm/stream_response`,
    userSessions: `llm/get_user_sessions`,
    sendRefrenceEmail: `api/client/sendRefrenceEmail`,
    getDocument: (documentName: String) => {
        return `api/documents/getDocumentName?search=${documentName}`;
    },
};

export const API = {

};