"use client";

import { HeroCard, ActivityCard, Spinner } from "@/components/index";
import { useHome } from "./hooks/useHome";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Home: React.FC = () => {
  const { athlete, activities } = useHome();

  return (
    <main className="container flex w-full mx-auto items-center justify-center h-screen">
      {athlete ? (
        <section className="flex flex-col max-w-5xl items-center gap-10">
          <HeroCard athlete={athlete} />
          {activities.length > 0 && (
            <ActivityCard activity={activities[0]} title="My last activity" />
          )}
          <Link
            className="flex items-center hover:scale-105 transition-all duration-150 gap-4 bg-orange-600 px-6 py-3 border border-white rounded-md"
            href="/past"
          >
            <ArrowRightIcon width={15} height={15} />
            <p>Go to your monthly stats!</p>
          </Link>
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

export default Home;
