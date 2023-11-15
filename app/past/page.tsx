"use client";

import { ActivityCard, HeroCard, Spinner } from "@/components/index";
import { usePast } from "../hooks/usePast";
import { ActiveMonthT, ActivityT } from "../redux/features/strava-slice";
import { months } from "@/utils/constants";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
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
  } = usePast();

  return (
    <>
      <nav className="bg-mypumpkin mb-16">
        <section className="hidden xl:flex justify-evenly">
          {months.map((month, idx) => (
            <button
              key={idx}
              onClick={() => changeMonth(month)}
              className={`flex text-xl text-center justify-center font-semibold w-full transition-all duration-150 py-4 border-r rounded-md hover:bg-orange-600 border-gray-400 capitalize ${
                activeMonth.name === month.name ? "bg-mygolden" : ""
              }`}
            >
              {month.name}
            </button>
          ))}
        </section>
        <aside className="flex xl:hidden relative justify-center items-center px-8 py-4">
          <h1 className="text-4xl font-bold">
            <span className="italic text-orange-500">StravApp</span>
          </h1>
        </aside>
      </nav>
      <main className="container relative flex w-full mx-auto items-center justify-center h-screen px-4 pt-4 md:pt-10 md:px-0">
        {athlete ? (
          <section className="flex flex-col max-w-6xl h-full items-center gap-10">
            <div className="flex w-full items-center">
              <HeroCard athlete={athlete} />
            </div>
            <Link href="/" className="absolute top-0 left-0">
              <ArrowLeftIcon width={30} height={30} />
            </Link>
            {activeMonth.name != null ? (
              <div className="flex items-center gap-10">
                <button
                  onClick={() =>
                    changeMonth(
                      months.find(
                        (month) => activeMonth.id - 1 === month.id
                      ) as ActiveMonthT
                    )
                  }
                  className={`text-white xl:hidden ${
                    activeMonth.name === "January" && "hidden"
                  }`}
                >
                  <ArrowLeftIcon width={30} height={30} />
                </button>
                <p className="text-3xl font-bold">{activeMonth.name}</p>
                <button
                  onClick={() =>
                    changeMonth(
                      months.find(
                        (month) => activeMonth.id + 1 === month.id
                      ) as ActiveMonthT
                    )
                  }
                  className={`text-white xl:hidden ${
                    activeMonth.name === "December" && "hidden"
                  }`}
                >
                  <ArrowRightIcon width={30} height={30} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-center">
                <p className="text-3xl font-bold">Past 3 months</p>
                <button
                  onClick={() =>
                    changeMonth(
                      months.find(
                        (month) => month.id === new Date().getMonth() + 1
                      ) as ActiveMonthT
                    )
                  }
                  className="xl:hidden px-4 py-2 rounded-md bg-orange-500"
                >
                  Set actual month
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-8">
              {filteredActivities.length > 0 &&
                filteredActivities.map((activity: ActivityT, idx: number) => (
                  <ActivityCard
                    activity={activity}
                    title="Activity"
                    key={idx}
                  />
                ))}
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-8 px-6 py-3 bg-mygolden text-xl text-myindigo font-semibold rounded-md">
              <div className="flex items-center gap-4">
                <ArrowTrendingUpIcon width={25} height={25} />
                <p>Total distance {reducedActivities.distance} Km</p>
              </div>
              <div className="flex items-center gap-4">
                <ClockIcon width={25} height={25} />
                <p>Total time {reducedActivities.moving_time / 60} min</p>
              </div>
              <div className="flex items-center gap-4">
                <ChartBarIcon width={25} height={25} />
                <p>
                  Elevation gain {reducedActivities.total_elevation_gain} mt
                </p>
              </div>
            </div>
          </section>
        ) : (
          <div className="flex items-center gap-4">
            <Spinner />
            <span className="text-xl font-bold">Loading...</span>
          </div>
        )}
      </main>
    </>
  );
};

export default Past;
