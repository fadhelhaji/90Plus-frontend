import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}/club`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const createGame = (clubId, data) =>
  axios.post(`${BASE_URL}/${clubId}/games/create`, data, getAuthHeader());

export const getClubGames = (clubId) =>
  axios.get(`${BASE_URL}/${clubId}/games`, getAuthHeader());

export const getGameDetails = (clubId, gameId) =>
  axios.get(`${BASE_URL}/${clubId}/games/${gameId}`, getAuthHeader());

export const updateGameScore = (clubId, gameId, data) =>
  axios.put(`${BASE_URL}/${clubId}/games/${gameId}/score`, data, getAuthHeader());

export const ratePlayer = (clubId, gameId, playerId, data) =>
  axios.put(
    `${BASE_URL}/${clubId}/games/${gameId}/rate/${playerId}`,
    data,
    getAuthHeader()
  );
