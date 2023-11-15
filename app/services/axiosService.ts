import axios from "axios";
import queryString from "query-string";

const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
const secret = process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET;

const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000&response_type=code&scope=read,activity:read_all&approval_prompt=force`;
const stravaAuthUrlPast = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000/past&response_type=code&scope=read,activity:read_all&approval_prompt=force`;

const stravaTokenUrl = "https://www.strava.com/oauth/token";

export const getStravaAuthUrl = () => {
  return stravaAuthUrl;
};

export const getStravaAuthUrlPast = () => {
  return stravaAuthUrlPast;
};

export const getStravaAccessToken = async (code: string) => {
  const params = {
    client_id: clientId,
    client_secret: secret,
    code,
    grant_type: "authorization_code",
  };

  try {
    const response = await axios.post(
      stravaTokenUrl,
      queryString.stringify(params)
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Strava access token:", error);
    throw error;
  }
};

export const getStravaActivities = async (accessToken: string) => {
  const apiUrl = "https://www.strava.com/api/v3/athlete/activities";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Strava activities:", error);
    throw error;
  }
};

export const getStravaActivitiesPast = async (
  accessToken: string,
  startDate: number,
  endDate: number
) => {
  const apiUrl = "https://www.strava.com/api/v3/athlete/activities";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        after: startDate,
        before: endDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Strava activities:", error);
    throw error;
  }
};

export const getStravaAthleteInfo = async (accessToken: string) => {
  const apiUrl = "https://www.strava.com/api/v3/athlete";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Strava athlete information:", error);
    throw error;
  }
};
