import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import Input from "../components/form/Input";
import CountryServices from "../services/CountryServices";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../context";
import useValidation from "../hooks/useValidation";
import TextArea from "../components/form/TextArea";
import {
  ApplyForm,
  Attestations,
  Education,
  Experience,
  Languages,
  Skills,
} from "../types";
import Application from "../hooks/Application";
import Button from "../components/form/Button";
import BreadCumb from "../components/navbar/BreadCumb";
import InputFile from "../components/form/InputFile";
import OffresServices from "../services/OffresServices";

const JobApplicationForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user, pageLang } = useAuthContext();
  const { data: offre } = useAsync(() => OffresServices.oneOffre(id), id);
  const { data: country } = useAsync(() => CountryServices.getCountry());
  const { apply_offre, loading } = Application();
  //==============================Mes données personnelles=========
  const { inputs, errors, handleOnChange, hanldeError, setInputs } =
    useValidation<ApplyForm>({
      //Mes informations
      id: "",
      full_name: "",
      email: "",
      phone: "",
      country: "",
      town: "",
      cover_letter: "",
      cv: "",
      dossier: "",
      carte: "",
      //Langue
      languages: [
        {
          language: "",
          comprehension: "",
          writing: "",
          reading: "",
          speaking: "",
        },
      ],

      //Education
      educations: [
        {
          title_edu: "",
          institution: "",
          endDate_edu: "",
        },
      ],
      //experiences
      experiences: [
        {
          job_title_ex: "",
          company_name_exp: "",
          start_date_exp: "",
          end_date_exp: "",
          description_exp: "",
        },
      ],
      //Competences
      skills: [
        {
          skill_name: "",
        },
      ],

      //Attestations/certificats
      attestations: [
        {
          title_attestation: "",
          file_attestation: "",
          date_delivrance_attestation: "",
        },
      ],
      //Application
    });

  const handleOnChangeIndex = (value: string, index: number, field: string) => {
    const array: any = inputs.languages;
    array[index][field] = value;
    handleOnChange("languages", array);
  };

  const handleOnChangeIndexEtude = (
    value: string,
    index: number,
    field: string
  ) => {
    const array: any = inputs.educations;
    array[index][field] = value;
    handleOnChange("educations", array);
  };

  const handleOnChangeIndexExp = (
    value: string,
    index: number,
    field: string
  ) => {
    const array: any = inputs.experiences;
    array[index][field] = value;
    handleOnChange("experiences", array);
  };
  const handleOnChangeIndexSkills = (
    value: string,
    index: number,
    field: string
  ) => {
    const array: any = inputs.skills;
    array[index][field] = value;
    handleOnChange("skills", array);
  };
  const handleOnChangeIndexAttestation = (
    value: string,
    index: number,
    field: string
  ) => {
    const array: any = inputs.attestations;
    array[index][field] = value;
    handleOnChange("attestations", array);
  };

  //============================== Validation des champs puis les validés
  const validateStep = (): boolean => {
    let isValid = true;
    switch (currentStep) {
      case 1:
        if (inputs?.languages?.length === 0) {
          hanldeError(t("Veuillez sélectionner une langue"), "language");
          isValid = false;
        }
        inputs.languages?.map((item: Languages, index: number) => {
          if (!item.language) {
            hanldeError(
              t("Veuillez sélectionner une langue"),
              `language${index}`
            );
            isValid = false;
          }
          if (!item.comprehension) {
            hanldeError(
              t("Veuillez sélectionner un comprehension valide"),
              `comprehension${index}`
            );
            isValid = false;
          }
          if (!item.writing) {
            hanldeError(
              t("Veuillez sélectionner un writing valide"),
              `writing${index}`
            );
            isValid = false;
          }
          if (!item.reading) {
            hanldeError(
              t("Veuillez sélectionner un reading valide"),
              `reading${index}`
            );
            isValid = false;
          }
          if (!item.speaking) {
            hanldeError(
              t("Veuillez sélectionner un speaking valide"),
              `speaking${index}`
            );
            isValid = false;
          }
        });
        break;
      case 2:
        if (inputs?.educations?.length === 0) {
          hanldeError(t("Veuillez entrer votre étude"), "title_edu");
          isValid = false;
        }
        inputs.educations?.map((item: Education, index: number) => {
          if (!item.title_edu) {
            hanldeError(t("Veuillez entrer votre étude"), `title_edu${index}`);
            isValid = false;
          }
          if (!item.institution) {
            hanldeError(
              t("Veuillez entrer le nom de l'institution"),
              `institution${index}`
            );
            isValid = false;
          }
          if (!item.endDate_edu) {
            hanldeError(
              t("Veuillez entrer l'année de cette étude"),
              `endDate_edu${index}`
            );
            isValid = false;
          }
        });

        if (inputs?.experiences?.length === 0) {
          hanldeError(
            t("Veuillez entrer l'intutilé du poste que tu occupé!"),
            "job_title_ex"
          );
          isValid = false;
        }
        inputs.experiences?.map((item: Experience, index: number) => {
          if (!item.job_title_ex) {
            hanldeError(
              t("Veuillez entrer l'intutilé du poste que tu occupé!"),
              `job_title_ex${index}`
            );
            isValid = false;
          }
          if (!item.company_name_exp) {
            hanldeError(
              t("Veuillez entrer l'intutilé de l'entreprise!"),
              `company_name_exp${index}`
            );
            isValid = false;
          }
          if (!item.start_date_exp) {
            hanldeError(
              t("Veuillez entrer la date que vous avez commencé à travailler"),
              `start_date_exp${index}`
            );
            isValid = false;
          }
          if (!item.end_date_exp) {
            hanldeError(
              t(
                "Veuillez entrer la date que vous avez términder de travailler"
              ),
              `end_date_exp${index}`
            );
            isValid = false;
          }
          if (!item.description_exp) {
            hanldeError(
              t("Veuillez entrer une description!"),
              `description_exp${index}`
            );
            isValid = false;
          }
        });
        break;
      case 3:
        if (!inputs.cover_letter) {
          hanldeError("Cover is required", "cover_letter");
          isValid = false;
        } else {
          const MAX_FILE_SIZE = 5120; // 5MB
          const fileSizeKiloBytes = inputs?.cover_letter?.size / 1024;
          if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            hanldeError("Cover letter is too big (max 5 mb) ", "cover_letter");
            isValid = false;
          }
        }
        if (!inputs.cv) {
          hanldeError("Cover is required", "cv");
          isValid = false;
        } else {
          const MAX_FILE_SIZE = 5120; // 5MB
          const fileSizeKiloBytes = inputs?.cv?.size / 1024;
          if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            hanldeError("Cv is too big (max 5 mb) ", "cv");
            isValid = false;
          }
        }
        if (!inputs.carte) {
          hanldeError("Carte is required", "carte");
          isValid = false;
        } else {
          const MAX_FILE_SIZE = 5120; // 5MB
          const fileSizeKiloBytes = inputs?.carte?.size / 1024;
          if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            hanldeError("Carte is too big (max 5 mb) ", "carte");
            isValid = false;
          }
        }
        if (!inputs.dossier) {
          hanldeError("Dossier is required", "dossier");
          isValid = false;
        } else {
          const MAX_FILE_SIZE = 5120; // 5MB
          const fileSizeKiloBytes = inputs?.dossier?.size / 1024;
          if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            hanldeError("Dossier is too big (max 5 mb) ", "dossier");
            isValid = false;
          }
        }

        break;
      default:
        break;
    }
    return isValid;
  };
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    if (validateStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const languages = [
    {
      code: "en",
      name: "English",
    },
    {
      code: "fr",
      name: "French",
    },
    {
      code: "es",
      name: "Spanish",
    },
  ];
  
  const addLanguageExperience = () => {
    const array: Languages[] | any = inputs?.languages;
    array?.push({
      language: "",
      comprehension: "",
      writing: "",
      reading: "",
      speaking: "",
    });
    handleOnChange("languages", array);
  };
  ///==============================Education=================================
  const addEducation = () => {
    const array: Education[] | any = inputs?.educations;
    array?.push({
      title_edu: "",
      institution: "",
      endDate_edu: "",
    });
    handleOnChange("educations", array);
  };
  //==============================Experiences=================================
  const addExperiences = () => {
    const array: Experience[] | any = inputs?.experiences;
    array?.push({
      job_title_ex: "",
      company_name_exp: "",
      start_date_exp: "",
      end_date_exp: "",
      description_exp: "",
    });
    handleOnChange("experiences", array);
  };
  ///==============================Skills=================================
  const addSkills = () => {
    const array: Skills[] | any = inputs?.skills;
    array?.push({
      skill_name: "",
    });
    handleOnChange("skills", array);
  };
  //=====================Attestation/Certificats=================================
  const addCertificates = () => {
    const array: Attestations[] | any = inputs?.attestations;
    array?.push({
      title_attestation: "",
      file_attestation: "",
      date_delivrance_attestation: "",
    });
    handleOnChange("attestations", array);
  };
  const removeLanguageExperience = (index: number) => {
    const array = inputs?.languages;
    array?.splice(index, 1);
    handleOnChange("languages", array);
  };
  const removeEducation = (index: number) => {
    const array = inputs?.educations;
    array?.splice(index, 1);
    handleOnChange("educations", array);
  };
  const removeExperience = (index: number) => {
    const array = inputs?.experiences;
    array?.splice(index, 1);
    handleOnChange("experiences", array);
  };
  const removeSkills = (index: number) => {
    const array = inputs?.skills;
    array?.splice(index, 1);
    handleOnChange("skills", array);
  };
  const removeAttestation = (index: number) => {
    const array = inputs?.attestations;
    array?.splice(index, 1);
    handleOnChange("attestations", array);
  };

  const niveau_language = [
    {
      label: "Débutant",
      value: "Débutant",
    },
    {
      label: "Intermédiaire",
      value: "Intermédiaire",
    },
    {
      label: "Avancé",
      value: "Avancé",
    },
  ];

  useEffect(() => {
    setInputs({
      ...inputs,
      id: user?.id,
      full_name: user?.full_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      country: user?.country || "",
      town: user?.town || "",
    });
  }, [user, pageLang]);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateStep()) {
      apply_offre(inputs, id, user?.id);
    }
  };
  return (
    <div className="container dark:bg-slate-900 w-full dark:text-white  bg-gray-100">
      <BreadCumb title={"Blog"} />
      <header className="bg-principal dark:bg-slate-800 dark:text-white shadow-md p-2 rounded-lg">
        <div className="max-w-6xl mx-auto">
          {/* Conteneur des étapes */}
          <div className="flex items-center justify-between gap-6">
            {[...Array(totalSteps)].map((_, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                {/* Étape */}
                <div
                  className={`w-8 h-8 md:w-10 md:h-10  rounded-full flex items-center justify-center text-lg font-medium border-2 transition-all duration-300 ${
                    currentStep === index + 1
                      ? "bg-hover text-white "
                      : currentStep > index + 1
                      ? "bg-blue-100 text-blue-600 "
                      : "bg-gray-200 text-gray-600 "
                  }`}
                >
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-8 ">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white p-6">
            {offre?.title}
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-full dark:bg-slate-800 dark:text-white bg-white rounded-lg shadow-md p-6 "
        >
          {currentStep === 1 && (
            <div className="mb-4 rounded-lg dark:border border-slate-700 p-4  dark:bg-slate-900 dark:text-white">
              <div className=" px-2 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  <Input
                    required
                    name="full_name"
                    label={t("Full_name")}
                    placeholder=""
                    type="text"
                    errors={errors.full_name}
                    value={inputs.full_name}
                    onChange={(e: any) =>
                      handleOnChange(e.target.value, "full_name")
                    }
                    onFocus={() => hanldeError(null, `full_name`)}
                  />
                  <Input
                    required
                    name="select"
                    label={t("Select_Sexe")}
                    type="select"
                    value={inputs.gender}
                    errors={errors.gender}
                    onChange={(e: any) =>
                      handleOnChange(e.target.value, "gender")
                    }
                    onFocus={() => hanldeError(null, `gender`)}
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
                    onFocus={() => hanldeError(null, `email`)}
                    onChange={(e: any) =>
                      handleOnChange(e.target.value, "email")
                    }
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
                    name="town"
                    label={t("City")}
                    type="text"
                    errors={errors.town}
                    value={inputs.town}
                    onFocus={() => hanldeError(null, `town`)}
                    onChange={(e: any) =>
                      handleOnChange(e.target.value, "town")
                    }
                  />
                </div>
              </div>
              <div className=" px-2 py-4">
                <h1 className=" text-xl font-semibold">Langues</h1>
                <p className="font-light lg:text-sm">
                  Langues Énumérez chacune des langues que vous parlez, lisez ou
                  écrivez ainsi que leurs niveaux de compétence. Veuillez
                  préciser toutes vos qualifications linguistiques, en
                  particulier les langues de l'ONU (anglais, espagnol, français,
                  arabe, russe, portugais, chinois). Si vous possédez une
                  certification linguistique, veuillez la joindre dans la
                  section Certification.
                </p>
              </div>
              <div className=" px-2 py-4">
                {inputs?.languages?.map((edu: Languages, index) => (
                  <div key={index} className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-sm font-semibold font-semibold text-gray-800">
                        Langues {index + 1}
                      </h2>
                      {inputs?.languages && inputs?.languages?.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLanguageExperience(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                    <Input
                      required
                      name="select"
                      label="Selectionner la langue"
                      type="select"
                      value={edu.language}
                      errors={errors[`language${index}`]}
                      onChange={(e: any) =>
                        handleOnChangeIndex(e.target.value, index, "language")
                      }
                      onFocus={() => hanldeError(null, `language${index}`)}
                      options={languages?.map((language: any) => ({
                        label: language.name,
                        value: language.name,
                      }))}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <Input
                        required
                        name="select"
                        label="1.Écriture"
                        type="select"
                        value={edu.writing}
                        errors={errors[`writing${index}`]}
                        onChange={(e: any) =>
                          handleOnChangeIndex(e.target.value, index, "writing")
                        }
                        onFocus={() => hanldeError(null, `writing${index}`)}
                        options={niveau_language?.map((item: any) => ({
                          label: item.label,
                          value: item.value,
                        }))}
                      />

                      <Input
                        required
                        name="select"
                        label="2.Lecture"
                        type="select"
                        value={edu.reading}
                        errors={errors[`reading${index}`]}
                        onChange={(e: any) =>
                          handleOnChangeIndex(e.target.value, index, "reading")
                        }
                        onFocus={() => hanldeError(null, `reading${index}`)}
                        options={niveau_language?.map((item: any) => ({
                          label: item.label,
                          value: item.value,
                        }))}
                      />
                      <Input
                        required
                        name="select"
                        label="3.Parler"
                        type="select"
                        value={edu.speaking}
                        errors={errors[`speaking${index}`]}
                        onChange={(e: any) =>
                          handleOnChangeIndex(e.target.value, index, "speaking")
                        }
                        onFocus={() => hanldeError(null, `speaking${index}`)}
                        options={niveau_language?.map((item: any) => ({
                          label: item.label,
                          value: item.value,
                        }))}
                      />
                      <Input
                        required
                        name="select"
                        label="4.Comprehension"
                        type="select"
                        value={edu.comprehension}
                        errors={errors[`comprehension${index}`]}
                        onFocus={() =>
                          hanldeError(null, `comprehension${index}`)
                        }
                        onChange={(e: any) =>
                          handleOnChangeIndex(
                            e.target.value,
                            index,
                            "comprehension"
                          )
                        }
                        options={niveau_language?.map((item: any) => ({
                          label: item.label,
                          value: item.value,
                        }))}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  style={{ fontSize: 11 }}
                  onClick={addLanguageExperience}
                  className=" bg-principal w-[60px] text-white py-2 rounded-lg hover:bg-hover transition duration-300"
                >
                  Ajouter
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div className="">
                <h1 className=" text-xl font-semibold">
                  Parcours scolaire en termes de diplôme
                </h1>
                <p className="font-light text-sm lg:text-sm">
                  Le parcours scolaire est l'ensemble des étapes d'apprentissage
                  et de formation qu'une personne suit tout au long de sa vie
                  académique. Il commence généralement par l'école primaire, où
                  les bases de l'éducation sont posées, suivie par
                  l'enseignement secondaire, qui permet de développer des
                  compétences plus spécifiques et d'approfondir les
                  connaissances générales. Ensuite, certains choisissent de
                  poursuivre dans l'enseignement supérieur pour acquérir une
                  expertise dans un domaine particulier, en passant par des
                  études universitaires, des formations professionnelles, ou des
                  écoles spécialisées.
                </p>
              </div>
              <div className="mb-4 border rounded-lg">
                <div className=" px-2 py-4">
                  {inputs?.educations?.map((edu: Education, index) => (
                    <div key={index} className="border-b pb-4 mb-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-semibold font-semibold text-gray-800">
                          Parcours : {index + 1}
                        </h2>
                        {inputs?.educations &&
                          inputs?.educations?.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeEducation(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Supprimer
                            </button>
                          )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <Input
                          name="institution_edu"
                          label="Établissement*"
                          placeholder="Nom de l'institution"
                          type="text"
                          value={edu.institution}
                          errors={errors[`institution${index}`]}
                          onFocus={() =>
                            hanldeError(null, `institution${index}`)
                          }
                          onChange={(e: any) =>
                            handleOnChangeIndexEtude(
                              e.target.value,
                              index,
                              "institution"
                            )
                          }
                        />
                        <Input
                          name="title_edu"
                          label="Titre du diplôme ou de la certification"
                          placeholder=""
                          type="text"
                          value={edu.title_edu}
                          errors={errors[`title_edu${index}`]}
                          onFocus={() => hanldeError(null, `title_edu${index}`)}
                          onChange={(e: any) =>
                            handleOnChangeIndexEtude(
                              e.target.value,
                              index,
                              "title_edu"
                            )
                          }
                        />
                        <Input
                          name="endDate_edu"
                          label="Année*"
                          placeholder=""
                          type="date"
                          value={edu.endDate_edu}
                          errors={errors[`endDate_edu${index}`]}
                          onFocus={() =>
                            hanldeError(null, `endDate_edu${index}`)
                          }
                          onChange={(e: any) =>
                            handleOnChangeIndexEtude(
                              e.target.value,
                              index,
                              "endDate_edu"
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    style={{ fontSize: 11 }}
                    onClick={addEducation}
                    className=" bg-principal w-[60px] text-white py-2 rounded-lg hover:bg-hover transition duration-300"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
              <div className="">
                <h1 className=" text-xl font-semibold">
                  Expériences professionnelles
                </h1>
                <p className="font-light text-sm lg:text-sm">
                  Les expériences professionnelles font référence à l’ensemble
                  des postes, missions ou projets que vous avez occupés ou
                  réalisés dans le cadre de votre vie active.
                </p>
              </div>
              <div className=" border rounded-lg ">
                <div className=" px-2 py-4">
                  {inputs?.experiences?.map((edu: Experience, index) => (
                    <div key={index} className="border-b pb-4 mb-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-semibold text-gray-800">
                          Expérience : {index + 1}
                        </h2>
                        {inputs?.experiences &&
                          inputs?.experiences?.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeExperience(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Supprimer
                            </button>
                          )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <Input
                          required
                          name="select"
                          label="Nom de l'entreprise ou organisation"
                          type="text"
                          value={edu.company_name_exp}
                          errors={errors[`company_name_exp${index}`]}
                          onFocus={() =>
                            hanldeError(null, `company_name_exp${index}`)
                          }
                          onChange={(e: any) =>
                            handleOnChangeIndexExp(
                              e.target.value,
                              index,
                              "company_name_exp"
                            )
                          }
                        />
                        <Input
                          required
                          name="select"
                          label="Titre du poste ou intitulé du poste"
                          type="text"
                          value={edu.job_title_ex}
                          errors={errors[`job_title_ex${index}`]}
                          onFocus={() =>
                            hanldeError(null, `job_title_ex${index}`)
                          }
                          onChange={(e: any) =>
                            handleOnChangeIndexExp(
                              e.target.value,
                              index,
                              "job_title_ex"
                            )
                          }
                        />
                        <Input
                          required
                          name="select"
                          label="De"
                          type="date"
                          value={edu.start_date_exp}
                          errors={errors[`start_date_exp${index}`]}
                          onFocus={() =>
                            hanldeError(null, `start_date_exp${index}`)
                          }
                          onChange={(e: any) =>
                            handleOnChangeIndexExp(
                              e.target.value,
                              index,
                              "start_date_exp"
                            )
                          }
                        />
                        <Input
                          required
                          name="select"
                          label="À"
                          type="date"
                          value={edu.end_date_exp}
                          errors={errors[`end_date_exp${index}`]}
                          onFocus={() =>
                            hanldeError(null, `end_date_exp${index}`)
                          }
                          onChange={(e: any) =>
                            handleOnChangeIndexExp(
                              e.target.value,
                              index,
                              "end_date_exp"
                            )
                          }
                        />
                        <TextArea
                          label="Description du poste (Pour nous permettre de clarifier clairement votre rôle)"
                          name=""
                          value={edu.description_exp}
                          errors={errors[`description_exp${index}`]}
                          onFocus={() =>
                            hanldeError(null, `description_exp${index}`)
                          }
                          onChange={(e: any) =>
                            handleOnChangeIndexExp(
                              e.target.value,
                              index,
                              "description_exp"
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    style={{ fontSize: 11 }}
                    onClick={addExperiences}
                    className="w-[60px] bg-principal text-white py-2 rounded-lg hover:bg-hover transition duration-300"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <div className="">
                <h1 className=" text-xl font-semibold">
                  Competences (Habiletes et capacités)
                </h1>
                <p className="font-light text-sm lg:text-sm">
                  Les compétences (habiletés et capacités) représentent les
                  aptitudes techniques, relationnelles et personnelles qui
                  permettent à un individu d'accomplir efficacement des tâches
                  dans un contexte professionnel.
                </p>
              </div>
              <div className="mb-4 border rounded-lg">
                <div className=" px-2 py-4">
                  {inputs?.skills?.map((edu: Skills, index) => (
                    <div key={index} className="border-b pb-4 mb-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-semibold font-semibold text-gray-800">
                          Competence : {index + 1}
                        </h2>
                        {inputs?.skills && inputs?.skills?.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkills(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Supprimer
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <Input
                          name="skill_name"
                          label="Entrer la compétence puis ajouter"
                          placeholder=""
                          type="text"
                          value={edu.skill_name}
                          errors={errors[`skill_name${index}`]}
                          onFocus={() =>
                            hanldeError(null, `skill_name${index}`)
                          }
                          onChange={(e: any) =>
                            handleOnChangeIndexSkills(
                              e.target.value,
                              index,
                              "skill_name"
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    style={{ fontSize: 11 }}
                    onClick={addSkills}
                    className=" bg-principal w-[60px] text-white py-2 rounded-lg hover:bg-hover transition duration-300"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
              <div className="">
                <h1 className=" text-xl font-semibold">Brevet/certificat</h1>
                <p className="font-light text-sm lg:text-sm">
                  Parlez-nous de toute Certificat,brevet professionnelle que
                  vous détenez et qui pourrait être pertinente pour votre
                  candidature, y compris toute certification linguistique
                  potentielle.
                </p>
              </div>
              <div className="mb-4 border rounded-lg">
                <div className=" px-2 py-2">
                  {inputs?.attestations?.map((edu: Attestations, index) => (
                    <div key={index} className="border-b pb-4 mb-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-semibold text-gray-800 py-4">
                          Brevet ou certificat : {index + 1}
                        </h2>
                        {inputs?.attestations &&
                          inputs?.attestations?.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeAttestation(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Supprimer
                            </button>
                          )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                        <Input
                          name="title"
                          label="Précisez le titre de ce document(Ex:Conduite,Pharmacie,etc.)"
                          placeholder=""
                          type="text"
                          value={edu.title_attestation}
                          errors={errors[`title_attestation${index}`]}
                          onFocus={() =>
                            hanldeError(null, `title_attestation${index}`)
                          }
                          onChange={(e: any) =>
                            handleOnChangeIndexAttestation(
                              e.target.value,
                              index,
                              "title_attestation"
                            )
                          }
                        />
                        <InputFile
                          name="certificate"
                          label="Sélectionnez la copie de ce document en pdf"
                          placeholder=""
                          type="file"
                          // value={edu.file_attestation}
                          errors={errors[`file_attestation${index}`]}
                          onFocus={() =>
                            hanldeError(null, `file_attestation${index}`)
                          }
                          onChange={(e: any) =>
                            handleOnChangeIndexAttestation(
                              e.target.files[0],
                              index,
                              "file_attestation"
                            )
                          }
                        />
                        <Input
                          name="date_delivrance"
                          label="Date de délivrance"
                          placeholder=""
                          type="date"
                          value={edu.date_delivrance_attestation}
                          errors={errors[`date_delivrance_attestation${index}`]}
                          onFocus={() =>
                            hanldeError(
                              null,
                              `date_delivrance_attestation${index}`
                            )
                          }
                          onChange={(e: any) =>
                            handleOnChangeIndexAttestation(
                              e.target.value,
                              index,
                              "date_delivrance_attestation"
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2">
                  <button
                    type="button"
                    style={{ fontSize: 11 }}
                    onClick={addCertificates}
                    className=" bg-principal w-[60px] text-white p-2 rounded-lg hover:bg-hover transition duration-300"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
              <div className="">
                <h1 className=" text-xl font-semibold">
                  {" "}
                  CV & Lettre de motivation
                </h1>
                <p className="font-light text-sm lg:text-sm">
                  Cosamed cherche ainsi à maximiser les chances de trouver un
                  candidat bien aligné.
                </p>
              </div>
              <div className=" ">
                <div className="mb-4 border rounded-lg p-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                    <InputFile
                      name="cv"
                      label="Sélectionner votre CV"
                      placeholder=""
                      type="file"
                      errors={errors.cv}
                      onChange={(e: any) => {
                        handleOnChange(e.target.files[0], "cv");
                      }}
                    />
                    <InputFile
                      name="cover_letter"
                      label="Sélectionner votre lettre de motivation"
                      placeholder=""
                      type="file"
                      errors={errors.cover_letter}
                      onChange={(e: any) => {
                        handleOnChange(e.target.files[0], "cover_letter");
                      }}
                    />
                    <InputFile
                      name="carte"
                      label="Sélectionner la copie de votre carte d'identité"
                      placeholder=""
                      type="file"
                      errors={errors.cv}
                      onChange={(e: any) => {
                        handleOnChange(e.target.files[0], "carte");
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <h1 className=" text-xl font-semibold"> Dossier au complet</h1>
                <p className="font-light text-sm lg:text-sm">
                  Afin de nous simplifier l'évaluation et la prise de décision.
                </p>
                <p className="py-2 line-coverage">
                  Note : Tous les documents demandés doivent être regroupés dans
                  un seul fichier PDF (dossier complet).
                </p>
              </div>
              <div className=" py-2 ">
                <div className="mb-4 border rounded-lg p-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                    <InputFile
                      name="dossier"
                      label="Sélectionner  votre dossier complet"
                      placeholder=""
                      type="file"
                      errors={errors.dossier}
                      onChange={(e: any) => {
                        handleOnChange(e.target.files[0], "dossier");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className=" p-6">
            {currentStep === totalSteps && (
              <Button loading={loading} label={t("SendMessage")} />
            )}
          </div>
        </form>
        <div className="flex justify-between p-2">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Précédent
            </button>
          )}
          {currentStep < totalSteps && (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-principal text-white rounded-md hover:bg-blue-600"
            >
              Suivant
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;
