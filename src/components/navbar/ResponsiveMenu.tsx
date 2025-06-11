import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import ReactCountryFlag from "react-country-flag";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import useAsync from "../../hooks/useAsync";
import { useAuthContext } from "../../context";
import CategoryServices from "../../services/CategoryServices";

import CategoryCard from "../blogs/CategoryCard";

import Logo from "../../assets/logo1.png";
import DonateModal from "../../pages/modal/DonateModal";

interface Props {
  showMenu?: boolean;
  onClose?: () => void;
}

const ResponsiveMenu = ({ showMenu, onClose }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { user, removeSession, handleLanguageChange } = useAuthContext();

  const { data: category } = useAsync(() => CategoryServices.getCategory());

  // Theme state (light/dark)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Dropdown and menu states
  const [isDropdown, setIsDropdown] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Selected language (en/fr)
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const menuRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, onClose]);

  // Apply dark or light theme on document element and localStorage
  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [theme]);

  // Logout handler
  const handleLogout = () => {
    removeSession();
    navigate("/auth/signin", { replace: true });
  };

  // Toggle user profile dropdown menu
  const toggleMenus = () => setIsDropdown(!isDropdown);

  // Toggle submenus
  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Toggle language dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Select language and notify context
  const selectLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    setDropdownOpen(false);
    handleLanguageChange(lang);
  };

  // Navigation helpers
  const [showDonate, setShowDonate] = useState(false);

  const handleGoBack = () => {
    navigate("/aboutmedia");
    onClose?.();
  };

  return (
    <div
      ref={menuRef}
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-full w-[280px] py-10 flex-col justify-between
    bg-principal dark:bg-slate-800 transition-all duration-300 ease-in-out md:hidden rounded-r-xl shadow-md`}
    >
      <div className="flex justify-center items-center mb-4 px-4">
        <img
          src={Logo}
          alt="Organization Logo"
          className="h-16 object-contain"
        />
      </div>

      <div className="relative mt-2 flex flex-col items-center">
        <button
          onClick={toggleMenus}
          className="flex flex-col items-center focus:outline-none"
        >
          {/* Avatar utilisateur */}
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
            {!user?.image ? (
              <FaUserCircle className="text-principal w-10 h-10" />
            ) : (
              <img
                src={user.image}
                alt="Profil"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
          </div>

          <FaChevronDown
            className={`mt-1 w-3 h-3 text-white transition-transform duration-300 ${
              isDropdown ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div className="mt-1 text-center">
          <span className="text-sm text-white dark:text-white">
            {user?.email}
          </span>
        </div>

        {isDropdown && (
          <>
            <div
              className="absolute mt-2 w-64 bg-principal rounded-md dark:bg-slate-800 border border-gray-200 dark:border-slate-700 z-50 transition-all duration-200"
              style={{
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <ul className="text-sm text-white dark:text-white">
                <li
                  onClick={() => {
                    navigate(
                      "/recruiting/cosamed/job_openings/accountsettings"
                    );
                    onClose?.();
                  }}
                  className="px-4 py-3 hover:bg-hover  dark:hover:bg-slate-700 cursor-pointer"
                >
                  {t("My_profile")}
                </li>
                <li
                  onClick={() => {
                    navigate("/job_openings/userHome");
                    onClose?.();
                  }}
                  className="px-4 py-3 hover:bg-hover  dark:hover:bg-slate-700 cursor-pointer"
                >
                  {t("My_applications")}
                </li>
                {!user ? (
                  <li
                    onClick={() => {
                      navigate("/auth/signin");
                      onClose?.();
                    }}
                    className="px-4 py-3 hover:bg-hover  dark:hover:bg-slate-700 cursor-pointer"
                  >
                    {t("Login")}
                  </li>
                ) : (
                  <li
                    onClick={handleLogout}
                    className="px-4 py-3 hover:bg-hover  dark:hover:bg-slate-700 cursor-pointer"
                  >
                    {t("Logout")}
                  </li>
                )}
                <li
                  onClick={() => {
                    navigate("/recruiting/cosamed/job_openings/register");
                    onClose?.();
                  }}
                  className="px-4 py-3 hover:bg-hover  dark:hover:bg-slate-700 cursor-pointer"
                >
                  {t("Register")}
                </li>
              </ul>
            </div>

            {/* Clic en dehors pour fermer le menu */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDropdown(false)}
            />
          </>
        )}
      </div>

      <div className="relative mt- text-sm dark:bg-slate-800 bg-principale h-full overflow-y-auto">
        <ul className="space-y-4 p-6">
          <li
            onClick={() => {
              navigate("/");
              onClose?.();
            }}
            className="text-white font-medium cursor-pointer"
          >
            {t("Home")}
          </li>

          <li>
            <button
              onClick={() => toggleMenu("themes")}
              className="flex justify-between items-center w-full text-white font-medium"
            >
              {t("Themes")}
              <span>{openMenu === "themes" ? "−" : "+"}</span>
            </button>
            {openMenu === "themes" && (
              <ul className="mt-2 pl-4 space-y-2 w-full max-h-60 overflow-y-auto">
                {category?.map((item: any, index: number) => (
                  <li key={index} onClick={() => onClose?.()}>
                    <CategoryCard cat={item} />
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => toggleMenu("emergency")}
              className="flex justify-between items-center w-full text-white font-medium"
            >
              {t("Emergency")}
              <span>{openMenu === "emergency" ? "−" : "+"}</span>
            </button>
            {openMenu === "emergency" && (
              <ul className="mt-2 pl-4 space-y-2 text-white">
                <li
                  onClick={() => {
                    navigate("/data-loading/newsletters");
                    onClose?.();
                  }}
                  className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full dark:bg-slate-800 bg-principal sm:bg-transparent "
                >
                  {t("Newsletters")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/reports");
                    onClose?.();
                  }}
                  className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full dark:bg-slate-800 bg-principal sm:bg-transparent "
                >
                  {t("Reports")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/jobopenings");
                    onClose?.();
                  }}
                  className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full dark:bg-slate-800 bg-principal sm:bg-transparent "
                >
                  {t("Jobs")}
                </li>
                <li
                  onClick={() => {
                    navigate("/projects");
                    onClose?.();
                  }}
                  className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full dark:bg-slate-800 bg-principal sm:bg-transparent "
                >
                  {t("Project")}
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => toggleMenu("media")}
              className="flex justify-between items-center w-full text-white font-medium"
            >
              {t("Newsroom")}
              <span>{openMenu === "media" ? "−" : "+"}</span>
            </button>
            {openMenu === "media" && (
              <ul className="mt-2 pl-4 space-y-2 text-white">
                <li
                  onClick={() => {
                    navigate("/load-data/communicated");
                    onClose?.();
                  }}
                  className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full dark:bg-slate-800 bg-principal sm:bg-transparent "
                >
                  {t("Press")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/videos");
                    onClose?.();
                  }}
                  className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full dark:bg-slate-800 bg-principal sm:bg-transparent "
                >
                  {t("Videos")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/blogs");
                    onClose?.();
                  }}
                  className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full dark:bg-slate-800 bg-principal sm:bg-transparent "
                >
                  {t("Blog")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/gallery");
                    onClose?.();
                  }}
                  className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full dark:bg-slate-800 bg-principal sm:bg-transparent "
                >
                  {t("Gallery")}
                </li>
                <li
                  onClick={() => {
                    navigate("/evements");
                    onClose?.();
                  }}
                  className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full dark:bg-slate-800 bg-principal sm:bg-transparent "
                >
                  {t("Events")}
                </li>
                <li>
                  <button
                    onClick={handleGoBack}
                    className="w-full mt-2 py-2 bg-hover text-white "
                  >
                    {t("Find_More")}
                    <ToastContainer />
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li
            onClick={() => {
              navigate("/data-loading/Ai4Mpox");
              onClose?.();
            }}
            className="text-white font-medium cursor-pointer "
          >
            {t("AI4Mpox")}
          </li>
          <li
            onClick={() => {
              navigate("/data-loading/jobopenings");
              onClose?.();
            }}
            className="text-white font-medium cursor-pointer "
          >
            {t("Jobs")}
          </li>

          <li>
            <button
              onClick={() => toggleMenu("about")}
              className="flex justify-between items-center w-full text-white font-medium"
            >
              {t("AboutUs")}
              <span>{openMenu === "about" ? "−" : "+"}</span>
            </button>
            {openMenu === "about" && (
              <ul className="mt-2 pl-4 space-y-2 text-white">
                <li
                  onClick={() => {
                    navigate("/about");
                    onClose?.();
                  }}
                  className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full dark:bg-slate-800 bg-principal sm:bg-transparent "
                >
                  {t("AboutUs")}
                </li>
                <li
                  onClick={() => {
                    navigate("/contact");
                    onClose?.();
                  }}
                  className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full dark:bg-slate-800 bg-principal sm:bg-transparent "
                >
                  {t("Contact")}
                </li>
                <li
                  onClick={() => {
                    navigate("/partners");
                    onClose?.();
                  }}
                  className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full dark:bg-slate-800 bg-principal sm:bg-transparent "
                >
                  {t("Partnerships")}
                </li>
                <li
                  onClick={() => {
                    navigate("/team");
                    onClose?.();
                  }}
                  className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full dark:bg-slate-800 bg-principal sm:bg-transparent "
                >
                  {t("Governance")}
                </li>
                <li
                  onClick={() => {
                    navigate("/community/join");
                    onClose?.();
                  }}
                  className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full dark:bg-slate-800 bg-principal sm:bg-transparent "
                >
                  {t("Becom_member")}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Pied de menu : thème, langue, actions */}
      <div className="mt-auto px-4 space-y-4">
        {/* Thème */}
        <div className="flex items-center justify-between">
          <span className="text-white">{t("Theme")}</span>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? (
              <BiSolidSun className="text-yellow-400 w-6 h-6" />
            ) : (
              <BiSolidMoon className="text-white w-6 h-6 dark:bg-white" />
            )}
          </button>
        </div>

        {/* Langue */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-full px-4 py-2 bg-white dark:bg-slate-700 rounded-md flex justify-between items-center"
          >
            {selectedLanguage === "en" ? (
              <ReactCountryFlag
                countryCode="US"
                svg
                style={{ width: "1.5em", height: "1.5em" }}
              />
            ) : (
              <ReactCountryFlag
                countryCode="FR"
                svg
                style={{ width: "1.5em", height: "1.5em" }}
              />
            )}
            <span className="ml-2 text-sm">
              {selectedLanguage.toUpperCase()}
            </span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-slate-700 rounded-md shadow-md">
              <div
                onClick={() => selectLanguage("en")}
                className="cursor-pointer px-4 py-2 hover:bg-hover"
              >
                <ReactCountryFlag
                  countryCode="US"
                  svg
                  style={{ width: "1.5em", height: "1.5em" }}
                />{" "}
                English
              </div>
              <div
                onClick={() => selectLanguage("fr")}
                className="cursor-pointer px-4 py-2 hover:bg-hover"
              >
                <ReactCountryFlag
                  countryCode="FR"
                  svg
                  style={{ width: "1.5em", height: "1.5em" }}
                />{" "}
                Français
              </div>
            </div>
          )}
        </div>

        {/* Boutons d’action */}
        <div className="space-y-2">
          <>
            {" "}
            <button
              onClick={() => setShowDonate(true)}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-green-700"
            >
              {t("Donate")}
            </button>
            <DonateModal
              isOpen={showDonate}
              onClose={() => setShowDonate(false)}
            />
          </>

          <button
            onClick={handleGoBack}
            className="w-full bg-gray-300 text-black py-2 rounded-md hover:bg-gray-600"
          >
            {t("Back")}
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ResponsiveMenu;
