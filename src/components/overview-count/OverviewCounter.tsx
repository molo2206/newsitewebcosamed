
import CountUp from "react-countup";

const OverviewCounter = () => {
  return (
    <section className=" container h-12 md:h-32 p-3 py-60">
      <div
        className="grid grid-cols-4 divide-x divide-slate-700 mx-auto w-full,
      md:max-w[800px] shadow-lg bg-white -translate-y-20 md:-translate-y-12 my-4 md:p-8
       dark:bg-gray-800 dark:text-white/70"
      >
        <div className=" flex flex-col items-center justify-center">
          <h1
            className="text-sm fount-bold text-black/80 dark:text-white
                 sm:text-lg md:text-3xl"
          >
            <CountUp end={0} suffix="+" duration={2.75} />
          </h1>
          <h1 className="sm:text-md text-xs md:text-lg">Blogs</h1>
        </div>
        <div className=" flex flex-col items-center justify-center">
          <h1
            className="text-sm fount-bold text-black/80 dark:text-white
                 sm:text-lg md:text-3xl"
          >
            <CountUp end={0} suffix="+" duration={2.75} />
          </h1>
          <h1 className="sm:text-md text-xs md:text-lg">Bulletins</h1>
        </div>
        <div className=" flex flex-col items-center justify-center">
          <h1
            className="text-sm fount-bold text-black/80 dark:text-white
                 sm:text-lg md:text-3xl"
          >
            <CountUp end={0} suffix="+" duration={2.75} />
          </h1>
          <h1 className="sm:text-md text-xs md:text-lg">Offres en cours</h1>
        </div>
        <div className=" flex flex-col items-center justify-center">
          <h1
            className="text-sm fount-bold text-black/80 dark:text-white
                 sm:text-lg md:text-3xl"
          >
            <CountUp end={0} suffix="+" duration={2.75} />
          </h1>
          <h1 className="sm:text-md text-xs md:text-lg">Communiqués</h1>
        </div>
      </div>
    </section>
  );
};

export default OverviewCounter;
