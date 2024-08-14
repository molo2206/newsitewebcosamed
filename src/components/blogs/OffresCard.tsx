import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface props {
  offre?: any;
}
const OffresCard = ({ offre }: props) => {
  const { t } = useTranslation();
  return (
    <>
      {/* <Link to={`/offre/detail/` + offre?.id} onClick={() => window.scroll}> */}
      <div className="p-4 shadow-lg border border-slate-300">
        <div className=" container overflow-hidden">
          <img
            src={offre?.image}
            alt="not found"
            className="mx-auto h-[100px] w-full object-contain transition duration-700"
          />
        </div>
        <div className=" container flex justify-between py-2 bg-principal text-slate-100">
          <div className="rounded-md  w-[140px] h-[50px] flex items-center">
            <p className="  text-center">Du {offre?.startdate}</p>
          </div>
          <div className="rounded-md w-[140px] h-[50px] flex items-center">
            <p className="  text-center">au {offre?.enddate}</p>
          </div>
        </div>
        <div className=" space-y-2 py-3">
          <h1 className="font-montserrat line-clamp-1 font-bold uppercase">
            {offre?.title}
          </h1>
          <p
            className="font-montserrat line-clamp-3"
            dangerouslySetInnerHTML={{ __html: offre?.description }}
          ></p>
          <div className="py-4 flex justify-center items-center">
            <Link to={`/offre/detail/${offre?.id}`}>
              <p
                className="h-[40px] w-[180px] rounded-lg 
                              bg-principal text-white hover:bg-orange-300 hover:text-white font-semibold text-center"
              >
                {t("Apply")}
              </p>
            </Link>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </>
  );
};

export default OffresCard;
