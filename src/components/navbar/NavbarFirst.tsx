import SettingsServices from "../../services/SettingsServices";
import useAsync from "../../hooks/useAsync";
// import { useTranslation } from "react-i18next";
import InputSearch from "../form/InputSearch";

const NavbarFirst = () => {
  const { data } = useAsync(() => SettingsServices.getSettings());
  // const { t } = useTranslation();
  return (
    <div className="px-4 lg:px-14 mx-auto dark:bg-slate-900 dark:text-slate-200 ">
      <div className="container flex flex-col md:flex-row justify-between  items-center gap-4">
        <div className="  md:w-1/2">
          <img src={data?.logo2} alt="" className="sticky-logo w-80 h-full" />
        </div>
        {/* stats */}
        <div className=" md:w-1/2 mx-auto flex sm:flex-row flex-col sm:items-center justify-around gap-12">
          <form className="mt-2 space-y-6 mb-2">
            <div className="space-y-px rounded-md items-l">
              <div className="blog-search-content">
                <div className="border-slate-300 border border-sm dark:border-slate-700 search-box">
                <InputSearch
                    name="first_name"
                    placeholder="Rechercher sur le site!"
                    type="text"
                    errors=""
                    value=""
                  />
                  <button>
                    <i className=" items-center fa fa-search"></i>
                  </button>
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
