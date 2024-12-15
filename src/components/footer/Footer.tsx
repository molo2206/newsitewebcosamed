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
      <footer className="text-white  bg-gradient-to-r bg-principal dark:bg-slate-800  font-montserrat">
        <div className="container mx-auto p-8 grid grid-cols-4 gap-8">
          {/* Section "Qui sommes-nous?" */}
          <div>
            <h3 className="text-lg font-bold mb-4">QUI SOMMES-NOUS</h3>
            <ul>
              <li>
                <a className="font-light text-sm" href="/about">
                  A PROPOS
                </a>
              </li>
              <li>
                <a className="font-light text-sm" href="/team">
                  Gouvernance et direction
                </a>
              </li>
              <li>
                <a className="font-light text-sm" href="/transparence">
                  Financements et donateurs
                </a>
              </li>
              <li>
                <a className="font-light text-sm" href="/importancedon">
                  A quoi servent vos dons
                </a>
              </li>
              <li>
                <a className="font-light text-sm" href="/toutsavoirsurledon">
                  Tout savoir sur le don régulier
                </a>
              </li>
              <li>
                <a className="font-light text-sm" href="/questions-don">
                  Toutes les questions sur le don
                </a>
              </li>
            </ul>
          </div>
          {/* Section "Notre Travail" */}
          <div>
            <h3 className="text-lg font-bold mb-4">NOTRE TRAVAIL</h3>
            <ul>
              <li>
                <a className="font-light text-sm" href="">
                  Aide sanitaire
                </a>
              </li>
              <li>
                {" "}
                <a className="font-light text-sm" href="">
                  Assistance et services humanitaires
                </a>
              </li>
            </ul>
          </div>
          {/* Section "Médias et Ressources" */}
          <div>
            <h3 className="text-lg font-bold mb-4">MÉDIAS & RESSOURCES</h3>
            <ul>
              <li>
                <a
                  className="font-light text-sm"
                  href="/load-data/communicated"
                >
                  Communiqués de presse
                </a>
              </li>
              <li>
                <a className="font-light text-sm" href="/data-loading/blogs">
                  Publications
                </a>
              </li>
            </ul>
            <h3 className="text-lg font-bold mt-6 mb-4">IMPLIQUEZ-VOUS</h3>
            <ul>
              <li>
                <a className="font-light text-sm" href="/job_openings">
                  Carrières
                </a>
              </li>
              <li>Collaborez avec nous</li>
              <li>
                <a className="font-light text-sm" href="/community/join">
                  Devenez volontaire ou membre de COSAMED
                </a>
              </li>
            </ul>
          </div>
          {/* Section "Urgences" */}
          <div>
            <h3 className="text-lg font-bold mb-4">URGENCE</h3>
            <button
              onClick={donatelink}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              {t("Donate")}
            </button>
          </div>
        </div>
        {/* Logo et copyright */}
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
