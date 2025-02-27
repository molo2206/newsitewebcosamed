import Logo from "../../assets/logo1.png";
import { useEffect, useState } from "react";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import CategoryServices from "../../services/CategoryServices";
import useAsync from "../../hooks/useAsync";
import CategoryCard from "../blogs/CategoryCard";
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { useAuthContext } from "../../context";
interface props {
  showMenu?: any;
}

const ResponsiveMenu = ({ showMenu }: props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const donatelink = () => {
    navigate("/donation"); // new line
  };
  const handleGoBack = () => {
    navigate("/aboutmedia"); // new line
  };

  const [openMenu, setOpenMenu] = useState(null);
  const { data: category } = useAsync(() => CategoryServices.getCategory());
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleMenu = (menu: any) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const { handleLanguageChange } = useAuthContext();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const [selectedLanguage, setSelectedLanguage] = useState("fr");
  const selectLanguage = (language: any) => {
    setSelectedLanguage(language);
    setDropdownOpen(false);
    handleLanguageChange(language);
  };
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-full w-80  py-10
      flex-col justify-between bg-principal dark:bg-slate-800 
       transition-all
      duration-200 md:hidden rounded-r-xl shadow-md  
  `}
    >
      <div className="relative mt-5  text-sm dark:bg-slate-800 bg-principale h-full">
        <div className=" flex justify-between items-center space-x-2">
          <Link to="/" onClick={() => window.scrollTo}>
            <img src={Logo} alt="" className="h-20" />
          </Link>
          <div className="p-4">
            {/* Light and dark mode switcher */}
            {theme === "dark" ? (
              <BiSolidSun
                className="text-xl cursor-pointer text-white rounded-full border border-slate-400 dark:border-slate-700 "
                onClick={() => setTheme("light")}
              />
            ) : (
              <BiSolidMoon
                className="text-xl cursor-pointer text-white rounded-full border border-slate-400 dark:border-slate-700 "
                onClick={() => setTheme("dark")}
              />
            )}
          </div>
        </div>
        {/* Menu Items */}
        <ul className="space-y-4 p-8  ">
          <li>
            <a
              href="/"
              className="block text-white  dark:bg-slate-800
            dark:text-white  font-medium"
            >
              {t('Home')}
            </a>
          </li>
          <li>
            <div>
              <button
                onClick={() => toggleMenu("services")}
                className="flex justify-between items-center w-full 
               text-white dark:bg-slate-800
               dark:text-white  font-medium"
              >
                {t("Themes")}
                <span>{openMenu === "services" ? "−" : "+"}</span>
              </button>
              {openMenu === "services" && (
                <ul
                  className="mt-2 pl-4 space-y-2 text-white dark:bg-slate-800
               dark:text-white w-64 h-60  rounded-lg p-2 overflow-y-auto"
                >
                  {category?.map((item: any, index: number) => (
                    <li>
                      <CategoryCard cat={item} key={index} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          <li>
            <div>
              <button
                onClick={() => toggleMenu("ressources")}
                className="flex justify-between items-center w-full 
              text-white dark:bg-slate-800
               dark:text-white font-medium"
              >
                {t("Emergency")}
                <span>{openMenu === "ressources" ? "−" : "+"}</span>
              </button>
              {openMenu === "ressources" && (
                <ul
                  className="mt-2 pl-4 space-y-2 dark:bg-slate-800
               dark:text-white  text-white"
                >
                  <li>
                    <a href="/data-loading/newsletters">{t("Newsletters")}</a>
                  </li>
                  <li>
                    <a href="/data-loading/reports">{t("Reports")}</a>
                  </li>
                  <li>
                    <a href="/data-loading/jobopenings">{t("Jobs")}</a>
                  </li>
                  <li>
                    <a href="/projects">{t("Project")}</a>
                  </li>
                </ul>
              )}
            </div>
          </li>
          <li>
            <div>
              <button
                onClick={() => toggleMenu("media")}
                className="flex justify-between items-center w-full 
              text-white dark:bg-slate-800
               dark:text-white font-medium"
              >
                {t("Newsroom")}
                <span>{openMenu === "media" ? "−" : "+"}</span>
              </button>
              {openMenu === "media" && (
                <ul
                  className="mt-2 pl-4 space-y-2 dark:bg-slate-800
               dark:text-white  text-white w-64 h-32  rounded-lg p-2 overflow-y-auto"
                >
                  <li>
                    <a href="/load-data/communicated">{t("Press")}</a>
                  </li>
                  <li>
                    <a href="/data-loading/videos">{t("Videos")}</a>
                  </li>
                  <li>
                    <a href="/data-loading/blogs">{t("Blog")}</a>
                  </li>
                  <li>
                    <a href="/data-loading/gallery">{t("Gallery")}</a>
                  </li>
                  <li>
                    <a href="/evements">{t("Events")}</a>
                  </li>
                  <li>
                    <div className=" flex items-center justify-center py-2">
                      <button
                        onClick={handleGoBack}
                        className="h-[60px] w-full rounded-lg 
                              bg-hover dark:bg-slate-700  dark:hover:text-slate-300  text-white 
                               hover:text-white hover:bg-hover dark:text-white font-light text-center"
                      >
                        {t("Find_More")}
                        <ToastContainer />
                      </button>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </li>
          <li>
            <a
              href="/data-loading/jobopenings"
              className="block 
               dark:text-white  text-white font-medium"
            >
              {t("Jobs")}
            </a>
          </li>
          <li>
            <div>
              <button
                onClick={() => toggleMenu("about")}
                className="flex justify-between items-center w-full 
              text-white dark:bg-slate-800
               dark:text-white font-medium"
              >
                {t("AboutUs")}
                <span>{openMenu === "about" ? "−" : "+"}</span>
              </button>
              {openMenu === "about" && (
                <ul
                  className="mt-2 pl-4 space-y-2 dark:bg-slate-800
               dark:text-white  text-white"
                >
                  <li>
                    <a href="/about">{t("AboutUs")}</a>
                  </li>
                  <li>
                    <a href="/contact">{t("Contact")}</a>
                  </li>
                  <li>
                    <a href="/partners">{t("Partnerships")}</a>
                  </li>
                  <li>
                    <a href="/team">{t("Governance")}</a>
                  </li>
                  <li>
                    <a href="/community/join">{t("Becom_member")}</a>
                  </li>
                </ul>
              )}
            </div>
          </li>
          <li>
            <button
              onClick={donatelink}
              className="h-[40px] w-[180px] rounded-lg 
                               bg-red-500 text-white hover:bg-hover p-2 hover:text-white
                               font-semibold text-center"
            >
              {t("Donate")}
              <ToastContainer />
            </button>
          </li>
          <li className=" group relative cursor-pointer ">
            <div className="relative md:hidden sm:block py-2">
              <button
                className="flex items-center gap-2 bg-principale border border-slate-300 text-sm md:text-sm text-white px-4 py-2 rounded"
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
                <div
                  className="absolute right-38 mt-1 w-[140px]  bg-principal border dark:bg-slate-800 dark:border border-slate-300
                                       rounded-lg shadow-lg z-50"
                >
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
        </ul>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
