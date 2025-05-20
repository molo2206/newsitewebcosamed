import InputSearch from "../form/InputSearch";
import ButtonSearch from "../form/ButtonSearch";
import useValidation from "../../hooks/useValidation";
import { useNavigate } from "react-router-dom";
import { ApplyForm } from "../../types";
import { useTranslation } from "react-i18next";

const NavbarFirst = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-4 bg-white dark:bg-slate-800 shadow-md gap-2">
      {/* Barre de recherche */}
      <form
        onSubmit={validation}
        className="w-full md:w-auto flex justify-center md:justify-start items-center space-x-2"
      >
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
      <div className="w-full md:w-auto flex justify-center md:justify-end items-center space-x-4 text-white">
        <button
          onClick={() => navigate("/donation")}
          className="text-sm hidden md:block bg-red-500 font-semibold px-4 py-2 rounded-md"
        >
          {t("Donate")}
        </button>
        <span
          onClick={() => navigate("/aboutmedia")}
          className="text-gray-700 dark:text-white text-sm cursor-pointer hover:text-hover hidden md:block"
        >
          {t("Media_resources")}
        </span>
      </div>
    </div>
  );
};

export default NavbarFirst;
