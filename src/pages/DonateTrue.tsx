import { useState } from "react";
import { useTranslation } from "react-i18next";
import useValidation from "../hooks/useValidation";
import Input from "../components/form/Input";
import CountryService from "../services/CountryServices";
import useAsync from "../hooks/useAsync";
import { ButtonMoney } from "../components/cards/ButtonMoney";
import { CardElement } from "@stripe/react-stripe-js";
import Button from "../components/form/Button";
import Donate from "../hooks/Donate";
import { ApplyForm } from "../types";

const CARD_OPTIONS: any = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "gray",
      color: "#000",
      border: 1,
      fontWeight: 400,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      marginBottom: -10,
      ":-webkit-autofill": { color: "#000" },
      "::placeholder": { color: "gray" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
  placeholder: "Skskskskks",
  placeholderText: "shshshhsh",
  hidePostalCode: true,
};

const DonateTrue = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const { CreateDonate, loading } = Donate();
  const tabs = [
    { id: 1, title: "DON MENSUEL" },
    { id: 2, title: "DON PONCTUEL" },
  ];

  const currency = [
    {
      value: "USD",
      label: "USD",
    },
    {
      value: "EURO",
      label: "EURO",
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
  const { data: country } = useAsync(() => CountryService.getCountry());

  const { inputs, errors, handleOnChange, hanldeError, setInputs } =
    useValidation<ApplyForm>({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      amount: "",
      custom_amount: "",
      country: "",
      currency: "",
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

    if (valide) {
      CreateDonate(inputs, setInputs);
    }
  };
  return (
    <div className=" w-full dark:text-white bg-white dark:bg-slate-900 ">
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8  py-20">
        <div className="flex space-x-4 px-8 items-center bg-slate-200 dark:bg-slate-800 justify-between rounded-md  h-[100px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`h-[60px] w-[800px] rounded-lg 
                            ${
                              currentTab === tab.id
                                ? "bg-principal"
                                : "bg-white"
                            } text-black  hover:bg-hover hover:text-white font-extrabold text-center`}
              onClick={() => onChangeTab(tab)}
            >
              {/* h-[40px] w-[180px] rounded-lg 
              bg-white text-principal hover:bg-hover hover:text-white font-extrabold text-center */}
              {tab.title}
            </button>
          ))}
        </div>
        {currentTab === 1 && (
          <div className="flex flex-col mt-4  h-full w-full bg-slate-100 dark:bg-slate-800">
            <div className=" grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 row">
              <div className=" col-span-2 col-lg-8 col-md-8 px-8 py-8 ">
                <div>
                  <h2 className="font-montserrat mb-2 text-left text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Votre don mensuel
                  </h2>
                  <p className="text-xl font-montserrat mb-2 font-base  font-font1 text-left text-slate-800 dark:text-light-gray-500 mt-2 dark:text-white">
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
                      required
                      name="currency"
                      label="Currency"
                      type="select"
                      value={inputs.currency}
                      errors={errors.currency}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "currency")
                      }
                      options={currency?.map((item: any) => ({
                        label: item.label,
                        value: item.value,
                      }))}
                      placeholder={"currency"}
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
                          name="first_name"
                          label="First name"
                          placeholder=""
                          type="text"
                          errors={errors.first_name}
                          value={inputs.first_name}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "first_name")
                          }
                        />
                        <Input
                          required
                          name="last_name"
                          label="Last name"
                          placeholder=""
                          type="text"
                          errors={errors.last_name}
                          value={inputs.last_name}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "last_name")
                          }
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
                  <div className="w-full py-20 sm:py-20 h-[60px]  active:bg-slate-300  flex items-center justify-center">
                    <input
                      type="checkbox"
                      id="choose"
                      className="w-8 h-8  text-white   rounded focus:ring-2 "
                    />
                    <label
                      htmlFor="choose"
                      className="py-4 ms-2 text-md font-medium text-gray-900 dark:text-gray-300
                      
  peer-focus:outline-none peer-focus:ring 
   peer-checked:bg-principal peer-checked:text-white
  "
                    >
                      {" "}
                      J’autorise le COSAMED à traiter mes données personnelles
                      pour m’envoyer des communications par e-mail portant sur
                      ses programmes, services et événements.
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="py-4  text-md font-medium text-gray-900 dark:text-gray-300        
  peer-focus:outline-none peer-focus:ring 
   peer-checked:bg-principal peer-checked:text-white"
                    >
                      En nous communiquant votre numéro de téléphone, vous
                      acceptez que le COSAMED utilise les informations
                      personnelles que vous partagez avec nous pour vous envoyer
                      des informations sur nos programmes, services et
                      événements par SMS, téléphone (voix) et via des
                      plateformes de messagerie comme WhatsApp.
                    </label>
                  </div>
                  <div className="flex flex-col items-center justify-center mt-4  h-full w-full">
                    <div className=" grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 row">
                      <div className=" col-span-2 col-lg-8 col-md-8 px-2 py-8 ">
                        <div>
                          <h2 className="font-montserrat mb-2 text-left text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Votre don mensuel
                          </h2>
                          <p className="font-montserrat mb-2 text-left text-xl  font-medium tracking-tight text-gray-900 dark:text-white">
                            Vous êtes sur le point de faire un don
                          </p>
                          <div className=" mt-8">
                            <CardElement
                              className="w-full  font-montserrat  bg-transparent dark:bg-slate-900
                             rounded-md text-slate-900 border py-8 px-4  dark:text-white
                              border-slate-300 dark:border-slate-700 focus:outline-none focus:border-principal focus:dark:border-principal focus:ring-0"
                              options={CARD_OPTIONS}
                            />
                          </div>
                        </div>
                      </div>
                      <div className=" col-span-1 md:col-lg-4 col-md-4 gap-3 px-4 py-10">
                        <div className=" mx-auto relative mb-12 cursor-pointer">
                          <div
                            className=" text-center px-4 py-1 rounded-md md:w-3/4 mx-auto absolute left-0 right-0 
             -top-12 dark:bg-slate-800 dark:text-slate-200 "
                          ></div>
                          <img
                            src="https://apicosamed.cosamed.org/uploads/blogs/card.png"
                            alt=""
                            className="  transition-all duration-300 rounded-md"
                          />
                          <div
                            className=" text-center px-4 py-1 
            bg-white shadow-lg rounded-md md:w-3/4
             mx-auto absolute left-0 right-0 
             -bottom-16 dark:bg-slate-800 dark:text-slate-200 "
                          >
                            <div className=" flex items-center justify-center gap-8 ">
                              <a
                                href="https://stripe.com/gb/legal/privacy-center#which-stripe-entities-are-involved"
                                className=" font-bold text-stripe hover:text-neutral-700"
                              >
                                Powered Stripe
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      label={`${t("make_donation")} ${
                        inputs?.amount === "Autre"
                          ? inputs?.custom_amount
                          : inputs?.amount
                      } ${inputs?.amount && "USD"}`}
                      loading={loading}
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
                    <h3 className=" mb-3 text-neutralGray font-semibold line-clamp-5">
                      Permet de fournir le soin de santé primaire et secondiare
                      à 35 personnes souffrant.
                    </h3>
                    {/* <div className=" flex items-center justify-center gap-8 ">
                      <a
                        href=""
                        className=" font-bold text-brandPrimary hover:text-neutral-700"
                      >
                        Readmore
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentTab === 2 && (
          <div className="flex flex-col mt-4  h-full w-full bg-slate-100 dark:bg-slate-800">
            <div className=" grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 row">
              <div className=" col-span-2 col-lg-8 col-md-8 px-8 py-8 ">
                <div>
                  <h2 className="font-montserrat mb-2 text-left text-2xl sm:text-3xl font-bold  text-gray-900 dark:text-white">
                    Votre don ponctuel
                  </h2>
                  <p className="text-xl font-montserrat mb-2 font-base  font-light font-font1 text-left text-slate-800 dark:text-light-gray-500 mt-2 dark:text-white">
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
                      required
                      name="currency"
                      label="Currency"
                      type="select"
                      value={inputs.currency}
                      errors={errors.currency}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "currency")
                      }
                      options={currency?.map((item: any) => ({
                        label: item.label,
                        value: item.value,
                      }))}
                      placeholder={"currency"}
                    />
                  </div>
                  <div>
                    <h2 className="font-montserrat mb-2 text-left text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Faites un don ponctuel de
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
                        errors={errors?.custom_amount}
                        value={inputs?.custom_amount}
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
                          name="first_name"
                          label="First name"
                          placeholder=""
                          type="text"
                          errors={errors.first_name}
                          value={inputs.first_name}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "first_name")
                          }
                        />
                        <Input
                          required
                          name="last_name"
                          label="Last name"
                          placeholder=""
                          type="text"
                          errors={errors.last_name}
                          value={inputs.last_name}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "last_name")
                          }
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
                  <div className="w-full py-20 sm:py-20 h-[60px]  active:bg-slate-300  flex items-center justify-center">
                    <input
                      type="checkbox"
                      id="choose"
                      className="w-8 h-8  text-white   rounded focus:ring-2 "
                    />
                    <label
                      htmlFor="choose"
                      className="py-4 ms-2 text-md font-medium text-gray-900 dark:text-gray-300
                      
  peer-focus:outline-none peer-focus:ring 
   peer-checked:bg-principal peer-checked:text-white
  "
                    >
                      {" "}
                      J’autorise le COSAMED à traiter mes données personnelles
                      pour m’envoyer des communications par e-mail portant sur
                      ses programmes, services et événements.
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="py-4  text-md font-medium text-gray-900 dark:text-gray-300        
  peer-focus:outline-none peer-focus:ring 
   peer-checked:bg-principal peer-checked:text-white"
                    >
                      En nous communiquant votre numéro de téléphone, vous
                      acceptez que le COSAMED utilise les informations
                      personnelles que vous partagez avec nous pour vous envoyer
                      des informations sur nos programmes, services et
                      événements par SMS, téléphone (voix) et via des
                      plateformes de messagerie comme WhatsApp.
                    </label>
                  </div>
                  <div className="flex flex-col items-center justify-center mt-4  h-full w-full">
                    <div className=" grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 row">
                      <div className=" col-span-2 col-lg-8 col-md-8 px-2 py-8 ">
                        <div>
                          <h2 className="font-montserrat mb-2 text-left text-2xl sm:text-3xl font-bold  text-gray-900 dark:text-white">
                            Votre don mensuel
                          </h2>
                          <p className="font-montserrat mb-2 text-left text-xl  font-medium  text-gray-900 dark:text-white">
                            Vous êtes sur le point de faire un don
                          </p>
                          <div className=" mt-8">
                            <CardElement
                              className="w-full  font-montserrat  bg-transparent dark:bg-slate-900
                             rounded-md text-slate-900 border py-8 px-4  dark:text-white
                              border-slate-300 dark:border-slate-700 focus:outline-none focus:border-principal focus:dark:border-principal focus:ring-0"
                              options={CARD_OPTIONS}
                            />
                          </div>
                        </div>
                      </div>
                      <div className=" col-span-1 md:col-lg-4 col-md-4 gap-3 px-4 py-10">
                        <div className=" mx-auto relative mb-12 cursor-pointer">
                          <div
                            className=" text-center px-4 py-1 rounded-md md:w-3/4 mx-auto absolute left-0 right-0 
             -top-12 dark:bg-slate-800 dark:text-slate-200 "
                          ></div>
                          <img
                            src="https://apicosamed.cosamed.org/uploads/blogs/card.png"
                            alt=""
                            className="  transition-all duration-300 rounded-md"
                          />
                          <div
                            className=" text-center px-4 py-1 
            bg-white shadow-lg rounded-md md:w-3/4
             mx-auto absolute left-0 right-0 
             -bottom-16 dark:bg-slate-800 dark:text-slate-200 "
                          >
                            <div className=" flex items-center justify-center gap-8 ">
                              <a
                                href="https://stripe.com/gb/legal/privacy-center#which-stripe-entities-are-involved"
                                className=" font-bold text-stripe hover:text-neutral-700"
                              >
                                Powered Stripe
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      label={`${t("make_donation")} ${
                        inputs?.amount === "Autre"
                          ? inputs?.custom_amount
                          : inputs?.amount
                      } ${inputs?.amount && "USD"}`}
                      loading={loading}
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
                    <h3 className=" mb-3 text-neutralGray font-semibold line-clamp-5">
                      Permet de fournir le soin de santé primaire et secondiare
                      à 74 personnes souffrant.
                    </h3>
                    {/* <div className=" flex items-center justify-center gap-8 ">
                      <a
                        href=""
                        className=" font-bold text-brandPrimary hover:text-neutral-700"
                      >
                        Readmore
                      </a>
                    </div> */}
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
