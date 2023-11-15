"use client";

import { HeroCard, LastActivityCard, Spinner } from "@/components/index";
import { useHome } from "./hooks/useHome";

const Home: React.FC = () => {
  const { athlete, activities } = useHome();

  return (
    <main className="container flex w-full items-center justify-center h-screen">
      {athlete ? (
        <section className="flex flex-col max-w-5xl items-center gap-10">
          <HeroCard athlete={athlete} />
          {activities.length > 0 && (
            <LastActivityCard activity={activities[0]} />
          )}
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
