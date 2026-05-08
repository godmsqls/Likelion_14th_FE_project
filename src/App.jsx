import { useState, useMemo } from "react";
import DropDown from "./components/DropDown";
import MovieCard from "./components/MovieCard";
import WishListPanel from "./components/WishListPanel";
import Footer from "./components/Footer";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";

// ─── Dummy Data ────────────────────────────────────────────────────────────────
// TODO: Replace with API call, e.g. fetch('/api/movies')
const DUMMY_MOVIES = [
  {
    id: 1,
    title: "인터스텔라",
    rating: 9.1,
    description:
      "우주를 배경으로 한 SF 대작. 인류의 생존을 위해 웜홀을 통해 다른 은하계로 떠나는 탐험대의 이야기로, 시간과 공간의 경계를 넘는 감동적인 여정을 그립니다.",
    releaseDate: "2026-03-03",
    genre: "SF",
    posterUrl: null,
  },
  {
    id: 2,
    title: "기생충",
    rating: 8.9,
    description:
      "봉준호 감독의 칸 영화제 황금종려상 수상작. 두 가족 사이에서 벌어지는 예상치 못한 사건들을 통해 계층 간의 갈등을 날카롭게 묘사합니다.",
    releaseDate: "2026-03-15",
    genre: "드라마",
    posterUrl: null,
  },
  {
    id: 3,
    title: "어벤져스: 엔드게임",
    rating: 8.5,
    description:
      "마블 시네마틱 유니버스의 역대급 피날레. 타노스에 의해 절반이 사라진 세계를 되돌리기 위한 어벤져스의 마지막 사투를 그린 블록버스터 대작입니다.",
    releaseDate: "2026-04-01",
    genre: "액션",
    posterUrl: null,
  },
  {
    id: 4,
    title: "라라랜드",
    rating: 8.3,
    description:
      "꿈을 좇는 두 젊은이의 아름다운 사랑 이야기. 재즈 뮤지션과 배우 지망생이 LA에서 만나 사랑에 빠지지만 각자의 꿈 앞에서 갈림길에 서게 됩니다.",
    releaseDate: "2026-04-10",
    genre: "뮤지컬",
    posterUrl: null,
  },
  {
    id: 5,
    title: "명량",
    rating: 7.9,
    description:
      "이순신 장군의 명량 해전을 배경으로 한 역사 대작. 단 12척의 배로 330척의 왜군 함대에 맞선 불굴의 의지와 전략을 숨막히게 그려냅니다.",
    releaseDate: "2026-04-20",
    genre: "사극",
    posterUrl: null,
  },
  {
    id: 6,
    title: "극한직업",
    rating: 7.6,
    description:
      "마약 밀매 조직을 소탕하기 위해 치킨집 위장 창업에 나선 마약반 형사들의 이야기. 예상치 못한 흥행 대박으로 웃음과 반전이 넘칩니다.",
    releaseDate: "2026-05-05",
    genre: "코미디",
    posterUrl: null,
  },
];

// TODO: Replace with API call, e.g. fetch('/api/wishlist')
const INITIAL_WISHLIST = [
  // "The Maze Runner 1",
  // "The Maze Runner 2",
  // "The Maze Runner 3",
  // "The Incredibles",
  // "Superman Returns",
  // "The Matrix",
];

const GENRES = ["전체", "SF", "드라마", "액션", "뮤지컬", "사극", "코미디"];
//const SORT_OPTIONS = ["최신순", "평점순", "제목순"];
const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "평점순" , value: "rating"},
  { label: "제목순", value: "title" },
];

// ─── Sub Components ────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MenuIcon = ({ isOpen }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {isOpen ? (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ) : (
      <>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    )}
  </svg>
);

// Movie poster placeholder with film-strip aesthetic
// const MoviePoster = ({ title, posterUrl }) => {
//   if (posterUrl) {
//     return (
//       <img
//         src={posterUrl}
//         alt={title}
//         style={{
//           width: "100px",
//           height: "130px",
//           objectFit: "cover",
//           borderRadius: "6px",
//           flexShrink: 0,
//         }}
//       />
//     );
//   }

//   const initials = title
//     .split(" ")
//     .map((w) => w[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

//   const hue = title.charCodeAt(0) * 17 % 360;

