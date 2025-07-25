import { Link } from "react-router-dom";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import { useTranslation } from "react-i18next";
import useAsync from "../hooks/useAsync";
import ThematiquesServices from "../services/ThematiquesServices";
import TypeMemberService from "../services/TypeMemberService";
import CountryService from "../services/CountryServices";
import useValidation from "../hooks/useValidation";
import { showingTranslateValue } from "../utils/heleprs";
import TextArea from "../components/form/TextArea";
import { useAuthContext } from "../context";
import Members from "../hooks/Members";
import BreadCumb from "../components/navbar/BreadCumb";
import usePageSEO from "../components/Seo/usePageSEO";
import { ApplyForm } from "../types";
import InputFile from "../components/form/InputFile";
import InputPdf from "../components/form/InputPdf";

const Rejoindre = () => {
  const { t } = useTranslation();
  const { lang } = useAuthContext();
  const { data } = useAsync(() => ThematiquesServices.getThematiques());
  const { data: Type } = useAsync(() => TypeMemberService.getTypMember());
  const { data: country } = useAsync(() => CountryService.getCountry());
  const { createMember, loading: loadingForm } = Members();

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

  usePageSEO({
    title: "Nous rejoindre",
    description: "Nous rejoindre",
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: "Cosamed asbl",
    ogDescription:
      "Est une association à but non lucratif reconnue par le gouvernement congolais et composée de prestataires de santé allant des agents de santé communautaires aux médecins.",
    ogImage: "https://www.cosamed.org/",
    ogUrl: window.location.href,
  });

  const { inputs, errors, handleOnChange, hanldeError, setInputs } =
    useValidation<ApplyForm>({
      name: "",
      prename: "",
      sexe: "",
      phone: "",
      email: "",
      typemembre: "",
      thematique: "",
      country: "",
      ville: "",
      profession: "",
    });
  const validation = (e: any) => {
    e.preventDefault();

    let valide = true;
    if (!inputs.name) {
      hanldeError("name us is required", "name");
      valide = false;
    }
    if (!inputs.prename) {
      hanldeError("prename is required", "prename");
      valide = false;
    }
    if (!inputs.sexe) {
      hanldeError("Sexe date is required", "sexe");
      valide = false;
    }

    if (!inputs.phone) {
      hanldeError("Phone is required", "phone");
      valide = false;
    }

    if (!inputs.email) {
      hanldeError("email is required", "email");
      valide = false;
    }

    if (!inputs.typemembre) {
      hanldeError("typemembre is required", "typemembre");
      valide = false;
    }
    if (!inputs.thematique) {
      hanldeError("thematique is required", "thematique");
      valide = false;
    }
    if (!inputs.country) {
      hanldeError("country is required", "country");
      valide = false;
    }
    if (!inputs.ville) {
      hanldeError("ville is required", "ville");
      valide = false;
    }
    if (!inputs.profession) {
      hanldeError("profession is required", "profession");
      valide = false;
    }

    if (valide) {
      createMember(inputs, setInputs);
    }
  };

  return (
    <div className="p-6 dark:bg-slate-900 bg-white  py-12 px-4 sm:px-6 lg:px-8 ">
      <BreadCumb title={t("Rejoindre")} />
      <div className="mt-4 mx-auto flex flex-col md:flex-row bg-white border dark:border-slate-700 shadow-md overflow-hidden">
        {/* Left column: Conditions */}
        <div className="bg-[#f0f2f5] dark:bg-slate-800 p-6 md:w-3/5 border-r dark:border-slate-700">
          <h2 className="text-[13px] font-semibold text-gray-800 text-center mb-6">
            {t("Condition")} COSAMED ASBL
          </h2>
          <div className="space-y-6 text-gray-700 text-xl">
            <div className="">
              <div className=" mb-8 text-[13px]">
                <h2 className="text-md font-montserrat font-bold mb-2 dark:text-white">
                  Avantages
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-[12px]">
                  <li className="text-gray-900 font-montserrat mb-2 dark:text-gray-300  font-regular leading-5">
                    Contribuer avec elements dansles publications mensuelles et
                    annuelles de COSAMED;
                  </li>
                  <li className="text-gray-900 font-montserrat mb-2 dark:text-gray-300 font-regular leading-5">
                    Participation privilegiée aux formations en personne comme
                    en ligne oganisées par COSAMED;
                  </li>
                  <li className="text-gray-900 font-montserrat mb-2  dark:text-gray-300  font-regular leading-5">
                    Etre prioritaires dans les opportunités d'implémentation des
                    programmes de COSAMED , suivant les critères de sélection
                    qui varie selon les opportunités;
                  </li>
                  <li className="text-gray-900 font-montserrat mb-2  dark:text-gray-300  font-regular leading-5">
                    Representer COSAMED dans les evenements local, national,
                    regional ou international suivant les demandes de
                    participation adressées COSAMED;
                  </li>
                  <li className="text-gray-900 font-montserrat mb-2  dark:text-gray-300 font-regular leading-5">
                    Bénéficier des petites subventions accordées par COSAMED
                    pour les recherches et solutions innovantes aux problèmes de
                    santé;
                  </li>
                  <li className="text-gray-900 font-montserrat mb-2  dark:text-gray-300 font-regular leading-5">
                    Contribuer avec elements dansles publications mensuelles et
                    annuelles de COSAMED;
                  </li>
                  <li className="text-gray-900 font-montserrat mb-2  dark:text-gray-300 font-regular leading-5">
                    Privilège de réduction des frais de partition aux événements
                    annuels de COSAMED y compris la conférence annuelle et le
                    well being event
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-[13px] font-montserrat font-bold mb-2 dark:text-white">
                  Les obligations
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-[12px]">
                  <li className="text-gray-900  dark:text-gray-300  font-montserrat mb-2  font-regular leading-5">
                    Défendre les intétets de COSAMED asbl;
                  </li>
                  <li className="text-gray-900 dark:text-gray-300  font-montserrat mb-2  font-regular leading-5">
                    Payer les cotisaions tels que fixé par l'ensemblé générale{" "}
                    <span className="font-bold">25$</span>
                  </li>
                  <li className="text-gray-900 dark:text-gray-300 font-montserrat mb-2  font-regular leading-5">
                    Participer activement aux activitées de l'association;
                  </li>
                  <li className="text-gray-900 dark:text-gray-300  font-montserrat mb-2  font-regular leading-5">
                    Payer sa carte de membre{" "}
                    <span className="font-bold">5$</span>
                  </li>
                  <li className="text-gray-900 dark:text-gray-300 font-montserrat mb-2  font-regular leading-5">
                    Proteger le patrimoine de l'association
                  </li>
                  <li className="text-gray-900 dark:text-gray-300 font-montserrat mb-2  font-regular leading-5">
                    S'abstenir de toute action qui compromettrait la bonne
                    marche
                  </li>
                  <li className="text-gray-900 dark:text-gray-300  font-montserrat mb-2  font-regular leading-5">
                    Contribuer activement à la réalisation des objectifs
                    poursuivis par l'association;
                  </li>
                  <li className="text-gray-900 dark:text-gray-300  font-montserrat mb-2  font-regular leading-5">
                    Respecter scrupuleusement les statuts et les règlements
                    d'ordre interiur;
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Form */}
        <div className="p-6 dark:bg-slate-800">
          <h2 className="text-[13px] font-semibold text-center text-gray-800 mb-6">
            {t("complete_info")}
          </h2>
          <form className="mt-8 space-y-6 mb-8" onSubmit={validation}>
            <div className="space-y-px rounded-md items-center">
              <div className="grid grid-cols-1 gap-4">
                <Input
                  required
                  label={t("Select_thematic")}
                  type="select"
                  errors={errors.thematique}
                  value={inputs.thematique}
                  onFocus={() => hanldeError(null, `thematique`)}
                  onChange={(e: any) =>
                    handleOnChange(e.target.value, "thematique")
                  }
                  options={data?.map((item: any) => ({
                    label: showingTranslateValue(item?.translations, lang)
                      ?.value,
                    value: item.id,
                  }))}
                />
                <Input
                  required
                  label={t("Select_typemember")}
                  type="select"
                  errors={errors.typemembre}
                  value={inputs.typemembre}
                  onFocus={() => hanldeError(null, `typemembre`)}
                  onChange={(e: any) =>
                    handleOnChange(e.target.value, "typemembre")
                  }
                  options={Type?.map((item: any) => ({
                    label: showingTranslateValue(item?.translations, lang)
                      ?.name,
                    value: item.id,
                  }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <Input
                  required
                  name="name"
                  label={t("Name")}
                  placeholder=""
                  type="text"
                  errors={errors.name}
                  value={inputs.name}
                  onFocus={() => hanldeError(null, `name`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "name")}
                />
                <Input
                  required
                  name="prename"
                  label={t("Prename")}
                  placeholder=""
                  type="text"
                  errors={errors.prename}
                  value={inputs.prename}
                  onFocus={() => hanldeError(null, `prename`)}
                  onChange={(e: any) =>
                    handleOnChange(e.target.value, "prename")
                  }
                />
                <Input
                  required
                  name="select"
                  label={t("Select_Sexe")}
                  type="select"
                  value={inputs.sexe}
                  errors={errors.sexe}
                  onFocus={() => hanldeError(null, `sexe`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "sexe")}
                  options={genres?.map((item: any) => ({
                    label: item.label,
                    value: item.value,
                  }))}
                />
                <Input
                  required
                  name="phone"
                  label={t("Phone")}
                  type="phone"
                  errors={errors.phone}
                  value={inputs.phone}
                  onFocus={() => hanldeError(null, `phone`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "phone")}
                />
                <Input
                  required
                  name="email"
                  label="Email"
                  placeholder=""
                  type="email"
                  errors={errors.email}
                  value={inputs.email}
                  onFocus={() => hanldeError(null, `email`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "email")}
                />
                <Input
                  required
                  name="select"
                  label={t("Select_country")}
                  type="select"
                  value={inputs.country}
                  errors={errors.country}
                  onFocus={() => hanldeError(null, `country`)}
                  onChange={(e: any) =>
                    handleOnChange(e.target.value, "country")
                  }
                  options={country?.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
                <Input
                  required
                  name="ville"
                  label={t("City")}
                  type="text"
                  errors={errors.ville}
                  value={inputs.ville}
                  onFocus={() => hanldeError(null, `ville`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "ville")}
                />
                <Input
                  required
                  type={"text"}
                  name="profession"
                  label={t("Proffession")}
                  placeholder=""
                  errors={errors.profession}
                  value={inputs.profession}
                  onFocus={() => hanldeError(null, `profession`)}
                  onChange={(e: any) =>
                    handleOnChange(e.target.value, "profession")
                  }
                />
                <Input
                  name="num_ordre"
                  label={t("Order_number")}
                  placeholder=""
                  type="text"
                  errors={errors.num_ordre}
                  value={inputs.num_ordre}
                  onFocus={() => hanldeError(null, `num_ordre`)}
                  onChange={(e: any) =>
                    handleOnChange(e.target.value, "num_ordre")
                  }
                />
                <Input
                  type={"text"}
                  name="corporation"
                  label={t("Corporation")}
                  placeholder=""
                  errors={errors.corporation}
                  value={inputs.corporation}
                  onFocus={() => hanldeError(null, `corporation`)}
                  onChange={(e: any) =>
                    handleOnChange(e.target.value, "corporation")
                  }
                />
              </div>
              <div className="py-4">
                <div className="mb-4 border rounded-lg p-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                    <InputPdf
                      required
                      name="cv"
                      label="Sélectionner votre lettre"
                      placeholder=""
                      type="file"
                      errors={errors.cv}
                      onFocus={() => hanldeError(null, `cv`)}
                      onChange={(e: any) => {
                        handleOnChange(e.target.files[0], "cv");
                      }}
                    />
                    <InputPdf
                      required
                      name="cover_letter"
                      label="Sélectionner carte d'identité"
                      placeholder=""
                      type="file"
                      errors={errors.cover_letter}
                      onFocus={() => hanldeError(null, `cover_letter`)}
                      onChange={(e: any) => {
                        handleOnChange(e.target.files[0], "cover_letter");
                      }}
                    />
                    <InputFile
                      required
                      name="carte"
                      label="Sélectionner votre dossier académique"
                      placeholder=""
                      type="file"
                      errors={errors.cv}
                      onFocus={() => hanldeError(null, `carte`)}
                      onChange={(e: any) => {
                        handleOnChange(e.target.files[0], "carte");
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <TextArea
                  name="motif"
                  placeholder=""
                  type="text"
                  value={inputs.motif}
                  onFocus={() => hanldeError(null, `motif`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "motif")}
                  label={t("What_is_the_motivation")}
                />
              </div>
            </div>
            <Button loading={loadingForm} label={t("Soumettre")} />
            <div className="justify-center items-center">
              <div className="mb-2">
                <p className="text-[12px] font-montserrat text-slate-700 dark:text-slate-600 text-justify">
                  En cliquant sur Continuer, vous acceptez notre{" "}
                  <Link
                    to="/confidentiality"
                    className="text-principal font-bold"
                    target="_blank"
                  >
                    Politique de confidentialité
                  </Link>
                  . Vous recevrez peut-être des notifications par texto ou par
                  email de notre part.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Rejoindre;
