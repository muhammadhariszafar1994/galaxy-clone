// store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: [],
  token: null,
  authId: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
      state.authId = action.payload?.id;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logOut: () => initialState,
  },
});

export const { setUserDetails, setToken, setLoading, logOut } = authSlice.actions;
export default authSlice.reducer;