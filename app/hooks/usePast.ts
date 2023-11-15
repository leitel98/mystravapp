import { useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "../redux/store";

import {
  setActiveMonth,
  ActiveMonthT,
  ActivityT,
} from "../redux/features/strava-slice";

export const usePast = () => {
  const athlete = useAppSelector((state) => state.stravaData.athlete);
  const activities = useAppSelector((state) => state.stravaData.activities);
  const activeMonth = useAppSelector((state) => state.stravaData.activeMonth);

  const dispatch = useDispatch<AppDispatch>();

  const changeMonth = (month: ActiveMonthT) => {
    dispatch(setActiveMonth(month));
  };

  const isWithinLast3Months = (dateString: Date) => {
    const currentDate = new Date();
    const activityDate = new Date(dateString);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    return activityDate >= threeMonthsAgo && activityDate <= currentDate;
  };

  const filteredActivities = activities.filter((activity: ActivityT) =>
    isWithinLast3Months(activity.start_date_local)
  );

  const reducedActivities = filteredActivities.reduce(
    (accumulator: any, activity: any) => {
      accumulator.distance += activity.distance;
      accumulator.total_elevation_gain += activity.total_elevation_gain;
      accumulator.moving_time += activity.moving_time;
      return accumulator;
    },
    {
      name: activeMonth.name === null ? "Last 3 months" : activeMonth.name,
      distance: 0,
      total_elevation_gain: 0,
      moving_time: 0,
    }
  );

  return {
    athlete,
    activeMonth,
    changeMonth,
    filteredActivities,
    reducedActivities,
  };
};
