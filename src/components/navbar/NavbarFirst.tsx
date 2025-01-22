import InputSearch from "../form/InputSearch";
import useValidation from "../../hooks/useValidation";
import ButtonSearch from "../form/ButtonSearch";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../context";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { ApplyForm } from "../../types";

const NavbarFirst = () => {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpens, setIsOpens] = useState(false);
  const toggleMenu = () => {
    setIsOpens((prevState) => !prevState);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const navigation = useNavigate();
  const donatelink = () => {
    navigation("/donation"); // new line
  };

  const login = () => {
    toggleModal;
    navigation("auth/signin");
  };
  const profile = () => {
    navigation("/recruiting/cosamed/job_openings/accountsettings"); // new line
  };
  const condidate = () => {
    navigation("/job_openings/userHome"); // new line
  };

  const register = () => {
    navigation("/recruiting/cosamed/job_openings/register");
  };

  const { t } = useTranslation();
  const { removeSession } = useAuthContext();

  const handleLogout = () => {
    removeSession();
    navigation("/", { replace: true });
  };

  const { inputs, errors, handleOnChange, hanldeError } = useValidation <ApplyForm>({
    keyword: "",
  });
  const validation = (e: any) => {
    e.preventDefault();

    let valide = true;
    if (!inputs.keyword) {
      hanldeError("keyword is required", "keyword");
      valide = false;
    }

    if (valide) {
      navigation("/search?q=" + inputs.keyword);
    }
  };
  return (
    <div className="min-h-[100px] font-sans">
      <nav className="bg-white dark:bg-slate-800 dark:border border-gray-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-28">
            <div className=" flex items-center justify-center  space-x-4 ">
              <div className=" md:w-1/2 mx-auto flex sm:flex-row flex-col sm:items-center justify-around gap-12">
                <form onSubmit={validation} className="mt-2 space-y-6 mb-2">
                  <div className="space-y-px rounded-md items-lg">
                    <div className="blog-search-content">
                      <div className="border-slate-300 border md:w-full lg:w-[250px] border-sm dark:border-slate-700 search-box">
                        <InputSearch
                          name="keyword"
                          placeholder="Rechercher"
                          type="text"
                          errors={errors.keyword}
                          value={inputs.keyword}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "keyword")
                          }
                        />
                        <ButtonSearch loading="" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex items-center lg:space-x-6 sm:space-x-2 md:space-x-8 ">
              <div className=" flex justify-between space-x-2">
                <button
                  onClick={donatelink}
                  className=" p-2 sm:h-[38px] sm:w-[140px] rounded-lg  border dark:border-slate-700 dark:bg-red-500
                              bg-red-500 text-white hover:bg-hover
                               hover:text-white font-light text-center md:text-sm"
                >
                  {t("Donate")}
                </button>
                <div className="items-center hidden md:flex space-x-4">
                  <a
                    style={{}}
                    href="/aboutmedia"
                    className="text-gray-700 cursor-pointer text-sm dark:text-white  hover:text-hover"
                  >
                    {t("Media_resources")}
                  </a>
                  <div className="relative">
                    {/* Bouton de la photo de profil */}
                    <button
                      onClick={toggleMenu}
                      className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden focus:outline-none"
                    >
                      {!user?.image ? (
                        <FaUserCircle
                          className=" text-principal w-full h-full object-cover"
                          size={24}
                        />
                      ) : (
                        <img
                          src={user?.image}
                          alt=""
                          className="w-full h-full rounded-full"
                        />
                      )}
                    </button>

                    {/* Menu déroulant */}
                    {isOpens && (
                      <div
                        className="absolute right-0 py-2 w-60  bg-principal  dark:bg-slate-800 dark:border border-slate-700
                         rounded-lg shadow-lg z-50"
                        onClick={() => setIsOpens(false)} // Optionnel : Ferme le menu si on clique dessus
                      >
                        <div className="flex flex-wrap  px-4 items-center mb-4">
                          {!user?.image ? (
                            <FaUserCircle
                              className=" text-white w-8 h-8 object-cover"
                              size={24}
                            />
                          ) : (
                            <img
                              src={user?.image}
                              alt=""
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <div className="ml-3">
                            <h3 className="text-sm font-light" style={{fontSize:11}}>
                              {!user ? "" : user?.email}
                            </h3>
                          </div>
                        </div>
                        <ul className="py-1 text-xs">
                          <li
                            onClick={profile}
                            className="px-4 py-2 font-light
                           dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                          >
                            Mon Profil
                          </li>
                          <li
                            onClick={condidate}
                            className="px-4 py-2 font-light  dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                          >
                            Mes candidatures
                          </li>
                          {!user ? (
                            <li
                              onClick={login}
                              className="px-4 py-2 font-light   dark:hover:bg-gray-700 dark:hover:text-white  cursor-pointer"
                            >
                              {t("Login")}
                            </li>
                          ) : (
                            <li
                              onClick={handleLogout}
                              className="px-4 py-2 font-light   dark:hover:bg-gray-700 dark:hover:text-white  cursor-pointer"
                            >
                              {t("Logout")}
                            </li>
                          )}
                          <li
                            onClick={register}
                            className="px-4 py-2 font-light dark:hover:bg-gray-700 dark:hover:text-white  cursor-pointer"
                          >
                            {t("Register")}
                          </li>
                        </ul>
                      </div>
                    )}
                    {/* Overlay pour fermer le menu si on clique à l'extérieur */}
                    {isOpens && (
                      <div
                        className="fixed inset-0 z-40 cursor-pointer"
                        onClick={() => setIsOpens(false)}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarFirst;
