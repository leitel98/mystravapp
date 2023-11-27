import React from "react";
import { ActiveMonthT } from "@/app/redux/features/strava-slice";
import { FC } from "react";

interface MonthSelectorI {
  months: ActiveMonthT[];
  activeMonth: ActiveMonthT;
  changeMonth: (month: ActiveMonthT) => void;
}

const MonthSelector: FC<MonthSelectorI> = ({
  months,
  activeMonth,
  changeMonth,
}) => {
  return (
    <section className='hidden xl:flex justify-evenly border-b border-white'>
      {months.map((month, idx) => (
        <button
          key={idx}
          onClick={() => changeMonth(month)}
          className={`flex text-xl text-center justify-center font-semibold w-full transition-all duration-150 py-4 border-r rounded-md hover:bg-orange-600 text-white border-gray-400 capitalize ${
            activeMonth.name === month.name ? "bg-mygolden" : ""
          }`}
        >
          {month.name}
        </button>
      ))}
    </section>
  );
};

export default MonthSelector;
