// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import jobDescriptionSlice from '../slices/jobDescription.slice';
const store = configureStore({
  reducer: {
    jobDescriptionSlice,
  },
});

export default store;
