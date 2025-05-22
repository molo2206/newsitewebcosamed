import Logo from "../../assets/logo1.png";
import { useEffect, useState, useRef } from "react";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import CategoryServices from "../../services/CategoryServices";
import useAsync from "../../hooks/useAsync";
import CategoryCard from "../blogs/CategoryCard";
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { useAuthContext } from "../../context";
import { FaUserCircle } from "react-icons/fa";

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
  const donatelink = () => {
    navigate("/donation");
    onClose?.();
  };

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
        bg-principal dark:bg-slate-800 transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      {/* Profil centré */}
      <div className="relative mt-2 flex flex-col items-center">
        <button
          onClick={toggleMenus}
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
        <div className="mt-1 text-center">
          <span className="text-sm text-white dark:text-white">
            {user?.email}
          </span>
        </div>

        {/* Menu déroulant du profil */}
        {isDropdown && (
          <>
            <div
              className="absolute left-1/2 -translate-x-1/2 mt-12 w-64 bg-principal dark:bg-slate-800 border border-gray-400 dark:border-slate-700 
                         rounded-xl shadow-xl z-50 transition-all duration-200"
            >
              <div className="flex flex-col items-center justify-center p-4 space-y-2">
                <span className="text-sm text-white dark:text-white text-center">
                  {user?.email}
                </span>
              </div>

              <ul className="text-sm text-white dark:text-white">
                <li
                  onClick={() => {
                    navigate(
                      "/recruiting/cosamed/job_openings/accountsettings"
                    );
                    onClose?.();
                  }}
                  className="px-4 py-3 hover:bg-hover rounded-xl dark:hover:bg-slate-700 cursor-pointer"
                >
                  {t("My_profile")}
                </li>
                <li
                  onClick={() => {
                    navigate("/job_openings/userHome");
                    onClose?.();
                  }}
                  className="px-4 py-3 hover:bg-hover rounded-xl dark:hover:bg-slate-700 cursor-pointer"
                >
                  {t("My_applications")}
                </li>
                {!user ? (
                  <li
                    onClick={() => {
                      navigate("/auth/signin");
                      onClose?.();
                    }}
                    className="px-4 py-3 hover:bg-hover rounded-xl dark:hover:bg-slate-700 cursor-pointer"
                  >
                    {t("Login")}
                  </li>
                ) : (
                  <li
                    onClick={() => handleLogout()}
                    className="px-4 py-3 hover:bg-hover rounded-xl dark:hover:bg-slate-700 cursor-pointer"
                  >
                    {t("Logout")}
                  </li>
                )}
                <li
                  onClick={() => {
                    navigate("/recruiting/cosamed/job_openings/register");
                    onClose?.();
                  }}
                  className="px-4 py-3 hover:bg-hover rounded-xl dark:hover:bg-slate-700 cursor-pointer"
                >
                  {t("Register")}
                </li>
              </ul>
            </div>

            {/* Fond pour fermer le menu quand on clique en dehors */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDropdown(false)}
            />
          </>
        )}
      </div>

      {/* Reste du menu */}
      <div className="relative mt-5 text-sm dark:bg-slate-800 bg-principale h-full overflow-y-auto">
        <div className="flex justify-between items-center px-4">
          <div
            onClick={() => {
              navigate("/");
              onClose?.();
            }}
            className="cursor-pointer"
          >
            <img src={Logo} alt="Logo" className="h-20" />
          </div>

          <div className="p-4">
            {theme === "dark" ? (
              <BiSolidSun
                className="text-xl cursor-pointer text-white rounded-full border border-slate-400"
                onClick={() => setTheme("light")}
              />
            ) : (
              <BiSolidMoon
                className="text-xl cursor-pointer text-white rounded-full border border-slate-400"
                onClick={() => setTheme("dark")}
              />
            )}
          </div>
        </div>

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
                  <li key={index}>
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
                  className="cursor-pointer"
                >
                  {t("Newsletters")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/reports");
                    onClose?.();
                  }}
                  className="cursor-pointer"
                >
                  {t("Reports")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/jobopenings");
                    onClose?.();
                  }}
                  className="cursor-pointer"
                >
                  {t("Jobs")}
                </li>
                <li
                  onClick={() => {
                    navigate("/projects");
                    onClose?.();
                  }}
                  className="cursor-pointer"
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
                  className="cursor-pointer"
                >
                  {t("Press")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/videos");
                    onClose?.();
                  }}
                  className="cursor-pointer"
                >
                  {t("Videos")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/blogs");
                    onClose?.();
                  }}
                  className="cursor-pointer"
                >
                  {t("Blog")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/gallery");
                    onClose?.();
                  }}
                  className="cursor-pointer"
                >
                  {t("Gallery")}
                </li>
                <li
                  onClick={() => {
                    navigate("/evements");
                    onClose?.();
                  }}
                  className="cursor-pointer"
                >
                  {t("Events")}
                </li>
                <li>
                  <button
                    onClick={handleGoBack}
                    className="w-full mt-2 py-2 bg-hover text-white rounded-lg"
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
            className="text-white font-medium cursor-pointer"
          >
            {t("AI4Mpox")}
          </li>
          <li
            onClick={() => {
              navigate("/data-loading/jobopenings");
              onClose?.();
            }}
            className="text-white font-medium cursor-pointer"
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
                >
                  {t("AboutUs")}
                </li>
                <li
                  onClick={() => {
                    navigate("/contact");
                    onClose?.();
                  }}
                >
                  {t("Contact")}
                </li>
                <li
                  onClick={() => {
                    navigate("/partners");
                    onClose?.();
                  }}
                >
                  {t("Partnerships")}
                </li>
                <li
                  onClick={() => {
                    navigate("/team");
                    onClose?.();
                  }}
                >
                  {t("Governance")}
                </li>
                <li
                  onClick={() => {
                    navigate("/community/join");
                    onClose?.();
                  }}
                >
                  {t("Becom_member")}
                </li>
              </ul>
            )}
          </li>

          <li
            onClick={donatelink}
            className="text-white font-bold cursor-pointer"
          >
            {t("Donate")}
          </li>

          {/* Sélecteur de langue */}
          <li className="relative text-white">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2"
            >
              <ReactCountryFlag
                countryCode={selectedLanguage === "en" ? "US" : "FR"}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                }}
                title={selectedLanguage === "en" ? "English" : "Français"}
              />
              <span>{selectedLanguage === "en" ? "English" : "Français"}</span>
            </button>

            {dropdownOpen && (
              <ul className="absolute left-0 mt-2 w-28 rounded-md bg-principal dark:bg-slate-700 border border-gray-600 dark:border-slate-600 shadow-lg z-50">
                <li
                  onClick={() => selectLanguage("en")}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-hover rounded-md"
                >
                  <ReactCountryFlag
                    countryCode="US"
                    svg
                    style={{ width: 24, height: 24 }}
                  />
                  English
                </li>
                <li
                  onClick={() => selectLanguage("fr")}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-hover rounded-md"
                >
                  <ReactCountryFlag
                    countryCode="FR"
                    svg
                    style={{ width: 24, height: 24 }}
                  />
                  Français
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
