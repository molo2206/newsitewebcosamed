import { useEffect, useRef, useState } from "react";
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
import { useLanguageContext } from "../../context/LanguageContext"; // ✅ Contexte langue
import { Globe } from "lucide-react";

function Navbar() {
  const { t } = useTranslation();
  const { sticky } = useSticky();
  const { user, removeSession } = useAuthContext();
  const navigate = useNavigate();

  const { language, setLanguage } = useLanguageContext();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setIsDropdown(!isDropdown);

  const [showMenu, setShowMenu] = useState(false);
  const toggleMe = () => setShowMenu(!showMenu);

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const dropdownRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  const { data: cat } = useAsync(() => CategoryServices.getCategory());
  const { data } = useAsync(() => SettingsServices.getSettings());

  const toggleSubMenu = (menuKey: string) => {
    setOpenMenus((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map((key) => [key, false])),
      [menuKey]: !prev[menuKey],
    }));
  };

  const handleLogout = () => {
    removeSession();
    navigate("/auth/signin", { replace: true });
  };

  const handleGoBack = () => navigate("/aboutmedia");
  const home = () => navigate("/");
  const navigateNewsletter = () => navigate(`/data-loading/newsletters`);
  const navigateJobopen = () => navigate(`/data-loading/jobopenings`);
  const navigateProject = () => navigate(`/projects`);
  const navigateJobOpening = () => navigate(`/job_openings`);
  const navigateReport = () => navigate(`/data-loading/reports`);
  const navigateCommunicated = () => navigate(`/load-data/communicated`);
  const navigateVideo = () => navigate(`/data-loading/videos`);
  const navigateBlog = () => navigate(`/data-loading/blogs`);
  const navigateGallery = () => navigate(`/data-loading/gallery`);
  const navigateEvent = () => navigate(`/evements`);
  const navigateAbout = () => navigate(`/about`);
  const navigateContact = () => navigate(`/contact`);
  const navigatePartners = () => navigate(`/partners`);
  const navigateGouvernance = () => navigate(`/team`);
  const navigateCommunity = () => navigate(`/community/join`);
  
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

  // Langue : sélection
  const selectLanguage = (lang: string) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  return (
    <>
      <div className="">
        {!user && (
          <div className="bg-blue-50 border border-blue-200 text-sm text-blue-900 flex justify-between items-center p-2  ">
            <p className=" text-sm">
              Connectez-vous pour une meilleure expérience sur le site.
            </p>
            <button className="flex items-center bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700">
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google icon"
                className="w-4 h-4 mr-2 p-2"
              />
              Continuer
            </button>
          </div>
        )}
        <header
          style={{ zIndex: 2 }}
          className={`header__sticky ${
            sticky ? "header-sticky" : ""
          } left-0 right-0 font-light  border-t dark:border-slate-700 bg-principal dark:bg-slate-800 text-white border-primary/50`}
        >
          <nav className="flex items-center justify-between px-4 md:px-8 h-16 lg:h-20">
            <div
              onClick={home}
              className="cursor-pointer w-[140px] sm:w-[160px] md:w-[200px] lg:w-[180px] xl:w-[180px] flex justify-center"
            >
              <img
                src={data?.logo1}
                alt="Logo COSAMED"
                className="max-w-full h-auto object-contain brightness-110 contrast-110"
                loading="lazy"
              />
            </div>

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
                          <div className="h-60 overflow-y-auto grid grid-cols-6 mt-2 p-4 gap-4">
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
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
                              onClick={navigateNewsletter}
                            >
                              {t("Newsletters")}
                            </div>

                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
                              onClick={navigateJobopen}
                            >
                              {t("Jobs")}
                            </div>
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
                              onClick={navigateProject}
                            >
                              {t("Project")}
                            </div>
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
                              onClick={navigateJobOpening}
                            >
                              {t("Careers")}
                            </div>
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
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
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
                              onClick={navigateCommunicated}
                            >
                              {t("Press")}
                            </div>

                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
                              onClick={navigateVideo}
                            >
                              {t("Videos")}
                            </div>
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
                              onClick={navigateBlog}
                            >
                              {t("Blog")}
                            </div>

                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
                              onClick={navigateGallery}
                            >
                              {t("Gallery")}
                            </div>

                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
                              onClick={navigateEvent}
                            >
                              {t("Events")}
                            </div>
                          </div>
                          <div className=" flex items-center justify-center p-4">
                            <button
                              onClick={handleGoBack}
                              className="h-[60px] w-full  
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
                              className="cursor-pointer  text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
                              onClick={navigateAbout}
                            >
                              {t("AboutUs")}
                            </div>
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
                              onClick={navigateContact}
                            >
                              {" "}
                              {t("Contact")}
                            </div>
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
                              onClick={navigatePartners}
                            >
                              {" "}
                              {t("Partnerships")}
                            </div>

                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
                              onClick={navigateGouvernance}
                            >
                              {t("Governance")}
                            </div>
                            <div
                              className="cursor-pointer text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full bg-principal sm:bg-transparent "
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
                <li className="group relative cursor-pointer w-[140px] rounded-md flex justify-center">
                  <div className="relative hidden md:block">
                    <button
                      className="bg-white text-principal px-3 py-2 text-xs font-semibold rounded-md flex items-center gap-1"
                      onClick={toggleDropdown}
                    >
                      <Globe className="w-4 h-4" />
                      <ReactCountryFlag
                        countryCode={language === "fr" ? "FR" : "GB"}
                        svg
                        style={{ width: "1.2em", height: "1.2em" }}
                        title={language === "fr" ? "Français" : "English"}
                      />
                      <span>{language.toUpperCase()}</span>
                      <span className="ml-1">▼</span>
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-1 w-[140px] bg-principal dark:bg-slate-800 dark:border border-slate-700 shadow-lg z-40 rounded-md">
                        <button
                          className={`flex items-center gap-2 w-full px-4 py-2 text-xs font-semibold rounded-md ${
                            language === "en"
                              ? "bg-hover text-white"
                              : "text-white hover:bg-hover"
                          }`}
                          onClick={() => selectLanguage("en")}
                        >
                          <ReactCountryFlag
                            countryCode="GB"
                            svg
                            style={{ width: "1.2em", height: "1.2em" }}
                            title="English"
                          />
                          English
                        </button>
                        <button
                          className={`flex items-center gap-2 w-full px-4 py-2 text-xs font-semibold rounded-md ${
                            language === "fr"
                              ? "bg-hover text-white"
                              : "text-white hover:bg-hover"
                          }`}
                          onClick={() => selectLanguage("fr")}
                        >
                          <ReactCountryFlag
                            countryCode="FR"
                            svg
                            style={{ width: "1.2em", height: "1.2em" }}
                            title="Français"
                          />
                          Français
                        </button>
                      </div>
                    )}
                  </div>
                </li>

                <div className="relative mt-2">
                  <button
                    onClick={toggleMenu}
                    className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden focus:outline-none hover:bg-gray-400 transition"
                    aria-label="User menu"
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

                  {isDropdown && (
                    <>
                      <div
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50
                   origin-top-right animate-scale-in"
                      >
                        <div className="flex flex-col items-center p-4 border-b border-gray-200 dark:border-gray-700">
                          {!user?.image ? (
                            <FaUserCircle className="text-gray-500 dark:text-gray-300 w-12 h-12" />
                          ) : (
                            <img
                              src={user.image}
                              alt="Profil"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          <span className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100 truncate max-w-full text-center">
                            {user?.email}
                          </span>
                        </div>

                        <ul className="py-2 text-gray-700 dark:text-gray-300 text-sm">
                          <li
                            onClick={() =>
                              navigate(
                                "/recruiting/cosamed/job_openings/accountsettings"
                              )
                            }
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                          >
                            {t("My_profile")}
                          </li>
                          <li
                            onClick={() => navigate("/job_openings/userHome")}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                          >
                            {t("My_applications")}
                          </li>
                          {!user ? (
                            <li
                              onClick={() => navigate("/auth/signin")}
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                            >
                              {t("Login")}
                            </li>
                          ) : (
                            <li
                              onClick={handleLogout}
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
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
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                          >
                            {t("Register")}
                          </li>
                        </ul>
                      </div>

                      {/* Overlay pour fermer au clic en dehors */}
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
