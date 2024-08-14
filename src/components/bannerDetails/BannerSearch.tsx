import { MdSearch, MdOutlineParagliding } from "react-icons/md";
import "react-multi-carousel/lib/styles.css";
import { WiTime3 } from "react-icons/wi";
import { FaPeopleCarry } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

import Input from "../form/Input";

function BannerSearch() {
  return (
    <div className="py-8">
      <div className=" flex flex-col  items-center justify-center relative z-10 lg:h-full h-screen max-w-[1200px] px-6 lg:pt-0 pt-16 mx-auto">
        <div className=" bg-white grid lg:grid-cols-5 grid-cols-1 rounded-lg w-full ">
          <span className=" flex items-center py-7 border-r border-gray-500 relative pl-4 ">
            <MdOutlineParagliding className=" text-4xl text-orange-500" />
            <span className=" flex flex-col justify-center absolute h-full left-16 right-2">
              {/* <p className=" text-gray-500 text-sm"> Location</p> */}
              <select className=" text-sm font-bold w-full" name="" id="">
                <option value="">Projet</option>
                {/* <option value="">Africa</option>
                <option value="">Morocco</option>
                <option value="">Nigeria</option>
                <option value="">Tanzania</option> */}
              </select>
            </span>
          </span>
          <span className=" flex items-center py-7 border-r border-gray-500 relative pl-4">
            <FaPeopleCarry className=" text-4xl text-orange-500" />
            <span>
              {/* <p className="text-gray-500 text-sm">Type</p> */}
              <select className=" text-sm font-bold w-full" name="" id="">
                <option value="">Thématiques</option>
                {/* <option value="">Adventure</option>
                <option value="">Beach</option>
                <option value="">Cruises Tours</option>
                <option value="">Discovery</option>
                <option value="">Historical</option> */}
              </select>
            </span>
          </span>
          <span className=" flex items-center py-7 border-r border-gray-500 relative pl-4">
            <WiTime3 className=" text-4xl text-orange-500" />
            <span className=" flex flex-col justify-center absolute h-full left-16 right-2">
              <Input
                required
                name="name"
                label=""
                placeholder=""
                type="date"
                errors=""
                value=""
                onChange=""
              />
              {/* <input
                type="date"
                placeholder=""
                className="text-sm font-bold w-full"
              /> */}
            </span>
          </span>
          <span className=" flex items-center py-7 border-r border-gray-500 relative pl-4">
            <FaPeopleGroup className=" text-4xl text-orange-500" />
            <span className=" flex flex-col justify-center absolute h-full left-16 right-2">
              {/* <p className="text-gray-500 text-sm">Guests</p> */}
              <Input
                required
                name="name"
                label=""
                placeholder=""
                type="text"
                errors=""
                value=""
                onChange=""
              />
            </span>
          </span>
          <button className=" bg-orange-500 text-white flex items-center gap-4 py-6 outline-none border-none rounded-r-lg font-semibold text-sm">
            <MdSearch size={20} className=" text-4xl text-orange-500" /> SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}

export default BannerSearch;
