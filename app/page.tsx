"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { AppDispatch, useAppSelector } from "./redux/store";
import { logIn, logOut } from "./redux/features/auth-slice";
import stravaApi from "./services/axiosService";

const athleteId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;

export default function Home() {
  const [newUsername, setNewUsername] = useState<string>("");
  const [athlete, setAthlete] = useState<any>(null);
  const [routes, setRoutes] = useState<any>([]);

  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => state.authReducer.value.username);

  const onClickLogIn = () => {
    dispatch(logIn(newUsername));
  };

  const onClickLogOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    // Example: Get athlete details
    stravaApi
      .get("/athlete")
      .then((response) => {
        setAthlete(response.data);
      })
      .catch((error) => {
        console.error("Error fetching athlete details:", error.response?.data);
      });
  }, []);

  useEffect(() => {
    // Example: Get athlete routes list
    stravaApi
      .get(`/athletes/${athleteId}/routes?per_page=5`)
      .then((response) => {
        setRoutes((prev: any) => [...prev, response?.data]);
      })
      .catch((error) => {
        console.error("Error fetching athlete routes:", error.message);
      });
  }, []);

  console.log(athlete);
  console.log(routes);

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
