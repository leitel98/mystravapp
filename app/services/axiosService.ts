import axios, { AxiosInstance, AxiosResponse } from "axios";

// Constants
const STRAVA_API_BASE_URL = "https://www.strava.com/api/v3";
const CLIENT_ID = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET;
// const REDIRECT_URI = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI;

// Function to refresh the access token
const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const response = await axios.post("https://www.strava.com/oauth/token", {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: "authorization_code",
  });

  // Assuming the response contains a new access token
  return response.data.access_token;
};

// Get the initial access token from your authentication process
const initialAccessToken = process.env.NEXT_PUBLIC_STRAVA_ACCESS_TOKEN;

// Create Axios instance
const stravaApi: AxiosInstance = axios.create({
  baseURL: STRAVA_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${initialAccessToken}`,
  },
});

// Intercept requests to check if the access token has expired
stravaApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Get the refresh token from your authentication process
      const refreshToken = process.env.NEXT_PUBLIC_STRAVA_REFRESH_TOKEN;

      // Refresh the access token
      const newAccessToken = await refreshAccessToken(refreshToken as string);

      // Update the Axios instance with the new access token
      stravaApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;

      // Retry the original request with the new access token
      return stravaApi(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default stravaApi;
