const WishListPanel = ({ wishlist, onRemove }) => (
  <aside
    style={{
      width: "360px",
      height: "720px",
      flexShrink: 0,
      background: "#1E2126",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "15px",
      padding: "24px 20px",
      position: "sticky",
      top: "20px",
    }}
  >
    <h2
      style={{
        margin: "0 0 20px 0",
        fontSize: "24px",
        fontFamily: "'Serif-Regular','Noto Serif KR', 'Georgia', serif",
        fontWeight: "700",
        color: "#c9d1d9",
        letterSpacing: "0.5px",
      }}
    >
      My Wish List
    </h2>

    <div style={{ display: "flex", flexDirection: "column", gap: "15px", minHeight: "480px" }}>
      {wishlist.length === 0 ? (
        <p style={{ fontSize: "16px", color: "rgba(200,190,175,0.4)", fontFamily: "'Serif-Regular', sans-serif" }}>
          위시리스트가 비어 있어요
        </p>
      ) : (
        wishlist.map((title, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px 24px",
              borderRadius: "15px",
              fontSize: "16px",
              //color: "#C9D1D9",
              backgroundColor: "#161B22",
              fontFamily: "'Serif-Regular', sans-serif",
              transition: "background 0.15s",
              cursor: "default",
            }}
            //onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
            //onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</span>
            <button
              onClick={() => onRemove(title)}
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "16px",
                padding: "0 0 0 8px",
                lineHeight: 1,
                flexShrink: 0,
                transition: "color 0.15s",
              }}
              //onMouseEnter={(e) => (e.target.style.color = "rgba(220,80,60,0.8)")}
              //onMouseLeave={(e) => (e.target.style.color = "rgba(200,190,175,0.35)")}
            >
              ×
            </button>
          </div>
        ))
      )}
    </div>
  </aside>
);

export default WishListPanel;