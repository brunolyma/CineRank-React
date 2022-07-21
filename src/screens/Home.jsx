import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";

import { FaSpinner } from "react-icons/fa";

import "./MoviesGrid.css"

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export function Home() {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    return setTopMovies(data.results);
  };

  useEffect(() => {
    const topMoviesURL = `${moviesURL}top_rated?${apiKey}&language=pt-BR`;

    getTopRatedMovies(topMoviesURL);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores Avaliados:</h2>
      <div className="movies-container">
        {topMovies === 0 && <p><FaSpinner/></p>}
        {topMovies.length > 0 && topMovies.map((movie) => {
          if (movie.vote_count > 2500) {
            return <MovieCard key={movie.id} movie={movie} />
          }
        })}
      </div>
    </div>
  );
}
