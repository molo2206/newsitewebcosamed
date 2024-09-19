import SettingsServices from "../../services/SettingsServices";
import useAsync from "../../hooks/useAsync";
// import { useTranslation } from "react-i18next";
import InputSearch from "../form/InputSearch";
import useValidation from "../../hooks/useValidation";
import ButtonSearch from "../form/ButtonSearch";
import { useNavigate } from "react-router-dom";

const NavbarFirst = () => {
  const navigation= useNavigate()
  const { data } = useAsync(() => SettingsServices.getSettings());

  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation({
      keyword: "",
    });
  const validation = (e: any) => {
    e.preventDefault();

    let valide = true;
    if (!inputs.keyword) {
      hanldeError("First name us is required", "first_name");
      valide = false;
    }

    if (valide) {
       navigation("/search?q="+inputs.keyword)
       
    }
  };
  return (
    <div className="px-4 lg:px-14 mx-auto bg-white dark:bg-slate-800 dark:text-slate-200 ">
      <div className="container flex flex-col md:flex-row justify-between  items-center gap-4">
        <div className="  md:w-1/2">
          <img src={data?.logo2} alt="" className="sticky-logo w-80 h-full" />
        </div>
        {/* stats */}
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
    </div>
  );
};

export default NavbarFirst;
