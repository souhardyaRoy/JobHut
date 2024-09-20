// src/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const jdSlice = createSlice({
  name: 'counter',
  initialState: "",
  reducers: {
    addJobDescription: (state,actions) => {
     return actions.payload
    }
  },
});

export const { addJobDescription } = jdSlice.actions;
export default jdSlice.reducer;
