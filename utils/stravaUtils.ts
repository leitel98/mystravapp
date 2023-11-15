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
}

let stravaTokens: StravaTokens = {
  access_token: STRAVA_ACCESS_TOKEN || "",
  refresh_token: STRAVA_REFRESH_TOKEN || "",
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

export const makeAuthenticatedRequest = async (
  config: AxiosRequestConfig
): Promise<any> => {
  try {
    const response = await stravaApi({
      ...config,
      ...getAuthorizationHeader(),
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401 && stravaTokens.refresh_token) {
      try {
        // Attempt to refresh the access token
        const refreshedTokens = await refreshAccessToken();
        updateTokens(refreshedTokens);

        // Retry the original request with the new access token
        const response = await stravaApi({
          ...config,
          ...getAuthorizationHeader(),
        });
        return response.data;
      } catch (refreshError) {
        // Handle error refreshing access token
        console.error("Error refreshing access token:", refreshError);
        throw refreshError;
      }
    } else {
      // Handle other errors
      throw axiosError.response?.data || axiosError.message || axiosError;
    }
  }
};

const refreshAccessToken = async (): Promise<StravaTokens> => {
  try {
    const response = await stravaApi.post("/oauth/token", null, {
      params: {
        client_id: NEXT_PUBLIC_CLIENT_ID,
        client_secret: NEXT_PUBLIC_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: stravaTokens.refresh_token,
      },
    });
    return response.data;
  } catch (error) {
    // Handle error refreshing access token
    console.error("Error refreshing access token:", error);
    throw error;
  }
};
