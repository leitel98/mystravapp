import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";

import { setActiveMonth, ActiveMonthT } from "../redux/features/strava-slice";

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

  const filteredActivities = activities.filter(activity => isWithinLast3Months(activity.start_date_local));

  return { athlete, activeMonth, changeMonth, filteredActivities };
};
