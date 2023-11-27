import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import moment from "moment";

interface YearTogglerProps {
  changeYear: (Year: number) => void;
  activeYear: number;
}

const YearToggler: React.FC<YearTogglerProps> = ({
  changeYear,
  activeYear,
}: YearTogglerProps) => {
  return (
    <div className='flex items-center gap-10'>
      <button
        onClick={() => changeYear(activeYear - 1)}
        className={`text-white`}
      >
        <ArrowLeftIcon width={30} height={30} />
      </button>
      <p className='text-3xl font-bold text-mygolden'>Year {activeYear}</p>
      <button
        onClick={() => changeYear(activeYear + 1)}
        className={`text-white ${activeYear === moment().year() && "hidden"}`}
      >
        <ArrowRightIcon width={30} height={30} />
      </button>
    </div>
  );
};

export default YearToggler;
