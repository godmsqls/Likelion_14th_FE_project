import axios from "axios";

// Vite 환경 변수 불러오기
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "ko-KR", // 한국어 응답 설정
  },
});

export const movieApi = {
  // 1. 영화 목록 및 필터링/정렬 조회
  getMovies: async (genreId = "", sortBy = "popularity.desc") => {
    const response = await tmdbApi.get("/discover/movie", {
      params: {
        with_genres: genreId, // 장르 ID로 필터링
        sort_by: sortBy === "rating" ? "vote_average.desc" : "primary_release_date.desc", // 정렬 기준 설정
      },
    });
    return response.data.results.map(formatMovieData);
  },

  // 2. 키워드 기반 영화 검색
  searchMovies: async (query) => {
    if (!query.trim()) return [];
    const response = await tmdbApi.get("/search/movie", {
      params: {
        query: query,
      },
    });
    return response.data.results.map(formatMovieData);
  },

  // 3. 장르 리스트 조회
  getGenres: async () => {
    const response = await tmdbApi.get("/genre/movie/list");
    return response.data.genres;
  },
};

// TMDB 데이터를 앱의 Movie 객체 형식으로 변환
const formatMovieData = (movie) => ({
  id: movie.id,
  title: movie.title,
  rating: movie.vote_average,
  description: movie.overview,
  releaseDate: movie.release_date,
  posterUrl: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
  genre: movie.genre_ids,
});