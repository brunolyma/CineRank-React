import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import "./MovieCard.css";

const imageURL = import.meta.env.VITE_IMG;

export function MovieCard({ movie, showLink = true }) {
  return (
    <div className="movie-card">
      <abbr title={movie.original_title}>
        <img src={imageURL + movie.poster_path} alt={movie.title} />
      </abbr>
      <h2>{movie.title}</h2>
      <p>
        <abbr title={`${movie.vote_count} votos`}>
          <FaStar color="d39e00" /> {movie.vote_average}
        </abbr>
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
}
