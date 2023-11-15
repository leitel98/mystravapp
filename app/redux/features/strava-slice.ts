import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AthleteT = { name: string; lastname: string } | null;

export type ActivityT = {
  name: string;
  distance: number;
  start_date_local: Date;
  total_elevation_gain: number;
};

type InitialStateT = {
  athlete: AthleteT;
  activities: ActivityT[];
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
    setActivitiesData: (state, action: PayloadAction<ActivityT[]>) => {
      return {
        ...state,
        activities: action.payload.map((activity) => ({
          name: activity.name,
          distance: activity.distance,
          start_date_local: activity.start_date_local,
          total_elevation_gain: activity.total_elevation_gain,
        })),
      };
    },
  },
});

export const { setAthleteData, setActivitiesData } = stravaData.actions;
export default stravaData.reducer;
