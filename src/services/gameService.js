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

export const uploadMatchPhoto = (clubId, gameId, file) => {
  const formData = new FormData();
  formData.append("photo", file);

  return axios.post(`${BASE_URL}/${clubId}/games/${gameId}/photos`, formData, {
    ...getAuthHeader(),
    headers: {
      ...getAuthHeader().headers,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteMatchPhoto = (clubId, gameId, photoId) =>
  axios.delete(`${BASE_URL}/${clubId}/games/${gameId}/photos/${photoId}`, getAuthHeader());

export const updatePhotoTags = (clubId, gameId, photoId, tagged_player_ids) =>
  axios.put(
    `${BASE_URL}/${clubId}/games/${gameId}/photos/${photoId}/tags`,
    { tagged_player_ids },
    getAuthHeader()
  );


