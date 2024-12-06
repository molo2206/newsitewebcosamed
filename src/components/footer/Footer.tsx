import { useState } from "react";
import { useTranslation } from "react-i18next";
import useAsync from "../../hooks/useAsync";
import SettingsServices from "../../services/SettingsServices";
import { showingTranslateValue } from "../../utils/heleprs";
import { FaLocationArrow, FaMobileAlt } from "react-icons/fa";
import FooterLinks from "./FooterLinks";
import { useAuthContext } from "../../context/useAuthContext";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  const { lang } = useAuthContext();
  const { data } = useAsync(() => SettingsServices.getSettings());
  const { data: dataadress } = useAsync(() => SettingsServices.getAdresse());
  const navigation = useNavigate();
  const donatelink = () => {
    navigation("/donation"); // new line
  };

  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    return `${year}`;
  }
  const [currentDate] = useState(getDate());

  const importantLinks = [
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Vision",
      path: "/vision",
    },
  ];
  const Links = [
    {
      id: 1,
      name: "Transparence financière",
      path: "/transparence",
    },
    {
      id: 2,
      name: "A quoi servent vos dons",
      path: "/importancedon",
    },
    {
      id: 3,
      name: "Tout savoir sur le don régulier",
      path: "/toutsavoirsurledon",
    },
    {
      id: 4,
      name: "Toutes les questions sur le don",
      path: "/questions-don",
    },
  ];
  return (
    <>
      <footer className="text-white  bg-gradient-to-r bg-principal dark:bg-slate-800  font-montserrat">
        {/* <div className=" container mx-auto  p-4">
         
          <div className="grid py-2 md:grid-cols-4 header__sticky text-sm font-montserrat">
            <div className="px-2 py-4">
              <p
                className="md:text-sm sm:text-sm"
                dangerouslySetInnerHTML={{
                  __html: showingTranslateValue(data?.translations, lang)
                    ?.about_us,
                }}
              ></p>
              <br />
              <div className=" flex items-center gap-3 ">
                <FaLocationArrow />
                <p className="md:text-sm sm:text-sm ">{dataadress?.adresse}</p>
              </div>
              <div className=" flex items-center gap-3 mt-3">
                <FaMobileAlt />
                <p className="md:text-sm sm:text-sm">
                  <a className="font-light text-sm"  href={"tel:" + dataadress?.phones}>{dataadress?.phones}</a>
                </p>
              </div>
            </div>
            <div className=" grid grid-cols-2 sm:grid-cols-3 md:pl-10 col-span-2">
              <div className="px-4 py-8">
                <h1 className=" mb-3 text-justify md:text-sm sm:text-sm">
                  {t("Who_are_we")}
                </h1>
                <ul className=" flex flex-col gap-3  text-sm">
                  <FooterLinks links={importantLinks} />
                </ul>
              </div>
              <div className="px-4 py-8">
                <h1 className=" mb-3 text-justify  md:text-sm sm:text-sm ">
                  {t("The_gift_and_you")}
                </h1>
                <ul className=" flex flex-col gap-3 md:text-sm sm:text-sm">
                  <FooterLinks links={Links} />
                </ul>
              </div>
            </div>
            
          </div>
        
          <div className=" bottom-footer">
            <div className="md:inline-flex my-10 md:ml-10 rounded-sm w-full  justify-center">
              <img
                src={data?.logo1}
                alt="Logo"
                className=" object-center sticky-logo  sm:w-60 "
              />
            </div>
          </div>
          <div className=" bottom-footer">
            <p className=" border-t-2 border-gray-300/50 py-8 text-center">
              Politique de confidentialité © {currentDate}.
            </p>
          </div>
        </div> */}
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
      </footer>
    </>
  );
};

export default Footer;
