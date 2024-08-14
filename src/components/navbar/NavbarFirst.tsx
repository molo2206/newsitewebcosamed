import { Link } from "react-router-dom";
import SettingsServices from "../../services/SettingsServices";
import useAsync from "../../hooks/useAsync";

const NavbarFirst = () => {
  const { data } = useAsync(() => SettingsServices.getSettings());
  return (
    <div>
      <div className=" bg-white dark:bg-slate-900 dark:text-white">
        <div className="container py-4 md:py-1">
          <div className="grid grid-cols-1 items-center md:grid-cols-3 gap-4 md:gap-8">
            <Link to="/" onClick={() => window.scrollTo}>
              <div className="px-2">
              <img
                  src={data?.logo2}
                  alt=""
                  className="sticky-logo max-w-60 h-full"
                />
                {/* <img src={Logo} alt="not found" className="sm:w-60 h-[80px] w-[100px] " /> */}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarFirst;
