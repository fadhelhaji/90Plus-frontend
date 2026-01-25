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
async function show(id) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, getAuthHeader());
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

export { create, createTeam, index, show };
