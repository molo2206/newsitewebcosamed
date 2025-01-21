import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const DonateBanner = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const donatelink = () => {
    navigation("/donation"); // new line
  };
  return (
    <div className="container flex flex-col lg:flex-row w-full dark:bg-slate-900 py-2 ">
      {/* Left Section */}
      <div className="w-full bg-gray-800 text-white flex-1 p-8 lg:p-16 flex items-center">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Sauver une vie aujourd'hui
          </h1>
          <p className="mb-8 text-lg">
            Remarque : Vous serez dirigé vers la page de soutien. Démarrez le
            processus de donation en cliquant sur ce bouton.
          </p>
          <div className="flex flex-col sm:flex-row items-center">
            <button
              onClick={donatelink}
              className="mt-4 sm:w-full md:w-full bg-red-500 text-white px-2 py-2 rounded "
            >
              {t("Donate")}
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 relative">
        <img
          src="https://apicosamed.cosamed.org/uploads/blogs/3b92d18aa7a6176dd37d372bc2f1eb71.png"
          alt="Happy child"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default DonateBanner;
