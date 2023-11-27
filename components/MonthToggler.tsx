import { ActiveMonthT } from "@/app/redux/features/strava-slice";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface MonthTogglerProps {
  changeMonth: (month: ActiveMonthT) => void;
  months: ActiveMonthT[];
  activeMonth: ActiveMonthT;
}

const MonthToggler: React.FC<MonthTogglerProps> = ({
  changeMonth,
  months,
  activeMonth,
}: MonthTogglerProps) => {
  return (
    <div className='flex items-center gap-10'>
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
      <p className='text-3xl font-bold text-white'>{activeMonth.name}</p>
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
  );
};

export default MonthToggler;
