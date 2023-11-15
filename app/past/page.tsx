"use client";

import { ActivityCard, HeroCard, Spinner } from "@/components/index";
import { usePast } from "../hooks/usePast";
import { months } from "@/utils/constants";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Past: React.FC = () => {
  const { athlete, activeMonth, changeMonth, filteredActivities } =
    usePast();

  return (
    <>
      <nav className="bg-mypumpkin mb-16">
        <section className="hidden xl:flex justify-evenly">
          {months.map((month, idx) => (
            <button
              key={idx}
              onClick={() => changeMonth(month)}
              className={`flex xl:text-xl text-center justify-center font-semibold w-full transition-all duration-150 py-4 border-r rounded-md hover:bg-orange-600 border-gray-400 capitalize ${
                activeMonth.name === month.name ? "bg-mygolden" : ""
              }`}
            >
              {month.name}
            </button>
          ))}
        </section>
        <aside className="flex xl:hidden relative justify-between px-8 py-4">
          <h1 className="text-3xl font-bold">
            <span className="italic text-myindigo">StravApp</span>
          </h1>
          <Bars3Icon width={30} height={30} />
        </aside>
      </nav>
      <main className="container flex w-full mx-auto items-center justify-center h-screen px-4 pt-4 md:pt-10 md:px-0">
        {athlete ? (
          <section className="flex flex-col max-w-6xl h-full items-center gap-10">
            <HeroCard athlete={athlete} />
            {JSON.stringify(activeMonth)}
            {activeMonth.name != null ? (
              <p className="text-3xl font-bold">{activeMonth.name}</p>
            ) : (
              <p className="text-3xl font-bold">Past 3 months</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-8">
              {filteredActivities.length > 0 &&
                filteredActivities.map((activity, idx) => (
                  <ActivityCard
                    activity={activity}
                    title="Activity"
                    key={idx}
                  />
                ))}
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
