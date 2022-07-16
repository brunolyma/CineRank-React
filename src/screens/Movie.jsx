import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { MovieCard } from "../components/MovieCard";

import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";
import "./Movie.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  async function getMovie(url) {
    const result = await fetch(url);
    const data = await result.json();

    setMovie(data);
  }

  useEffect(() => {
    const getMovieByIdURL = `${moviesURL}${id}?${apiKey}&language=pt-BR`;

    getMovie(getMovieByIdURL);
  }, []);

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="movie-page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline"><i>{movie.tagline}</i></p>
          <div id="infos">
              <div className="info">
                <h3>
                  <BsWallet2 /> Orçamento:
                </h3>
                <p>{formatCurrency(movie.budget)}</p>
              </div>
              <div className="info">
                <h3>
                  <BsGraphUp /> Receita:
                </h3>
                <p>{formatCurrency(movie.revenue)}</p>
              </div>
              <div className="info">
                <h3>
                  <BsHourglassSplit /> Duração:
                </h3>
                <p>{movie.runtime} minutos</p>
              </div>
              <div className="info">
                <h3>
                  <BsFillFileEarmarkTextFill /> Descrição:
                </h3>
                <p>{movie.overview}</p>
              </div>
          </div>
        </>
      )}
    </div>
  );
}
