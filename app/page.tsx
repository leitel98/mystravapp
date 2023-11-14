"use client";

import { useState } from "react";
import { logIn, logOut } from "./redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "./redux/store";

export default function Home() {
  const [newUsername, setNewUsername] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => state.authReducer.value.username);

  const onClickLogIn = () => {
    dispatch(logIn(newUsername));
  };

  const onClickLogOut = () => {
    dispatch(logOut());
  };

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
