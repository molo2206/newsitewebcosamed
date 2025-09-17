import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaEnvelope,
  FaGavel,
  FaHandshake,
  FaInfoCircle,
  FaPodcast,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
import useSticky from "../../hooks/useSticky";
import SettingsServices from "../../services/SettingsServices";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { useAuthContext, useThemeContext } from "../../context";
import CategoryServices from "../../services/CategoryServices";
import useAsync from "../../hooks/useAsync";
import CategoryCard from "../blogs/CategoryCard";
import { useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { useLanguageContext } from "../../context/LanguageContext";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import LoginPopup from "../modal/LoginPopup";
import HelpPopup from "../modal/HelpPopup";
import AuthService from "../../services/AuthService";
import {
  FaNewspaper,
  FaVideo,
  FaBlog,
  FaImages,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  FaEnvelopeOpenText,
  FaBriefcase,
  FaUserTie,
  FaFileAlt,
} from "react-icons/fa";
import LogoWithSkeleton from "../cards/LogoWithSkeleton";
function Navbar() {
  const { t } = useTranslation();
  const { sticky } = useSticky();
  const { user, removeSession } = useAuthContext();
  const navigate = useNavigate();
  const { settings, toggleTheme } = useThemeContext();
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

  const home = () => navigate("/");
  const navigateNewsletter = () => navigate(`/data-loading/newsletters`);
  const navigateJobopen = () => navigate(`/data-loading/jobopenings`);
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
  const [showLanguageButton, setShowLanguageButton] = useState(true);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      // Si scrollTop === 0 (tout en haut), on cache le bouton langue
      // Sinon on l'affiche
      if (scrollTop === 0) {
        setShowLanguageButton(false);
      } else {
        setShowLanguageButton(true);
      }
    };

    // Écoute scroll
    window.addEventListener("scroll", handleScroll);

    // Initial check au chargement
    handleScroll();

    // Nettoyage event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const selectLanguage = (lang: string) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };
  const [showPopup, setShowPopup] = useState(true);
  const handleHelpClick = () => {
    // Rediriger vers la page contact ou ouvrir un chat
    window.location.href = "/contact";
  };
  return (
    <>
      <div className="">
        {!user && (
          <LoginPopup
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
            onContinue={() => {
              AuthService.loginWithGoogle();
              setShowPopup(false);
            }}
          />
        )}
        <HelpPopup onHelpClick={handleHelpClick} />
        <header
          style={{ zIndex: 2 }}
          className={`header__sticky ${
            sticky ? "header-sticky" : ""
          } left-0 right-0 font-light border-t dark:border-slate-700 bg-principal dark:bg-slate-800 text-white border-primary/50`}
        >
          <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-4 md:px-8 h-16 lg:h-20">
            <div
              onClick={home}
              className="cursor-pointer w-[140px] sm:w-[160px] md:w-[200px] lg:w-[180px] xl:w-[180px] flex justify-center items-center"
            >
              <LogoWithSkeleton src={data?.logo1} alt="Logo COSAMED" />
            </div>

            <div className="hidden md:flex justify-center font-light w-full  ">
              <ul className="flex items-center gap-8 justify-center font-semibold ">
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
                      className={`absolute left-1/2 z-[99999] max-w-7xl w-full mx-auto bg-white text-black dark:bg-slate-800 dark:text-white
      p-2 mt-4 shadow-md overflow-hidden transition-all duration-300 ease-in-out
      transform -translate-x-1/2
      ${
        openMenus["aboutUs"]
          ? "max-h-[1000px] opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-4"
      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-4 px-4">
                        {/* About Us */}
                        <div
                          className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
      transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
      w-full bg-principal sm:bg-transparent rounded-md flex"
                          onClick={navigateAbout}
                        >
                          <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                            <FaInfoCircle className="text-2xl text-white sm:text-principal" />
                          </div>
                          <div className="flex-1 p-4 sm:p-6">
                            <span className="text-[13px] font-semibold">
                              Cosamed
                            </span>
                            <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                              {t("Learn about our mission, vision and history")}
                            </p>
                          </div>
                        </div>

                        {/* Contact */}
                        <div
                          className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
      transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
      w-full bg-principal sm:bg-transparent rounded-md flex"
                          onClick={navigateContact}
                        >
                          <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                            <FaEnvelope className="text-2xl text-white sm:text-blue-500" />
                          </div>
                          <div className="flex-1 p-4 sm:p-6">
                            <span className="text-[13px] font-semibold">
                              {t("Contact")}
                            </span>
                            <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                              {t(
                                "Reach out to our support or coordination team"
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Partnerships */}
                        <div
                          className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
      transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
      w-full bg-principal sm:bg-transparent rounded-md flex"
                          onClick={navigatePartners}
                        >
                          <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                            <FaHandshake className="text-2xl text-white sm:text-emerald-500" />
                          </div>
                          <div className="flex-1 p-4 sm:p-6">
                            <span className="text-[13px] font-semibold">
                              {t("Partnerships")}
                            </span>
                            <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                              {t(
                                "Discover our strategic partners and collaborators"
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Governance */}
                        <div
                          className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
      transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
      w-full bg-principal sm:bg-transparent rounded-md flex"
                          onClick={navigateGouvernance}
                        >
                          <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                            <FaGavel className="text-2xl text-white sm:text-yellow-500" />
                          </div>
                          <div className="flex-1 p-4 sm:p-6">
                            <span className="text-[13px] font-semibold">
                              {t("Governance")}
                            </span>
                            <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                              {t(
                                "Meet our leadership and governance structure"
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Become Member */}
                        <div
                          className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
      transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
      w-full bg-principal sm:bg-transparent rounded-md flex"
                          onClick={navigateCommunity}
                        >
                          <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                            <FaUsers className="text-2xl text-white sm:text-purple-500" />
                          </div>
                          <div className="flex-1 p-4 sm:p-6">
                            <span className="text-[13px] font-semibold">
                              {t("Becom_member")}
                            </span>
                            <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                              {t("Join our community and make a difference")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
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
                      className="dropdown icon left-1/2  absolute left-0 z-[99999] max-w-7xl w-full mx-auto bg-white text-black dark:bg-slate-800 dark:text-white
    p-2 mt-4 shadow-md overflow-hidden transition-all duration-300 ease-in-out
    transform -translate-x-1/2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-4">
                          <div className="h-[400px] overflow-y-auto grid grid-cols-3 p-4 gap-4">
                            {cat.map((item: any, index: number) => (
                              <CategoryCard key={index} cat={item} />
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
                      className="left-1/2  absolute left-0 z-[99999] max-w-7xl w-full mx-auto bg-white text-black dark:bg-slate-800 dark:text-white
    p-2 mt-4 shadow-md overflow-hidden transition-all duration-300 ease-in-out
    transform -translate-x-1/2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4">
                          <div className="grid grid-cols-3 px-4 gap-4">
                            {/* Newsletters */}
                            <div
                              className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
          transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
          w-full bg-principal sm:bg-transparent rounded-md flex"
                              onClick={navigateNewsletter}
                            >
                              {/* Colonne gauche : Icône pleine hauteur */}
                              <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                                <FaEnvelopeOpenText className="text-2xl text-white sm:text-principal" />
                              </div>

                              {/* Colonne droite : Texte */}
                              <div className="flex-1 p-4 sm:p-6">
                                <div className="mb-1">
                                  <span className="text-[13px] font-semibold">
                                    {t("Newsletters")}
                                  </span>
                                </div>
                                <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                                  {t(
                                    "Stay updated with our monthly highlights"
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* Jobs */}
                            <div
                              className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
          transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
          w-full bg-principal sm:bg-transparent rounded-md flex"
                              onClick={navigateJobopen}
                            >
                              {/* Icône pleine hauteur */}
                              <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                                <FaBriefcase className="text-2xl text-white sm:text-principal" />
                              </div>

                              {/* Texte */}
                              <div className="flex-1 p-4 sm:p-6">
                                <span className="text-[13px] font-semibold">
                                  {t("Jobs")}
                                </span>
                                <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                                  {t("Open job opportunities and internships")}
                                </p>
                              </div>
                            </div>

                            {/* Careers */}
                            <div
                              className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
          transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
          w-full bg-principal sm:bg-transparent rounded-md flex"
                              onClick={navigateJobOpening}
                            >
                              <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                                <FaUserTie className="text-2xl text-white sm:text-principal" />
                              </div>
                              <div className="flex-1 p-4 sm:p-6">
                                <span className="text-[13px] font-semibold">
                                  {t("Careers")}
                                </span>
                                <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                                  {t("Career paths and talent development")}
                                </p>
                              </div>
                            </div>

                            {/* Reports */}
                            <div
                              className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
          transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
          w-full bg-principal sm:bg-transparent rounded-md flex"
                              onClick={navigateReport}
                            >
                              <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                                <FaFileAlt className="text-2xl text-white sm:text-red-500" />
                              </div>
                              <div className="flex-1 p-4 sm:p-6">
                                <span className="text-[13px] font-semibold">
                                  {t("Reports")}
                                </span>
                                <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                                  {t(
                                    "Download our latest research and impact reports"
                                  )}
                                </p>
                              </div>
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
                      className="left-1/2  absolute left-0 z-[99999] max-w-7xl w-full mx-auto bg-white text-black dark:bg-slate-800 dark:text-white
    p-2 mt-4 shadow-md overflow-hidden transition-all duration-300 ease-in-out
    transform -translate-x-1/2 rounded-b-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-4">
                          <div className="grid grid-cols-3 mt-4 px-4 gap-5">
                            {/* Press */}
                            <div
                              className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
          transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
          w-full bg-principal sm:bg-transparent rounded-md flex"
                              onClick={navigateCommunicated}
                            >
                              {/* Icône pleine hauteur */}
                              <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                                <FaNewspaper className="text-2xl text-white sm:text-principal" />
                              </div>

                              {/* Texte */}
                              <div className="flex-1 p-4 sm:p-6">
                                <span className="text-[13px] font-semibold">
                                  {t("Press")}
                                </span>
                                <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                                  {t(
                                    "Access press releases and media statements"
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* Videos */}
                            <div
                              className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
          transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
          w-full bg-principal sm:bg-transparent rounded-md flex"
                              onClick={navigateVideo}
                            >
                              <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                                <FaVideo className="text-2xl text-white sm:text-red-500" />
                              </div>
                              <div className="flex-1 p-4 sm:p-6">
                                <span className="text-[13px] font-semibold">
                                  {t("Videos")}
                                </span>
                                <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                                  {t(
                                    "Watch our latest field reports and interviews"
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* Blog */}
                            <div
                              className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
          transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
          w-full bg-principal sm:bg-transparent rounded-md flex"
                              onClick={navigateBlog}
                            >
                              <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                                <FaBlog className="text-2xl text-white sm:text-emerald-500" />
                              </div>
                              <div className="flex-1 p-4 sm:p-6">
                                <span className="text-[13px] font-semibold">
                                  {t("Blog")}
                                </span>
                                <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                                  {t("Insights, stories and expert opinions")}
                                </p>
                              </div>
                            </div>

                            {/* Gallery */}
                            <div
                              className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
          transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
          w-full bg-principal sm:bg-transparent rounded-md flex"
                              onClick={navigateGallery}
                            >
                              <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                                <FaImages className="text-2xl text-white sm:text-principal" />
                              </div>
                              <div className="flex-1 p-4 sm:p-6">
                                <span className="text-[13px] font-semibold">
                                  {t("Gallery")}
                                </span>
                                <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                                  {t("Browse photo stories from the field")}
                                </p>
                              </div>
                            </div>

                            {/* Events */}
                            <div
                              className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
          transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
          w-full bg-principal sm:bg-transparent rounded-md flex"
                              onClick={navigateEvent}
                            >
                              <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                                <FaCalendarAlt className="text-2xl text-white sm:text-yellow-500" />
                              </div>
                              <div className="flex-1 p-4 sm:p-6">
                                <span className="text-[13px] font-semibold">
                                  {t("Events")}
                                </span>
                                <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                                  {t("See upcoming conferences and campaigns")}
                                </p>
                              </div>
                            </div>
                            <div
                              className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
  transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
  w-full bg-principal sm:bg-transparent rounded-md flex"
                            >
                              <a
                                href="https://soundcloud.com/media-cosamed-sante"
                                target="_blank"
                              >
                                <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
                                  <FaPodcast className="text-2xl text-white sm:text-yellow-500" />{" "}
                                  {/* Icon Podcast */}
                                </div>
                              </a>

                              <div className="flex-1 p-4 sm:p-6">
                                <span className="text-[13px] font-semibold">
                                  <a
                                    href="https://soundcloud.com/media-cosamed-sante"
                                    target="_blank"
                                  >
                                    {t("Podcasts")}
                                  </a>
                                </span>
                                <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
                                  <a
                                    href="https://soundcloud.com/media-cosamed-sante"
                                    target="_blank"
                                  >
                                    {t(
                                      "Listen to the latest episodes and interviews"
                                    )}
                                  </a>
                                </p>
                              </div>
                            </div>
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

                <li className=" group cursor-pointer">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeWErBfd5Fmme0xaGvi2XMmK6PJO7XF-zftjvKzjjuzGkaIHg/viewform?pli=1"
                    target="_blank"
                    className="flex items-center gap-[2px] h-[40px] text-sm  hover:text-slate-300 "
                  >
                    {t("Expressions_of_interest")}
                  </a>
                </li>
                <div className="flex items-center bg-white dark:bg-slate-800 border dark:border-slate-700 px-2 py-2 rounded-md shadow-sm">
                  <div
                    className={`relative hidden md:flex items-center transition-all duration-300 ${
                      showLanguageButton
                        ? "w-[140px] opacity-100"
                        : "w-0 opacity-0"
                    }`}
                  >
                    <button
                      className="bg-white dark:bg-slate-800 border dark:border-slate-700 text-gray-700 dark:text-gray-300 px-2 py-1 text-xs font-semibold flex items-center gap-1 w-full justify-center rounded-md shadow-sm hover:shadow-md transition-shadow"
                      onClick={toggleDropdown}
                      style={{
                        pointerEvents: showLanguageButton ? "auto" : "none",
                      }}
                      aria-label="Select language"
                    >
                      <ReactCountryFlag
                        className=" rounded-md"
                        countryCode={language === "fr" ? "FR" : "GB"}
                        svg
                        style={{ width: "1.8em", height: "1.8em" }}
                        title={language === "fr" ? "Français" : "English"}
                      />
                      <span className="text-ms">{language.toUpperCase()}</span>
                      <span className="ml-1 text-xs">▼</span>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 top-full mt-1 w-[140px] bg-principal dark:bg-slate-800 dark:border border-slate-700 shadow-lg z-40 rounded-md">
                        <button
                          className={`flex items-center gap-3 w-full px-4 py-2 text-[11px] font-semibold rounded-md ${
                            language === "en"
                              ? "bg-hover text-white"
                              : "text-white hover:bg-hover"
                          }`}
                          onClick={() => selectLanguage("en")}
                        >
                          <ReactCountryFlag
                            className="rounded-md"
                            countryCode="GB"
                            svg
                            style={{ width: "1.8em", height: "1.8em" }}
                            title="English"
                          />
                          English
                        </button>
                        <button
                          className={`flex items-center gap-3 w-full px-4 py-2 text-[11px] font-semibold rounded-md ${
                            language === "fr"
                              ? "bg-hover text-white"
                              : "text-white hover:bg-hover"
                          }`}
                          onClick={() => selectLanguage("fr")}
                        >
                          <ReactCountryFlag
                            className="rounded-md"
                            countryCode="FR"
                            svg
                            style={{ width: "1.8em", height: "1.8em" }}
                            title="Français"
                          />
                          Français
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    className={`border-l border-principal dark:border-gray-600 h-5 transition-all duration-300 ${
                      showLanguageButton
                        ? "w-px mx-3 opacity-100"
                        : "w-0 mx-0 opacity-0"
                    }`}
                  />

                  <div
                    className={`flex items-center transition-all duration-500 ease-in-out ${
                      showLanguageButton
                        ? "gap-3 justify-end flex-grow"
                        : "gap-2 justify-start flex-grow"
                    }`}
                    style={{ minWidth: 0 }}
                  >
                    <div className="relative flex items-center justify-center">
                      <button
                        onClick={toggleMenu}
                        className="rounded-full overflow-hidden focus:outline-none bg-gray-300 hover:bg-gray-400 transition shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-principal flex items-center justify-center w-7 h-7"
                        aria-label="User menu"
                      >
                        {!user?.image ? (
                          <FaUserCircle className="text-gray-500 w-6 h-6" />
                        ) : (
                          <img
                            src={user.image}
                            alt="Profil"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        )}
                      </button>

                      {isDropdown && (
                        <>
                          <div
                            className="absolute left-50 top-full mt-4 w-56 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50 origin-top-right animate-scale-in"
                            style={{ minWidth: "14rem" }}
                          >
                            <div className="flex flex-col items-center p-4 border-b shadow-sm hover:shadow-md border-gray-200 dark:border-gray-700">
                              {!user?.image ? (
                                <FaUserCircle className="text-gray-500 dark:text-gray-300 w-12 h-12" />
                              ) : (
                                <img
                                  src={user.image}
                                  alt="Profil"
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              )}
                              <span className="mt-2 text-[10px] font-semibold text-gray-900 dark:text-gray-100 truncate max-w-full text-center">
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
                                onClick={() =>
                                  navigate("/job_openings/userHome")
                                }
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

                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsDropdown(false)}
                          />
                        </>
                      )}
                    </div>

                    <div
                      className="cursor-pointer rounded-full border border-slate-400 dark:border-slate-700 dark:text-gray-200 text-principal p-[3px] transition-transform transform hover:scale-110 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-principal focus:outline-none"
                      onClick={toggleTheme}
                      title={
                        settings.theme === "dark"
                          ? t("Switch to light mode")
                          : t("Switch to dark mode")
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleTheme();
                        }
                      }}
                      aria-label={
                        settings.theme === "dark"
                          ? "Switch to light mode"
                          : "Switch to dark mode"
                      }
                    >
                      {settings.theme === "dark" ? (
                        <BiSolidSun size={12} />
                      ) : (
                        <BiSolidMoon size={12} />
                      )}
                    </div>
                  </div>
                </div>
              </ul>
            </div>
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
        <ResponsiveMenu
          showMenu={showMenu}
          onClose={() => setShowMenu(false)}
          t={t}
        />
      </div>
    </>
  );
}

export default Navbar;
