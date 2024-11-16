import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Key
const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

// Base URL for TMDB API
const BASE_URL = 'https://api.themoviedb.org/3/movie';

// Define async action to fetch popular movies
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await axios.get(
      `${BASE_URL}/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results; // Return the popular movie data
  }
);

// Define async action to fetch top-rated movies
export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRatedMovies',
  async () => {
    const response = await axios.get(
      `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results; // Return the top-rated movie data
  }
);

// Define async action to fetch upcoming movies
export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcomingMovies',
  async () => {
    const response = await axios.get(
      `${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results; // Return the upcoming movie data
  }
);

// Define async action to fetch movie details
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId) => {
    const response = await axios.get(
      `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    return response.data; // Return the movie details
  }
);

// Define async action to fetch movie cast details
export const fetchMovieCast = createAsyncThunk(
  'movies/fetchMovieCast',
  async (movieId) => {
    const response = await axios.get(
      `${BASE_URL}/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    );
    return response.data.cast; // Return the movie cast details
  }
);

// Define async action to search for movies
export const fetchSearchResults = createAsyncThunk(
  'movies/fetchSearchResults',
  async (query) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
    );
    return response.data.results; // Return search results
  }
);

// Initial state for movies
const initialState = {
  movies: [], // Holds the popular movies
  topRated: [], // Holds the top-rated movies
  upcoming: [], // Holds the upcoming movies
  selectedMovie: null, // Holds the selected movie details
  movieCast: [], // Holds the movie cast details
  searchResults: [], // Holds the search results
  status: 'idle', // To handle loading state
  error: null, // To handle errors
};

// Create the slice
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setTopRatedMovies: (state, action) => {
      state.topRated = action.payload;
    },
    setUpcomingMovies: (state, action) => {
      state.upcoming = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null; // Clear selected movie
      state.movieCast = []; // Clear movie cast
    },
    clearSearchResults: (state) => {
      state.searchResults = []; // Clear search results
    },
  },
  extraReducers: (builder) => {
    builder
      // For popular movies
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // For top-rated movies
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.topRated = action.payload;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // For upcoming movies
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.upcoming = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // For movie details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMovie = action.payload; // This includes the movie details
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // For movie cast details
      .addCase(fetchMovieCast.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieCast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieCast = action.payload; // Store the movie cast details
      })
      .addCase(fetchMovieCast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // For search results
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload; // Store the search results
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { setMovies, setTopRatedMovies, setUpcomingMovies, clearSelectedMovie, clearSearchResults } = moviesSlice.actions;

// Export the reducer
export default moviesSlice.reducer;
