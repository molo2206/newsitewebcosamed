import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import {
  FaBlog,
  FaBriefcase,
  FaCalendarAlt,
  FaEnvelopeOpenText,
  FaExclamationTriangle,
  FaFileAlt,
  FaFileContract,
  FaHandshake,
  FaImages,
  FaInfoCircle,
  FaNewspaper,
  FaPalette,
  FaPhone,
  FaRegCircle,
  FaRobot,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
  FaUserPlus,
  FaUsers,
  FaVideo,
} from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import useAsync from "../../hooks/useAsync";
import { useAuthContext, useThemeContext } from "../../context";
import CategoryServices from "../../services/CategoryServices";

import CategoryCard from "../blogs/CategoryCard";

import Logo from "../../assets/logo1.png";

interface ResponsiveMenuProps {
  showMenu: boolean;
  onClose: () => void;
  t: (key: string) => string; // ou t si tu utilises i18next
}

const ResponsiveMenu = ({ showMenu, onClose, t }: ResponsiveMenuProps) => {
  const navigate = useNavigate();

  const { user, removeSession } = useAuthContext();

  const { data: category } = useAsync(() => CategoryServices.getCategory());

  const { settings, toggleTheme } = useThemeContext();
  const isDark = settings.theme === "dark";

  // Dropdown and menu states
  const [isDropdown, setIsDropdown] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Selected language (en/fr)

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

  return (
    <div
      ref={menuRef}
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-full w-[247px] py-10 flex-col justify-between
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
          className="flex flex-col items-center focus:outline-none relative group"
        >
          {/* Avatar utilisateur */}
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-2 border-transparent group-hover:border-blue-500 transition-all duration-300 bg-gray-300 dark:bg-gray-700">
            {!user?.image ? (
              <FaUserCircle className="text-white dark:text-gray-200 w-full h-full p-1" />
            ) : (
              <img
                src={user.image}
                alt="Profil"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Chevron avec animation */}
          <FaChevronDown
            className={`mt-1 w-4 h-4 text-white dark:text-gray-200 transition-transform duration-300 ${
              isDropdown ? "rotate-180" : "rotate-0"
            }`}
          />

          {/* Petite ombre ou halo au hover pour effet Facebook */}
          <span className="absolute inset-0 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>

        <div className="mt-1 text-center">
          <span className="text-[11px] text-white dark:text-white">
            {user?.email}
          </span>
        </div>

        {isDropdown && (
          <>
            <div
              className="absolute mt-2 max-w-[60vw] w-60 bg-principal rounded-md dark:bg-slate-800 border  dark:border-slate-700 z-50 transition-all duration-200 left-1/2 -translate-x-1/2"
              style={{
                top: "100%",
              }}
            >
              <ul className="space-y-4 p-6 text-white dark:text-white text-[12px]">
                {/* User Menu */}
                <li className="space-y-1">
                  <ul className="space-y-1">
                    <li
                      onClick={() => {
                        navigate(
                          "/recruiting/cosamed/job_openings/accountsettings"
                        );
                        onClose?.();
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-hover dark:hover:bg-slate-700 cursor-pointer rounded-md"
                    >
                      <FaUser className="w-4 h-4 text-blue-100" />
                      {t("My_profile")}
                    </li>
                    <li
                      onClick={() => {
                        navigate("/job_openings/userHome");
                        onClose?.();
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-hover dark:hover:bg-slate-700 cursor-pointer rounded-md"
                    >
                      <FaFileAlt className="w-4 h-4 text-blue-100" />
                      {t("My_applications")}
                    </li>
                    {!user ? (
                      <li
                        onClick={() => {
                          navigate("/auth/signin");
                          onClose?.();
                        }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-hover dark:hover:bg-slate-700 cursor-pointer rounded-md"
                      >
                        <FaSignInAlt className="w-4 h-4 text-blue-100" />
                        {t("Login")}
                      </li>
                    ) : (
                      <li
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-hover dark:hover:bg-slate-700 cursor-pointer rounded-md"
                      >
                        <FaSignOutAlt className="w-4 h-4 text-blue-100" />
                        {t("Logout")}
                      </li>
                    )}
                    <li
                      onClick={() => {
                        navigate("/recruiting/cosamed/job_openings/register");
                        onClose?.();
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-hover dark:hover:bg-slate-700 cursor-pointer rounded-md"
                    >
                      <FaUserPlus className="w-4 h-4 text-blue-100" />
                      {t("Register")}
                    </li>
                  </ul>
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

      <div className="relative mt-4 dark:bg-slate-800 bg-principale h-full overflow-y-auto">
        <ul className="space-y-4 p-6 space-y-4 p-6 text-white dark:text-white text-[12px]">
          {/* About Menu */}
          <li>
            <button
              onClick={() => toggleMenu("about")}
              className="flex justify-between items-center w-full font-medium hover:bg-hover dark:hover:bg-slate-900 p-2 rounded-md transition"
            >
              <div className="flex items-center gap-3">
                <FaInfoCircle className="w-4 h-4 text-blue-100" />
                {t("AboutUs")}
              </div>
              <span>{openMenu === "about" ? "−" : "+"}</span>
            </button>
            {openMenu === "about" && (
              <ul className="mt-2 pl-6 space-y-2 text-white dark:text-white">
                <li
                  onClick={() => {
                    navigate("/about");
                    onClose?.();
                  }}
                  className="flex items-center  gap-2 p-2 hover:bg-hover dark:hover:bg-slate-900 cursor-pointer rounded-md"
                >
                  <FaRegCircle className="w-3 h-3 text-gray-100" />
                  {t("AboutUs")}
                </li>
                <li
                  onClick={() => {
                    navigate("/contact");
                    onClose?.();
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-hover dark:hover:bg-slate-900 cursor-pointer rounded-md"
                >
                  <FaPhone className="w-3 h-3 text-green-100" />
                  {t("Contact")}
                </li>
                <li
                  onClick={() => {
                    navigate("/partners");
                    onClose?.();
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-hover dark:hover:bg-slate-900 cursor-pointer rounded-md"
                >
                  <FaHandshake className="w-3 h-3 text-purple-100" />
                  {t("Partnerships")}
                </li>
                <li
                  onClick={() => {
                    navigate("/team");
                    onClose?.();
                  }}
                  className="flex items-center text-white gap-2 p-2 hover:bg-hover dark:hover:bg-slate-900 cursor-pointer rounded-md"
                >
                  <FaUsers className="w-3 h-3 text-yellow-100" />
                  {t("Governance")}
                </li>
                <li
                  onClick={() => {
                    navigate("/community/join");
                    onClose?.();
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-hover dark:hover:bg-slate-900 cursor-pointer rounded-md"
                >
                  <FaUsers className="w-3 h-3 text-teal-100" />
                  {t("Becom_member")}
                </li>
              </ul>
            )}
          </li>

          {/* Themes Menu */}
          <li>
            <button
              onClick={() => toggleMenu("themes")}
              className="flex justify-between items-center w-full font-medium hover:bg-hover dark:hover:bg-slate-900 p-2 rounded-md transition"
            >
              <div className="flex items-center gap-3">
                <FaPalette className="w-4 h-4 text-blue-100" />
                {t("Themes")}
              </div>
              <span>{openMenu === "themes" ? "−" : "+"}</span>
            </button>
            {openMenu === "themes" && (
              <ul className="mt-2 pl-6 space-y-2 w-full max-h-60 overflow-y-auto">
                {category?.map((item: any, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <FaRegCircle className="w-3 h-3 text-gray-400" />
                    <CategoryCard cat={item} />
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Emergency Menu */}
          <li>
            <button
              onClick={() => toggleMenu("emergency")}
              className="flex justify-between items-center w-full font-medium hover:bg-hover dark:hover:bg-slate-900 p-2 rounded-md transition"
            >
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="w-4 h-4 text-blue-100" />
                {t("Emergency")}
              </div>
              <span>{openMenu === "emergency" ? "−" : "+"}</span>
            </button>
            {openMenu === "emergency" && (
              <ul className="mt-2 pl-6 space-y-2">
                <li
                  onClick={() => {
                    navigate("/data-loading/newsletters");
                    onClose?.();
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-hover dark:hover:bg-slate-900 cursor-pointer rounded-md"
                >
                  <FaEnvelopeOpenText className="w-3 h-3 text-blue-100" />
                  {t("Newsletters")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/reports");
                    onClose?.();
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-hover dark:hover:bg-slate-900 cursor-pointer rounded-md"
                >
                  <FaFileAlt className="w-3 h-3 text-blue-100" />
                  {t("Reports")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/jobopenings");
                    onClose?.();
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-hover dark:hover:bg-slate-900 cursor-pointer rounded-md"
                >
                  <FaBriefcase className="w-3 h-3 text-blue-100" />
                  {t("Jobs")}
                </li>
              </ul>
            )}
          </li>

          {/* Newsroom Menu */}
          <li>
            <button
              onClick={() => toggleMenu("media")}
              className="flex justify-between items-center w-full font-medium hover:bg-hover dark:hover:bg-slate-900 p-2 rounded-md transition"
            >
              <div className="flex items-center gap-3">
                <FaNewspaper className="w-4 h-4 text-blue-100" />
                {t("Newsroom")}
              </div>
              <span>{openMenu === "media" ? "−" : "+"}</span>
            </button>
            {openMenu === "media" && (
              <ul className="mt-2 pl-6 space-y-2">
                <li
                  onClick={() => {
                    navigate("/load-data/communicated");
                    onClose?.();
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-hover dark:hover:bg-slate-900 cursor-pointer rounded-md"
                >
                  <FaNewspaper className="w-3 h-3 text-blue-100" />
                  {t("Press")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/videos");
                    onClose?.();
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-hover dark:hover:bg-slate-900 cursor-pointer rounded-md"
                >
                  <FaVideo className="w-3 h-3 text-blue-100" />
                  {t("Videos")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/blogs");
                    onClose?.();
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-hover dark:hover:bg-slate-900 cursor-pointer rounded-md"
                >
                  <FaBlog className="w-3 h-3 text-blue-100" />
                  {t("Blog")}
                </li>
                <li
                  onClick={() => {
                    navigate("/data-loading/gallery");
                    onClose?.();
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-hover dark:hover:bg-slate-900 cursor-pointer rounded-md"
                >
                  <FaImages className="w-3 h-3 text-blue-100" />
                  {t("Gallery")}
                </li>
                <li
                  onClick={() => {
                    navigate("/evements");
                    onClose?.();
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-hover dark:hover:bg-slate-900 cursor-pointer rounded-md"
                >
                  <FaCalendarAlt className="w-3 h-3 text-blue-100" />
                  {t("Events")}
                </li>
              </ul>
            )}
          </li>

          {/* Direct Links */}
          <li
            onClick={() => {
              navigate("/data-loading/Ai4Mpox");
              onClose?.();
            }}
            className="flex items-center gap-2 font-medium cursor-pointer p-2 rounded-md hover:bg-hover dark:hover:bg-slate-900"
          >
            <FaRobot className="w-4 h-4 text-blue-100" />
            {t("AI4Mpox")}
          </li>
          <li
            onClick={() => {
              navigate("/data-loading/jobopenings");
              onClose?.();
            }}
            className="flex items-center gap-2 font-medium cursor-pointer p-2 rounded-md hover:bg-hover dark:hover:bg-slate-900"
          >
            <FaBriefcase className="w-4 h-4 text-blue-100" />
            {t("Jobs")}
          </li>
          <li>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeWErBfd5Fmme0xaGvi2XMmK6PJO7XF-zftjvKzjjuzGkaIHg/viewform?pli=1"
              target="_blank"
              className="flex items-center gap-2 font-medium cursor-pointer p-2 rounded-md hover:bg-hover dark:hover:bg-slate-900"
            >
              <FaFileContract className="w-4 h-4 text-blue-100" />
              {t("Expressions_of_interest")}
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-auto px-4 space-y-4">
        <div className="flex items-center text-[13px] justify-between">
          <span className="text-white">{t("Theme")}</span>

          <div
            onClick={toggleTheme}
            className={`w-14 h-7 flex items-center border rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isDark
                ? "bg-slate-900 justify-end"
                : "bg-principal  justify-start"
            }`}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-md"
            >
              {isDark ? (
                <BiSolidMoon className="text-blue-500 dark:text-white  w-3 h-3 " />
              ) : (
                <BiSolidSun className="text-yellow-400 dark:text-white w-3 h-3 " />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
