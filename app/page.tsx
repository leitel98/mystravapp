"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getStravaAuthUrl,
  getStravaAccessToken,
  getStravaActivities,
  getStravaAthleteInfo,
} from "./services/axiosService";
import {
  setAthleteData,
  setActivitiesData,
} from "./redux/features/strava-slice";
import { AppDispatch, useAppSelector } from "./redux/store";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Home: React.FC = () => {
  const athlete = useAppSelector((state) => state.stravaData.athlete);
  const activities = useAppSelector((state) => state.stravaData.activities);

  const dispatch = useDispatch<AppDispatch>();

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
          dispatch(
            setAthleteData({
              name: fetchedAthlete.firstname,
              lastname: fetchedAthlete.lastname,
            })
          );
          dispatch(setActivitiesData(fetchedActivities));

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
          <h1 className="text-3xl font-bold">
            Welcome to my{" "}
            <span className="italic text-orange-400">StravApp</span>
          </h1>
          <p className="text-lg font font-semibold flex items-center gap-4">
            <UserCircleIcon width={40} height={40} />
            Athlete name:{" "}
            <span className="text-blue-400 italic">
              {athlete?.name} {athlete?.lastname}
            </span>
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
