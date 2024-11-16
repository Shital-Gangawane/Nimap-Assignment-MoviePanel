import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults, clearSearchResults } from '../features/moviesSlice';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchResults, status, error } = useSelector((state) => state.movies);

  // Fetch search results when the query changes
  useEffect(() => {
    if (query.trim()) {
      dispatch(fetchSearchResults(query)); // Trigger search
    } else {
      dispatch(clearSearchResults());
    }
  }, [dispatch, query]);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (query.trim()) {
      navigate(`/search/${query}`); // Navigate to the search results page
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`); // Navigate to the movie detail page
    setQuery(''); // Clear the search query
    dispatch(clearSearchResults()); // Clear the previous search results
  };

  // Navigate to the homepage if no search results are found
  useEffect(() => {
    if (query && searchResults.length === 0 && status === 'succeeded') {
      navigate('/'); // Redirect to the homepage
    }
  }, [query, searchResults, status, navigate]);

  return (
    <div>
      <nav className="navbar bg-[#2c2d30] p-3 text-gray-400">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-gray-200 text-xl md:text-2xl font-bold hover:text-gray-200"
          >
            MovieDb
          </Link>
          {/* Links and Search Bar */}
          <div className="w-full md:w-auto flex flex-col md:flex-row md:items-center md:space-x-5 text-lg text-gray-200">
            {/* Navigation Links */}
            <div className="flex flex-col md:flex-row md:space-x-5 space-y-2 md:space-y-0">
              <Link to="/" className="hover:text-blue-500">
                Popular
              </Link>
              <Link to="/top-rated" className="hover:text-blue-500">
                Top-Rated
              </Link>
              <Link to="/upcoming" className="hover:text-blue-500">
                Upcoming
              </Link>
            </div>
            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="flex items-center space-x-2 mt-2 md:mt-0"
            >
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-1.5 w-full md:w-40 lg:w-64 rounded bg-white text-gray-700 focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 bg-[#525355] text-gray-300 rounded hover:bg-[#404142]"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Show Search Results */}
      {query && searchResults.length > 0 && (
        <div style={{ height: 'auto' }} className="mx-auto py-8 bg-[#151618]">
          <h3 className="text-2xl md:text-3xl text-white font-bold mb-4 px-4">
            Search Results
          </h3>
          {status === 'loading' ? (
            <div className="flex justify-center items-center h-screen bg-[#151618]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
            </div>
          ) : error ? (
            <div
              style={{ height: '1200px' }}
              className="text-white bg-[#151618] text-center pt-40"
            >
              <p className="text-2xl">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
              {searchResults.map((movie) => (
                <div
                  key={movie.id}
                  className="p-4 rounded hover:scale-105 transition-transform duration-300"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <div className="bg-[#151618] hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-60 md:h-72 lg:h-80 object-cover rounded mb-2"
                    />
                    <h3 className="text-center font-bold text-white mb-1">
                      {movie.title}
                    </h3>
                    <p className="text-white text-sm text-center">
                      Rating: {movie.vote_average}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Show 'No results found' Message */}
      {query && searchResults.length === 0 && status === 'succeeded' && (
        <div
          style={{ height: '1000px' }}
          className="w-full h-full text-center py-14 text-2xl md:text-3xl bg-[#151618] text-white"
        >
          No results found
        </div>
      )}
    </div>
  );
}

export default Navbar;
