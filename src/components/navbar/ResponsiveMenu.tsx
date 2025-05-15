import Logo from "../../assets/logo1.png";
import { useEffect, useState } from "react";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import CategoryServices from "../../services/CategoryServices";
import useAsync from "../../hooks/useAsync";
import CategoryCard from "../blogs/CategoryCard";
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { useAuthContext } from "../../context";

interface Props {
  showMenu?: boolean;
}

const ResponsiveMenu = ({ showMenu }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleLanguageChange } = useAuthContext();
  const { data: category } = useAsync(() => CategoryServices.getCategory());

  // States
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // Theme toggle
  const element = document.documentElement;
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [theme]);

  // Navigation
  const donatelink = () => navigate("/donation");
  const handleGoBack = () => navigate("/aboutmedia");

  // Menu toggle
  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Langue
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    setDropdownOpen(false);
    handleLanguageChange(lang);
  };

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-full w-80 py-10 flex-col justify-between
      bg-principal dark:bg-slate-800 transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="relative mt-5 text-sm dark:bg-slate-800 bg-principale h-full overflow-y-auto">
        {/* Header logo + theme switch */}
        <div className="flex justify-between items-center px-4">
          <div onClick={() => navigate("/")}>
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

        {/* Menu items */}
        <ul className="space-y-4 p-6">
          <li>
            <div
              onClick={() => navigate("/")}
              className="text-white font-medium"
            >
              {t("Home")}
            </div>
          </li>

          {/* Themes */}
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

          {/* Emergency */}
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
                <li onClick={() => navigate("/data-loading/newsletters")}>
                  {t("Newsletters")}
                </li>
                <li onClick={() => navigate("/data-loading/reports")}>
                  {t("Reports")}
                </li>
                <li onClick={() => navigate("/data-loading/jobopenings")}>
                  {t("Jobs")}
                </li>
                <li onClick={() => navigate("/projects")}>{t("Project")}</li>
              </ul>
            )}
          </li>

          {/* Newsroom */}
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
                <li onClick={() => navigate("/load-data/communicated")}>
                  {t("Press")}
                </li>
                <li onClick={() => navigate("/data-loading/videos")}>
                  {t("Videos")}
                </li>
                <li onClick={() => navigate("/data-loading/blogs")}>
                  {t("Blog")}
                </li>
                <li onClick={() => navigate("/data-loading/gallery")}>
                  {t("Gallery")}
                </li>
                <li onClick={() => navigate("/evements")}>{t("Events")}</li>
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

          {/* Pages simples */}
          <li
            onClick={() => navigate("/data-loading/Ai4Mpox")}
            className="text-white font-medium cursor-pointer"
          >
            {t("AI4Mpox")}
          </li>
          <li
            onClick={() => navigate("/data-loading/jobopenings")}
            className="text-white font-medium cursor-pointer"
          >
            {t("Jobs")}
          </li>

          {/* About us */}
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
                <li onClick={() => navigate("/about")}>{t("AboutUs")}</li>
                <li onClick={() => navigate("/contact")}>{t("Contact")}</li>
                <li onClick={() => navigate("/partners")}>
                  {t("Partnerships")}
                </li>
                <li onClick={() => navigate("/team")}>{t("Governance")}</li>
                <li onClick={() => navigate("/community/join")}>
                  {t("Becom_member")}
                </li>
              </ul>
            )}
          </li>

          {/* Donate button */}
          <li>
            <button
              onClick={donatelink}
              className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg"
            >
              {t("Donate")}
              <ToastContainer />
            </button>
          </li>

          {/* Language switch */}
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 px-4 py-2 bg-principale text-white rounded"
            >
              <ReactCountryFlag
                countryCode={selectedLanguage === "en" ? "GB" : "FR"}
                svg
                style={{ width: "1.2em", height: "1.2em" }}
              />
              {selectedLanguage === "en" ? "English" : "French"}{" "}
              <span className="ml-2">▼</span>
            </button>
            {dropdownOpen && (
              <div className="absolute mt-1 w-[140px] bg-principal border border-slate-300 rounded-lg shadow-lg z-50">
                <button
                  onClick={() => selectLanguage("en")}
                  className="flex gap-2 w-full px-4 py-2 text-white hover:bg-hover rounded"
                >
                  <ReactCountryFlag
                    countryCode="GB"
                    svg
                    style={{ width: "1.2em", height: "1.2em" }}
                  />{" "}
                  English
                </button>
                <button
                  onClick={() => selectLanguage("fr")}
                  className="flex gap-2 w-full px-4 py-2 text-white hover:bg-hover rounded"
                >
                  <ReactCountryFlag
                    countryCode="FR"
                    svg
                    style={{ width: "1.2em", height: "1.2em" }}
                  />{" "}
                  French
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
