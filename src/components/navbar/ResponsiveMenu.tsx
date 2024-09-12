import { FaCaretDown } from "react-icons/fa";
import Logo from "../../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CategoryServices from "../../services/CategoryServices";
import useAsync from "../../hooks/useAsync";
import CategoryCard from "../blogs/CategoryCard";
import ReactCountryFlag from "react-country-flag";

interface props {
  showMenu?: any;
}

const ResponsiveMenu = ({ showMenu }: props) => {
  const { data: cat } = useAsync(() => CategoryServices.getCategory());

  const emergency = [
    { name: "Newsletters", link: "/data-loading/newsletters" },
    { name: "Reports", link: "/data-loading/reports" },
    { name: "Jobs", link: "/data-loading/jobopenings" },
    { name: "Other", link: "/data-loading/othersdoc" },
  ];

  const newsroom = [
    { name: "Press", link: "/load-data/communicated" },
    { name: "Videos", link: "/data-loading/videos" },
    { name: "Podcast", link: "/data-loading/podcast" },
    { name: "Blog", link: "/data-loading/blogs" },
    { name: "Events", link: "#" },
  ];

  const about = [
    { name: "Contact", link: "/contact" },
    { name: "Partnerships", link: "/partners" },
    { name: "Funding", link: "#" },
    { name: "Governance", link: "/team" },
    { name: "Becom_member", link: "/community/join" },
  ];

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/aboutmedia"); // new line
  };
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-full w-80
        flex-col justify-between bg-principal
        dark:text-white  transition-all
        duration-200 md:hidden rounded-r-xl shadow-md  
    `}
    >
      <div className="relative mt-5 px-5  text-sm">
        <div>
          <Link to="/" onClick={() => window.scrollTo}>
            <img src={Logo} alt="" className="h-20" />
          </Link>
        </div>
        <div className=" text-white font-montserrat mt-5 ml-2 ">
          <ul className="space-y-4  text-sm ">
            <li>
              <a href="/">{t("Home")}</a>
            </li>
            <li className="py-4 relative group cursor-pointer  group-hover:block  text-center ">
              <div className="dropdown  flex items-center">
                <a href="#" className="flex items-center">
                  {t("Themes")}
                  <span>
                    <FaCaretDown
                      className=" transition-all 
                        duration-200 group-hover:rotate-180"
                    />
                  </span>
                </a>
              </div>
              <div
                className=" absolute -left-5 top-[60px] z-[999999] hidden group-hover:block 
                   shadow-md w-[250px] bg-gray-300 rounded-lg p-3 "
              >
                <ul>
                  {cat.map((item: any, index: number) => {
                    return (
                      <li key={item?.name} className=" text-left text-sm">
                        <h1 className="pb-1 hover:text-gray-700 text-principal font-semibold ">
                          <CategoryCard cat={item} key={index} />
                        </h1>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
            <li className=" relative group cursor-pointer  group-hover:block  text-center">
              <div className="dropdown  flex items-center">
                <a className="flex items-center">
                  {t("Emergency")}
                  <span>
                    <FaCaretDown
                      className=" transition-all 
                        duration-200 group-hover:rotate-180"
                    />
                  </span>
                </a>
              </div>
              <div
                className="  absolute -left-5 top-[60px] z-[999999] hidden group-hover:block 
                shadow-md w-[250px] bg-gray-300 rounded-lg p-3"
              >
                <ul className="space-y-4 text-xl ">
                  {emergency.map(({ name, link }, index) => (
                    <li
                      key={index}
                      className=" text-left text-sm text-principal"
                    >
                      <Link to={link} className="md-5 inline-block">
                        {t(name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="relative group cursor-pointer  group-hover:block  text-center ">
              <div className="dropdown  flex items- center">
                <a className="flex items-center gap-[2px] h-[50px] ">
                  {t("Newsroom")}
                  <span>
                    <FaCaretDown
                      className=" transition-all 
                        duration-200 group-hover:rotate-180"
                    />
                  </span>
                </a>
              </div>
              <div
                className="  absolute -left-5 top-[60px] z-[999999] hidden group-hover:block 
                shadow-md w-[250px] bg-gray-300 rounded-lg p-3"
              >
                <ul>
                  {newsroom.map((data) => {
                    return (
                      <li
                        key={data?.name}
                        className=" text-left text-sm text-principal"
                      >
                        <a href={data.link}>{t(data?.name)}</a>
                      </li>
                    );
                  })}
                  <li>
                    <button
                      onClick={handleGoBack}
                      className="h-[60px] w-full rounded-lg 
                              bg-principal  text-white  hover:text-white hover:bg-hover font-bold text-center"
                    >
                      {t("Find_More")}
                    </button>
                  </li>
                </ul>
              </div>
            </li>
            <li className="relative group cursor-pointer  group-hover:block  text-center">
              <div className="dropdown  flex items- center">
                <a className="flex items-center gap-[2px] h-[50px] ">
                  {t("AboutUs")}
                  <span>
                    <FaCaretDown
                      className=" transition-all 
                        duration-200 group-hover:rotate-180"
                    />
                  </span>
                </a>
              </div>
              <div
                className="  absolute -left-5 top-[60px] z-[999999] hidden group-hover:block 
                shadow-md w-[250px] bg-gray-300 rounded-lg p-3"
              >
                <ul>
                  {about.map((data) => {
                    return (
                      <li
                        key={data?.name}
                        className=" text-left text-sm text-principal"
                      >
                        <a href={data.link}>{t(data?.name)}</a>
                      </li>
                    );
                  })}
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
