import { useState } from "react";

const ChevronIcon = () => (
  <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const DropDown = ({ label, options, selected, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "11px 24px",
          background: "transparent",
          border: "1px solid #FFFFFF",
          borderRadius: "25px",
          color: "rgba(220,210,195,0.9)",
          fontSize: "24px",
          fontFamily: "Serif-Regular",
          cursor: "pointer",
          transition: "all 0.15s",
          whiteSpace: "nowrap",
        }}
      >
        {selected || label}
        <ChevronIcon/>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            background: "#1e1e1e",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "10px",
            overflow: "hidden",
            zIndex: 100,
            minWidth: "130px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
          }}
        >
          {options.map((opt) => {
            const val = typeof opt === "string" ? opt : opt.label;
            const key = typeof opt === "string" ? opt : opt.value;
            return (
              <div
                key={key}
                onClick={() => {
                  onSelect(key);
                  setOpen(false);
                }}
                style={{
                  padding: "10px 16px",
                  fontSize: "16px",
                  color: selected === key ? "#F5C518" : "rgba(220,210,195,0.8)",
                  cursor: "pointer",
                  background: selected === key ? "rgba(245,197,24,0.08)" : "transparent",
                  fontFamily: "'Serif-Regular','Noto Sans KR', sans-serif",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.06)")}
                onMouseLeave={(e) => (e.target.style.background = selected === key ? "rgba(245,197,24,0.08)" : "transparent")}
              >
                {val}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDown;