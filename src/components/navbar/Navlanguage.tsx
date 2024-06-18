import { FaCaretDown } from "react-icons/fa";

const Navlanguage = () => {
  return (
    <div>
      <div className=" bg-principal">
        <div className="container py-4 md:py-2">
          <div className=" items-center flex justify-between ">
            <div className="px-2 w-8 md:w-4 lg:w-48 ">
              <button
                className="h-[40px] w-[200px] rounded-lg
                              bg-white hover:bg-hover/90"
              >
                Site national
              </button>
            </div>
            <div className="px-2 w-12 md:w-8 lg:w-48 ">
              <div className=" hidden md:block">
                <ul className="flex top-12 left-0 right-0  items-center gap-10">
                  <li className=" group relative cursor-pointer">
                    <a
                      href="#"
                      className="flex items-center gap-[20px] h-[72px] text-white font-bold"
                    >
                      Choisir la langue
                      <span>
                        <FaCaretDown
                          className=" transition-all 
                      duration-200 group-hover:rotate-180"
                        />
                      </span>
                    </a>
                    {/* dropdown section */}
                    <div className="absolute -center-9 z-[99999] hidden w-[150px] bg-white p-2 shadow-md text-black group-hover:block">
                      <ul className="space-y-3">
                        <li className="p-2 hover:bg-hover hover:text-white">
                          Français {/* dropdown section */}
                        </li>
                        <li className="p-2 hover:bg-hover hover:text-white">
                          Anglais
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navlanguage;
