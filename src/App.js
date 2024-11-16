// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TopRatedPage from './pages/TopRatedPage';
import UpcomingPage from './pages/UpcomingPage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Router >
      <Navbar />
      <Routes className="bg-[#151618]">
        <Route path="/" element={<HomePage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        {/* <Route path="/search/:query" element={<SearchPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
