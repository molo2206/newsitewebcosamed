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
import BulletinLoad from "../components/blogs/BulletinLoad";

const Rejoindre = () => {
  const { t } = useTranslation();
  const { lang } = useAuthContext();

  const { data: thematiques, loading: loadingThematiques } = useAsync(() =>
    ThematiquesServices.getThematiques()
  );
  const { data: types, loading: loadingTypes } = useAsync(() =>
    TypeMemberService.getTypMember()
  );
  const { data: countries, loading: loadingCountries } = useAsync(() =>
    CountryService.getCountry()
  );

  const { createMember, loading: loadingForm } = Members();

  const genres = [
    { value: "Masculin", label: "Masculin" },
    { value: "Feminin", label: "Feminin" },
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
      cv: null,
      cover_letter: null,
      carte: null,
      motif: "",
    });

  const validation = (e: any) => {
    e.preventDefault();
    let valide = true;

    [
      "name",
      "prename",
      "sexe",
      "phone",
      "email",
      "typemembre",
      "thematique",
      "country",
      "ville",
      "profession",
    ].forEach((field) => {
      if (!inputs[field as keyof ApplyForm]) {
        hanldeError(`${field} is required`, field);
        valide = false;
      }
    });

    if (valide) createMember(inputs, setInputs);
  };

  // Affichage du skeleton loader si les données ou le formulaire sont en cours de chargement
  if (loadingForm || loadingThematiques || loadingTypes || loadingCountries) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <BulletinLoad key={i} />
        ))}
      </div>
    );
  }

  return (
    <main className="bg-white dark:bg-slate-900 min-h-screen dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <BreadCumb title={t("Rejoindre")} />

        {/* Header */}
        <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
          <h1 className="text-[16px] font-bold uppercase tracking-widest">
            {t("complete_info")}
          </h1>
        </section>

        <div className="mt-6 flex flex-col md:flex-row gap-6">
          {/* Avantages / obligations */}
          <div className="md:w-3/5 bg-[#f0f2f5] dark:bg-slate-800 p-6 border dark:border-slate-700 shadow-md">
            <h2 className="text-[13px] font-semibold text-gray-800 dark:text-white text-center mb-6">
              {t("Condition")} COSAMED ASBL
            </h2>
            <div className="space-y-6 text-gray-700 dark:text-gray-300 text-[12px] leading-5">
              <div>
                <h3 className="text-md font-bold mb-2 dark:text-white">Avantages</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Contribuer avec éléments dans les publications mensuelles et annuelles de COSAMED
                  </li>
                  <li>
                    Participation privilégiée aux formations en ligne ou en personne organisées par COSAMED
                  </li>
                  <li>
                    Priorité dans les opportunités d'implémentation des programmes selon critères de sélection
                  </li>
                  <li>Représenter COSAMED dans les événements locaux, nationaux et internationaux</li>
                  <li>Bénéficier de petites subventions pour recherches et solutions innovantes</li>
                  <li>Réduction des frais de participation aux événements annuels</li>
                </ul>
              </div>

              <div>
                <h3 className="text-md font-bold mb-2 dark:text-white">Obligations</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Défendre les intérêts de COSAMED ASBL</li>
                  <li>Payer les cotisations fixées par l'assemblée générale</li>
                  <li>Participer activement aux activités de l'association</li>
                  <li>Payer sa carte de membre</li>
                  <li>Protéger le patrimoine de l'association</li>
                  <li>S'abstenir de toute action compromettant la bonne marche</li>
                  <li>Contribuer à la réalisation des objectifs de l'association</li>
                  <li>Respecter les statuts et règlements internes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="md:w-2/5 bg-white dark:bg-slate-800 p-6 border dark:border-slate-700 shadow-md rounded-md">
            <form className="space-y-6" onSubmit={validation}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  required
                  label={t("Select_thematic")}
                  type="select"
                  errors={errors.thematique}
                  value={inputs.thematique}
                  onFocus={() => hanldeError(null, `thematique`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "thematique")}
                  options={thematiques?.map((item: any) => ({
                    label: showingTranslateValue(item?.translations, lang)?.value,
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
                  onChange={(e: any) => handleOnChange(e.target.value, "typemembre")}
                  options={types?.map((item: any) => ({
                    label: showingTranslateValue(item?.translations, lang)?.name,
                    value: item.id,
                  }))}
                />
                <Input
                  required
                  label={t("Name")}
                  type="text"
                  errors={errors.name}
                  value={inputs.name}
                  onFocus={() => hanldeError(null, `name`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "name")}
                />
                <Input
                  required
                  label={t("Prename")}
                  type="text"
                  errors={errors.prename}
                  value={inputs.prename}
                  onFocus={() => hanldeError(null, `prename`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "prename")}
                />
                <Input
                  required
                  label={t("Select_Sexe")}
                  type="select"
                  errors={errors.sexe}
                  value={inputs.sexe}
                  onFocus={() => hanldeError(null, `sexe`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "sexe")}
                  options={genres}
                />
                <Input
                  required
                  label={t("Phone")}
                  type="phone"
                  errors={errors.phone}
                  value={inputs.phone}
                  onFocus={() => hanldeError(null, `phone`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "phone")}
                />
                <Input
                  required
                  label="Email"
                  type="email"
                  errors={errors.email}
                  value={inputs.email}
                  onFocus={() => hanldeError(null, `email`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "email")}
                />
                <Input
                  required
                  label={t("Select_country")}
                  type="select"
                  errors={errors.country}
                  value={inputs.country}
                  onFocus={() => hanldeError(null, `country`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "country")}
                  options={countries?.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
                <Input
                  required
                  label={t("City")}
                  type="text"
                  errors={errors.ville}
                  value={inputs.ville}
                  onFocus={() => hanldeError(null, `ville`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "ville")}
                />
                <Input
                  required
                  label={t("Proffession")}
                  type="text"
                  errors={errors.profession}
                  value={inputs.profession}
                  onFocus={() => hanldeError(null, `profession`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "profession")}
                />
              </div>

              {/* Fichiers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputPdf
                  required
                  label="Sélectionner votre lettre"
                  type="file"
                  errors={errors.cv}
                  onFocus={() => hanldeError(null, `cv`)}
                  onChange={(e: any) => handleOnChange(e.target.files[0], "cv")}
                />
                <InputPdf
                  required
                  label="Sélectionner carte d'identité"
                  type="file"
                  errors={errors.cover_letter}
                  onFocus={() => hanldeError(null, `cover_letter`)}
                  onChange={(e: any) => handleOnChange(e.target.files[0], "cover_letter")}
                />
                <InputFile
                  required
                  label="Sélectionner votre dossier académique"
                  type="file"
                  errors={errors.carte}
                  onFocus={() => hanldeError(null, `carte`)}
                  onChange={(e: any) => handleOnChange(e.target.files[0], "carte")}
                />
              </div>

              <TextArea
                label={t("What_is_the_motivation")}
                value={inputs.motif}
                onFocus={() => hanldeError(null, `motif`)}
                onChange={(e: any) => handleOnChange(e.target.value, "motif")}
              />

              <Button loading={loadingForm} label={t("Soumettre")} />

              <p className="text-[12px] text-gray-700 dark:text-slate-400 text-justify mt-4">
                {t("En cliquant sur Continuer, vous acceptez notre")}{" "}
                <Link
                  to="/confidentiality"
                  className="text-principal font-bold"
                  target="_blank"
                >
                  Politique de confidentialité
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Rejoindre;
