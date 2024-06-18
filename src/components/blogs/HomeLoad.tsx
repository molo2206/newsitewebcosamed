import Skeleton from "react-loading-skeleton";

const HomeLoad = () => {
  return (
    <>
      <div className="p-4 shadow-lg">
        <div className=" overflow-hidden">
          <Skeleton count={1} width="100%" height={500} />
        </div>
        <div className=" flex justify-between py-2 text-slate-600">
          <Skeleton count={1} width={200} height={20} />

          <Skeleton count={1} width={200} height={20} />
          <Skeleton count={1} width={200} height={20} />
          <Skeleton count={1} width={200} height={20} />
        </div>
        <div className="space-y-2 py3">
          <h1 className="font-montserrat line-clamp-1 font-bold">
            <Skeleton count={1} width="100%" height={20} />
          </h1>
          <p className="font-montserrat">
            <Skeleton count={5} width="100%" height={15} />
          </p>
        </div>
      </div>
    </>
  );
};

export default HomeLoad;
