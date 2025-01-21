import Logo from "../../assets/logo1.png";
import { useEffect, useState } from "react";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
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
  const { handleLanguageChange, lang } = useAuthContext();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const { data: cat } = useAsync(() => CategoryServices.getCategory());

  const element = document.documentElement;

 

  const donatelink = () => {
    navigate("/donation"); // new line
  };
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

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-full w-80
        flex-col justify-between bg-principal dark:bg-slate-900 
        dark:text-white  transition-all
        duration-200 md:hidden rounded-r-xl shadow-md  
    `}
    >
      <div className="relative mt-5 px-2  text-sm">
        <div className=" flex justify-between items-center space-x-2">
          <Link to="/" onClick={() => window.scrollTo}>
            <img src={Logo} alt="" className="h-20" />
          </Link>
          <div>
            {/* Light and dark mode switcher */}
            {theme === "dark" ? (
              <BiSolidSun
                className="text-xl cursor-pointer text-white"
                onClick={() => setTheme("light")}
              />
            ) : (
              <BiSolidMoon
                className="text-xl cursor-pointer text-white"
                onClick={() => setTheme("dark")}
              />
            )}
          </div>
        </div>
        <div className=" text-white font-light mt-5 ml-2 ">
          <ul className=" top-12 left-0 right-0   gap-1 font-light">
            <li className="group cursor-pointer ">
              <a className="flex items-center  ">
                {t("Themes")}
                <span>
                  <FaCaretDown
                    className="transition-all 
                        duration-200 group-hover:rotate-180"
                  />
                </span>
              </a>
              {/* dropdown full width section */}
              <div
                className="dropdown icon absolute left-0 z-[99999] hidden w-full rounded-b-3xl bg-white text-black
                 dark:bg-gray-800 dark:text-white p-2 t ext-black shadow-md group-hover:block"
              >
                <div className="px-2 ">
                  <div className="col-span-2 hover:text-hover">
                    <p className=" text-sm">
                      <div className="mt-2">
                        {cat.map((item: any, index: number) => (
                          <div>
                            <h1 className=" pb-1  text-principal dark:text-white text-md font-light ">
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
              <a className="flex items-center gap-[2px] h-[50px] ">
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
                className="dropdown icon absolute left-0 z-[99999] hidden w-full rounded-b-3xl bg-white text-black
                 dark:bg-gray-800 dark:text-white p-2 t ext-black shadow-md group-hover:block"
              >
                <div className="px-2">
                  <div className="col-span-4 hover:text-hover">
                    <div className="mt-2">
                      <div>
                        <h1 className="  pb-1 hover:text-gray-700 text-principal dark:text-white text-md font-light ">
                          <Link
                            to="/data-loading/newsletters"
                            onClick={() => window.scroll}
                          >
                            {t("Newsletters")}
                          </Link>
                        </h1>
                      </div>
                      <div>
                        <h1 className=" pb-1 hover:text-gray-700 text-principal dark:text-white text-md font-light">
                          <Link
                            to="/data-loading/reports"
                            onClick={() => window.scroll}
                          >
                            {t("Reports")}
                          </Link>
                        </h1>
                      </div>
                      <div>
                        <h1 className=" pb-1 hover:text-gray-700 text-principal dark:text-white text-md font-light ">
                          <Link
                            to="/data-loading/jobopenings"
                            onClick={() => window.scroll}
                          >
                            {t("Jobs")}
                          </Link>
                        </h1>
                      </div>
                      <div>
                        <h1 className=" pb-1 hover:text-gray-700 text-principal dark:text-white text-md font-light  ">
                          <Link to="/projects" onClick={() => window.scroll}>
                            {t("Project")}
                          </Link>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className=" group cursor-pointer">
              <a className="flex items-center gap-[2px] h-full ">
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
                className="dropdown icon absolute left-0 z-[99999] hidden w-full rounded-b-3xl bg-white text-black
                 dark:bg-gray-800 dark:text-white p-2 t ext-black shadow-md group-hover:block "
              >
                <div className="grid grid-cols-3 gap-5 ">
                  <div className="col-span-4">
                    <div className="px-2">
                      <div>
                        <h1 className="pb-1 hover:text-gray-700 text-principal dark:text-white text-md font-light ">
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
                        <h1 className=" pb-1 hover:text-gray-700 text-principal dark:text-white text-md font-light  ">
                          <Link
                            to="/data-loading/videos"
                            onClick={() => window.scroll}
                          >
                            {t("Videos")}
                          </Link>
                        </h1>
                      </div>
                      <div>
                        <h1 className=" pb-1 hover:text-gray-700 text-principal dark:text-white text-md font-light  ">
                          <Link
                            to="/data-loading/blogs"
                            onClick={() => window.scroll}
                          >
                            {t("Blog")}
                          </Link>
                        </h1>
                      </div>
                      <div>
                        <h1 className=" pb-1 hover:text-gray-700 text-principal dark:text-white text-md font-light  ">
                          <Link
                            to="/data-loading/gallery"
                            onClick={() => window.scroll}
                          >
                            {t("Gallery")}
                          </Link>
                        </h1>
                      </div>
                      <div>
                        <h1 className=" pb-1 hover:text-gray-700 text-principal dark:text-white text-md font-light  ">
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
                              bg-principal  dark:hover:text-slate-300  text-white 
                               hover:text-white hover:bg-hover dark:text-white font-light text-center"
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
              <a className="flex items-center gap-[2px] h-[50px] ">
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
                <div className="grid grid-cols-3 gap-5">
                  <div className="col-span-5 ">
                    <p className=" text-sm ">
                      <div className="px-2">
                        <div>
                          <h1 className=" pb-1 hover:text-gray-700 text-principal dark:text-white text-md font-light  ">
                            <Link
                              to="/about"
                              onClick={() => window.scrollTo(0, 0)}
                            >
                              {t("AboutUs")}
                            </Link>
                          </h1>
                        </div>
                        <div>
                          <h1 className="  pb-1 hover:text-gray-700 text-principal dark:text-white text-md font-light ">
                            <Link
                              to="/contact"
                              onClick={() => window.scrollTo(0, 0)}
                            >
                              {t("Contact")}
                            </Link>
                          </h1>
                        </div>
                        <div>
                          <h1 className=" pb-1 hover:text-gray-700 text-principal dark:text-white text-md font-light ">
                            <Link
                              to="/partners"
                              onClick={() => window.scroll(0, 0)}
                            >
                              {t("Partnerships")}
                            </Link>
                          </h1>
                        </div>
                        <div>
                          <h1 className=" pb-1 hover:text-gray-700 text-principal dark:text-white text-md font-light ">
                            <Link
                              to="/team"
                              onClick={() => window.scroll(0, 0)}
                            >
                              {t("Governance")}
                            </Link>
                          </h1>
                        </div>
                        <div>
                          <h1 className=" pb-1 hover:text-gray-700 text-principal dark:text-white text-md font-light ">
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
            <li>
              {/* <Link to="/community/donate" onClick={() => window.scroll}> */}
              <button
                onClick={donatelink}
                className="h-[40px] w-[180px] rounded-lg 
                              bg-white text-principal hover:bg-hover hover:text-white
                               font-semibold text-center"
              >
                {t("Donate")}
                <ToastContainer />
              </button>
              {/* </Link> */}
            </li>
            <li className=" group relative cursor-pointer ">
              <a className="flex items-center gap-[20px] h-[50px]  text-white font-light ">
                {lang === "fr"  ? "Français" : "Anglais"}
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
