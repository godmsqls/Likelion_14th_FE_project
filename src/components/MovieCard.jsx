import { useState } from "react";
import MoviePoster from "./MoviePoster";

const StarIcon = ({ size = 14, color = "#F5C518" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const MovieCard = ({ movie, onWish, isWished }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "#242a33"
          : "#161B22",
        width: "430px",
        height: "210px",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "20px",
        padding: "24px 24px 0 24px",
        display: "flex",
        gap: "18px",
        alignItems: "flex-start",
        cursor: "pointer",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 30px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Title + Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <h3
            style={{
              margin: 0,
              fontSize: "20px",
              fontFamily: "'Noto Serif KR', 'Georgia', serif",
              fontWeight: "600",
              color: "#e8e0d0",
              letterSpacing: "0.3px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {movie.title}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
            <StarIcon />
            <span style={{ fontSize: "16px", fontWeight: "700", color: "#c9d1d9" }}>
              {movie.rating.toFixed(4)}
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            margin: "0 0 14px 0",
            fontSize: "16px",
            color: "#C9D1D9",
            lineHeight: "1.65",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {movie.description}
        </p>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <span style={{ fontSize: "16px", color: "#C9D1D9" }}>
            개봉: {movie.releaseDate}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWish(movie.title);
            }}
            style={{
              padding: "4px 16px",
              background: isWished ? "#F5C518" : "#51555A",
              border: `1px solid ${isWished ? "#F5C518" : "#51555A"}`,
              borderRadius: "5px",
              // color: isWished ? "#F5C518" : "#C9D1D9",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.15s ease",
              letterSpacing: "0.5px",
            }}
          >
            {isWished ? "Wished" : "Wish"}
          </button>
        </div>
      </div>

      {/* Poster */}
      <MoviePoster title={movie.title} posterUrl={movie.posterUrl} />
    </div>
  );
};

export default MovieCard;