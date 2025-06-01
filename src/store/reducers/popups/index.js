import { createSlice } from '@reduxjs/toolkit';
import { store } from '../../store';
import { logOut } from '../auth';

const initialState = {
  confirmSignOutVisibility: false,
  reportToManagement: false,
  shareFeedback: false,
  sendEmailSuccessfully: false,
  shareFeedbackThankYou: false,
  reference: false
};

const popupsSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    confirmSignOutVisibilityAction: (state, action) => {
      state.confirmSignOutVisibility = action.payload;
    },
    reportToManagementAction: (state, action) => {
      state.reportToManagement = action.payload;
    },
    shareFeedbackAction: (state, action) => {
      state.shareFeedback = action.payload;
    },
    sendEmailSuccessfullyAction: (state, action) => {
      state.sendEmailSuccessfully = action.payload;
    },
    shareFeedbackThankYouAction: (state, action) => {
      state.shareFeedbackThankYou = action.payload;
    },
    referenceAction: (state, action) => {
      state.reference = action.payload;
    },
    resetPopups: () => initialState
  },
});

export const { 
  confirmSignOutVisibilityAction, 
  reportToManagementAction, 
  shareFeedbackAction, 
  sendEmailSuccessfullyAction, 
  shareFeedbackThankYouAction,
  referenceAction,
  resetPopups 
} = popupsSlice.actions;

export default popupsSlice.reducer;