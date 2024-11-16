import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCast, clearSelectedMovie } from '../features/moviesSlice';

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.movies.selectedMovie);
  const movieCast = useSelector((state) => state.movies.movieCast || []);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
    dispatch(fetchMovieCast(movieId));

    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [dispatch, movieId]);

  if (status === 'loading') {
    return (
      <div style={{ height: "full" }} className="flex justify-center items-center bg-[#151618] h-screen">
        <div  className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div  className="flex bg-[#151618] justify-center text-2xl items-center h-screen text-white">
        Error fetching movie details: {error}
      </div>
    );
  }

  if (!selectedMovie) {
    return (
      <div  style={{height: "1000px"}} className="flex bg-[#151618] justify-center text-2xl items-center h-screen text-white">
        Movie not found.
      </div>
    );
  }

  console.log(selectedMovie)

  const posterPath = selectedMovie.poster_path
    ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image+Available';

    const formattedGenres = selectedMovie.genres
    ? selectedMovie.genres.map((genre) => genre.name).join(', ')
    : 'N/A';

  return (
    <div className="bg-[#151618] text-white min-h-screen p-8">
    
        <div className=" rounded-2xl  bg-[#1a1d24] p-6">
       
        <div className=" w-11/12 ps-10 flex flex-col md:flex-row flex-shrink-0">
  {/* Image Section */}
  <div  className=" w-1/3 flex-shrink-0">
    <img
      src={posterPath}
      alt={selectedMovie.title}
      className="w-1/2 me-10 object-cover rounded-lg shadow-lg"
    />
  </div>

  {/* Details Section */}
  <div className="w-3/4 md:pl-0 flex-shrink-0">
    <h1 className="text-5xl font-semibold mb-2">{selectedMovie.title}</h1>
    
    <p className="text-xl font-thin text-gray-400 mb-2">Rating: {selectedMovie.vote_average || 'N/A'}</p>
    
    <p className="text-sm text-gray-400 mb-4">
      {formattedGenres} 
    </p>
    
    <p className="text-sm text-gray-400 mb-4">
      Release Date: {selectedMovie.release_date || 'N/A'}
    </p>

    {/* Buttons */}
    <div className="flex space-x-4 mt-6">
      {selectedMovie.videos && selectedMovie.videos.results && selectedMovie.videos.results.length > 0 ? (
        <a
          href={`https://www.youtube.com/watch?v=${selectedMovie.videos.results[0].key}`}
          target="_blank"
          rel="noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Watch Trailer
        </a>
      ) : (
        <span className="text-gray-500">Trailer not available</span>
      )}
      
     
    </div>
    <div className="flex space-x-4 mt-6">
    <a
        href="/"
        className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
      >
        Back to Home
      </a>
    </div>
  </div>

</div>


           <div className=" mt-7 px-10">
            <h2 className='text-3xl font-normal text-white mb-2'>Overview</h2>
            <p className="text-gray-300 mb-4">{selectedMovie.overview || 'No description available.'}</p>
            </div>
            
            </div>

          <div className="mt-8">
  <h2 className="text-3xl font-normal text-white mb-4">Cast</h2>
  <div className="flex overflow-x-auto space-x-4">
    {movieCast.length > 0 ? (
      movieCast.slice(0, 6).map((actor) => ( // Limit to 6 actors
        <div key={actor.id} className="w-full object-cover">
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : 'https://via.placeholder.com/150x225?text=No+Image'
            }
            alt={actor.name}
            className="w-full  shadow-md object-cover"
          />
          <p className="text-center text-sm text-gray-300 mt-2">{actor.name}</p>
          <p className="text-center text-xs text-gray-500">{actor.character}</p>
          {/* <p className="text-center text-xs text-gray-500">{selectedMovie.title}</p> */}
        </div>
      ))
    ) : (
      <p className="text-gray-400">No cast information available.</p>
    )}
  </div>
      </div>
       
      </div>
   
  );
};

export default MovieDetailPage;
