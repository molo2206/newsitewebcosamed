import { useNavigate } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  bulletin?: any;
}

const BulletinCard = ({ bulletin }: props) => {
  const { lang } = useAuthContext();
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate(`/bulletin/detail/` + bulletin?.id); // Remplace "/about" par la route cible
  };
  return (
      <div
        key={bulletin.id}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border dark:bg-slate-800 "
      >
        <img
          src={bulletin.image}
          alt={bulletin.id}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2
            onClick={goToAbout}
            className="sm:text-sm md:text-sm lg:text-sm font-semibold text-gray-800 line-clamp-1 dark:text-white"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(bulletin?.translations, lang)
                ?.title,
            }}
          ></h2>
          {/* <p
            className="text-gray-600 sm:text-sm md:text-sm lg:text-sm  mb-4 line-clamp-2 dark:text-white"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(bulletin?.translations, lang)
                ?.description,
            }}
          ></p> */}
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <div className=" flex justify-between space-x-2 items-center">
              <img
                src={bulletin.author.image}
                alt={bulletin.author.full_name}
                className="w-10 h-10 rounded-full"
              />
              <span style={{fontSize:11}} className="dark:text-white sm:text-sm md:text-sm lg:text-sm ">
                Par {bulletin?.author.full_name}
              </span>
            </div>
            <div className=" flex justify-between  py-4 text-slate-600">
              <p
                style={{fontSize: 11}}
                className="bg-slate-100 rounded-md px-4 py-1 text-principal "
                dangerouslySetInnerHTML={{
                  __html:
                    showingTranslateValue(bulletin?.translations, lang)?.month +
                    "-" +
                    showingTranslateValue(bulletin?.translations, lang)?.year,
                }}
              ></p>
            </div>
          </div>
        </div>
        <div className="p-4 border-t text-center">
          <button
            onClick={goToAbout}
            className="text-principal font-medium hover:underline sm:text-sm md:text-sm lg:text-sm "
          >
            Lire la suite
          </button>
        </div>
      </div>
  );
};

export default BulletinCard;
