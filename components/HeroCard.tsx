import { FC } from "react";
import { AthleteT } from "@/app/redux/features/strava-slice";
import { UserCircleIcon } from "@heroicons/react/24/outline";

type HeroCardT = {
  athlete: AthleteT;
};

const HeroCard: FC<HeroCardT> = ({ athlete }): JSX.Element => {
  return (
    <section className="mx-auto flex flex-col items-start space-y-4 px-12 py-6 rounded-tl-3xl rounded-br-3xl border bg-myindigo shadow-md border-slate-400">
      <h1 className="text-3xl font-bold text-white">
        Welcome to my <span className="italic text-mygolden">StravApp</span>
      </h1>
      <p className="text-lg font-semibold flex items-center gap-4 text-white">
        <UserCircleIcon className="w-10 h-10" />
        Athlete name:{" "}
        <span className="text-darksky italic">
          {athlete?.name} {athlete?.lastname}
        </span>
      </p>
    </section>
  );
};

export default HeroCard;
