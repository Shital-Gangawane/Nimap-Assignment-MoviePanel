// src/components/SearchPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults, clearSearchResults } from '../features/moviesSlice';

function SearchPage() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { searchResults, status, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (query) {
      dispatch(fetchSearchResults(query)); // Fetch search results when query changes
    } else {
      dispatch(clearSearchResults()); // Clear search results when query is empty
    }
  }, [dispatch, query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value); // Update search query
  };

  if (status === 'loading') return <div className="absolute bg-[#151618] text-center text-white">Loading...</div>;
  if (status === 'failed') return <div className="absolute bg-[#151618] text-center text-white">Error: {error}</div>;

  return (
    <div className="mx-auto py-8 bg-[#151618]">
      <h3 className="text-3xl text-white font-bold mb-4">Search Results</h3>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={handleSearchChange}
        className="p-1.5 rounded bg-white text-gray-400 mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-14">
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <div key={movie.id} className="p-4 rounded">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-96 object-cover rounded mb-2"
              />
              <h3 className="text-center font-bold text-white mb-1">{movie.title}</h3>
            </div>
          ))
        ) : (
          <div className="text-center text-white">No results found</div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
