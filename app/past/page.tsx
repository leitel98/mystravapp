"use client";

import { ActivityCard, HeroCard, Spinner } from "@/components/index";
import { usePast } from "../hooks/usePast";

const Past: React.FC = () => {
  const { athlete, activities, setActiveMonth } = usePast();

  return (
    <main className="container flex w-full mx-auto items-center justify-center h-screen px-4 pt-4 md:pt-10 md:px-0">
      {athlete ? (
        <section className="flex flex-col max-w-6xl h-full items-center gap-10">
          <HeroCard athlete={athlete} />
          <p className="text-3xl font-bold">Past 3 months</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-8">
            {activities.length > 0 &&
              activities.map((activity, idx) => (
                <ActivityCard activity={activity} title="Activity" key={idx} />
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
  );
};

export default Past;
