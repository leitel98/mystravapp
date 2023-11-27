"use client";

import {
  ActivityCard,
  HeroCard,
  MonthSelector,
  MonthToggler,
  Spinner,
  YearToggler,
} from "@/components/index";
import { usePast } from "../hooks/usePast";
import { ActiveMonthT, ActivityT } from "../redux/features/strava-slice";
import { months } from "@/utils/constants";
import {
  ArrowLeftIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Past: React.FC = () => {
  const {
    athlete,
    activeMonth,
    changeMonth,
    filteredActivities,
    reducedActivities,
    activeYear,
    changeYear,
  } = usePast();

  return (
    <>
      <MonthSelector
        months={months}
        activeMonth={activeMonth}
        changeMonth={changeMonth}
      />
      <main className='flex w-full items-center justify-center h-full my-16'>
        {athlete ? (
          <section className='flex flex-col max-w-6xl items-center gap-10 relative px-4'>
            <HeroCard athlete={athlete} />
            <Link href='/' className='absolute -top-8 left-4 text-white'>
              <ArrowLeftIcon width={30} height={30} />
            </Link>

            <YearToggler changeYear={changeYear} activeYear={activeYear} />
            {activeMonth.name != null ? (
              <MonthToggler
                changeMonth={changeMonth}
                months={months}
                activeMonth={activeMonth}
              />
            ) : (
              <div className='flex flex-col gap-4 items-center'>
                <p className='text-3xl font-bold text-white'>Past 3 months</p>
                <button
                  onClick={() =>
                    changeMonth(
                      months.find(
                        (month) => month.id === new Date().getMonth() + 1
                      ) as ActiveMonthT
                    )
                  }
                  className='xl:hidden px-4 py-2 rounded-md bg-orange-500'
                >
                  Set actual month
                </button>
              </div>
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-8'>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity: ActivityT, idx: number) => (
                  <ActivityCard
                    activity={activity}
                    title='Activity'
                    key={idx}
                  />
                ))
              ) : (
                <p className='text-gray-300 text-2xl py-8 font-semibold text-center md:col-span-2 lg:col-span-3'>
                  No activities to display...
                </p>
              )}
            </div>
            <div className='flex flex-col lg:flex-row items-start lg:items-center justify-center gap-8 px-6 py-3 bg-mygolden text-xl text-myindigo font-semibold rounded-md'>
              <div className='flex items-center gap-4'>
                <ArrowTrendingUpIcon width={25} height={25} />
                <p>Total distance {reducedActivities.distance} Km</p>
              </div>
              <div className='flex items-center gap-4'>
                <ClockIcon width={25} height={25} />
                <p>Total time {reducedActivities.moving_time / 60} min</p>
              </div>
              <div className='flex items-center gap-4'>
                <ChartBarIcon width={25} height={25} />
                <p>
                  Elevation gain {reducedActivities.total_elevation_gain} mt
                </p>
              </div>
            </div>
          </section>
        ) : (
          <div className='flex items-center gap-4'>
            <Spinner />
            <span className='text-xl font-bold'>Loading...</span>
          </div>
        )}
      </main>
    </>
  );
};

export default Past;
