import { useEffect, useRef, useState } from "react";
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

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const dropdownRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  const toggleSubMenu = (menuKey: string) => {
    setOpenMenus((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map((key) => [key, false])), // ferme les autres
      [menuKey]: !prev[menuKey],
    }));
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isInsideAny = Object.keys(dropdownRefs.current).some((key) => {
        const ref = dropdownRefs.current[key];
        return ref && ref.contains(event.target as Node);
      });

      if (!isInsideAny) {
        setOpenMenus({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="">
        <header
          style={{ zIndex: 2 }}
          className={`header__sticky ${
            sticky ? "header-sticky" : ""
          } left-0 right-0 lg:max-xl font-light bg-principal dark:bg-slate-800 text-white dark:border-t border-slate-700 border-primary/50`}
        >
          <nav className="flex items-center md:w-full justify-between p-6 h-16 lg:h-20 md:h-20 sm:h-12 dark:bg-slate-800 text-white ">
            {/* logo */}
            {/* Logo selection */}
            <div className="text-white cursor-pointer py-4 md:py-6 lg:py-8 flex justify-center items-center">
              <div
                onClick={() => home()}
                className="w-auto max-w-[180px] md:max-w-[220px] lg:max-w-[260px] transition-all duration-300"
              >
                <img
                  src={data?.logo1}
                  alt="Logo"
                  className={`w-full h-auto object-contain transition-all duration-300 ${
                    sticky ? "opacity-100 scale-100" : "opacity-80 scale-95"
                  }`}
                />
              </div>
            </div>

            {/* Desktop menu selection */}
            <div className="hidden md:flex justify-center font-light w-full ">
              <ul className="flex items-center gap-8 justify-center font-semibold">
                <li
                  className=" cursor-pointer "
                  ref={(el) => (dropdownRefs.current["themes"] = el)}
                  onClick={() => toggleSubMenu("themes")}
                >
                  <a
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-[2px] h-[40px] dark:text-white text-sm   hover:text-slate-300 "
                  >
                    {t("Themes")}
                  </a>
                  {openMenus["themes"] && (
                    <div
                      className="dropdown icon absolute left-0 z-[99999]  w-full bg-white text-black
                     dark:bg-gray-800 dark:text-white p-2 mt-4 shadow-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-4">
                          <div className="h-80 overflow-y-auto grid grid-cols-6 mt-4 p-4 gap-4">
                            {cat.map((item: any, index: number) => (
                              <div key={index}>
                                <CategoryCard cat={item} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
                <li
                  ref={(el) => (dropdownRefs.current["emergency"] = el)}
                  className="group cursor-pointer"
                  onClick={() => toggleSubMenu("emergency")}
                >
                  <a
                    className="flex items-center gap-[2px] h-[40px]  line-clamp-1 text-sm hover:text-slate-300 "
                    onClick={(e) => e.preventDefault()}
                  >
                    {t("Emergency")}
                  </a>
                  {/* dropdown full width section */}
                  {openMenus["emergency"] && (
                    <div
                      className="dropdown icon absolute left-0 z-[99999]  w-full bg-white text-black
                     dark:bg-gray-800 dark:text-white p-2 mt-4 shadow-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-4">
                          <div className="grid grid-cols-5 mt-4 px-4 gap-5">
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigateNewsletter}
                            >
                              {t("Newsletters")}
                            </div>

                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigateJobopen}
                            >
                              {t("Jobs")}
                            </div>
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigateProject}
                            >
                              {t("Project")}
                            </div>
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigateJobOpening}
                            >
                              {t("Careers")}
                            </div>
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigateReport}
                            >
                              {t("Reports")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
                <li
                  ref={(el) => (dropdownRefs.current["newsroom"] = el)}
                  className="group cursor-pointer"
                  onClick={() => toggleSubMenu("newsroom")}
                >
                  <a className="flex items-center gap-[2px] h-[40px] text-sm hover:text-slate-300 ">
                    {t("Newsroom")}
                  </a>
                  {openMenus["newsroom"] && (
                    <div
                      className="dropdown icon absolute left-0 z-[99999]  w-full bg-white text-black
                     dark:bg-gray-800 dark:text-white p-2 mt-4 shadow-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-4">
                          <div className="grid grid-cols-5 mt-4 px-4 gap-5">
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigateCommunicated}
                            >
                              {t("Press")}
                            </div>

                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigateVideo}
                            >
                              {t("Videos")}
                            </div>
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigateBlog}
                            >
                              {t("Blog")}
                            </div>

                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigateGallery}
                            >
                              {t("Gallery")}
                            </div>

                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigateEvent}
                            >
                              {t("Events")}
                            </div>
                          </div>
                          <div className=" flex items-center justify-center p-4">
                            <button
                              onClick={handleGoBack}
                              className="h-[60px] w-full rounded-lg 
                              bg-principal dark:bg-gray-700  text-white  hover:text-white hover:bg-hover font-semibold text-center"
                            >
                              {t("Find_More")}
                              <ToastContainer />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
                <li
                  ref={(el) => (dropdownRefs.current["aboutUs"] = el)}
                  className="group cursor-pointer"
                  onClick={() => toggleSubMenu("aboutUs")}
                >
                  <a className="flex items-center gap-[2px] h-[40px] text-sm  hover:text-slate-300 ">
                    {t("AboutUs")}
                  </a>
                  {openMenus["aboutUs"] && (
                    <div
                      className="dropdown icon absolute left-0 z-[99999]  w-full bg-white text-black
                     dark:bg-gray-800 dark:text-white p-2 mt-4 shadow-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-4">
                          <div className="grid grid-cols-5 mt-4 px-4 gap-5">
                            <div
                              className="cursor-pointer  text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigateAbout}
                            >
                              {t("AboutUs")}
                            </div>
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigateContact}
                            >
                              {" "}
                              {t("Contact")}
                            </div>
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigatePartners}
                            >
                              {" "}
                              {t("Partnerships")}
                            </div>

                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigateGouvernance}
                            >
                              {t("Governance")}
                            </div>
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent rounded-lg"
                              onClick={navigateCommunity}
                            >
                              {t("Becom_member")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                <li className=" group relative cursor-pointer border border-slate-400 dark:border-gray-100 w-[140px] rounded-md flex justify-center">
                  <div className="relative hidden md:block">
                    <button
                      className="flex items-center gap-2 bg-principale text-[12px] text-white px-4 py-2 rounded"
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
                         rounded-lg shadow-lg z-40"
                      >
                        <button
                          className="flex items-center gap-2 w-full text-[12px] md:text-[12px] px-4 py-2 hover:bg-hover rounded text-white"
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
                          className="flex items-center gap-2 w-full px-4 py-2 text-[12px] md:text-[12px] hover:bg-hover rounded"
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
                      size={25}
                      className="text-sm cursor-pointer rounded-full border border-slate-400 dark:border-slate-700 "
                      onClick={() => setTheme("light")}
                    />
                  ) : (
                    <BiSolidMoon
                      size={25}
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
                        className="absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-principal dark:bg-slate-800 border border-principal dark:border-slate-700 
                 shadow-xl z-50 transition-all duration-200"
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
                            className="p-4 hover:bg-hover dark:hover:bg-slate-700 cursor-pointer "
                          >
                            {t("My_profile")}
                          </li>
                          <li
                            onClick={() => navigate("/job_openings/userHome")}
                            className="p-4 hover:bg-hover dark:hover:bg-slate-700 cursor-pointer"
                          >
                            {t("My_applications")}
                          </li>
                          {!user ? (
                            <li
                              onClick={() => navigate("/auth/signin")}
                              className="p-4 hover:bg-hover dark:hover:bg-slate-700 cursor-pointer"
                            >
                              {t("Login")}
                            </li>
                          ) : (
                            <li
                              onClick={handleLogout}
                              className="p-4 hover:bg-hover dark:hover:bg-slate-700 cursor-pointer"
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
                            className="p-4 hover:bg-hover dark:hover:bg-slate-700 cursor-pointer"
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
