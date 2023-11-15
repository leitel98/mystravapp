import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AthleteT = { name: string; lastname: string } | null;

export type ActivityT = {
  name: string;
  distance: number;
  start_date_local: Date;
  total_elevation_gain: number;
  moving_time: number;
};

const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
const threeMonthsAgoTimestamp =
  currentTimestampInSeconds - 3 * 30 * 24 * 60 * 60; // Assuming 30 days per month

export type ActiveMonthT = {
  name: string | null;
  before: number;
  after: number;
};

type InitialStateT = {
  athlete: AthleteT;
  activities: ActivityT[];
  activeMonth: ActiveMonthT;
};

const initialState: InitialStateT = {
  athlete: null,
  activities: [],
  activeMonth: {
    name: null,
    before: currentTimestampInSeconds,
    after: threeMonthsAgoTimestamp,
  },
};

const stravaData: any = createSlice({
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
