import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopRatedMovies } from '../features/moviesSlice'; // Import the new action
import { Link } from 'react-router-dom'; // Import Link to navigate to details page

function TopRatedPage() {
  const dispatch = useDispatch();
  const { topRated, status, error } = useSelector((state) => state.movies); // Select topRated state

  useEffect(() => {
    dispatch(fetchTopRatedMovies()); // Fetch top-rated movies
  }, [dispatch]);

  // if (status === 'loading') return <section className="absolute text-center font-semibold text-white">Loading...</section>;
  // if (status === 'failed') return <section className="absolute text-center font-semibold text-white">{error}</section>;

  return (
    <div style={{height: "auto"}} className="mx-auto bg-[#151618] py-8">
      <h3 className="text-3xl font-bold text-white mb-4 ps-5">Top Rated Movies</h3>
      {status === 'loading' ? (
        // <div style={{height: "1000px"}} className="text-white  bg-[#151618] text-center">
        //   <p className='text-2xl '>Loading...</p>
        //   {/* You can replace this with a spinner component for better UX */}
        // </div>
        <div style={{ height: "full" }} className="bg-[#151618] flex justify-center items-center h-screen">
        <div  className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
      ) : error ? (
        <div style={{height: "1000px"}} className="text-white bg-[#151618] text-center pt-40">
          <p className='text-2xl '>Error fetching movies: {error}</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-14">
        {topRated.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="p-4 rounded">
            <div className="bg-[#151618] hover:shadow-lg transition-shadow duration-300">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-96 object-cover rounded mb-2"
              />
              <h3 className="text-center font-bold text-white mb-1">{movie.title}</h3>
              <p className="text-white text-sm text-center">Rating: {movie.vote_average}</p>
            </div>
          </Link>
        ))}
      </div>
       )}
         {/* Show 'No movies found' message when movies returns no results */}
         {topRated && topRated.length === 0 && status === 'succeeded' && (
        <div  style={{height: "1000px"}}  className="w-full h-full text-center py-14 text-3xl bg-[#151618] text-white">No Top Rated Movies found</div>
      )}
    </div>
     
  );
}

export default TopRatedPage;
