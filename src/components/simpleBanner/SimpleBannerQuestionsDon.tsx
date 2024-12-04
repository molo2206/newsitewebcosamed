const SimpleBannerQuestionsDon = () => {
  return (
    <div className=" bg-principal dark:bg-slate-800 rounded-lg">
      <div className="container  md:py-20">
        <div className="grid grid-cols-1 items-center justify-center md:grid-cols-3 gap-4 md:gap-8 ">
          <div
            className="flex flex-col items-center  justify-center md:h-12 sm:h-40
   gap-4 text-center text-white dark:text-white md:col-span-2 md:items-start md:text-center"
          >
            <h1 className="font-semibold md:text-3xl sm:text-sm">
              Toutes les questions sur le don
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBannerQuestionsDon;
