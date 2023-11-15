"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "./redux/store";
import { logIn, logOut } from "./redux/features/auth-slice";
import { getAthleteActivities, getAthleteInfo } from "./services/axiosService";

export default function Home() {
  const [newUsername, setNewUsername] = useState<string>("");
  const [athlete, setAthlete] = useState<any>(null);
  const [activities, setActivities] = useState<any>([]);

  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => state.authReducer.value.username);

  const onClickLogIn = () => {
    dispatch(logIn(newUsername));
  };

  const onClickLogOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAthlete = await getAthleteInfo();
        setAthlete(fetchedAthlete);
      } catch (error) {
        // Handle errors as needed
        console.error("Error fetching athlete info:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const fetchedActivities = await getAthleteActivities();
        setActivities(fetchedActivities);
      } catch (error) {
        // Handle errors as needed
        console.error("Error fetching athlete activities:", error);
      }
    };

    fetchActivities();
  }, []);

  console.log(athlete);
  console.log(activities);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <input
          className="text-black"
          type="text"
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <br />
        <button onClick={onClickLogIn}>Log In</button>
        <br />
        <button onClick={onClickLogOut}>Log Out</button>
        <p>Username: {username}</p>
      </div>
    </main>
  );
}
