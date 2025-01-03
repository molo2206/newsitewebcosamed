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
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const { data: cat } = useAsync(() => CategoryServices.getCategory());
  const { data } = useAsync(() => SettingsServices.getSettings());

  const [showMenu, setShowMenu] = useState(false);
  const element = document.documentElement;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/aboutmedia"); // new line
  };

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
  return (
    <>
      <div className="">
        <header
          style={{ zIndex: 2 }}
          className={`header__sticky ${
            sticky ? "header-sticky" : ""
          } left-0 right-0  lg:max-xl font-montserrat bg-principal  dark:bg-slate-800  text-white border-b-[1px] border-primary/50 `}
        >
          <nav className=" flex items-center md:w-full justify-between lg:h-14 md:h-14 sm:h-10  dark:bg-slate-800  text-white ">
            {/* Logo selection */}
            <div className=" text-white px-4  ">
              <a className={`${sticky ? "block" : "hidden"}`}>
                <Link to="/" onClick={() => window.scrollTo}>
                  <img
                    src={data?.logo1}
                    alt=""
                    className="sticky-logo  w-full h-full"
                  />
                </Link>
              </a>
              <a className={`${!sticky ? "block" : "hidden"}`}>
                {/* <Link to="/" onClick={() => window.scrollTo}>
                <FaHome size={30} />
              </Link> */}
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
            <div className="hidden md:block font-bold font-montserrat ">
              <ul className="flex top-12 left-0 right-0  items-center gap-10 font-montserrat ">
                <li className="group cursor-pointer ">
                  <a className="flex items-center gap-[2px] h-[40px] ">
                    {t("Themes")}
                    <span>
                      <FaCaretDown
                        className="transition-all 
                        duration-200 group-hover:rotate-180"
                      />
                    </span>
                  </a>
                  <div
                    className="dropdown icon absolute left-0 z-[99999] hidden w-full rounded-b-3xl bg-white text-black
                 dark:bg-gray-800 dark:text-white p-2 t ext-black shadow-md group-hover:block"
                  >
                    <div className="grid grid-cols-2 gap-5 px-40 ">
                      <div className="col-span-2">
                        <p className=" text-xs">
                          <div className=" grid grid-cols-5 mt-6">
                            {cat.map((item: any, index: number) => (
                              <div>
                                <h1 className=" pb-1 text-principal font-semibold ">
                                  <CategoryCard cat={item} key={index} />
                                </h1>
                              </div>
                            ))}
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="group cursor-pointer ">
                  <a className="flex items-center gap-[2px] h-[40px] ">
                    {t("Emergency")}
                    <span>
                      <FaCaretDown
                        className=" transition-all 
                        duration-200 group-hover:rotate-180"
                      />
                    </span>
                  </a>
                  {/* dropdown full width section */}
                  <div
                    className="dropdown icon absolute left-0 z-[99999] hidden w-full rounded-b-3xl
                  bg-white text-black
                  dark:bg-gray-800 dark:text-white p-2 t ext-black shadow-md group-hover:block"
                  >
                    <div className="grid grid-cols-3 gap-5 ">
                      <div className="col-span-6">
                        <div className="grid grid-cols-5 mt-6 px-40">
                          <div>
                            <h1 className=" pb-1 hover:text-gray-700 text-principal text-xl font-semibold ">
                              <Link
                                to="/data-loading/newsletters"
                                onClick={() => window.scroll}
                              >
                                {t("Newsletters")}
                              </Link>
                            </h1>
                          </div>

                          <div>
                            <h1 className=" pb-1 hover:text-gray-700 text-principal text-xl font-semibold ">
                              <Link
                                to="/data-loading/jobopenings"
                                onClick={() => window.scroll}
                              >
                                {t("Jobs")}
                              </Link>
                            </h1>
                          </div>
                          <div>
                            <h1 className=" pb-1 hover:text-gray-700 text-principal text-xl font-semibold ">
                              <Link
                                to="/projects"
                                onClick={() => window.scroll}
                              >
                                {t("Project")}
                              </Link>
                            </h1>
                          </div>

                          <div>
                            <h1 className=" pb-1 hover:text-gray-700 text-principal text-xl font-semibold ">
                              <Link
                                to="/job_openings"
                                onClick={() => window.scroll}
                              >
                                {t("Careers")}
                              </Link>
                            </h1>
                          </div>
                          <div>
                            <h1 className=" pb-1 hover:text-gray-700 text-principal text-xl font-semibold ">
                              <Link
                                to="/data-loading/reports"
                                onClick={() => window.scroll}
                              >
                                {t("Reports")}
                              </Link>
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className=" group cursor-pointer">
                  <a className="flex items-center gap-[2px] h-[40px] ">
                    {t("Newsroom")}
                    <span>
                      <FaCaretDown
                        className=" transition-all 
                        duration-200 group-hover:rotate-180"
                      />
                    </span>
                  </a>
                  {/* dropdown full width section */}
                  <div
                    className="dropdown icon  absolute left-0 z-[99999] hidden w-full rounded-b-3xl bg-white text-black
                 dark:bg-gray-800 dark:text-white p-2 t ext-black shadow-md group-hover:block"
                  >
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-4 ">
                        <div className=" grid grid-cols-4 mt-4 px-40">
                          <div>
                            <h1 className=" pb-1 hover:text-gray-700 text-principal text-xl font-semibold ">
                              <Link
                                className="space-y-2 "
                                to="/load-data/communicated"
                                onClick={() => window.scroll(0, 0)}
                              >
                                {t("Press")}
                              </Link>
                            </h1>
                          </div>
                          <div>
                            <h1 className=" pb-1 hover:text-gray-700 text-principal text-xl font-semibold ">
                              <Link
                                to="/data-loading/videos"
                                onClick={() => window.scroll}
                              >
                                {t("Videos")}
                              </Link>
                            </h1>
                          </div>
                          <div>
                            <h1 className=" pb-1 hover:text-gray-700 text-principal text-xl font-semibold ">
                              <Link
                                to="/data-loading/blogs"
                                onClick={() => window.scroll}
                              >
                                {t("Blog")}
                              </Link>
                            </h1>
                          </div>
                          <div>
                            <h1 className=" pb-1 hover:text-gray-700 text-principal text-xl font-semibold ">
                              <Link
                                to="/evements"
                                onClick={() => window.scroll(0, 0)}
                              >
                                {t("Events")}
                              </Link>
                            </h1>
                          </div>
                        </div>
                        <div className=" flex items-center justify-center py-2">
                          <button
                            onClick={handleGoBack}
                            className="h-[60px] w-full rounded-lg 
                              bg-principal  text-white  hover:text-white hover:bg-hover font-bold text-center"
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
                    <span>
                      <FaCaretDown
                        className=" transition-all 
                        duration-200 group-hover:rotate-180"
                      />
                    </span>
                  </a>
                  {/* dropdown full width section */}
                  <div
                    className="dropdown icon absolute left-0 z-[99999] hidden w-full rounded-b-3xl
                  bg-white text-black
                  dark:bg-gray-800 dark:text-white p-2 t ext-black shadow-md group-hover:block"
                  >
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-4 ">
                        <p className=" text-sm ">
                          <div className=" grid grid-cols-5 mt-4 px-40">
                            <div>
                              <h1 className=" pb-1 hover:text-gray-700 text-xl text-principal font-semibold cursor-pointer ">
                                <Link
                                  to="/about"
                                  onClick={() => window.scrollTo(0, 0)}
                                >
                                  {t("AboutUs")}
                                </Link>
                              </h1>
                            </div>
                            <div>
                              <h1 className=" pb-1 hover:text-gray-700 text-xl text-principal font-semibold cursor-pointer ">
                                <Link
                                  to="/contact"
                                  onClick={() => window.scrollTo(0, 0)}
                                >
                                  {t("Contact")}
                                </Link>
                              </h1>
                            </div>
                            <div>
                              <h1 className="pb-1 hover:text-gray-700 text-xl text-principal font-semibold">
                                <Link
                                  to="/partners"
                                  onClick={() => window.scroll(0, 0)}
                                >
                                  {t("Partnerships")}
                                </Link>
                              </h1>
                            </div>
                            {/* <div>
                            <h1 className=" pb-1 hover:text-gray-700 text-xl text-principal font-semibold ">
                              <Link to={`#`} onClick={notify}>
                                {t("Funding")}
                                <ToastContainer />
                              </Link>
                            </h1>
                          </div> */}
                            <div>
                              <h1 className=" pb-1 hover:text-gray-700 text-xl text-principal font-semibold ">
                                <Link
                                  to="/team"
                                  onClick={() => window.scroll(0, 0)}
                                >
                                  {t("Governance")}
                                </Link>
                              </h1>
                            </div>
                            <div>
                              <h1 className=" pb-1 hover:text-gray-700 text-xl text-principal font-semibold ">
                                <Link
                                  to="/community/join"
                                  onClick={() => window.scroll()}
                                >
                                  {t("Becom_member")}
                                </Link>
                              </h1>
                            </div>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>

                <li className=" group relative cursor-pointer border border-slate-300 dark:border-slate-700 w-[140px] rounded-lg flex justify-center">
                  <a className="flex items-center gap-[20px] h-[30px]  text-white font-bold ">
                    {lang === "en" ? "Anglais" : "Français"}
                    <span>
                      <FaCaretDown
                        className=" transition-all 
                      duration-200 group-hover:rotate-180"
                      />
                    </span>
                  </a>
                  {/* dropdown section */}
                  <div className="dropdown-lg absolute -center-9 z-[99999] hidden w-[150px] rounded-lg bg-white dark:bg-slate-900 text-principal dark:text-white p-2 shadow-md   group-hover:block">
                    <ul className="">
                      <li
                        role="button"
                        onClick={() => handleLanguageChange("fr")}
                        className="p-2  hover:text-principal cursor-pointer"
                      >
                        <a>
                          <ReactCountryFlag
                            className="emojiFlag mr-2"
                            countryCode="FR"
                            svg
                            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                            cdnSuffix="svg"
                            title="FR"
                          />
                          Français
                        </a>
                      </li>
                      <li
                        role="button"
                        onClick={() => handleLanguageChange("en")}
                        className="p-2  hover:text-principal cursor-pointer"
                      >
                        <a>
                          <ReactCountryFlag
                            className="emojiFlag mr-2"
                            countryCode="US"
                            svg
                            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                            cdnSuffix="svg"
                            title="US"
                          />
                          Anglais
                        </a>
                      </li>
                    </ul>
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
