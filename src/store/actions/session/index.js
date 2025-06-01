import API from '../../../utils/API';
import { routes } from '../../../utils/Constants';
import { reponseMapping } from '../../../utils/Helper';
import { setSessions } from '../../reducers/sessions';
import { store } from '../../store';

export const UserSessionsAPI = async () => {
  return new Promise((resolve, reject) => {
    API.get(routes.userSessions)
      .then(e => {
        const data = e?.data?.sessions;
        
        store.dispatch(setSessions(data));

        resolve(data)
      })
      .catch(err => {
        reject(err);
        console.log('userSessionsAPI err', err.response);
      })
      .finally(() => {
        
      });
  });
};