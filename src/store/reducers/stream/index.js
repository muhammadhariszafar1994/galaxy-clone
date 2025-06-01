import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  query: null,
  response: null,
  references: [],
  followUp: {},
  documents: []
};

const streamSlice = createSlice({
  name: 'stream',
  initialState,
  reducers: {
    setQuery: (state, action) => void(state.query = action.payload),
    setStream: (state, action) => {
      state.response = action.payload?.response;
      state.references = action.payload?.references;
      state.followUp = action.payload?.followUp;
    },
    setDocument: (state, action) => {
      state.documents.push(action.payload);
    },
    resetDocument: (state) => void(state.documents = []),
    resetStreamReponse: (state) => {
      state.response = null;
    },
    resetStream: () => initialState
  },
});

export const { setQuery, setStream, setDocument, resetDocument, resetStreamReponse, resetStream } = streamSlice.actions;

export default streamSlice.reducer;