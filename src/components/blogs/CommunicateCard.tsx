import {  useNavigate } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  communicate?: any;
}

const CommunicateCard = ({ communicate }: props) => {
  const { lang } = useAuthContext();
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate(`/communicated/` + communicate?.id); // Remplace "/about" par la route cible
  };
  return (

      <div
        key={communicate.id}
        className="bg-white rounded-lg shadow-md overflow-hidden py-4 hover:shadow-lg transition-shadow border dark:bg-slate-800 "
      >
        <img
          src={communicate?.file}
          alt={communicate.id}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2
            onClick={goToAbout}
            className="sm:text-sm md:text-sm lg:text-sm font-semibold text-gray-800 line-clamp-1 dark:text-white"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(communicate?.translations, lang)
                ?.title,
            }}
          ></h2>
          <p
            className="text-gray-600 sm:text-sm md:text-sm lg:text-sm  mb-4 line-clamp-2 dark:text-white"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(communicate?.translations, lang)
                ?.description,
            }}
          ></p>
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <div className=" flex justify-between space-x-2 items-center">
              <img
                src={communicate.author.image}
                alt={communicate.author.full_name}
                className="w-10 h-10 rounded-full"
              />
              <span className="dark:text-white sm:text-sm md:text-sm lg:text-sm ">
                Par {communicate?.author.full_name}
              </span>
            </div>
            <span className="dark:text-white sm:text-sm md:text-sm lg:text-sm ">
              {communicate?.created}
            </span>
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

export default CommunicateCard;
