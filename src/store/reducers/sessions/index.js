import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    sessions: [],
    sessionHistory: {}
};

const sessionSlice = createSlice({
    name: 'sessions',
    initialState,
    reducers: {
        setSessions: (state, action) => void(state.sessions = action.payload),
        setSessionHistory: (state, action) => void(state.sessionHistory = action.payload),
        resetSessions: (state) => void(state.sessions = []),
        resetSessionHistory: (state) => void(state.sessionHistory = {}),
    },
});

export const { setSessions, setSessionHistory, resetSessions, resetSessionHistory } = sessionSlice.actions;

export default sessionSlice.reducer;