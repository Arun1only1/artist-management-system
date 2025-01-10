import ROUTES from "@/constant/route.constants";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const $axios = axios.create({
  baseURL,
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
    console.log("Error retrieving token from localStorage:", error);
    return null;
  }
};

// Helper function to get the refresh token
const getRefreshToken = () => {
  try {
    const userSession =
      window?.localStorage?.getItem("userSession") &&
      JSON.parse(window?.localStorage?.getItem("userSession") as string);
    return userSession?.refreshToken || null;
  } catch (error) {
    console.log("Error retrieving refresh token from localStorage:", error);
    return null;
  }
};

// Helper function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    console.log("No refresh token available");
    window.location.href = ROUTES.LOGOUT;
    return null;
  }

  try {
    const response = await axios.post(`${baseURL}/auth/refresh-token`, {
      refreshToken,
    });

    const newAccessToken = response?.data?.accessToken;

    // Update the access token in localStorage
    const userSession = JSON.parse(
      window.localStorage.getItem("userSession") || "{}"
    );
    userSession.accessToken = newAccessToken;
    window.localStorage.setItem("userSession", JSON.stringify(userSession));

    return newAccessToken;
  } catch (error) {
    console.log("Error refreshing access token:", error);
    window.location.href = ROUTES.LOGOUT; // Redirect to logout if refresh fails
    return null;
  }
};

// Add a request interceptor
$axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration or errors
$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access - Possible token expiration");

      // Try to refresh the access token
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Retry the original request with the new access token
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return $axios(error.config); // Retry the request
      }
    }

    // Handle other types of errors (network issues, server errors, etc.)
    if (error.response) {
      console.log(`Error ${error.response.status}: ${error.response.data}`);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error:", error.message);
    }

    return Promise.reject(error); // Reject the promise to allow further error handling
  }
);

export default $axios;
