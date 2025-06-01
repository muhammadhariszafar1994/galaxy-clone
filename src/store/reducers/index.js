import {combineReducers} from '@reduxjs/toolkit';
import AuthReducer from './auth';
import StreamReducer from './stream';
import PopupsReducer from './popups';
import SessionsReducer from './sessions';

const Reducers = combineReducers({
  auth: AuthReducer,
  stream: StreamReducer,
  popups: PopupsReducer,
  sessions: SessionsReducer
});

export default Reducers;
