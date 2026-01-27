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
    console.log(response.data);
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

export { index, show };
