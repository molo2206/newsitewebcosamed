import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useValidation from "../../hooks/useValidation";
import Input from "../../components/form/Input";
import CountryService from "../../services/CountryServices";
import useAsync from "../../hooks/useAsync";
import { ButtonMoney } from "../../components/cards/ButtonMoney";
import Donate from "../../hooks/Donate";
import { ApplyForm } from "../../types";
import ButtonDonate from "../../components/form/ButtonDonate";
import { buttonMoney, currency, tabs } from "../../utils/heleprs";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CARD_OPTIONS: any = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "gray",
      color: "#000",
      fontWeight: 400,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#000" },
      "::placeholder": { color: "gray" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
  hidePostalCode: true,
};

const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const { CreateDonate, loading } = Donate();
  const { t } = useTranslation();

  const stripe = useStripe();
  const elements = useElements();

  const { data: country } = useAsync(() => CountryService.getCountry());

  const { inputs, errors, handleOnChange, hanldeError, setInputs } =
    useValidation<ApplyForm>({
      full_name: "",
      email: "",
      phone: "",
      amount: "",
      custom_amount: "",
      country: "",
      currency: "",
    });

  const validation = async (e: React.FormEvent) => {
    e.preventDefault();
    let valide = true;

    if (!inputs.full_name) {
      hanldeError("Prénom requis", "full_name");
      valide = false;
    }

    if (!inputs.email) {
      hanldeError("Email requis", "email");
      valide = false;
    }

    if (!inputs.phone) {
      hanldeError("Téléphone requis", "phone");
      valide = false;
    }

    if (!inputs.amount && !inputs.custom_amount) {
      hanldeError("Montant requis", "amount");
      valide = false;
    }

    if (!stripe || !elements) {
      alert("Stripe n'est pas chargé.");
      return;
    }

    if (valide) {
      setIsLoading(true);

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;
      if (valide) {
        CreateDonate(inputs, setInputs);
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center rounded-md p-4 sm:p-6">
      <div className="bg-white dark:bg-slate-800 p-6 shadow-xl max-w-xl w-full rounded-md relative overflow-auto max-h-[90vh] flex flex-col gap-6 ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Fermer"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Faire un don
          </h2>
          <div className="my-4">
            <img
              src="https://apicosamed.cosamed.org/uploads/blogs/card.png"
              alt="Carte"
              className="w-full max-w-xs mx-auto rounded-lg shadow-lg hover:scale-105 transition"
            />
            <div className="mt-2">
              <a
                href="https://stripe.com/gb/legal/privacy-center#which-stripe-entities-are-involved"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Powered by Stripe
              </a>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex-1 py-2 rounded-md font-bold text-sm sm:text-base ${
                currentTab === tab.id
                  ? "bg-principal text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
              }`}
              type="button"
            >
              {tab.title}
            </button>
          ))}
        </div>
        {currentTab === 1 && (
          <form onSubmit={validation} className="space-y-6">
            <div>
              <h2 className="font-montserrat mb-2 text-left text-xl sm:text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                Votre don mensuel
              </h2>
              <p className="text-sm font-montserrat mb-2 font-base  font-font1 text-left text-slate-800 dark:text-light-gray-500 mt-2 dark:text-white">
                Vous êtes sur le point de devenir un supporter mensuel de
                COSAMED
              </p>
            </div>
            <Input
              required
              name="full_name"
              label="Nom complet"
              type="text"
              errors={errors.full_name}
              value={inputs.full_name}
              onChange={(e: any) => handleOnChange(e.target.value, "full_name")}
            />
            <Input
              required
              name="email"
              label="Email"
              type="email"
              errors={errors.email}
              value={inputs.email}
              onChange={(e: any) => handleOnChange(e.target.value, "email")}
            />
            <Input
              required
              name="phone"
              label="Téléphone"
              type="tel"
              errors={errors.phone}
              value={inputs.phone}
              onChange={(e: any) => handleOnChange(e.target.value, "phone")}
            />

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Montant
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {buttonMoney.map((item, index) => (
                  <ButtonMoney
                    key={index}
                    id={`amount-${index}`}
                    checked={inputs.amount === item.value}
                    label={item.label}
                    onchange={() => handleOnChange(item.value, "amount")}
                  />
                ))}
              </div>
              {inputs.amount === "Autre" && (
                <Input
                  required
                  name="custom_amount"
                  label="Montant personnalisé"
                  type="number"
                  errors={errors.custom_amount}
                  value={inputs.custom_amount}
                  onChange={(e: any) =>
                    handleOnChange(e.target.value, "custom_amount")
                  }
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                required
                name="country"
                label="Pays"
                type="select"
                value={inputs.country}
                errors={errors.country}
                onChange={(e: any) => handleOnChange(e.target.value, "country")}
                options={country?.map((item: any) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Sélectionner votre pays"
              />
              <Input
                required
                name="currency"
                label="Devise"
                type="select"
                value={inputs.currency}
                errors={errors.currency}
                onChange={(e: any) =>
                  handleOnChange(e.target.value, "currency")
                }
                options={currency}
                placeholder="Sélectionner la devise"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Carte bancaire
              </label>
              <div className="border rounded-md p-3 bg-white shadow-sm">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </div>

            <div className="flex items-start space-x-3 mt-4">
              <input
                type="checkbox"
                id="accept"
                className="w-4 h-4 text-blue-600 rounded-md"
                required
              />
              <label
                htmlFor="accept"
                className="text-[11px] text-gray-900 dark:text-gray-300"
              >
                J’autorise COSAMED à traiter mes données pour m’envoyer des
                communications.
              </label>
            </div>

            <ButtonDonate
              label={`${t("make_donation")} ${
                inputs?.amount === "Autre"
                  ? inputs?.custom_amount
                  : inputs?.amount
              } ${inputs?.amount || inputs?.custom_amount ? "USD" : ""}`}
              loading={loading || isLoading}
            />
          </form>
        )}
        {currentTab === 2 && (
          <form onSubmit={validation} className="space-y-6">
            <div>
              <h2 className="font-montserrat mb-2 text-left text-xl sm:text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                Votre don ponctuel
              </h2>
              <p className="text-sm font-montserrat mb-2 font-base  font-font1 text-left text-slate-800 dark:text-light-gray-500 mt-2 dark:text-white">
                Vous êtes sur le point de devenir un supporter ponctuel de
                COSAMED
              </p>
            </div>
            <Input
              required
              name="full_name"
              label="Nom complet"
              type="text"
              errors={errors.full_name}
              value={inputs.full_name}
              onChange={(e: any) => handleOnChange(e.target.value, "full_name")}
            />
            <Input
              required
              name="email"
              label="Email"
              type="email"
              errors={errors.email}
              value={inputs.email}
              onChange={(e: any) => handleOnChange(e.target.value, "email")}
            />
            <Input
              required
              name="phone"
              label="Téléphone"
              type="tel"
              errors={errors.phone}
              value={inputs.phone}
              onChange={(e: any) => handleOnChange(e.target.value, "phone")}
            />

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Montant
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {buttonMoney.map((item, index) => (
                  <ButtonMoney
                    key={index}
                    id={`amount-${index}`}
                    checked={inputs.amount === item.value}
                    label={item.label}
                    onchange={() => handleOnChange(item.value, "amount")}
                  />
                ))}
              </div>
              {inputs.amount === "Autre" && (
                <Input
                  required
                  name="custom_amount"
                  label="Montant personnalisé"
                  type="number"
                  errors={errors.custom_amount}
                  value={inputs.custom_amount}
                  onChange={(e: any) =>
                    handleOnChange(e.target.value, "custom_amount")
                  }
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                required
                name="country"
                label="Pays"
                type="select"
                value={inputs.country}
                errors={errors.country}
                onChange={(e: any) => handleOnChange(e.target.value, "country")}
                options={country?.map((item: any) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Sélectionner votre pays"
              />
              <Input
                required
                name="currency"
                label="Devise"
                type="select"
                value={inputs.currency}
                errors={errors.currency}
                onChange={(e: any) =>
                  handleOnChange(e.target.value, "currency")
                }
                options={currency}
                placeholder="Sélectionner la devise"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Carte bancaire
              </label>
              <div className="border rounded-md p-3 bg-white shadow-sm">
                <CardElement options={CARD_OPTIONS} className="  " />
              </div>
            </div>

            <div className="flex items-start space-x-3 mt-4">
              <input
                type="checkbox"
                id="accept"
                className="w-4 h-4 text-blue-600 rounded"
                required
              />
              <label
                htmlFor="accept"
                className="text-[11px] text-gray-900 dark:text-gray-300"
              >
                J’autorise COSAMED à traiter mes données pour m’envoyer des
                communications.
              </label>
            </div>

            <ButtonDonate
              label={`${t("make_donation")} ${
                inputs?.amount === "Autre"
                  ? inputs?.custom_amount
                  : inputs?.amount
              } ${inputs?.amount || inputs?.custom_amount ? "USD" : ""}`}
              loading={loading || isLoading}
            />
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};

export default DonateModal;
