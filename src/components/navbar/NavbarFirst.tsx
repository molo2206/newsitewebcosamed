import { Link } from "react-router-dom";
import SettingsServices from "../../services/SettingsServices";
import useAsync from "../../hooks/useAsync";
import Input from "../form/Input";

const NavbarFirst = () => {
  const { data } = useAsync(() => SettingsServices.getSettings());
  return (
    <div>
      <div className=" text-slate-900 dark:bg-slate-900 dark:text-white">
        <div className="py-4 md:py-1">
          <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 row">
            <Link to="/" onClick={() => window.scrollTo}>
              <div className="md:flex justify-between items-center rounded-none">
                <div className="md:px-20 ">
                  <img
                    src={data?.logo2}
                    alt=""
                    className="sticky-logo w-80 h-full"
                  />
                </div>
                <div className="">
                  <Input
                    name="first_name"
                    label="Search"
                    placeholder=""
                    type="text"
                    errors=""
                    value=""
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarFirst;
