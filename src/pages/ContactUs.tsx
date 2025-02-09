import { Link } from "react-router-dom";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import useValidation from "../hooks/useValidation";
import TextArea from "../components/form/TextArea";
import Contact from "../hooks/Contact";
import {
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import BreadCumb from "../components/navbar/BreadCumb";
import { useTranslation } from "react-i18next";
import usePageSEO from "../components/Seo/usePageSEO";
import SettingsServices from "../services/SettingsServices";
import useAsync from "../hooks/useAsync";
import { ApplyForm } from "../types";

const ContactUs = () => {
  const { t } = useTranslation();
  const { createContact, loading: loadingForm } = Contact();
  const { data } = useAsync(() => SettingsServices.getSettings());
  const { data: dataadress } = useAsync(() => SettingsServices.getAdresse());
  // console.log(data);
  usePageSEO({
    title: "Contact-nous",
    description: "Contact-nous",
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: "Cosamed asbl",
    ogDescription:
      "Est une association à but non lucratif reconnue par le gouvernement congolais et composée de prestataires de santé allant des agents de santé communautaires aux médecins.",
    ogImage: "https://www.cosamed.org/",
    ogUrl: window.location.href,
  });

  const { inputs, errors, handleOnChange, hanldeError, setInputs } =
    useValidation<ApplyForm>({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
    });
  const validation = (e: any) => {
    e.preventDefault();

    let valide = true;
    if (!inputs.first_name) {
      hanldeError(t("Error_First_name"), "first_name");
      valide = false;
    }
    if (!inputs.last_name) {
      hanldeError(t("Error_Last_name"), "last_name");
      valide = false;
    }
    if (!inputs.email) {
      hanldeError(t("Error_Email"), "email");
      valide = false;
    }

    if (!inputs.phone) {
      hanldeError(t("Error_Phone"), "phone");
      valide = false;
    }

    if (!inputs.message) {
      hanldeError(t("Error_Message"), "message");
      valide = false;
    }

    if (valide) {
      createContact(inputs, setInputs);
    }
  };
  return (
    <div className="container dark:bg-slate-900 w-full dark:text-white ">
      <div>
        <BreadCumb title={"Blog"} />
        <section className="mb-10 ">
          <header className="bg-principal dark:bg-slate-800 dark:text-white rounded-lg text-white py-10">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="md:text-xl lg:text-2xl font-bold">
                {t("Contact_us")}
              </h1>
            </div>
          </header>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 ">
            {/* Left Section: Contact Information */}
            <div className="bg-white border shadow-lg rounded-lg p-8 dark:bg-slate-800">
              <h1 className="lg:text-2xl md:text-xl  font-bold text-gray-800 mb-6 dark:text-white">
                Ce que nous pensons,
              </h1>
              <p className=" font-light lg:text-sm mb-6 dark:text-white">
                Nous sommes à votre écoute ! Que vous ayez une question, un
                projet à discuter ou simplement besoin d’informations, n’hésitez
                pas à nous contacter. Vous pouvez également remplir notre
                formulaire de contact et nous vous répondrons dans les plus
                brefs délais. À très bientôt ! 😊
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span
                    className="w-8 h-8 flex items-center justify-center 
               bg-blue-100 dark:bg-white text-principal rounded-full mr-4"
                  >
                    <FaEnvelope />
                  </span>
                  <span className="text-gray-700 lg:text-sm md:text-sm font-light dark:text-white">
                    <a href="mailto:cosamed17@gmail.com">
                      {dataadress?.emails}
                    </a>
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center dark:bg-white bg-blue-100 text-principal rounded-full mr-4">
                    <FaPhone />
                  </span>
                  <span className="text-gray-700 font-light  lg:text-sm md:text-sm dark:text-white">
                    <a href={"tel:" + dataadress?.phones}>
                      {dataadress?.phones}
                    </a>
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-principal rounded-full mr-4">
                    <FaMapMarkerAlt />
                  </span>
                  <span className="text-gray-700 font-light lg:text-sm md:text-sm dark:text-white">
                    {dataadress?.adresse +
                      "/" +
                      dataadress?.city +
                      "/" +
                      dataadress?.country?.name}
                  </span>
                </li>
              </ul>

              {/* Social Media Links */}
              <div className="mt-8 ">
                <h2 className="text-lg font-semibold lg:text-sm md:text-sm  text-gray-800 mb-4 dark:text-white">
                  {t("Follow_use")}
                </h2>
                <div className="flex space-x-4">
                  <a
                    href={JSON.parse(data?.social_links || "{}")?.facebook}
                    target="blank"
                    className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href={JSON.parse(data?.social_links || "{}")?.twitter}
                    target="blank"
                    className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href={JSON.parse(data?.social_links || "{}")?.linkedin}
                    target="blank"
                    className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Section: Contact Form */}
            <div className="bg-white shadow-lg border rounded-lg p-8 dark:bg-slate-800">
              <p className="lg:text-xl md:text-sm font-light mb-2 font-base text-center text-slate-800 dark:text-light-gray-500 mt-2 dark:text-white">
                {t("Send_message")}
              </p>
              <form className="mt-8 space-y-6 mb-8" onSubmit={validation}>
                <div className="space-y-px rounded-md items-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <Input
                      name="first_name"
                      label={t("Name")}
                      placeholder=""
                      type="text"
                      errors={errors.first_name}
                      value={inputs.first_name}
                      onFocus={() => hanldeError(null, `first_name`)}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "first_name")
                      }
                    />
                    <Input
                      name="last_name"
                      label={t("Prename")}
                      placeholder=""
                      type="text"
                      errors={errors.last_name}
                      value={inputs.last_name}
                      onFocus={() => hanldeError(null, `last_name`)}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "last_name")
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <Input
                      name="email"
                      label={t("Enter_email")}
                      placeholder=""
                      type="text"
                      errors={errors.email}
                      value={inputs.email}
                      onFocus={() => hanldeError(null, `email`)}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "email")
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <Input
                      name="phone"
                      label={t("Phone")}
                      placeholder=""
                      type="phone"
                      errors={errors.phone}
                      value={inputs.phone}
                      onFocus={() => hanldeError(null, `phone`)}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "phone")
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <TextArea
                      name="message"
                      placeholder={t("Message")}
                      type="text"
                      value={inputs.message}
                      onFocus={() => hanldeError(null, `message`)}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "message")
                      }
                      label={t("Message")}
                    />
                  </div>
                </div>
                <Button label={t("SendMessage")} loading={loadingForm} />
                <div className="justify-center items-center">
                  <div className="mb-2">
                    <p className="text-sm font-montserrat text-slate-700 dark:text-white text-justify">
                      {t("Politic_clic")}
                      <Link
                        to="/confidentiality"
                        className="text-principal font-bold"
                        target="_blank"
                      >
                        {t("To_clic_politic")}
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      <br />
    </div>
  );
};

export default ContactUs;
