import { Alert } from 'react-native';
import API from '../../../utils/API';
import { routes } from '../../../utils/Constants';
import { setStream } from '../../reducers/stream';
import { store } from '../../store';

export const SupportCreateAPI = async (payload) => {
  return new Promise((resolve, reject) => {
    API.post(routes.supportCreate, payload)
      .then(e => {
        resolve(e)
        console.log('SupportCreateAPI', e);
      })
      .catch(err => {
        reject(err);
        console.log('SupportCreateAPI err', err.response);
      })
      .finally(() => {
        
      });
  });
};

export const SendRefrenceEmailAPI = async (payload) => {
  return new Promise((resolve, reject) => {
    API.post(routes.sendRefrenceEmail, payload, {
      toast: true,
      message: 'Send email successfully!'
    })
      .then(e => {
        console.log('SendRefrenceEmailAPI---then', e);
        resolve(e)
      })
      .catch(err => {
        console.log('SendRefrenceEmailAPI---catch', err);
        reject(err);
      })
      .finally(() => {
        
      });
  });
};

export const GetFeedbackFormAPI = async () => {
  return new Promise((resolve, reject) => {
    API.get(routes.getFeedbackForm)
      .then(e => {
        console.log('GetFeedbackFormAPI---then', e);
        resolve(e?.data?.data)
      })
      .catch(err => {
        console.log('GetFeedbackFormAPI---catch', err);
        reject(err);
      })
      .finally(() => {
        
      });
  });
};

export const ShareFeedbackAPI = async (payload) => {
  return new Promise((resolve, reject) => {
    API.post(routes.shareFeedback, payload)
      .then(e => {
        console.log('ShareFeedbackAPI---then', e);
        resolve(e)
      })
      .catch(err => {
        console.log('ShareFeedbackAPI---catch', err);
        reject(err);
      })
      .finally(() => {
        
      });
  });
};