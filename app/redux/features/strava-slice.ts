import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AthleteT = { name: string; lastname: string } | null;

export type ActivityT = {
  name: string;
  distance: number;
  start_date_local: Date;
  total_elevation_gain: number;
  moving_time: number;
};

export type ActiveMonthT = {
  name: string | null;
  id: number;
};

type InitialStateT = {
  athlete: AthleteT;
  activities: ActivityT[];
  activeMonth: ActiveMonthT;
};

const initialState = {
  athlete: null as AthleteT,
  activities: [] as ActivityT[],
  activeMonth: {
    name: null,
    id: 0,
  } as ActiveMonthT,
} as InitialStateT;

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
          distance: Math.round(activity.distance / 1000),
          start_date_local: activity.start_date_local,
          total_elevation_gain: activity.total_elevation_gain,
          moving_time: activity.moving_time,
        })),
      };
    },
    setActiveMonth: (state, action: PayloadAction<ActiveMonthT>) => {
      return {
        ...state,
        activeMonth: action.payload,
      };
    },
  },
});

export const { setAthleteData, setActivitiesData, setActiveMonth } =
  stravaData.actions;
export default stravaData.reducer;
