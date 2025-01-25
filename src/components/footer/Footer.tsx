import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const donatelink = () => {
    navigation("/donation"); // new line
  };

  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    return `${year}`;
  }

  return (
    <>
      <footer className="text-white bg-gradient-to-r  p-4 bg-principal dark:bg-slate-800  font-montserrat">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          {/* Section "Qui sommes-nous?" */}
          <div>
            <h3 className="lg:text-sm sm:text-sm md:text-sm font-bold sm:font-semibold mb-4">
              QUI SOMMES-NOUS
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  className="font-light lg:text-sm sm:text-sm md:text-sm"
                  href="/about"
                >
                  A PROPOS
                </a>
              </li>
              <li>
                <a
                  className="font-light lg:text-sm sm:text-sm md:text-sm"
                  href="/team"
                >
                  Gouvernance et direction
                </a>
              </li>
              <li>
                <a
                  className="font-light lg:text-sm sm:text-sm md:text-sm line-clamp-1"
                  href="/transparence"
                >
                  Financements et donateurs
                </a>
              </li>
              <li>
                <a
                  className="font-light lg:text-sm sm:text-sm md:text-sm line-clamp-1"
                  href="/importancedon"
                >
                  A quoi servent vos dons
                </a>
              </li>
              <li>
                <a
                  className="font-light lg:text-sm sm:text-sm md:text-sm line-clamp-1"
                  href="/toutsavoirsurledon"
                >
                  Tout savoir sur le don régulier
                </a>
              </li>
              <li>
                <a
                  className="font-light lg:text-sm sm:text-sm md:text-sm line-clamp-1"
                  href="/questions-don"
                >
                  Toutes les questions sur le don
                </a>
              </li>
            </ul>
          </div>
          {/* Section "Notre Travail" */}
          <div>
            <h3 className="lg:text-sm sm:text-sm md:text-sm font-bold mb-4 line-clamp-1">
              NOTRE TRAVAIL
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  className="font-light lg:text-sm sm:text-sm md:text-sm line-clamp-1"
                  href=""
                >
                  Aide sanitaire
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="font-light lg:text-sm sm:text-sm md:text-sm line-clamp-1"
                  href=""
                >
                  Assistance et services humanitaires
                </a>
              </li>
            </ul>
          </div>
          {/* Section "Médias et Ressources" */}
          <div>
            <h3 className="lg:text-sm sm:text-sm md:text-sm font-bold mb-4 line-clamp-1">
              MÉDIAS & RESSOURCES
            </h3>
            <ul className=" space-y-2">
              <li>
                <a
                  className="font-light lg:text-sm sm:text-sm md:text-sm line-clamp-1"
                  href="/load-data/communicated"
                >
                  Communiqués de presse
                </a>
              </li>
              <li>
                <a
                  className="font-light lg:text-sm sm:text-sm md:text-sm line-clamp-1"
                  href="/data-loading/blogs"
                >
                  Publications
                </a>
              </li>
            </ul>
            <h3 className="lg:text-sm sm:text-sm md:text-sm font-bold mt-6 mb-4">
              IMPLIQUEZ-VOUS
            </h3>
            <ul className="">
              <li>
                <a
                  className="font-light lg:text-sm sm:text-sm md:text-sm line-clamp-1"
                  href="/job_openings"
                >
                  Carrières
                </a>
              </li>
              {/* <li>Collaborez avec nous</li> */}
              <li>
                <a
                  className="font-light lg:text-sm sm:text-sm md:text-sm line-clamp-1"
                  href="/community/join"
                >
                  Devenez volontaire ou membre de COSAMED
                </a>
              </li>
            </ul>
            <div className="md:hidden">
              <h3 className="lg:text-sm sm:text-sm md:text-sm font-bold mb-4">
                URGENCE
              </h3>
              <button
                onClick={donatelink}
                className="mt-4 sm:w-full md:w-full bg-red-500 text-white px-2 py-2 rounded "
              >
                {t("Donate")}
              </button>
            </div>
          </div>
          <div className=" hidden md:block">
            <h3 className="lg:text-sm sm:text-sm md:text-sm font-bold mb-4">
              URGENCE
            </h3>
            <button
              onClick={donatelink}
              className="mt-4 sm:w-full md:w-full bg-red-500 text-white px-2 py-2 rounded "
            >
              {t("Donate")}
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center mt-4">
          <p className=" text-sm">
            © {getDate()} Workday, Inc. Tous droits réservés.
          </p>
          <br />
        </div>
      </footer>
    </>
  );
};

export default Footer;
