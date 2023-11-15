import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AthleteT = { name: string; lastname: string } | null;

type InitialStateT = {
  athlete: AthleteT;
  activities: [];
};

const initialState: InitialStateT = {
  athlete: null,
  activities: [],
};

const stravaData = createSlice({
  name: "stravaData",
  initialState,
  reducers: {
    setAthleteData: (state, action: PayloadAction<AthleteT>) => {
      return {
        ...state,
        athlete: action.payload
          ? {
              name: action.payload.name,
              lastname: action.payload.lastname,
            }
          : null,
      };
    },
    setActivitiesData: (state, action: PayloadAction<[]>) => {
      return {
        ...state,
        activities: action.payload,
      };
    },
  },
});

export const { setAthleteData, setActivitiesData } = stravaData.actions;
export default stravaData.reducer;
