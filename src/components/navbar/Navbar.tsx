import { useEffect, useState } from "react";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { FaCaretDown, FaHome } from "react-icons/fa";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import useSticky from "../../hooks/useSticky";
import Logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";
import { MdContactMail, MdPerson2 } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { MdManageAccounts } from "react-icons/md";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { CiVideoOn } from "react-icons/ci";
import { FaPodcast } from "react-icons/fa6";
import { FaBlog } from "react-icons/fa";
import { BsCalendar2Event } from "react-icons/bs";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../context";
import { ToastContainer, toast } from "react-toastify";
import CategoryServices from "../../services/CategoryServices";
import useAsync from "../../hooks/useAsync";
import CategoryCard from "../blogs/CategoryCard";

function Navbar() {
  const { handleLanguageChange, lang } = useAuthContext();
  const { t } = useTranslation();
  const { sticky } = useSticky();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const { data: cat } = useAsync(() => CategoryServices.getCategory());

  const [showMenu, setShowMenu] = useState(false);
  const element = document.documentElement;

  const notify = () =>
    toast("Cette fonctionnalité est encours de développement!");

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
      <header
        style={{ zIndex: 2 }}
        className={`header__sticky ${
          sticky ? "header-sticky" : ""
        } left-0 right-0 bg-navbar text-white border-b-[1px] border-primary/50`}
      >
        <nav className="container flex items-center justify-between h-[50px]">
          {/* Logo selection */}
          <div className=" text-white ">
            <a className={`${sticky ? "block" : "hidden"}`}>
              <Link to="/" onClick={() => window.scrollTo}>
                <img
                  src={Logo}
                  alt=""
                  className="sticky-logo sm:w-60   sm:h-70"
                />
              </Link>
            </a>
            <a className={`${!sticky ? "block" : "hidden"}`}>
              <Link to="/" onClick={() => window.scrollTo}>
                <FaHome size={20} />
              </Link>
            </a>
          </div>
          {/* Desktop menu selection */}
          <div className="hidden md:block font-bold font-montserrat">
            <ul className="flex top-12 left-0 right-0  items-center gap-10 font-montserrat">
              <li className="group cursor-pointer ">
                <a className="flex items-center gap-[2px] h-[50px] ">
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
                  <div className="grid grid-cols-2 gap-5 px-40 ">
                    <div className="col-span-2">
                      <p className=" text-xs">
                        <div className=" grid grid-cols-4 mt-6">
                          {cat.map((item: any, index: number) => (
                            <div>
                              <h1 className=" pb-1 hover:text-gray-700 text-principal text-md font-semibold ">
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
                  <div className="grid grid-cols-4 gap-5 px-40">
                    <div className="col-span-4">
                      <div className=" grid grid-cols-4 mt-6">
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
                              to="/data-loading/reports"
                              onClick={() => window.scroll}
                            >
                              {t("Reports")}
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
                              to="/data-loading/othersdoc"
                              onClick={() => window.scroll}
                            >
                              {t("Other")}
                            </Link>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className=" group cursor-pointer">
                <a className="flex items-center gap-[2px] h-[50px] ">
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
                  className="dropdown absolute left-0 z-[99999] hidden w-full rounded-b-3xl bg-white text-black
                 dark:bg-gray-800 dark:text-white p-2 t ext-black shadow-md group-hover:block"
                >
                  <div className="grid grid-cols-4 gap-5 ">
                    <div className="col-span-4">
                      <div className="grid grid-cols-5 mt-6 px-40">
                        <div>
                          <h1 className=" pb-1 hover:text-gray-700 text-principal text-xl font-semibold ">
                            <Link
                              className="space-y-2"
                              to=""
                              onClick={() => window.scroll(0, 0)}
                            >
                              <PiNewspaperClippingFill size={25} />
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
                              <CiVideoOn size={25} />
                              {t("Videos")}
                            </Link>
                          </h1>
                        </div>
                        <div>
                          <h1 className=" pb-1 hover:text-gray-700 text-principal text-xl font-semibold ">
                            <Link
                              to="/data-loading/podcast"
                              onClick={() => window.scroll}
                            >
                              <FaPodcast size={25} />
                              {t("Podcast")}
                            </Link>
                          </h1>
                        </div>
                        <div>
                          <h1 className=" pb-1 hover:text-gray-700 text-principal text-xl font-semibold ">
                            <Link
                              to="/data-loading/blogs"
                              onClick={() => window.scroll}
                            >
                              <FaBlog size={25} />
                              {t("Blog")}
                            </Link>
                          </h1>
                        </div>
                        <div>
                          <h1 className=" pb-1 hover:text-gray-700 text-principal text-xl font-semibold ">
                            <Link to="" onClick={() => window.scroll(0, 0)}>
                              <BsCalendar2Event size={25} />
                              {t("Events")}
                            </Link>
                          </h1>
                        </div>
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
                  className="dropdown absolute left-0 z-[99999] hidden w-full rounded-b-3xl
                  bg-white text-black
                  dark:bg-gray-800 dark:text-white p-2 t ext-black shadow-md group-hover:block"
                >
                  <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-5 ">
                      <p className=" text-sm ">
                        <div className=" grid grid-cols-5 mt-4 px-40">
                          <div>
                            <h1 className=" pb-1 hover:text-gray-700 text-xl text-principal font-semibold cursor-pointer ">
                              <Link
                                to="/contact"
                                onClick={() => window.scrollTo(0, 0)}
                              >
                                <MdContactMail size={25} />
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
                                <BiDonateHeart size={25} />
                                {t("Partnerships")}
                              </Link>
                            </h1>
                          </div>
                          <div>
                            <h1 className=" pb-1 hover:text-gray-700 text-xl text-principal font-semibold ">
                              <Link to="" onClick={() => window.scroll(0, 0)}>
                                <CiMoneyCheck1 size={25} />
                                {t("Funding")}
                              </Link>
                            </h1>
                          </div>
                          <div>
                            <h1 className=" pb-1 hover:text-gray-700 text-xl text-principal font-semibold ">
                              <Link
                                to="/team"
                                onClick={() => window.scroll(0, 0)}
                              >
                                <MdManageAccounts size={25} />
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
                                <MdPerson2 size={25} />
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
                  onClick={notify}
                  className="h-[40px] w-[180px] rounded-lg 
                              bg-white text-principal hover:bg-orange-300 hover:text-white font-semibold text-center"
                >
                  {t("Donate")}
                  <ToastContainer />
                </button>
                {/* </Link> */}
              </li>
              <li className=" group relative cursor-pointer ">
                <a className="flex items-center gap-[20px] h-[50px] text-white font-bold ">
                  {lang === "en" ? "Anglais" : "Français"}
                  <span>
                    <FaCaretDown
                      className=" transition-all 
                      duration-200 group-hover:rotate-180"
                    />
                  </span>
                </a>
                {/* dropdown section */}
                <div className="dropdown-lg absolute -center-9 z-[99999] hidden w-[150px] rounded-lg bg-white p-2 shadow-md text-black  group-hover:block">
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
            </ul>
          </div>
          {/* Mobile menu header */}
          <div className="flex items-center gap-4 md:hidden">
            {theme === "dark" ? (
              <BiSolidSun
                className="text-xl"
                onClick={() => setTheme("light")}
              />
            ) : (
              <BiSolidMoon
                className="text-xl"
                onClick={() => setTheme("dark")}
              />
            )}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMe}
                className=" cursor-pointer transition-all"
                size={20}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMe}
                className=" cursor-pointer transition-all"
                size={20}
              />
            )}
            {/* Lang mobile */}
            <div>
              <div className=" group relative cursor-pointer  md:hidden text-sm">
                <a className="flex items-center gap-[40px] h-[30px] text-white font-bold ">
                  {lang === "en" ? "Anglais" : "Français"}
                  <span>
                    <FaCaretDown
                      className=" transition-all 
                      duration-200 group-hover:rotate-180"
                    />
                  </span>
                </a>
                {/* dropdown section */}
                <div className="dropdown-lg absolute -center-9 z-[9999] hidden w-[150px] rounded-lg bg-white p-2 shadow-md text-black  group-hover:block">
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
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* Mobile menu section  dropdown */}
      <ResponsiveMenu showMenu={showMenu} />
    </>
  );
}

export default Navbar;
