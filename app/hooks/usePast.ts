import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";

import {
  setActiveMonth,
  setActiveYear,
  ActiveMonthT,
} from "../redux/features/strava-slice";
import moment from "moment";
import { useMemo } from "react";

export const usePast = () => {
  const athlete = useAppSelector((state) => state.stravaDataReducer.athlete);
  const activities = useAppSelector(
    (state) => state.stravaDataReducer.activities
  );
  const activeMonth = useAppSelector(
    (state) => state.stravaDataReducer.activeMonth
  );
  const activeYear = useAppSelector(
    (state) => state.stravaDataReducer.activeYear
  );

  const dispatch = useDispatch<AppDispatch>();

  const changeMonth = (month: ActiveMonthT) => {
    dispatch(setActiveMonth(month));
  };

  const changeYear = (year: number) => {
    dispatch(setActiveYear(year));
  };

  const isWithinLast3Months = (dateString: Date) => {
    const currentDate = new Date();
    const activityDate = new Date(dateString);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    return activityDate >= threeMonthsAgo && activityDate <= currentDate;
  };

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      if (activeMonth.name === null) {
        // Keep all activities if activeMonth.name is null
        return isWithinLast3Months(activity.start_date_local);
      }

      // Extract the month number and year from the activity's start_date_local
      const activityMonth = moment(activity.start_date_local).month() + 1; // Adding 1 because getMonth() returns 0-based index
      const activityYear = moment(activity.start_date_local).year();

      // Compare the month number with the activeMonth id and the year with activeYear
      return activityMonth === activeMonth.id && activityYear === activeYear;
    });
  }, [activities, activeMonth, activeYear]);

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
    changeYear,
    activeYear,
  };
};
