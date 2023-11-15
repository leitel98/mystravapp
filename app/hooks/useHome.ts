import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import {
  getStravaAccessToken,
  getStravaActivities,
  getStravaAthleteInfo,
  getStravaAuthUrl,
} from "../services/axiosService";
import {
  setActivitiesData,
  setAthleteData,
} from "../redux/features/strava-slice";

export const useHome = () => {
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
        if (!athlete || !activities) {
          window.location.href = getStravaAuthUrl();
        }
      }
    };

    fetchData();
  }, []);
  return { athlete, activities };
};