//   return (
//     <div
//       style={{
//         width: "125px",
//         height: "160px",
//         borderRadius: "15px",
//         background: `linear-gradient(145deg, hsl(${hue},30%,20%), hsl(${hue},20%,12%))`,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         flexShrink: 0,
//         border: "1px solid rgba(255,255,255,0.08)",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Film strip holes */}
//       {[12, 38, 64, 90, 116].map((top) => (
//         <div
//           key={top}
//           style={{
//             position: "absolute",
//             left: "5px",
//             top: `${top}px`,
//             width: "8px",
//             height: "8px",
//             borderRadius: "2px",
//             background: "rgba(0,0,0,0.5)",
//             border: "1px solid rgba(255,255,255,0.06)",
//           }}
//         />
//       ))}
//       {[12, 38, 64, 90, 116].map((top) => (
//         <div
//           key={top}
//           style={{
//             position: "absolute",
//             right: "5px",
//             top: `${top}px`,
//             width: "8px",
//             height: "8px",
//             borderRadius: "2px",
//             background: "rgba(0,0,0,0.5)",
//             border: "1px solid rgba(255,255,255,0.06)",
//           }}
//         />
//       ))}
//       <span style={{ fontSize: "22px", fontWeight: "700", color: `hsl(${hue},40%,60%)`, letterSpacing: "1px", zIndex: 1 }}>
//         {initials}
//       </span>
//     </div>
//   );
// };

// Movie Card Component
// const MovieCard = ({ movie, onWish, isWished }) => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: hovered
//           ? "#242a33"
//           : "#161B22",
//         border: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)"}`,
//         borderRadius: "20px",
//         padding: "24px",
//         display: "flex",
//         gap: "18px",
//         alignItems: "flex-start",
//         cursor: "pointer",
//         transition: "all 0.2s ease",
//         transform: hovered ? "translateY(-2px)" : "translateY(0)",
//         boxShadow: hovered ? "0 8px 30px rgba(0,0,0,0.4)" : "none",
//       }}
//     >
//       <div style={{ flex: 1, minWidth: 0 }}>
//         {/* Title + Rating */}
//         <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
//           <h3
//             style={{
//               margin: 0,
//               fontSize: "20px",
//               fontFamily: "'Noto Serif KR', 'Georgia', serif",
//               fontWeight: "600",
//               color: "#e8e0d0",
//               letterSpacing: "0.3px",
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             {movie.title}
//           </h3>
//           <div style={{ display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
//             <StarIcon />
//             <span style={{ fontSize: "16px", fontWeight: "700", color: "#c9d1d9" }}>
//               {movie.rating.toFixed(4)}
//             </span>
//           </div>
//         </div>

//         {/* Description */}
//         <p
//           style={{
//             margin: "0 0 14px 0",
//             fontSize: "16px",
//             color: "#C9D1D9",
//             lineHeight: "1.65",
//             display: "-webkit-box",
//             WebkitLineClamp: 3,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//           }}
//         >
//           {movie.description}
//         </p>

//         {/* Footer */}
//         <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
//           <span style={{ fontSize: "16px", color: "#C9D1D9" }}>
//             개봉: {movie.releaseDate}
//           </span>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onWish(movie.title);
//             }}
//             style={{
//               padding: "4px 16px",
//               background: isWished ? "#F5C518" : "#51555A",
//               border: `1px solid ${isWished ? "#F5C518" : "#51555A"}`,
//               borderRadius: "5px",
//               // color: isWished ? "#F5C518" : "#C9D1D9",
//               fontSize: "16px",
//               cursor: "pointer",
//               transition: "all 0.15s ease",
//               letterSpacing: "0.5px",
//             }}
//           >
//             {isWished ? "Wished" : "Wish"}
//           </button>
//         </div>
//       </div>

//       {/* Poster */}
//       <MoviePoster title={movie.title} posterUrl={movie.posterUrl} />
//     </div>
//   );
// };

// Dropdown Component
// const Dropdown = ({ label, options, selected, onSelect }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div style={{ position: "relative" }}>
//       <button
//         onClick={() => setOpen(!open)}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           width: "131px",
//           gap: "8px",
//           padding: "11px 24px",
//           background: "transparent",
//           border: "1px solid rgba(220,210,195,0.4)",
//           borderRadius: "25px",
//           color: "rgba(220,210,195,0.9)",
//           fontSize: "24px",
//           fontFamily: "Serif-Regular",
//           cursor: "pointer",
//           transition: "all 0.15s",
//           whiteSpace: "nowrap",
//         }}
//       >
//         {selected || label}
//         <ChevronIcon/>
//       </button>

//       {open && (
//         <div
//           style={{
//             position: "absolute",
//             top: "calc(100% + 6px)",
//             left: 0,
//             background: "#1e1e1e",
//             border: "1px solid rgba(255,255,255,0.12)",
//             borderRadius: "10px",
//             overflow: "hidden",
//             zIndex: 100,
//             minWidth: "130px",
//             boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
//           }}
//         >
//           {options.map((opt) => {
//             const val = typeof opt === "string" ? opt : opt.label;
//             const key = typeof opt === "string" ? opt : opt.value;
//             return (
//               <div
//                 key={key}
//                 onClick={() => {
//                   onSelect(key);
//                   setOpen(false);
//                 }}
//                 style={{
//                   padding: "10px 16px",
//                   fontSize: "16px",
//                   color: selected === key ? "#F5C518" : "rgba(220,210,195,0.8)",
//                   cursor: "pointer",
//                   background: selected === key ? "rgba(245,197,24,0.08)" : "transparent",
//                   fontFamily: "'Serif-Regular','Noto Sans KR', sans-serif",
//                   transition: "background 0.1s",
//                 }}
//                 onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.06)")}
//                 onMouseLeave={(e) => (e.target.style.background = selected === key ? "rgba(245,197,24,0.08)" : "transparent")}
//               >
//                 {val}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// Wish List Panel
// const WishListPanel = ({ wishlist, onRemove }) => (
//   <aside
//     style={{
//       width: "360px",
//       flexShrink: 0,
//       background: "rgba(255,255,255,0.03)",
//       border: "1px solid rgba(255,255,255,0.07)",
//       borderRadius: "14px",
//       padding: "24px 20px",
//       alignSelf: "flex-start",
//       position: "sticky",
//       top: "20px",
//     }}
//   >
//     <h2
//       style={{
//         margin: "0 0 20px 0",
//         fontSize: "24px",
//         fontFamily: "'Serif-Regular','Noto Serif KR', 'Georgia', serif",
//         fontWeight: "700",
//         color: "#c9d1d9",
//         letterSpacing: "0.5px",
//       }}
//     >
//       My Wish List
//     </h2>

//     <div style={{ display: "flex", flexDirection: "column", gap: "2px", minHeight: "480px" }}>
//       {wishlist.length === 0 ? (
//         <p style={{ fontSize: "16px", color: "rgba(200,190,175,0.4)", fontFamily: "'Serif-Regular', sans-serif" }}>
//           위시리스트가 비어 있어요
//         </p>
//       ) : (
//         wishlist.map((title, i) => (
//           <div
//             key={i}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               padding: "10px 12px",
//               borderRadius: "8px",
//               fontSize: "16px",
//               color: "#C9D1D9",
//               fontFamily: "'Serif-Regular', sans-serif",
//               transition: "background 0.15s",
//               cursor: "default",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
//             onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
//           >
//             <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</span>
//             <button
//               onClick={() => onRemove(title)}
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "rgba(200,190,175,0.35)",
//                 cursor: "pointer",
//                 fontSize: "16px",
//                 padding: "0 0 0 8px",
//                 lineHeight: 1,
//                 flexShrink: 0,
//                 transition: "color 0.15s",
//               }}
//               onMouseEnter={(e) => (e.target.style.color = "rgba(220,80,60,0.8)")}
//               onMouseLeave={(e) => (e.target.style.color = "rgba(200,190,175,0.35)")}
//             >
//               ×
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   </aside>
// );

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("전체");
  const [sortBy, setSortBy] = useState("latest");
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);
  const [menuOpen, setMenuOpen] = useState(false);

  // TODO: Replace DUMMY_MOVIES with fetched data from API
  const movies = DUMMY_MOVIES;

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
      );
    }

    if (selectedGenre !== "전체") {
      result = result.filter((m) => m.genre === selectedGenre);
    }

    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "title") result.sort((a, b) => a.title.localeCompare(b.title, "ko"));
    else result.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

    return result;
  }, [movies, searchQuery, selectedGenre, sortBy]);

  const handleWish = (title) => {
    setWishlist((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleRemoveWish = (title) => {
    setWishlist((prev) => prev.filter((t) => t !== title));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D1117",
        color: "#C9D1D9",
        fontFamily: "'Serif-Regular', sans-serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&family=Noto+Sans+KR:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>

      {/* Header */}
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        menuOpen={menuOpen}
        setMenuOpen={menuOpen}
        />

      {/* Filter Bar */}
      <FilterBar
        genres={GENRES}
        sortOptions={SORT_OPTIONS}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "40px",
          //padding: "28px 40px 60px",
          padding: "40px",
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          boxSizing: "border-box"
        }}
      >
        {/* Movie Grid */}
        <main style={{ flex: 1, minWidth: 0}}>
          {filteredMovies.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                // padding: "80px 40px",
                color: "rgba(210, 43, 132, 0.4)",
                fontSize: "15px",
              }}
            >
              검색 결과가 없습니다.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "30px",
              }}
            >
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onWish={handleWish}
                  isWished={wishlist.includes(movie.title)}
                />
              ))}
            </div>
          )}
        </main>

        {/* Wish List Sidebar */}
        <div style={{width: "360px", flexShrink: 0}}>
          <WishListPanel wishlist={wishlist} onRemove={handleRemoveWish} />          
        </div>

      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}