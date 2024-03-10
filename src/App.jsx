import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard.jsx";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  async function searchMovies(title) {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }


  return (
    <div className="app">
      <h1>MoviesGalore</h1>

      <div className="search">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevents the default form submission behavior
            searchMovies(searchTerm);
          }}
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            {" "}
            {/* Changed image to button and added type="submit" */}
            <img src={SearchIcon} alt="search" />
          </button>
        </form>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;

