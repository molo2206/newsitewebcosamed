import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import DonateModal from "./modal/DonateModal";

const ContactUs = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { createContact, loading: loadingForm } = Contact();
  const { data } = useAsync(() => SettingsServices.getSettings());
  const { data: dataadress } = useAsync(() => SettingsServices.getAdresse());

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
    if (!inputs.first_name) hanldeError(t("Error_First_name"), "first_name");
    if (!inputs.last_name) hanldeError(t("Error_Last_name"), "last_name");
    if (!inputs.email) hanldeError(t("Error_Email"), "email");
    if (!inputs.phone) hanldeError(t("Error_Phone"), "phone");
    if (!inputs.message) hanldeError(t("Error_Message"), "message");
    if (valide) {
      createContact(inputs, setInputs);
    }
  };
  const [showDonate, setShowDonate] = useState(false);
  return (
    <div className="p-6 dark:bg-slate-900 w-full dark:text-white ">
      <BreadCumb title={t("Contact_us")} />
      <section className="mb-10 ">
        <header className="mb-8 bg-principal dark:bg-slate-800 rounded-md p-6 shadow-md  text-center">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-[16px] text-white  font-bold">
              {t("Contact_us")}
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-6xl mx-auto ">
          <div className="bg-white border dark:border-slate-700 p-8 dark:bg-slate-800 rounded-md">
            <h1 className="text-[14px] font-bold text-gray-800 mb-6 dark:text-white">
              Pourquoi nous contacter ?
            </h1>
            <p className="font-light lg:text-sm mb-6 dark:text-white">
              <div className="mt-1">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 text-[12px]">
                  <li>Faire une demande de partenariat ou d’intervention</li>
                  <li>Devenir volontaire ou rejoindre notre équipe</li>
                  <li>Proposer un don ou un soutien logistique</li>
                  <li>Poser une question ou signaler une situation urgente</li>
                </ul>
              </div>
            </p>

            <ul className="space-y-4">
              <li className="flex items-center ">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-white text-principal rounded-full mr-4">
                  <FaEnvelope size={12} />
                </span>
                <a
                  href={`mailto:${dataadress?.emails}`}
                  className="text-gray-700 text-[12px] dark:text-white "
                >
                  {dataadress?.emails}
                </a>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-white text-principal rounded-full mr-4">
                  <FaPhone size={12} />
                </span>
                <a
                  href={`tel:${dataadress?.phones}`}
                  className="text-gray-700 text-[12px] dark:text-white"
                >
                  {dataadress?.phones}
                </a>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-principal rounded-full mr-4">
                  <FaMapMarkerAlt size={12} />
                </span>
                <span className="text-gray-700 text-[12px] font-normal dark:text-white">
                  {dataadress?.adresse}/{dataadress?.city}/
                  {dataadress?.country?.name}
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="font-semibold text-[12px] dark:text-white">
                Heures d'ouverture
              </h3>
              <p className="text-gray-600 text-[12px] dark:text-gray-300">
                Jours ouvrables, du lundi au vendredi : 08h00 - 17h00
              </p>
              <p className="text-gray-600 text-[12px] dark:text-gray-300">
                Samedi : Fermé
              </p>
              <p className="text-gray-600 text-[12px] dark:text-gray-300">
                Dimanche : Fermé
              </p>
              <p className="text-[12px] text-gray-400 mt-1">
                Délai de réponse moyen : 24h - 48h
              </p>
            </div>

            <div className="mt-6 w-full h-[400px] rounded-md overflow-hidden border dark:border-slate-700">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  `${dataadress?.adresse}, ${dataadress?.city}, ${dataadress?.country?.name}`
                )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                className="rounded-md"
                loading="lazy"
              ></iframe>
            </div>
            <div className="mt-6 bg-red-50 dark:bg-gray-700 p-4 rounded-md border border-red-300 dark:border-red-200">
              <h3 className="text-[12px] font-bold text-red-700 dark:text-red-200 mb-2">
                Besoin d’une aide urgente ?
              </h3>
              <p className="text-[12px] text-red-800 dark:text-red-100">
                Appelez-nous directement au{" "}
                <a
                  href="tel:+243992036566"
                  className="font-semibold underline hover:text-red-600"
                >
                  +243 992 036 566
                </a>{" "}
                ou écrivez à{" "}
                <a
                  href="mailto:info@cosamed.org"
                  className="font-semibold underline hover:text-red-600"
                >
                  info@cosamed.org
                </a>
                .
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[12px] font-semibold text-gray-800 mb-4 dark:text-white">
                {t("Follow_use")}
              </h2>
              <div className="flex flex-wrap gap-4">
                <a
                  href={JSON.parse(data?.social_links || "{}")?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Suivez-nous sur Facebook"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white bg-[#1877F2] hover:bg-[#145ecf] transition duration-300 shadow-md hover:shadow-lg"
                >
                  <FaFacebook size={15} />
                </a>
                <a
                  href={JSON.parse(data?.social_links || "{}")?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  title="Suivez-nous sur Twitter"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white bg-[#1DA1F2] hover:bg-[#0d8ddc] transition duration-300 shadow-md hover:shadow-lg"
                >
                  <FaTwitter size={15} />
                </a>
                <a
                  href={JSON.parse(data?.social_links || "{}")?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="Suivez-nous sur LinkedIn"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white bg-[#0077B5] hover:bg-[#005f91] transition duration-300 shadow-md hover:shadow-lg"
                >
                  <FaLinkedin size={15} />
                </a>
                <a
                  href={`https://wa.me/${dataadress?.phones?.replace(
                    /\D/g,
                    ""
                  )}`}
                  target="_blank"
                  className="inline-flex items-center px-4 py-2 bg-green-600 dark:bg-green-900 text-white text-[11px] font-semibold rounded-md hover:bg-green-600 transition"
                >
                  Discuter sur WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white border dark:border-slate-700 p-8 dark:bg-slate-800 rounded-md">
            <p className="text-[14px] font-semibold font-light mb-2 text-center dark:text-white">
              {t("Send_message")}
            </p>
            <p className="text-[13px] text-gray-600 dark:text-gray-300 mb-4  text-center">
              Nous répondons aux messages rédigés en français, anglais et
              swahili.
            </p>

            <form className="mt-4 space-y-6" onSubmit={validation}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="first_name"
                  label={t("Name")}
                  errors={errors.first_name}
                  value={inputs.first_name}
                  onFocus={() => hanldeError(null, "first_name")}
                  onChange={(e: any) =>
                    handleOnChange(e.target.value, "first_name")
                  }
                />
                <Input
                  name="last_name"
                  label={t("Prename")}
                  errors={errors.last_name}
                  value={inputs.last_name}
                  onFocus={() => hanldeError(null, "last_name")}
                  onChange={(e: any) =>
                    handleOnChange(e.target.value, "last_name")
                  }
                />
              </div>
              <Input
                name="email"
                label={t("Enter_email")}
                errors={errors.email}
                value={inputs.email}
                onFocus={() => hanldeError(null, "email")}
                onChange={(e: any) => handleOnChange(e.target.value, "email")}
              />
              <Input
                name="phone"
                label={t("Phone")}
                errors={errors.phone}
                value={inputs.phone}
                onFocus={() => hanldeError(null, "phone")}
                onChange={(e: any) => handleOnChange(e.target.value, "phone")}
              />
              <TextArea
                name="message"
                label={t("Message")}
                value={inputs.message}
                onFocus={() => hanldeError(null, "message")}
                onChange={(e: any) => handleOnChange(e.target.value, "message")}
              />
              <Button label={t("SendMessage")} loading={loadingForm} />
            </form>
            <div className="mt-10">
              <h3 className="text-[13px] font-semibold dark:text-white mb-4">
                Questions fréquentes
              </h3>
              <ul className="space-y-4 text-[12px] text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Comment devenir membre de Cosamed ?</strong>
                  <br />
                  Vous pouvez remplir le formulaire de demande d’adhésion
                  disponible dans la section{" "}
                  <p
                    onClick={() => navigate(`/community/join`)}
                    className="text-principal underline cursor-pointer"
                  >
                    Rejoignez-nous
                  </p>
                </li>
                <li>
                  <strong>Comment puis-je faire un don ?</strong>
                  <br />
                  Consultez notre page{" "}
                  <p
                    onClick={() => setShowDonate(true)}
                    className="text-principal underline cursor-pointer"
                  >
                    Faire un don
                  </p>{" "}
                  pour les différentes options de soutien.
                </li>
                <DonateModal
                  isOpen={showDonate}
                  onClose={() => setShowDonate(false)}
                />
                <li>
                  <strong>Est-ce que Cosamed recrute actuellement ?</strong>
                  <br />
                  Les offres sont publiées dans la section{" "}
                  <p
                    onClick={() => navigate("/data-loading/jobopenings")}
                    className="text-principal underline cursor-pointer"
                  >
                    Carrières
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
