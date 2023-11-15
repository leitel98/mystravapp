import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET,
      refresh_token: process.env.NEXT_PUBLIC_STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token",
    });

    const reauthorizeResponse = await fetch("https://www.strava.com/oauth/token", {
      method: "post",
      headers: headers,
      body: body,
    });

    if (!reauthorizeResponse.ok) {
      throw new Error(`Failed to refresh token. Status: ${reauthorizeResponse.status}`);
    }

    const reAuthJson = await reauthorizeResponse.json();
    
    const stravaApiUrl = "https://www.strava.com/api/v3"; // Adjust the API version and endpoint based on Strava API documentation

    const response = await fetch(`${stravaApiUrl}/athlete/routes`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${reAuthJson.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Strava data. Status: ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
