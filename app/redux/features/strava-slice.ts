import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AthleteT = { name: string; lastname: string } | null;

export type ActivityT = {
  name: string;
  distance: number;
  start_date_local: Date;
  total_elevation_gain: number;
};

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
    before: 0,
    after: 0,
  },
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
