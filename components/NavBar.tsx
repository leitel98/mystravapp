import { ActiveMonthT } from "@/app/redux/features/strava-slice";
import { FC } from "react";

interface NavBarI {
  months: ActiveMonthT[];
  activeMonth: ActiveMonthT;
  changeMonth: (month: ActiveMonthT) => void;
}

const NavBar: FC<NavBarI> = ({ months, activeMonth, changeMonth }) => {
  return (
    <nav className='bg-mypumpkin mb-16'>
      <section className='hidden xl:flex justify-evenly'>
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
      <aside className='flex xl:hidden relative justify-center items-center px-8 py-4'>
        <h1 className='text-4xl font-bold'>
          <span className='italic text-orange-500'>StravApp</span>
        </h1>
      </aside>
    </nav>
  );
};

export default NavBar;
