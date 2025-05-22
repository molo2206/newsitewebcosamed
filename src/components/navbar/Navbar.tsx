import { useEffect, useState } from "react";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { FaBars, FaUserCircle } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
import useSticky from "../../hooks/useSticky";
import SettingsServices from "../../services/SettingsServices";
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
  const { handleLanguageChange } = useAuthContext();

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const browserLang = navigator.language || navigator.languages[0];
    const lang = browserLang.startsWith("en") ? "en" : "fr";

    setSelectedLanguage(lang);
    handleLanguageChange(lang);
  }, []);

  const selectLanguage = (language: any) => {
    setSelectedLanguage(language);
    setDropdownOpen(false);
    handleLanguageChange(language);
  };

  const { t } = useTranslation();
  const { sticky } = useSticky();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const [isDropdown, setIsDropdown] = useState(false);
  const toggleMenu = () => setIsDropdown(!isDropdown);

  const { user, removeSession } = useAuthContext();
  const handleLogout = () => {
    removeSession();
    navigate("/auth/signin", { replace: true });
  };

  const { data: cat } = useAsync(() => CategoryServices.getCategory());
  const { data } = useAsync(() => SettingsServices.getSettings());

  const [showMenu, setShowMenu] = useState(false);
  const element = document.documentElement;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/aboutmedia"); // new line
  };

  const home = () => {
    navigate("/"); // new line
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
          } left-0 right-0 lg:max-xl font-light bg-principal dark:bg-slate-800 text-white dark:border-t border-slate-700 border-primary/50`}
        >
          <nav className="flex items-center md:w-full justify-between p-2 h-18 lg:h-20 md:h-20 sm:h-12 dark:bg-slate-800 text-white">
            {/* logo */}
            {/* Logo selection */}
            <div className="text-white cursor-pointer md:p-8 lg:p-12 flex justify-center items-center">
              <div onClick={() => home()}>
                <img
                  src={data?.logo1}
                  alt="Logo"
                  className={`h-16 md:h-24 transition-all duration-300 ${
                    sticky ? "opacity-100 scale-100" : "opacity-75 scale-90"
                  }`}
                />
              </div>
            </div>
            {/* Desktop menu selection */}
            <div className="hidden md:flex justify-center font-light w-full">
              <ul className="flex items-center gap-8 justify-center font-semibold">
                <li className="group cursor-pointer ">
                  <a className="flex items-center gap-[2px] h-[40px] dark:text-white text-sm   hover:text-slate-300 ">
                    {t("Themes")}
                  </a>
                  <div
                    className="dropdown icon absolute left-0 z-[99999] hidden w-full rounded-b-3xl bg-white text-black
                 dark:bg-gray-800 dark:text-white p-2 t ext-black shadow-md group-hover:block"
                  >
                    <div className="grid grid-cols-4 gap-6 ">
                      <div className="col-span-4">
                        <p className=" text-xs">
                          <div className=" grid grid-cols-4 mt-4 px-4 space-y-2">
                            {cat.map((item: any, index: number) => (
                              <div key={index}>
                                <CategoryCard cat={item} />
                              </div>
                            ))}
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="group cursor-pointer ">
                  <a className="flex items-center gap-[2px] h-[40px]  line-clamp-1 text-sm hover:text-slate-300 ">
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
                            className="hover:text-hover  p-4 dark:text-white  text-principal cursor-pointer 
                              w-full  rounded-full lg:text-sm font-light
                              md:text-sm"
                            onClick={navigateNewsletter}
                          >
                            {t("Newsletters")}
                          </div>

                          <div
                            className="hover:text-hover  p-4 dark:text-white  text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateJobopen}
                          >
                            {t("Jobs")}
                          </div>
                          <div
                            className="hover:text-hover  p-4 dark:text-white  text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateProject}
                          >
                            {t("Project")}
                          </div>
                          <div
                            className="hover:text-hover  p-4 dark:text-white  text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateJobOpening}
                          >
                            {t("Careers")}
                          </div>
                          <div
                            className="hover:text-hover  p-4 dark:text-white  text-principal cursor-pointer 
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
                <li className=" group cursor-pointer ">
                  <a className="flex items-center gap-[2px] h-[40px] text-sm hover:text-slate-300 ">
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
                            className="hover:text-hover  p-4 dark:text-white  text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateCommunicated}
                          >
                            {t("Press")}
                          </div>

                          <div
                            className="hover:text-hover  p-4 dark:text-white  text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateVideo}
                          >
                            {t("Videos")}
                          </div>
                          <div
                            className="hover:text-hover  p-4 dark:text-white  text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateBlog}
                          >
                            {t("Blog")}
                          </div>

                          <div
                            className="hover:text-hover  p-4 dark:text-white  text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                            onClick={navigateGallery}
                          >
                            {t("Gallery")}
                          </div>

                          <div
                            className="hover:text-hover  p-4 dark:text-white  text-principal cursor-pointer 
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
                  <div
                    onClick={() => navigate("/data-loading/Ai4Mpox")}
                    className="flex items-center gap-[2px] h-[40px] text-sm  hover:text-slate-300 "
                  >
                    {t("AI4Mpox")}
                  </div>
                </li>
                <li className=" group cursor-pointer">
                  <div
                    onClick={() => navigate("/data-loading/jobopenings")}
                    className="flex items-center gap-[2px] h-[40px] text-sm  hover:text-slate-300 "
                  >
                    {t("Jobs")}
                  </div>
                </li>
                <li className=" group cursor-pointer">
                  <a className="flex items-center gap-[2px] h-[40px] text-sm  hover:text-slate-300 ">
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
                              className="hover:text-hover  p-4  dark:text-white  text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                              onClick={navigateAbout}
                            >
                              {t("AboutUs")}
                            </div>
                            <div
                              className="hover:text-hover  p-4  dark:text-white  text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                              onClick={navigateContact}
                            >
                              {" "}
                              {t("Contact")}
                            </div>
                            <div
                              className="hover:text-hover  p-4  dark:text-white  text-principal cursor-pointer 
                             w-full  rounded-full lg:text-sm font-light md:text-sm"
                              onClick={navigatePartners}
                            >
                              {" "}
                              {t("Partnerships")}
                            </div>

                            <div
                              className="hover:text-hover  p-4  dark:text-white  text-principal cursor-pointer 
                            w-full  rounded-full lg:text-sm font-light md:text-sm"
                              onClick={navigateGouvernance}
                            >
                              {t("Governance")}
                            </div>
                            <div
                              className="hover:text-hover  p-4  dark:text-white  text-principal cursor-pointer 
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
                      className="flex items-center gap-2 bg-principale text-sm text-white px-4 py-2 rounded"
                      onClick={toggleDropdown}
                    >
                      <ReactCountryFlag
                        countryCode={selectedLanguage === "en" ? "GB" : "FR"}
                        svg
                        style={{
                          width: "1.2em",
                          height: "1.2em",
                        }}
                        title={selectedLanguage === "en" ? "English" : "French"}
                      />
                      {selectedLanguage === "en" ? "English" : "French"}
                      <span className="ml-2 px-2">▼</span>
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div
                        className="absolute right-0 mt-1 w-[140px]  bg-principal  dark:bg-slate-800 dark:border border-slate-700
                         rounded-lg shadow-lg z-20"
                      >
                        <button
                          className="flex items-center gap-2 w-full text-sm md:text-sm px-4 py-2 hover:bg-hover rounded text-white"
                          onClick={() => selectLanguage("en")}
                        >
                          <ReactCountryFlag
                            countryCode="GB"
                            svg
                            style={{
                              width: "1.2em",
                              height: "1.2em",
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
                              width: "1.2em",
                              height: "1.2em",
                            }}
                            title="French"
                          />
                          French
                        </button>
                      </div>
                    )}
                  </div>
                </li>
                <div className="px-6 flex">
                  {theme === "dark" ? (
                    <BiSolidSun
                      size={30}
                      className="text-sm cursor-pointer rounded-full border border-slate-400 dark:border-slate-700 "
                      onClick={() => setTheme("light")}
                    />
                  ) : (
                    <BiSolidMoon
                      size={30}
                      className="text-sm cursor-pointer rounded-full border border-slate-400 dark:border-slate-700"
                      onClick={() => setTheme("dark")}
                    />
                  )}
                </div>
                <div className="relative mt-2">
                  <button
                    onClick={toggleMenu}
                    className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden focus:outline-none"
                  >
                    {!user?.image ? (
                      <FaUserCircle className="text-principal w-10 h-10" />
                    ) : (
                      <img
                        src={user.image}
                        alt="Profil"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                  </button>

                  {/* Menu déroulant */}
                  {isDropdown && (
                    <>
                      <div
                        className="absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-principal dark:bg-slate-800 border border-gray-400 dark:border-slate-700 
                 rounded-xl shadow-xl z-50 transition-all duration-200"
                      >
                        <div className="flex flex-col items-center justify-center p-4 space-y-2">
                          {/* {!user?.image ? (
                            <FaUserCircle className="text-gray-600 dark:text-white w-12 h-12" />
                          ) : (
                            <img
                              src={user.image}
                              alt="Profil"
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          )} */}
                          <span className=" dark:text-white text-center">
                            <a
                              style={{ fontSize: "12px" }}
                              href="#"
                              className=" line-clamp-0"
                            >
                              {user?.email}
                            </a>
                          </span>
                        </div>

                        <ul className="text-sm text-white dark:text-white">
                          <li
                            onClick={() =>
                              navigate(
                                "/recruiting/cosamed/job_openings/accountsettings"
                              )
                            }
                            className="px-4 py-3 hover:bg-hover  rounded-xl dark:hover:bg-slate-700 cursor-pointer rounded-b"
                          >
                            {t("My_profile")}
                          </li>
                          <li
                            onClick={() => navigate("/job_openings/userHome")}
                            className="px-4 py-3 hover:bg-hover  rounded-xl dark:hover:bg-slate-700 cursor-pointer"
                          >
                            {t("My_applications")}
                          </li>
                          {!user ? (
                            <li
                              onClick={() => navigate("/auth/signin")}
                              className="px-4 py-3 hover:bg-hover  rounded-xl dark:hover:bg-slate-700 cursor-pointer"
                            >
                              {t("Login")}
                            </li>
                          ) : (
                            <li
                              onClick={handleLogout}
                              className="px-4 py-3 hover:bg-hover  rounded-xl dark:hover:bg-slate-700 cursor-pointer"
                            >
                              {t("Logout")}
                            </li>
                          )}
                          <li
                            onClick={() =>
                              navigate(
                                "/recruiting/cosamed/job_openings/register"
                              )
                            }
                            className="px-4 py-3 hover:bg-hover  rounded-xl dark:hover:bg-slate-700 cursor-pointer"
                          >
                            {t("Register")}
                          </li>
                        </ul>
                      </div>

                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsDropdown(false)}
                      />
                    </>
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
              {/* Avatar utilisateur */}
            </div>
          </nav>
        </header>
        {/* Mobile menu section  dropdown */}
        <ResponsiveMenu
          showMenu={showMenu}
          onClose={() => setShowMenu(false)}
        />
      </div>
    </>
  );
}

export default Navbar;
