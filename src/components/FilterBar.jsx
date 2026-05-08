import React from "react";
import DropDown from "./DropDown";

const FilterBar = ({ 
  genres, 
  sortOptions, 
  selectedGenre, 
  setSelectedGenre, 
  sortBy, 
  setSortBy 
}) => {
  return (
    <div
      style={{
        padding: "12px 30px",
        display: "flex",
        gap: "30px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <DropDown
        label="장르"
        options={genres}
        selected={selectedGenre !== "전체" ? selectedGenre : null}
        onSelect={(v) => setSelectedGenre(v)}
      />
      <DropDown
        label="정렬"
        options={sortOptions}
        selected={sortBy}
        onSelect={(v) => setSortBy(v)}
      />
    </div>
  );
};

export default FilterBar;