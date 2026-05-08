import React from "react";

// 헤더에서 내부적으로 사용하는 아이콘 컴포넌트
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

const Header = ({ searchQuery, setSearchQuery, menuOpen, setMenuOpen }) => {
  return (
    <header
      style={{
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        position: "sticky",
        top: 0,
        background: "#0D1117",
        backdropFilter: "blur(12px)",
        zIndex: 50,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "24px",
          fontFamily: "'Serif-Bold', serif",
          fontWeight: "700",
          letterSpacing: "0.5px",
        }}
      >
        KWU LIKELION THEATER
      </h1>

      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderBottom: "1px solid #C9D1D9",
          padding: "8px 14px",
          width: "357px",
          fontFamily: "Serif-Regular",
        }}
      >
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            color: "#C9D1D9",
            fontSize: "20px",
            fontFamily: "Serif-Regular",
          }}
        />
        <SearchIcon />
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: "none",
          border: "none",
          color: "rgba(220,210,195,0.7)",
          cursor: "pointer",
          padding: "4px",
          display: "flex",
        }}
      >
        <MenuIcon isOpen={menuOpen} />
      </button>
    </header>
  );
};

export default Header;