import InputSearch from "../form/InputSearch";
import useValidation from "../../hooks/useValidation";
import ButtonSearch from "../form/ButtonSearch";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../context";
import { useState } from "react";
import {

  FaUserCircle,
} from "react-icons/fa";

const NavbarFirst = () => {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

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
  const { t } = useTranslation();
  const { removeSession } = useAuthContext();

  const handleLogout = () => {
    removeSession();
    navigation("/", { replace: true });
  };

  const { inputs, errors, handleOnChange, hanldeError } = useValidation({
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
                          placeholder="Rechercher sur le site en mode privé!"
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
            <div>
              {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-lg w-96">
                    <div className="p-4 border-b">
                      <h2 className="text-lg flex justify-center text-black font-semibold">
                        {/* {!user
                          ? "Voulez-vous vous connecter ?"
                          : "Voulez-vous vous déconnecter ?"} */}
                        <FaUserCircle className=" text-principal" size={24} />
                      </h2>
                    </div>
                    <div className="p-4 flex justify-center">
                      <p className="text-black">
                        {!user
                          ? "Voulez-vous vous connecter ?"
                          : "Voulez-vous vous déconnecter ?"}
                      </p>
                    </div>
                    <div className="flex justify-between p-4 border-t">
                      {!user ? (
                        <button
                          className="px-4 py-2 text-white  bg-red-500 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                          onClick={login}
                        >
                          Se connecter
                        </button>
                      ) : (
                        <button
                          className="px-4 py-2 text-white  bg-red-500 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                          onClick={handleLogout}
                        >
                          Se déconnecter
                        </button>
                      )}

                      <button
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={toggleModal}
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center lg:space-x-6 sm:space-x-2 md:space-x-8 ">
              <div className=" flex justify-between space-x-2">
                <button
                  onClick={donatelink}
                  className=" sm:h-[38px] sm:w-[140px] rounded-lg  border dark:border-slate-700 dark:bg-red-500
                              bg-red-500 text-white hover:bg-hover
                               hover:text-white font-light text-center md:text-sm"
                >
                  {t("Donate")}
                </button>
                <div className="items-center hidden md:flex space-x-4">
                  <a
                    style={{ fontSize: 12 }}
                    href="/aboutmedia"
                    className="text-gray-700 cursor-pointer dark:text-white  hover:text-hover"
                  >
                    {t("Media_resources")}
                  </a>
                  <br />
                  <a
                    onClick={toggleModal}
                    style={{ fontSize: 12 }}
                    className="text-gray-700 cursor-pointer dark:text-white hover:text-hover  dark:to-hover "
                  >
                    {!user ? t("Login") : user?.email}
                  </a>
                </div>
                {!user ? (
                  ""
                ) : (
                  <div className="flex items-center justify-between text-gray-500 text-sm">
                    <div className=" flex justify-between space-x-2 items-center">
                      {!user?.image ? (
                        <FaUserCircle className=" text-principal" size={24} />
                      ) : (
                        <img
                          src={user?.image}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarFirst;
