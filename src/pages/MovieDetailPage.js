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
      <div className="flex justify-center items-center bg-[#151618] h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-[#151618] h-screen text-2xl text-white">
        Error fetching movie details: {error}
      </div>
    );
  }

  if (!selectedMovie) {
    return (
      <div className="flex justify-center items-center bg-[#151618] h-screen text-2xl text-white">
        Movie not found.
      </div>
    );
  }

  const posterPath = selectedMovie.poster_path
    ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image+Available';

  const formattedGenres = selectedMovie.genres
    ? selectedMovie.genres.map((genre) => genre.name).join(', ')
    : 'N/A';

  return (
    <div className="bg-[#151618] text-white min-h-screen p-6 md:p-12">
      {/* Movie Details Section */}
      <div className="flex flex-col md:flex-row bg-[#1a1d24] p-6 rounded-2xl">
        {/* Poster Image */}
        <div className="md:w-1/3 mb-6 md:mb-0 flex-shrink-0">
          <img
            src={posterPath}
            alt={selectedMovie.title}
            className="w-full md:w-4/5 lg:w-full mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="md:w-2/3 md:pl-10">
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">{selectedMovie.title}</h1>
          <p className="text-lg md:text-xl text-gray-400 mb-2">Rating: {selectedMovie.vote_average || 'N/A'}</p>
          <p className="text-sm md:text-base text-gray-400 mb-4">{formattedGenres}</p>
          <p className="text-sm md:text-base text-gray-400 mb-4">Release Date: {selectedMovie.release_date || 'N/A'}</p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 mt-6 space-y-3 sm:space-y-0">
            {selectedMovie.videos?.results?.length > 0 ? (
              <a
                href={`https://www.youtube.com/watch?v=${selectedMovie.videos.results[0].key}`}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
              >
                Watch Trailer
              </a>
            ) : (
              <span className="text-gray-500">Trailer not available</span>
            )}
            <a
              href="/"
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded text-center"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="mt-10">
        <h2 className="text-2xl md:text-3xl font-normal mb-4">Overview</h2>
        <p className="text-gray-300 text-sm md:text-base">{selectedMovie.overview || 'No description available.'}</p>
      </div>

      {/* Cast Section */}
      <div className="mt-10">
        <h2 className="text-2xl md:text-3xl font-normal mb-4">Cast</h2>
        <div className="flex overflow-x-auto space-x-4">
          {movieCast.length > 0 ? (
            movieCast.slice(0, 6).map((actor) => (
              <div key={actor.id} className="w-36 flex-shrink-0">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : 'https://via.placeholder.com/150x225?text=No+Image'
                  }
                  alt={actor.name}
                  className="w-full h-52 object-cover rounded-lg shadow-md"
                />
                <p className="text-center text-sm text-gray-300 mt-2">{actor.name}</p>
                <p className="text-center text-xs text-gray-500">{actor.character}</p>
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
