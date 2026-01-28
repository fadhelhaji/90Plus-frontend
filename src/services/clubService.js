import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}/club`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// Create
async function create(formData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/create`,
      formData,
      getAuthHeader(),
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Index
async function index() {
  try {
    const response = await axios.get(`${BASE_URL}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Show
async function show(clubId) {
  try {
    const response = await axios.get(`${BASE_URL}/${clubId}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Create team for club
async function createTeam(clubId, formData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/${clubId}/teams/create`,
      formData,
      getAuthHeader(),
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Index team for club
async function indexTeam(clubId) {
  try {
    const response = await axios.get(`${BASE_URL}/${clubId}`, getAuthHeader());
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Show team details
async function showTeam(clubId, teamId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/${clubId}/teams/${teamId}`,
      getAuthHeader(),
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function invitePlayer(clubId, playerId) {
  const response = await axios.post(
    `${BASE_URL}/${clubId}/invite/${playerId}`,
    {},
    getAuthHeader(),
  );
  return response.data;
}

// ACCEPT invitation
async function acceptInvitation(clubId) {
  const response = await axios.post(
    `${BASE_URL}/${clubId}/accept`,
    {},
    getAuthHeader(),
  );
  return response.data;
}

// REJECT invitation
async function rejectInvitation(clubId) {
  const response = await axios.post(
    `${BASE_URL}/${clubId}/reject`,
    {},
    getAuthHeader(),
  );
  return response.data;
}

export {
  acceptInvitation,
  create,
  createTeam,
  index,
  indexTeam,
  invitePlayer,
  rejectInvitation,
  show,
  showTeam
};

