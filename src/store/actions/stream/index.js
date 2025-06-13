import { Alert } from 'react-native';
import API from '../../../utils/API';
import { routes } from '../../../utils/Constants';
import { hasMultipleReferencesWithDifferentDocuments, reponseMapping } from '../../../utils/Helper';
import { resetDocument, setDocument, setStream } from '../../reducers/stream';
import { store } from '../../store';

export const StreamResponseAPI = async (payload) => {
  return new Promise((resolve, reject) => {
    API.post(routes.streamResponse, payload)
    .then(e => {
      const data = e?.data;
      console.log('data', data);
      
      const _responseMapping = reponseMapping(data);
      const references = _responseMapping?.references;

      if(hasMultipleReferencesWithDifferentDocuments(references)) {
        _responseMapping.references?.forEach((item) => {
          const params = {
            search: item?.documentName
          };
          GetDocumentAPI({params});
        });
      }
      
      console.log('_responseMapping', _responseMapping)
      store.dispatch(setStream(_responseMapping));

      resolve(e);
    })
    .catch(err => {
      console.log('StreamResponseAPI err', err);
      reject(e);
    })
    .finally(() => {
      
    });
  })
};

export const GetDocumentAPI = async ({
  params
}) => {
  API.get(routes.getDocument(params.search))
    .then(e => {
      const data = e?.data?.data;
      store.dispatch(setDocument(data));
    })
    .catch(err => {
      console.log('StreamResponseAPI err', err.response);
    })
    .finally(() => {
      
    });
};