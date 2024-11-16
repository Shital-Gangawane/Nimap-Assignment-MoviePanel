// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
// import moviesReducer from '../features/moviesSlice'; // Use correct relative path
import moviesReducer from '../features/moviesSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer, // Add the movies slice reducer
  },
});

export default store;
