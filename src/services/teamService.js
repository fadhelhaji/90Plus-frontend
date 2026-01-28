import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}/club`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const getTeamDetails = (clubId, teamId) =>
  axios.get(`${BASE_URL}/${clubId}/teams/${teamId}`, getAuthHeader());

export const addPlayerToTeam = (clubId, teamId, playerId) =>
  axios.post(
    `${BASE_URL}/${clubId}/teams/${teamId}/add-player`,
    { playerId },
    getAuthHeader(),
  );

export const removePlayerFromTeam = (clubId, teamId, playerId) =>
  axios.post(
    `${BASE_URL}/${clubId}/teams/${teamId}/remove-player`,
    { playerId },
    getAuthHeader(),
  );

export async function updateFormation(clubId, teamId, formation) {
  const res = await axios.put(
    `${BASE_URL}/${clubId}/teams/${teamId}/formation`,
    { formation },
    getAuthHeader(),
  );
  return res.data;
}
