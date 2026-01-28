import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}/players`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// Index
async function index() {
  try {
    const response = await axios.get(`${BASE_URL}/market`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Show
async function show(id) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getInvitations(playerId) {
  try {
    const response = await axios.get(`${BASE_URL}/invites/${playerId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getInvitations, index, show };
