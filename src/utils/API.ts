import axios from 'axios';
import { routes } from './Constants';
import { store } from '../store/store';
import { showError, showSuccess } from './Helper';
import { setLoading } from '../store/reducers/auth';

const API = axios.create({baseURL: routes.baseUrl});

API.interceptors.request.use(config => {
    const {
        auth: {token},
    } = store.getState();
    
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['token'] = token;
    
    store.dispatch(setLoading(true));

    if (config.method === 'get') {

    }
  
   return config;
});


// Add a response interceptor
API.interceptors.response.use(
    (response) => {
        store.dispatch(setLoading(false));

        let toast = response.config.toast;
        let message = response?.data?.message;

        if(response.config.message) message = response.config.message;
        if(toast) showSuccess(message)

        return response;
    },
    (error) => {
        store.dispatch(setLoading(false));

        const errResponse = error.response;
            
        if (errResponse) {
            let object = {};


            if(errResponse?.data) object = errResponse.data;
            if(errResponse?.data?.data) object = errResponse.data?.data;
            
            if(typeof object === 'object' && object !== null && object?.length > 0) {
                for (const key in object) {
                    if (Object.prototype.hasOwnProperty.call(object, key)) {
                        const errors = object[key];
                        if (typeof errors === 'object' && errors !== null) {
                            for (const e in errors) {
                                if (Object.prototype.hasOwnProperty.call(errors, e)) {
                                    const err = errors[e];
                                    showError(err);
                                }
                            }
                        } else {
                            showError(element);
                        }
                    }
                }
            }
            
            else if (errResponse?.data?.message) showError(errResponse?.data?.message);
            else showError(errResponse.message);
        }

        return Promise.reject(error);
    }
);

export default API;