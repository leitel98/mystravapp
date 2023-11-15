import { FC } from "react";
import { ActivityT } from "@/app/redux/features/strava-slice";
import {
  CalendarIcon,
  ChartBarIcon,
  GlobeAmericasIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

type LastActivityCardT = {
  activity: ActivityT;
};

const LastActivityCard: FC<LastActivityCardT> = ({ activity }) => {
  return (
    <section className="flex flex-col capitalize font-semibold gap-2 items-start bg-mygolden text-myindigo px-10 py-5 rounded-lg border border-white">
      <h2 className="font-bold text-xl w-full text-center pb-1 border-b-2 border-mypumpkin">
        This is your last activity
      </h2>
      <div className="flex items-center gap-2">
        <PencilSquareIcon width={30} height={30} />
        <p>name: {activity?.name}</p>
      </div>
      <div className="flex items-center gap-2">
        <CalendarIcon width={30} height={30} />
        <p>date: {activity.start_date_local.toString().split("T")[0]}</p>
        {" - "}
        <p>
          {activity.start_date_local.toString().split("T")[1].split("Z")[0]}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <GlobeAmericasIcon width={30} height={30} />
        <p>distance: {activity.distance} Km</p>
      </div>
      <div className="flex items-center gap-2">
        <ChartBarIcon width={30} height={30} />
        <p>elevation gain: {activity.total_elevation_gain} Mts</p>
      </div>
    </section>
  );
};

export default LastActivityCard;
