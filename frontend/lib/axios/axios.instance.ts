import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

// Helper function to get the access token
const getAccessToken = () => {
  try {
    const userSession =
      window?.localStorage?.getItem("userSession") &&
      JSON.parse(window?.localStorage?.getItem("userSession") as string);

    return userSession?.accessToken || null;
  } catch (error) {
    console.error("Error retrieving token from localStorage:", error);
    return null;
  }
};

// Add a request interceptor
$axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      // Attach the token in Authorization header if available
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration or errors
$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If token expired or unauthorized (401), handle accordingly
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - Possible token expiration");

      window.localStorage.removeItem("userSession");

      window.location.href = "/login";
    }

    // Handle other types of errors (network issues, server errors, etc.)
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.data}`);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error); // Reject the promise to allow further error handling
  }
);

export default $axios;
