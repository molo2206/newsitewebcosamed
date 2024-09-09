import { useState } from "react";
import { useTranslation } from "react-i18next";
import useAsync from "../../hooks/useAsync";
import SettingsServices from "../../services/SettingsServices";
import { showingTranslateValue } from "../../utils/heleprs";
import {
  FaFacebook,
  FaLinkedinIn,
  FaLocationArrow,
  FaMobileAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import FooterLinks from "./FooterLinks";
import { useAuthContext } from "../../context/useAuthContext";

const Footer = () => {
  const { t } = useTranslation();
  const { lang } = useAuthContext();
  const { data } = useAsync(() => SettingsServices.getSettings());
  const { data: dataadress } = useAsync(() => SettingsServices.getAdresse());

  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    return `${year}`;
  }
  const [currentDate] = useState(getDate());

  const importantLinks = [
    {
      name: "Mission",
    },
    {
      name: "Vision",
    },
  ];
  const Links = [
    {
      id : 1,
      name: "Transparence financière",
    },
    {
      id : 2,
      name: "A quoi servent vos dons",
    },
    {
      id : 3,
      name: "Tout savoir sur le don régulier",
    },
    {
      id : 4,
      name: "Toutes les questions sur le don",
    },
  ];
  return (
    <>
      <footer className="text-white  bg-gradient-to-r bg-principal font-montserrat">
        <div className=" container mx-auto  p-4">
          {/* Footer Contain section */}
          <div className="grid py-2 md:grid-cols-3 header__sticky text-sm font-montserrat">
            <div className="px-2 py-4">
              <p
                className="text-lg"
                dangerouslySetInnerHTML={{
                  __html: showingTranslateValue(data?.translations, lang)
                    ?.about_us,
                }}
              ></p>
              <br />
              <div className=" flex items-center gap-3 ">
                <FaLocationArrow />
                <p className="font-montserrat text-sm font-semibold">
                  {dataadress?.adresse}
                </p>
              </div>
              <div className=" flex items-center gap-3 mt-3">
                <FaMobileAlt />
                <p className=" font-montserrat text-sm font-semibold">
                  <a href={"tel:" + dataadress?.phones}>{dataadress?.phones}</a>
                </p>
              </div>
            </div>
            <div className=" grid grid-cols-2 sm:grid-cols-3 md:pl-10 col-span-2">
              <div className="px-4 py-8">
                <h1 className=" mb-3 text-justify font-montserrat text-2xl font-semibold ">
                  {t("Who_are_we")}
                </h1>
                <ul className=" flex flex-col gap-3 font-montserrat text-sm font-semibold">
                  <FooterLinks links={importantLinks} />
                </ul>
              </div>
              <div className="px-4 py-8">
                <h1 className=" mb-3 text-justify font-montserrat text-2xl font-semibold ">
                  Le don et vous
                </h1>
                <ul className=" flex flex-col gap-3 ">
                  <FooterLinks links={Links} />
                </ul>
              </div>

              <div className="px-4 py-8">
                <h1 className=" mb-3 text-justify font-montserrat text-2xl font-semibold ">
                  {t("Social")}
                </h1>
                <div className=" flex flex-col gap-3">
                  <h1>{t("Suscribe")}</h1>
                  {/* <input
                    type="text"
                    placeholder="Enter your email"
                    className="rounded-full px-3 py-1 text-black
                     focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  /> */}
                  <div className="flex gap-3 mr-6 items-center">
                    <a
                      href={JSON.parse(data?.social_links || "{}")?.twitter}
                      target="_black"
                      className=" duration-200 hover:scale-105"
                    >
                      <FaTwitter className=" text-3xl" />
                    </a>
                    <a
                      href={JSON.parse(data?.social_links || "{}")?.facebook}
                      className=" duration-200 hover:scale-105"
                      target="_black"
                    >
                      <FaFacebook className=" text-3xl" />
                    </a>
                    <a
                      href={JSON.parse(data?.social_links || "{}")?.linkedin}
                      className=" duration-200 hover:scale-105"
                      target="_black"
                    >
                      <FaLinkedinIn className=" text-3xl" />
                    </a>
                    <a
                      href={JSON.parse(data?.social_links || "{}")?.youtube}
                      className=" duration-200 hover:scale-105"
                      target="_black"
                    >
                      <FaYoutube className=" text-3xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*    Footer copyright section */}
          <div className=" bottom-footer">
            <div className="md:inline-flex my-10 md:ml-10 zrounded-sm w-full  justify-center">
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
        </div>
      </footer>
    </>
  );
};

export default Footer;
