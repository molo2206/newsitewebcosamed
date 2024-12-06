import SettingsServices from "../../services/SettingsServices";
import useAsync from "../../hooks/useAsync";
// import { useTranslation } from "react-i18next";
import InputSearch from "../form/InputSearch";
import useValidation from "../../hooks/useValidation";
import ButtonSearch from "../form/ButtonSearch";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavbarFirst = () => {
  const navigation = useNavigate();
  const donatelink = () => {
    navigation("/donation"); // new line
  };
  const { t } = useTranslation();
  // const { data } = useAsync(() => SettingsServices.getSettings());

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
    <div className="min-h-[80px] font-sans">
      <nav className="bg-white dark:bg-slate-800 dark:border border-gray-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-28">
            <div className="flex items-center justify-center  space-x-4 ">
              <div className=" md:w-1/2 mx-auto flex sm:flex-row flex-col sm:items-center justify-around gap-12">
                <form onSubmit={validation} className="mt-2 space-y-6 mb-2">
                  <div className="space-y-px rounded-md items-lg">
                    <div className="blog-search-content">
                      <div className="border-slate-300 border border-sm dark:border-slate-700 search-box">
                        <InputSearch
                          name="keyword"
                          placeholder="Rechercher sur le site!"
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
              <button
                onClick={donatelink}
                className=" sm:h-[48px] sm:w-[140px] rounded-lg  border dark:border-slate-700 dark:bg-red-500
                              bg-red-500 text-white hover:bg-hover
                               hover:text-white font-light text-center md:text-sm"
              >
                {t("Donate")}
              </button>
              <br />
              <div className="items-center hidden md:flex space-x-4">
                <a
                  href="/aboutmedia"
                  className="text-gray-700 dark:text-white hover:text-hover"
                >
                  {t("Media_resources")}
                </a>
                <a
                  href="/sign"
                  className="text-gray-700 dark:text-white hover:text-hover dark:to-hover"
                >
                  {t("Login")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarFirst;
