import { useEffect, useState } from "react";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { FaBars, FaCaretDown } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
import useSticky from "../../hooks/useSticky";
import SettingsServices from "../../services/SettingsServices";
import { Link } from "react-router-dom";

import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../context";
import { ToastContainer } from "react-toastify";
import CategoryServices from "../../services/CategoryServices";
import useAsync from "../../hooks/useAsync";
import CategoryCard from "../blogs/CategoryCard";
import { useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

function Navbar() {
  const { handleLanguageChange, lang } = useAuthContext();
  const { t } = useTranslation();
  const { sticky } = useSticky();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const [selectedLanguage, setSelectedLanguage] = useState("fr");
  const selectLanguage = (language: any) => {
    setSelectedLanguage(language);
    setDropdownOpen(false);
    handleLanguageChange(language);
  };

  const { data: cat } = useAsync(() => CategoryServices.getCategory());
  const { data } = useAsync(() => SettingsServices.getSettings());

  const [showMenu, setShowMenu] = useState(false);
  const element = document.documentElement;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/aboutmedia"); // new line
  };
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [theme]);
  const toggleMe = () => {
    setShowMenu(!showMenu);
  };
  const navigateNewsletter = () => {
    navigate(`/data-loading/newsletters`); // Remplace "/about" par la route cible
  };
  const navigateJobopen = () => {
    navigate(`/data-loading/jobopenings`);
  };

  const navigateProject = () => {
    navigate(`/projects`);
  };

  const navigateJobOpening = () => {
    navigate(`/job_openings`);
  };
  const navigateReport = () => {
    navigate(`/data-loading/reports`);
  };

  const navigateCommunicated = () => {
    navigate(`/load-data/communicated`);
  };
  const navigateVideo = () => {
    navigate(`/data-loading/videos`);
  };
  const navigateBlog = () => {
    navigate(`/data-loading/blogs`);
  };

  const navigateGallery = () => {
    navigate(`/data-loading/gallery`);
  };
  const navigateEvent = () => {
    navigate(`/evements`);
  };

  const navigateAbout = () => {
    navigate(`/about`);
  };
  const navigateContact = () => {
    navigate(`/contact`);
  };
  const navigatePartners = () => {
    navigate(`/partners`);
  };
  const navigateGouvernance = () => {
    navigate(`/team`);
  };
  const navigateCommunity = () => {
    navigate(`/community/join`);
  };
  return (
    <>
      <div className="">
        <header
          style={{ zIndex: 2 }}
          className={`header__sticky ${
            sticky ? "header-sticky" : ""
          } left-0 right-0  lg:max-xl font-light bg-principal   dark:bg-slate-800  text-white border-b-[1px] border-primary/50 `}
        >
          <nav className=" flex items-center md:w-full justify-between lg:h-14 md:h-14 sm:h-10  dark:bg-slate-800  text-white ">
            {/* Logo selection */}
            <div className=" text-white md:p-12  ">
              <a className={`${sticky ? "block" : "hidden"}`}>
                <Link to="/" onClick={() => window.scrollTo}>
                  <img
                    src={data?.logo1}
                    alt=""
                    className="sticky-logo   w-full h-full"
                  />
                </Link>
              </a>
              <a className={`${!sticky ? "block" : "hidden"}`}>
                <Link to="/" onClick={() => window.scrollTo}>
                  <img
                    src={data?.logo1}
                    alt=""
                    className="sticky-logo  w-full h-full"
                  />
                </Link>
              </a>
            </div>
            {/* Desktop menu selection */}
            <div className="hidden md:block font-light ">
              <ul className="flex top-12 left-0 right-0  items-center gap-10 font-light">
                <li className="group cursor-pointer ">
                  <a className="flex items-center gap-[2px] h-[40px] ">
                    {t("Themes")}
                  </a>
                  <div
                    className="dropdown icon absolute left-0 z-[99999] hidden w-full rounded-b-3xl bg-white text-black
                 dark:bg-gray-800 dark:text-white p-2 t ext-black shadow-md group-hover:block"
                  >
                    <div className="grid grid-cols-2 gap-5 ">
                      <div className="col-span-2">
                        <p className=" text-xs">
                          <div className=" grid grid-cols-5 mt-6">
                            {cat.map((item: any, index: number) => (
                              <div>
                                <CategoryCard cat={item} key={index} />
                              </div>
                            ))}
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="group cursor-pointer ">
                  <a className="flex items-center gap-[2px] h-[40px]  line-clamp-1">
                    {t("Emergency")}
                  </a>
                  {/* dropdown full width section */}
                  <div
                    className="dropdown icon absolute left-0 z-[99999] hidden w-full rounded-b-3xl
                  bg-white text-black
                  dark:bg-gray-800 dark:text-white p-4 text-black shadow-md group-hover:block"
                  >
                    <div className="grid grid-cols-5 gap-5 ">
                      <div className="col-span-5">
                        <div className="grid grid-cols-5 ">
                          <div
                            className="hover:text-hover  p-4  text-principal cursor-pointer 
                              w-full  rounded-full lg:text-sm font-light
                              md:text-sm"
                            onClick={navigateNewsletter}
                          >
                            {t("Newsletters")}
                          </div>

                          <div
                            className="hover:text-hover  p-4 text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateJobopen}
                          >
                            {t("Jobs")}
                          </div>
                          <div
                            className="hover:text-hover  p-4 text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateProject}
                          >
                            {t("Project")}
                          </div>
                          <div
                            className="hover:text-hover  p-4 text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateJobOpening}
                          >
                            {t("Careers")}
                          </div>
                          <div
                            className="hover:text-hover  p-4 text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateReport}
                          >
                            {t("Reports")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className=" group cursor-pointer">
                  <a className="flex items-center gap-[2px] h-[40px] ">
                    {t("Newsroom")}
                  </a>
                  <div
                    className="dropdown icon  absolute left-0 z-[99999] hidden w-full rounded-b-3xl bg-white text-black
                 dark:bg-gray-800 dark:text-white p-4 text-black shadow-md group-hover:block"
                  >
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-4 ">
                        <div className=" grid grid-cols-5 ">
                          <div
                            className="hover:text-hover  p-4 text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateCommunicated}
                          >
                            {t("Press")}
                          </div>

                          <div
                            className="hover:text-hover  p-4 text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateVideo}
                          >
                            {t("Videos")}
                          </div>
                          <div
                            className="hover:text-hover  p-4 text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateBlog}
                          >
                            {t("Blog")}
                          </div>

                          <div
                            className="hover:text-hover  p-4 text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateGallery}
                          >
                            {t("Gallery")}
                          </div>

                          <div
                            className="hover:text-hover  p-4 text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateEvent}
                          >
                            {t("Events")}
                          </div>
                        </div>
                        <div className=" flex items-center justify-center py-2">
                          <button
                            onClick={handleGoBack}
                            className="h-[60px] w-full rounded-lg 
                              bg-principal  text-white  hover:text-white hover:bg-hover font-semibold text-center"
                          >
                            {t("Find_More")}
                            <ToastContainer />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className=" group cursor-pointer">
                  <a className="flex items-center gap-[2px] h-[40px] ">
                    {t("AboutUs")}
                  </a>
                  <div
                    className="dropdown icon absolute left-0 z-[99999] hidden w-full rounded-b-3xl
                  bg-white text-black
                  dark:bg-gray-800 dark:text-white p-4 t ext-black shadow-md group-hover:block"
                  >
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-4 ">
                        <p className=" text-sm ">
                          <div className=" grid grid-cols-5 ">
                            <div
                              className="hover:text-hover  p-4 text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                              onClick={navigateAbout}
                            >
                              {t("AboutUs")}
                            </div>
                            <div
                              className="hover:text-hover  p-4 text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                              onClick={navigateContact}
                            >
                              {" "}
                              {t("Contact")}
                            </div>
                            <div
                              className="hover:text-hover  p-4 text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                              onClick={navigatePartners}
                            >
                              {" "}
                              {t("Partnerships")}
                            </div>

                            <div
                              className="hover:text-hover  p-4 text-principal cursor-pointer 
                            w-full  rounded-full lg:text-sm font-light md:text-sm"
                              onClick={navigateGouvernance}
                            >
                              {t("Governance")}
                            </div>
                            <div
                              className="hover:text-hover  p-4 text-principal cursor-pointer 
                            w-full  rounded-full lg:text-sm font-light md:text-sm"
                              onClick={navigateCommunity}
                            >
                              {t("Becom_member")}
                            </div>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>

                <li className=" group relative cursor-pointer border border-slate-400 dark:border-slate-700 w-[140px] rounded-lg flex justify-center">
                  <div className="relative hidden md:block">
                    {/* Bouton principal */}
                    <button
                      className="flex items-center gap-2 bg-principale text-sm md:text-sm text-white px-4 py-2 rounded"
                      onClick={toggleDropdown}
                    >
                      <ReactCountryFlag
                        countryCode={selectedLanguage === "en" ? "GB" : "FR"}
                        svg
                        style={{
                          width: "1.5em",
                          height: "1.5em",
                        }}
                        title={selectedLanguage === "en" ? "English" : "French"}
                      />
                      {selectedLanguage === "en" ? "English" : "French"}
                      <span className="ml-2">▼</span>
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-1 w-[140px]  bg-principal  dark:bg-slate-800 dark:border border-slate-700
                         rounded-lg shadow-lg z-20">
                        <button
                          className="flex items-center gap-2 w-full text-sm md:text-sm px-4 py-2 hover:bg-hover rounded text-white"
                          onClick={() => selectLanguage("en")}
                        >
                          <ReactCountryFlag
                            countryCode="GB"
                            svg
                            style={{
                              width: "1.5em",
                              height: "1.5em",
                            }}
                            title="English"
                          />
                          English
                        </button>
                        <button
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm md:text-sm hover:bg-hover rounded"
                          onClick={() => selectLanguage("fr")}
                        >
                          <ReactCountryFlag
                            countryCode="FR"
                            svg
                            style={{
                              width: "1.5em",
                              height: "1.5em",
                            }}
                            title="French"
                          />
                          French
                        </button>
                      </div>
                    )}
                  </div>
                </li>
                {/* Light and dark mode switcher */}
                <div className="px-6 flex">
                  {theme === "dark" ? (
                    <BiSolidSun
                      className="text-xl cursor-pointer "
                      onClick={() => setTheme("light")}
                    />
                  ) : (
                    <BiSolidMoon
                      className="text-xl cursor-pointer "
                      onClick={() => setTheme("dark")}
                    />
                  )}
                </div>
              </ul>
            </div>
            {/* Mobile menu header */}
            <div className="md:hidden flex items gap-4 p-4">
              <button
                onClick={toggleMe}
                className=" focus:outline-none focus:text-gray-200"
              >
                {showMenu ? (
                  <FaXmark className=" h-6 w-6 " />
                ) : (
                  <FaBars className=" h-6 w-6 " />
                )}
              </button>
            </div>
          </nav>
        </header>
        {/* Mobile menu section  dropdown */}
        <ResponsiveMenu showMenu={showMenu} />
      </div>
    </>
  );
}

export default Navbar;
