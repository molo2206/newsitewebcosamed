/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import {
  FaBars,
  FaCaretDown,
  FaLayerGroup,
  FaVideo,
  FaXmark,
} from "react-icons/fa6";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import ReactCountryFlag from "react-country-flag";
import { useAuthContext } from "../../context";
import { FaBlog, FaHome, FaQuestionCircle } from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import SettingsServices from "../../services/SettingsServices";
import useAsync from "../../hooks/useAsync";
import CategoryServices from "../../services/CategoryServices";

interface props {
  isMenuOpens?: any;
}

const Respo = ({ isMenuOpens }: props) => {
  const { data } = useAsync(() => SettingsServices.getSettings());
  const { data: cat } = useAsync(() => CategoryServices.getCategory());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const element = document.documentElement;
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const { handleLanguageChange, lang } = useAuthContext();
  const { t } = useTranslation();
  //set toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  //nav items array
  const navItems = [
    { path: t("Home"), link: "/" },
    { path: t("Videos"), link: "/videos" },
    { path: t("Blog"), link: "/blogs" },
    { path: t("AboutUs"), link: "about" },
    { path: "Contact", link: "/contact" },
    { path: t(""), link: "faq" },
  ];
  return (
    <div>
      <div
        className={` space-y-4 px-4 mt-16 py-7 bg-brandPrimary ${
          isMenuOpen ? " block fixed top-0 right-0 left-0" : "hidden"
        }`}
      >
        {navItems.map(({ link, path }) => (
          <a
            href={link}
            className=" block text-base text-white hover:text-slate-400 first:font-medium"
          >
            {path}
          </a>
        ))}

        {theme === "dark" ? (
          <BiSolidSun
            className="text-xl cursor-pointer text-stone-200 "
            onClick={() => setTheme("light")}
          />
        ) : (
          <BiSolidMoon
            className="text-xl cursor-pointer text-stone-200 "
            onClick={() => setTheme("dark")}
          />
        )}
        <a
          href="https://admin.elezardc.org/auth/login"
          className="  text-base text-white hover:text-slate-400 first:font-medium"
        >
          Login
        </a>
        <ul>
          <li className=" group relative cursor-pointer ">
            <a className="flex items-center gap-[20px] h-[50px]  dark:text-slate-300 text-gray-200  font-bold ">
              {lang === "en" ? "Anglais" : "Français"}
              <span>
                <FaCaretDown
                  className=" transition-all 
                      duration-200 "
                />
              </span>
            </a>
            {/* dropdown section */}
            <div className="dropdown-lg absolute -center-9 z-[99999] hidden w-[120px] rounded-lg bg-white p-2 shadow-md text-black  group-hover:block">
              <ul className="">
                <li
                  role="button"
                  onClick={() => handleLanguageChange("fr")}
                  className="p-2  hover:text-principal cursor-pointer"
                >
                  <a className="">
                    <ReactCountryFlag
                      className="emojiFlag mr-2"
                      countryCode="FR"
                      svg
                      cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                      cdnSuffix="svg"
                      title="FR"
                    />
                    Français
                  </a>
                </li>
                <li
                  role="button"
                  onClick={() => handleLanguageChange("en")}
                  className="p-2  hover:text-principal cursor-pointer"
                >
                  <a>
                    <ReactCountryFlag
                      className="emojiFlag mr-2"
                      countryCode="US"
                      svg
                      cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                      cdnSuffix="svg"
                      title="US"
                    />
                    Anglais
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Respo;
