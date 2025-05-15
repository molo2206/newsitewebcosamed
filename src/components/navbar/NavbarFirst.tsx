import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import InputSearch from "../form/InputSearch";
import ButtonSearch from "../form/ButtonSearch";
import { useAuthContext } from "../../context";
import useValidation from "../../hooks/useValidation";
import { useNavigate } from "react-router-dom";
import { ApplyForm } from "../../types";
import { useTranslation } from "react-i18next";

const NavbarFirst = () => {
  const { user, removeSession } = useAuthContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isDropdown, setIsDropdown] = useState(false);

  const toggleMenu = () => setIsDropdown(!isDropdown);

  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation<ApplyForm>({ keyword: "" });

  const validation = (e: any) => {
    e.preventDefault();
    if (!inputs.keyword) {
      hanldeError("keyword is required", "keyword");
      return;
    }
    navigate("/search?q=" + inputs.keyword);
  };

  const handleLogout = () => {
    removeSession();
    navigate("/auth/signin", { replace: true });
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-800 shadow-md">
      {/* Barre de recherche */}
      <form onSubmit={validation} className="flex items-center space-x-4 p-2">
        <InputSearch
          name="keyword"
          placeholder={t("Search")}
          type="text"
          errors={errors.keyword}
          value={inputs.keyword}
          onChange={(e: any) => handleOnChange(e.target.value, "keyword")}
        />
        <ButtonSearch label="" loading={""} />
      </form>

      {/* Don / Profil */}
      <div className="flex items-center space-x-4 text-white">
        <button
          onClick={() => navigate("/donation")}
          className="text-sm md:block hidden bg-red-500 font-semibold px-4 py-2 rounded-md"
        >
          {t("Donate")}
        </button>
        <span
          onClick={() => navigate("/aboutmedia")}
          className="text-gray-700 dark:text-white text-sm cursor-pointer hover:text-hover hidden md:block"
        >
          {t("Media_resources")}
        </span>

        {/* Avatar utilisateur */}
        <button
          onClick={toggleMenu}
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

        {/* Menu déroulant */}
        {isDropdown && (
          <>
            <div
              className="absolute right-2 py-2 mt-72 w-60  bg-principal  dark:bg-slate-800 dark:border border-slate-700
                         rounded-lg shadow-lg z-50"
              onClick={() => setIsDropdown(false)}
            >
              <div className="flex flex-col items-center justify-center p-2 space-y-2">
                {!user?.image ? (
                  <FaUserCircle className="text-white w-12 h-12" />
                ) : (
                  <img
                    src={user.image}
                    alt="Profil"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <span className="text-[12px] text-white text-center">
                  {user?.email}
                </span>
              </div>

              <ul className="text-sm text-white">
                <li
                  onClick={() =>
                    navigate("/recruiting/cosamed/job_openings/accountsettings")
                  }
                  className="px-4 py-2 hover:bg-hover cursor-pointer"
                >
                  {t("My_profile")}
                </li>
                <li
                  onClick={() => navigate("/job_openings/userHome")}
                  className="px-4 py-2 hover:bg-hover cursor-pointer"
                >
                  {t("My_applications")}
                </li>
                {!user ? (
                  <li
                    onClick={() => navigate("/auth/signin")}
                    className="px-4 py-2 hover:bg-hover cursor-pointer"
                  >
                    {t("Login")}
                  </li>
                ) : (
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-hover cursor-pointer"
                  >
                    {t("Logout")}
                  </li>
                )}
                <li
                  onClick={() =>
                    navigate("/recruiting/cosamed/job_openings/register")
                  }
                  className="px-4 py-2 hover:bg-hover cursor-pointer"
                >
                  {t("Register")}
                </li>
              </ul>
            </div>

            <div
              className="fixed inset-0 z-40 cursor-pointer"
              onClick={() => setIsDropdown(false)}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarFirst;
