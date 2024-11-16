import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../features/moviesSlice';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [dispatch, status]);

  const handleMovieClick = (e, id) => {
    e.preventDefault(); // Prevent the default anchor link behavior
    navigate(`/movie/${id}`); // Navigate programmatically
  };

  return (
    <div style={{height: "auto"}} className="mx-auto py-8 bg-[#151618]">
      <h3 className="text-3xl ps-5 text-white font-bold mb-4">Popular Movies</h3>
      {status === 'loading' ? (
        // <div style={{height: "1000px"}} className="text-white  bg-[#151618] text-center">
        //   <p className='text-2xl '>Loading...</p>
        //   {/* You can replace this with a spinner component for better UX */}
        // </div>
        <div style={{ height: "full" }} className="bg-[#151618] flex justify-center items-center h-screen">
        <div  className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
      ) : error ? (
        <div style={{height: "1000px"}} className="text-white bg-[#151618] text-center pt-40 mx-auto">
          <p className='text-2xl '>Error fetching movies: {error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-14">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="p-4 rounded" 
              onClick={(e) => handleMovieClick(e, movie.id)} // Handle click event
              role="button" // Indicates that this div is clickable
              tabIndex={0} // Allows the div to be focusable for accessibility
            >
              <div className="bg-[#151618] hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title} 
                  className="w-full h-96 object-cover rounded mb-2" 
                />
                <h3 className="text-center font-bold text-white mb-1">{movie.title}</h3>
                <p className="text-white text-sm text-center">Rating: {movie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
      )}
        {/* Show 'No movies found' message when movies returns no results */}
        {movies && movies.length === 0 && status === 'succeeded' && (
        <div  style={{height: "1000px"}}  className="w-full h-full text-center py-14 text-3xl bg-[#151618] text-white">No Movies found</div>
      )}
    </div>
  );
};

export default HomePage;