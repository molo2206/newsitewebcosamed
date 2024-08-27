import { useState } from "react";
import Contact from "../hooks/Contact";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useValidation from "../hooks/useValidation";
import Input from "../components/form/Input";
import CountryService from "../services/CountryServices";
import useAsync from "../hooks/useAsync";
import Button from "../components/form/Button";
import { ButtonMoney } from "../components/cards/ButtonMoney";
import { BiDollar } from "react-icons/bi";

const DonateTrue = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const tabs = [
    { id: 1, title: "DON MENSUEL" },
    { id: 2, title: "DON PONCTUEL" },
  ];
  const genres = [
    {
      value: "Masculin",
      label: "Masculin",
    },
    {
      value: "Feminin",
      label: "Feminin",
    },
  ];
  const buttonMoney = [
    { value: "10", label: "$10" },
    { value: "20", label: "$20" },
    { value: "50", label: "$50" },
    { value: "100", label: "$100" },
    { value: "Autre", label: "$Autre" },
  ];

  const onChangeTab = (tab: any) => {
    setCurrentTab(tab.id);
  };
  const { t } = useTranslation();
  const { createContact, loading: loadingForm } = Contact();
  const { data: country } = useAsync(() => CountryService.getCountry());

  const { inputs, errors, handleOnChange, hanldeError, setInputs } =
    useValidation({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      amount: "",
      custom_amount:""
    });
  const validation = (e: any) => {
    e.preventDefault();

    let valide = true;
    if (!inputs.first_name) {
      hanldeError("First name us is required", "first_name");
      valide = false;
    }
    if (!inputs.last_name) {
      hanldeError("Last name is required", "last_name");
      valide = false;
    }
    if (!inputs.email) {
      hanldeError("Email is required", "email");
      valide = false;
    }

    if (!inputs.phone) {
      hanldeError("Phone is required", "phone");
      valide = false;
    }

    if (!inputs.message) {
      hanldeError("Message is required", "message");
      valide = false;
    }

    if (valide) {
      createContact(inputs, setInputs);
    }
  };
  return (
    <div className="dark:bg-slate-900 w-full dark:text-white">
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8  py-20">
        <div className="flex space-x-4 px-8 items-center justify-between rounded-md bg-slate-200 h-[100px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`h-[60px] w-[800px] rounded-md
                            ${
                              currentTab === tab.id ? "bg-hover" : "bg-white"
                            } text-principal hover:bg-hover hover:text-white font-extrabold items-center justify-center text-center`}
              onClick={() => onChangeTab(tab)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        {currentTab === 1 && (
          <div className="flex flex-col mt-4 bg-slate-200 h-full w-full ">
            <div className=" grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 row">
              <div className=" col-span-2 col-lg-8 col-md-8 px-8 py-8 ">
                <div>
                  <h2 className="font-montserrat mb-2 text-left text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Votre don mensuel
                  </h2>
                  <p className="text-xl font-montserrat mb-2 font-base capitalize font-light font-font1 text-left text-slate-800 dark:text-light-gray-500 mt-2 dark:text-white">
                    Vous êtes sur le point de devenir un supporter mensuel de
                    COSAMED
                  </p>
                </div>
                <form className="mt-8 space-y-6 mb-8" onSubmit={validation}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <Input
                      required
                      name="Pays"
                      label="Pays"
                      type="select"
                      value={inputs.country}
                      errors={errors.country}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "country")
                      }
                      options={country?.map((item: any) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      placeholder={"Selectionner votre pays"}
                    />
                    <Input
                      name="last_name"
                      label="Monnaie"
                      placeholder=""
                      type="text"
                      errors={errors.last_name}
                      value={inputs.last_name}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "last_name")
                      }
                    />
                  </div>
                  <div>
                    <h2 className="font-montserrat mb-2 text-left text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Faites un don mensuel de
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {buttonMoney.map((item: any, index: number) => (
                      <ButtonMoney
                        id={index}
                        key={item.value}
                        value={inputs.amount === item.value ? true : false}
                        label={item.label}
                        onchange={() => handleOnChange(item.value, "amount")}
                      />
                    ))}
                    {inputs.amount === "Autre" && (
                      <Input
                        required
                        name="autre"
                        label="Autre"
                        type="number"
                        errors={errors.custom_amount}
                        value={inputs.custom_amount}
                        onChange={(e: any) =>
                          handleOnChange(e.target.value, "custom_amount")
                        }
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="font-montserrat mb-2 text-left text-xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Vos coordonnées
                    </h2>
                    <div className="space-y-px rounded-md items-center">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <Input
                          required
                          name="name"
                          label="name"
                          placeholder=""
                          type="text"
                          errors={errors.name}
                          value={inputs.name}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "name")
                          }
                        />
                        <Input
                          required
                          name="prename"
                          label="Prename"
                          placeholder=""
                          type="text"
                          errors={errors.prename}
                          value={inputs.prename}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "prename")
                          }
                        />
                        <Input
                          required
                          name="select"
                          label="Select Sexe"
                          type="select"
                          value={inputs.sexe}
                          errors={errors.sexe}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "sexe")
                          }
                          options={genres?.map((item: any) => ({
                            label: item.label,
                            value: item.value,
                          }))}
                          placeholder={"Selectionner un genre"}
                        />
                        <Input
                          required
                          name="phone"
                          label="Téléphone"
                          type="phone"
                          errors={errors.phone}
                          value={inputs.phone}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "phone")
                          }
                        />
                        <Input
                          required
                          name="email"
                          label="Email"
                          placeholder=""
                          type="email"
                          errors={errors.email}
                          value={inputs.email}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "email")
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <input
                      type="checkbox"
                      id="choose-me"
                      className="peer block  "
                    />
                    <label
                      htmlFor="choose-me"
                      className="w-[200px] h-full select-none cursor-pointer rounded-lg border-2 border-gray-600
   py-3 px-6 font-bold text-gray-600 transition-colors duration-200 ease-in-out peer-checked:bg-principal peer-checked:text-gray-900 peer-checked:border-gray-200 "
                    >
                      {" "}
                      J’autorise le COSAMED à traiter mes données personnelles
                    </label>
                  </div>
                </form>
              </div>
              <div className=" col-span-1 md:col-lg-4 col-md-4 gap-3 px-4 py-10">
                <div className=" mx-auto relative mb-12 cursor-pointer">
                  <img
                    src="https://apicosamed.cosamed.org/uploads/blogs/7acba01022004f2ce03bf56ca56ec6f4.png"
                    alt=""
                    className="  transition-all duration-300 rounded-md"
                  />
                  <div
                    className=" text-center px-4 py-8 
            bg-white shadow-lg rounded-md md:w-3/4
             mx-auto absolute left-0 right-0 
             -bottom-16 dark:bg-slate-800 dark:text-slate-200 "
                  >
                    <h3 className=" mb-3 text-neutralGray font-semibold line-clamp-2">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Debitis provident incidunt,
                    </h3>
                    <div className=" flex items-center justify-center gap-8 ">
                      <a
                        href=""
                        className=" font-bold text-brandPrimary hover:text-neutral-700"
                      >
                        Readmore
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentTab === 2 && (
          <div className="flex flex-col items-center justify-center mt-4 bg-slate-200 h-full w-full">
            <div className=" grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 row">
              <div className=" col-span-2 col-lg-8 col-md-8 px-8 py-8 ">
                <div>
                  <h2 className="font-montserrat mb-2 text-left text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Votre don ponctuel
                  </h2>
                  <p className="text-xl font-montserrat mb-2 font-base capitalize font-light font-font1 text-left text-slate-800 dark:text-light-gray-500 mt-2 dark:text-white">
                    Vous êtes sur le point de faire un don
                  </p>
                </div>
                <form className="mt-8 space-y-6 mb-8" onSubmit={validation}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <Input
                      required
                      name="Pays"
                      label="Pays"
                      type="select"
                      value={inputs.country}
                      errors={errors.country}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "country")
                      }
                      options={country?.map((item: any) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      placeholder={"Selectionner votre pays"}
                    />
                    <Input
                      name="last_name"
                      label="Monnaie"
                      placeholder=""
                      type="text"
                      errors={errors.last_name}
                      value={inputs.last_name}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "last_name")
                      }
                    />
                  </div>
                  <div>
                    <h2 className="font-montserrat mb-2 text-left text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Faites un don mensuel de
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <ButtonMoney value={10} />
                    <ButtonMoney value={100} />
                    <ButtonMoney value={100} />
                    <ButtonMoney value={100} />
                    <Input
                      required
                      name="autre"
                      label="Autre"
                      type="number"
                      errors={errors.phone}
                      value={inputs.phone}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "phone")
                      }
                    />
                  </div>
                </form>
              </div>
              <div className=" col-span-1 md:col-lg-4 col-md-4 gap-3 px-4 py-10">
                <div className=" mx-auto relative mb-12 cursor-pointer">
                  <img
                    src="https://apicosamed.cosamed.org/uploads/blogs/7acba01022004f2ce03bf56ca56ec6f4.png"
                    alt=""
                    className="  transition-all duration-300 rounded-md"
                  />
                  <div
                    className=" text-center px-4 py-8 
            bg-white shadow-lg rounded-md md:w-3/4
             mx-auto absolute left-0 right-0 
             -bottom-16 dark:bg-slate-800 dark:text-slate-200 "
                  >
                    <h3 className=" mb-3 text-neutralGray font-semibold line-clamp-2">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Debitis provident incidunt,
                    </h3>
                    <div className=" flex items-center justify-center gap-8 ">
                      <a
                        href=""
                        className=" font-bold text-brandPrimary hover:text-neutral-700"
                      >
                        Readmore
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonateTrue;
