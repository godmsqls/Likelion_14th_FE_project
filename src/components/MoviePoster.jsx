const MoviePoster = ({ title, posterUrl }) => {
  if (posterUrl) {
    return (
      <img
        src={posterUrl}
        alt={title}
        style={{
          width: "100px",
          height: "130px",
          objectFit: "cover",
          borderRadius: "6px",
          flexShrink: 0,
        }}
      />
    );
  }

  const initials = title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const hue = title.charCodeAt(0) * 17 % 360;

  return (
    <div
      style={{
        width: "125px",
        height: "160px",
        borderRadius: "15px",
        background: `linear-gradient(145deg, hsl(${hue},30%,20%), hsl(${hue},20%,12%))`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        border: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Film strip holes */}
      {[12, 38, 64, 90, 116].map((top) => (
        <div
          key={top}
          style={{
            position: "absolute",
            left: "5px",
            top: `${top}px`,
            width: "8px",
            height: "8px",
            borderRadius: "2px",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />
      ))}
      {[12, 38, 64, 90, 116].map((top) => (
        <div
          key={top}
          style={{
            position: "absolute",
            right: "5px",
            top: `${top}px`,
            width: "8px",
            height: "8px",
            borderRadius: "2px",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />
      ))}
      <span style={{ fontSize: "22px", fontWeight: "700", color: `hsl(${hue},40%,60%)`, letterSpacing: "1px", zIndex: 1 }}>
        {initials}
      </span>
    </div>
  );
};

export default MoviePoster;