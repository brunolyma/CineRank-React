import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MovieCard } from "../components/MovieCard";
import "./MoviesGrid.css";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

export function Search() {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  async function seekedMovie(url) {
    const results = await fetch(url);
    const data = await results.json();

    setMovies(data.results);
  }

  useEffect(() => {
    const seekedMovieWithQueryURL = `${searchURL}?${apiKey}&query=${query.replace(
      / /g,
      "+"
    )}&language=pt-BR`;

    seekedMovie(seekedMovieWithQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}...</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Nenhum resultado encotrado</p>}
        {movies.map((movie) => <MovieCard key={movie.id} movie={movie} /> )}
      </div>
    </div>
  );
}
