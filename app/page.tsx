"use client";

import { useEffect, useState } from "react";
import {
  getStravaAuthUrl,
  getStravaAccessToken,
  getStravaActivities,
  getStravaAthleteInfo,
} from "./services/axiosService";

const Home: React.FC = () => {
  const [athlete, setAthlete] = useState<any>(null);
  const [activities, setActivities] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Step 1: Check if there's an authorization code in the URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          // Step 2: Use the authorization code to get the access token
          const accessToken = await getStravaAccessToken(code);

          // Step 3: Use the access token to get athlete information
          const fetchedActivities = await getStravaActivities(accessToken);
          const fetchedAthlete = await getStravaAthleteInfo(accessToken);
          setActivities(fetchedActivities);
          setAthlete(fetchedAthlete);

          // Step 4: Display the athlete information (you can customize this part)
        } catch (error) {
          console.error("Error fetching Strava athlete information:", error);
          // Handle the error as needed
        }
      } else {
        // Step 5: If there's no code, redirect the user to the Strava authentication page
        window.location.href = getStravaAuthUrl();
      }
    };

    fetchData();
  }, []);

  console.log("Activities Information:", activities);
  console.log("Athlete info:", athlete);

  return (
    <div className="container flex w-full items-center justify-center h-screen">
      {athlete ? (
        <div className="mx-auto flex flex-col items-start space-y-4">
          <p>
            Athlete name: {athlete?.firstname} {athlete?.lastname}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
