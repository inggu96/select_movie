import axios from 'axios';
import apiClient from '../apiClient';

//영화목록 불러오기
export const getMovies = () => {
  return apiClient.get('/movies');
};

// export const getMovies = async () => {
//   try {
//     const response = await axios.get('http://localhost:8000/movies');
//     console.log('response', response);
//     return response.data;
//   } catch (error) {
//     console.error('API 호출 중 오류 발생:', error);
//     throw error;
//   }
// };

// export const fetchMovies = async () => {
//   try {
//     const response = await apiClient.get('/movies');
//     console.log('response', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('API 호출 중 오류 발생:', error);
//     throw error;
//   }
// };

// 영화 전체 개수 불러오기
export const getMoviesCount = () => {
  return apiClient.get('/movies/count');
};

// 내가 좋아요 한 영화 불러오기
export const getMoviesMeLike = () => {
  return apiClient.get(`/movies/me/like`);
};
// 내가 북마크 한 영화 불러오기
export const getBookmarksMe = (page = 1, limit = 20) => {
  return apiClient.get(`/bookmarks/me/paging`, {
    params: {
      page,
      limit,
    },
  });
};

//유저가 좋아요 한 영화 불러오기
export const getMoviesUserLike = (userId) => {
  return apiClient.get(`/movies/users/${userId}/likes`);
};

// 영화 장르별로 불러오기
export const getMoviesGenre = (page = 1, genreIds) => {
  return apiClient.get(`/movies/genre`, {
    params: {
      page,
      limit: 20,
      genreIds,
    },
  });
};

// 영화 장르불러오기
export const getMoviesGenres = () => {
  return apiClient.get(`/movies/genres`);
};

// top10 영화 불러오기
export const getMoviesTop = () => {
  return apiClient.get(`/movies/top`);
};

// 연관된 영화 불러오기
export const getMoviesRelated = (id) => {
  return apiClient.get(`/movies/${id}/related`);
};

// 영화 장르별로 불러오기22 ?
export const getMoviesCategory = () => {
  return apiClient.get(`/movies/category`);
};

// 영화 자세히 불러오기
export const getMovie = (id) => {
  return apiClient.get(`/movies/${id}/detail`);
};

// 영화 좋아요 생성
export const postMovieLike = (id) => {
  return apiClient.post(`/movies/${id}/like`);
};

// 영화 좋아요 삭제
export const deleteMovieLike = (id) => {
  return apiClient.delete(`/movies/${id}/like`);
};

// 영화 수정하기
export const patchMovie = (id, body) => {
  return apiClient.patch(`/movies/${id}`, body);
};
