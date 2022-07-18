import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";
import "./Navbar.css";

export function Navbar() {
  function getWindowSize() {
    const { innerWidth: width } = window;
    return {
      width,
    };
  }

  function windowSize() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowSize()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowSize());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions.width;
  }

  const [search, setSearch] = useState("");
  const [isResponsive, setIsResponsive] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!search) {
      if (isResponsive) {
        return setIsResponsive(false);
      } else {
        return setIsResponsive(true);
      }
    }

    navigate(`/search?q=${search}`);
    setSearch("");
    setIsResponsive(false);
  }

  return (
    <nav
      id="navbar"
      className={
        windowSize() < 700 && isResponsive ? "responsive" : ""
      }
    >
      <h2>
        <Link to="/">
          <BiCameraMovie />
          CineRank
        </Link>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>
    </nav>
  );
}
