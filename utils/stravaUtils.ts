// utils/stravaApi.ts
import axios, { AxiosRequestConfig, AxiosError } from "axios";

const stravaApi = axios.create({
  baseURL: "https://www.strava.com/api/v3",
});

const NEXT_PUBLIC_CLIENT_ID = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
const NEXT_PUBLIC_CLIENT_SECRET = process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET;
const STRAVA_ACCESS_TOKEN = process.env.NEXT_PUBLIC_STRAVA_ACCESS_TOKEN;
const STRAVA_REFRESH_TOKEN = process.env.NEXT_PUBLIC_STRAVA_REFRESH_TOKEN;

interface StravaTokens {
  access_token: string;
  refresh_token: string;
  expires_at: number; // Adding expires_at field to store the expiration timestamp
}

let stravaTokens: StravaTokens = {
  access_token: STRAVA_ACCESS_TOKEN || "",
  refresh_token: STRAVA_REFRESH_TOKEN || "",
  expires_at: 0, // Initial expiration timestamp, assuming token is already expired
};

const updateTokens = (tokens: StravaTokens) => {
  stravaTokens = tokens;
};

const getAuthorizationHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${stravaTokens.access_token}`,
    },
  };
};

const ensureValidAccessToken = async (): Promise<void> => {
  if (!stravaTokens.access_token || isAccessTokenExpired()) {
    // Access token is missing or expired, refresh it
    await refreshAccessToken();
  }
};

const isAccessTokenExpired = (): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  return (stravaTokens.access_token &&
    stravaTokens.expires_at < currentTime) as boolean;
};

export const makeAuthenticatedRequest = async (
  config: AxiosRequestConfig
): Promise<any> => {
  try {
    await ensureValidAccessToken(); // Ensure a valid access token before making the request
    const response = await stravaApi({
      ...config,
      ...getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      // If the request still fails, even after refreshing the token, handle the error
      console.error("Error making authenticated request:", axiosError);
      throw axiosError.response?.data || axiosError.message || axiosError;
    } else {
      // Handle other errors
      throw axiosError.response?.data || axiosError.message || axiosError;
    }
  }
};

const refreshAccessToken = async (): Promise<void> => {
  try {
    const response = await stravaApi.post("/oauth/token", null, {
      params: {
        client_id: NEXT_PUBLIC_CLIENT_ID,
        client_secret: NEXT_PUBLIC_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: stravaTokens.refresh_token,
      },
    });

    const expiresIn = response.data.expires_in; // Expiration time in seconds
    const expiresAt = Math.floor(Date.now() / 1000) + expiresIn;

    updateTokens({
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      expires_at: expiresAt,
    });
  } catch (error) {
    // Handle error refreshing access token
    console.error("Error refreshing access token:", error);
    throw error;
  }
};
