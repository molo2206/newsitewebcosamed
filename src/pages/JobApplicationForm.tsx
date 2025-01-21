import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import OffresServices from "../services/OffresServices";
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

const JobApplicationForm = () => {
  const { t } = useTranslation();
  const { user, pageLang } = useAuthContext();
  const { data: country } = useAsync(() => CountryServices.getCountry());
  const { id } = useParams();
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
      cover_letter: "",
      cv: "",
    });

  const handleOnChangeIndex = (value: string, index: number, field: string) => {
    const array: any = inputs.languages;
    array[index][field] = value;
    handleOnChange("languages", array);
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
        if (!inputs.cover_letter || !inputs.cv) {
          hanldeError(
            t("Veuillez ajouter une lettre de motivation et un CV"),
            "cover_letter"
          );
          isValid = false;
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateStep()) {
      console.log(inputs);
    }
  };
  //======================================

  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    fetch("/languages.json")
      .then((response) => response.json())
      .then((data) => setLanguages(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des langues:", error)
      );
  }, []);

  const [language_experience, setLanguageExperience] = useState([
    {
      id: 1,
      job_title_ex: "",
      company_name_exp: "",
      start_date_exp: "",
      end_date_exp: "",
      description_exp: "",
    },
  ]);
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

  const removeLanguageExperience = (index: number) => {
    const array = inputs?.languages;
    array?.splice(index, 1);
    handleOnChange("languages", array);
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
  ///==============================Education=================================
  const [educations, setEducations] = useState([
    {
      id: 1,
      title_edu: "",
      institution: "",
      endDate_edu: "",
    },
  ]);
  const handleChangeEducations = (id: any, field: any, value: any) => {
    setEducations((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };
  const addEducation = () => {
    setEducations((prev: any) => [
      ...prev,
      {
        id: prev.length + 1,
        title_edu: "",
        institution: "",
        endDate_edu: "",
      },
    ]);
  };
  const removeEducation = (id: any) => {
    setEducations((prev) => prev.filter((edu) => edu.id !== id));
  };

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      job_title_ex: "",
      company_name_exp: "",
      start_date_exp: "",
      end_date_exp: "",
      description_exp: "",
    },
  ]);

  const handleChanges = (id: any, field: any, value: any) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        job_title_ex: "",
        company_name_exp: "",
        start_date_exp: "",
        end_date_exp: "",
        description_exp: "",
      },
    ]);
  };

  const removeExperience = (id: any) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  //=========================Mes competences===============================
  const [competences, setCompetences] = useState([
    {
      id: 1,
      skill_name: "",
    },
  ]);
  const handleChangeCompetences = (id: any, field: any, value: any) => {
    setCompetences((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };
  const addCompentence = () => {
    setCompetences((prev: any) => [
      ...prev,
      {
        id: prev.length + 1,
        skill_name: "",
      },
    ]);
  };
  const removeCompetence = (id: any) => {
    setCompetences((prev) => prev.filter((edu) => edu.id !== id));
  };

  const handleChangess = (id: any, field: any, value: any) => {
    setCompetences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };
  //=====================Certificats=================================
  const [attestation, setAttestation] = useState([
    {
      id: 1,
      title: "",
      file: "",
      date_delivrance: "",
    },
  ]);

  const addattestation = () => {
    setAttestation((prev: any) => [
      ...prev,
      {
        id: prev.length + 1,
        title: "",
        file: "",
        date_delivrance: "",
      },
    ]);
  };
  const removeAttestation = (id: any) => {
    setAttestation((prev) => prev.filter((edu) => edu.id !== id));
  };

  return (
    <div className="container bg-gray-100  p-6 dark:bg-slate-900 dark:text-white">
      {/* Indicateur d'étape */}
      <div className="flex items-center justify-between mb-6">
        {[...Array(totalSteps)].map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === index + 1
                ? "bg-principal text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="mb-4 rounded-lg dark:border border-slate-700  dark:bg-slate-900 dark:text-white">
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
                  onChange={(e: any) => handleOnChange(e.target.value, "email")}
                />
                <Input
                  required
                  name="select"
                  label={t("Select_country")}
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
                />
                <Input
                  required
                  name="town"
                  label={t("City")}
                  type="text"
                  errors={errors.town}
                  value={inputs.town}
                  onChange={(e: any) => handleOnChange(e.target.value, "town")}
                />
              </div>
            </div>
            <div className=" px-2 py-4">
              <h1 className=" text-xl font-semibold">Langues</h1>
              <p className="font-light">
                Langues Énumérez chacune des langues que vous parlez, lisez ou
                écrivez ainsi que leurs niveaux de compétence. Veuillez préciser
                toutes vos qualifications linguistiques, en particulier les
                langues de l'ONU (anglais, espagnol, français, arabe, russe,
                portugais, chinois). Si vous possédez une certification
                linguistique, veuillez la joindre dans la section Certification.
              </p>
            </div>
            <div className=" px-2 py-4">
              {inputs?.languages?.map((edu: Languages, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">
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
                      onFocus={() => hanldeError(null, `comprehension${index}`)}
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
            <div className="mb-4 border rounded-lg">
              <div className=" px-2 py-4">
                {inputs?.educations?.map((edu: Education, index) => (
                  <div key={index} className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Education {index + 1}
                      </h2>
                      {inputs?.languages && inputs?.languages?.length > 1 && (
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
                        label="Établissement ou université*"
                        placeholder="Nom de l'institution"
                        type="text"
                        value={edu.institution}
                        errors={errors[`institution${index}`]}
                        onFocus={() => hanldeError(null, `institution${index}`)}
                        onChange={(e: any) =>
                          handleOnChangeIndex(
                            e.target.value,
                            index,
                            "institution"
                          )
                        }
                      />
                      <Input
                        name="title_edu"
                        label="title*"
                        placeholder=""
                        type="text"
                        value={edu.title_edu}
                        errors={errors[`title_edu${index}`]}
                        onFocus={() => hanldeError(null, `title_edu${index}`)}
                        onChange={(e: any) =>
                          handleOnChangeIndex(
                            e.target.value,
                            index,
                            "title_edu"
                          )
                        }
                      />
                      <Input
                        name="endDate_edu"
                        label="Année términale*"
                        placeholder=""
                        type="date"
                        value={edu.endDate_edu}
                        errors={errors[`endDate_edu${index}`]}
                        onFocus={() => hanldeError(null, `endDate_edu${index}`)}
                        onChange={(e: any) =>
                          handleOnChangeIndex(
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
            <div className=" border rounded-lg ">
              <div className=" px-2 py-4">
                {inputs?.experiences?.map((edu: Experience, index) => (
                  <div key={index} className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Expérience {index + 1}
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
                        label="Nom de l'entreprise"
                        type="text"
                        value={edu.company_name_exp}
                        errors={errors[`company_name_exp${index}`]}
                        onFocus={() =>
                          hanldeError(null, `company_name_exp${index}`)
                        }
                        onChange={(e: any) =>
                          handleOnChangeIndex(
                            e.target.value,
                            index,
                            "company_name_exp"
                          )
                        }
                      />
                      <Input
                        required
                        name="select"
                        label="Titre du poste"
                        type="text"
                        value={edu.job_title_ex}
                        errors={errors[`job_title_ex${index}`]}
                        onFocus={() =>
                          hanldeError(null, `job_title_ex${index}`)
                        }
                        onChange={(e: any) =>
                          handleOnChangeIndex(
                            e.target.value,
                            index,
                            "job_title_ex"
                          )
                        }
                      />
                      <Input
                        required
                        name="select"
                        label="De*"
                        type="date"
                        value={edu.start_date_exp}
                        errors={errors[`start_date_exp${index}`]}
                        onFocus={() =>
                          hanldeError(null, `start_date_exp${index}`)
                        }
                        onChange={(e: any) =>
                          handleOnChangeIndex(
                            e.target.value,
                            index,
                            "start_date_exp"
                          )
                        }
                      />
                      <Input
                        required
                        name="select"
                        label="À*"
                        type="date"
                        value={edu.end_date_exp}
                        errors={errors[`end_date_exp${index}`]}
                        onFocus={() =>
                          hanldeError(null, `end_date_exp${index}`)
                        }
                        onChange={(e: any) =>
                          handleOnChangeIndex(
                            e.target.value,
                            index,
                            "end_date_exp"
                          )
                        }
                      />
                      <TextArea
                        label="Description de l'expérience"
                        name=""
                        value={edu.description_exp}
                        errors={errors[`description_exp${index}`]}
                        onFocus={() =>
                          hanldeError(null, `description_exp${index}`)
                        }
                        onChange={(e: any) =>
                          handleOnChangeIndex(
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
                  onClick={addExperience}
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
            <div className="mb-4 border rounded-lg">
              <div className=" px-2 py-4">
                {inputs?.skills?.map((edu: Skills, index) => (
                  <div key={index} className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Competence {index + 1}
                      </h2>
                      {inputs?.skills && inputs?.skills?.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCompetence(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <Input
                        name="skill_name"
                        label="Entrez la compétence à ajouter ici"
                        placeholder=""
                        type="text"
                        value={edu.skill_name}
                        errors={errors[`skill_name${index}`]}
                        onFocus={() => hanldeError(null, `skill_name${index}`)}
                        onChange={(e: any) =>
                          handleOnChangeIndex(
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
                  onClick={addCompentence}
                  className=" bg-principal w-[60px] text-white py-2 rounded-lg hover:bg-hover transition duration-300"
                >
                  Ajouter
                </button>
              </div>
            </div>
            <div className="mb-4 border rounded-lg">
              <div className=" px-2 py-4">
                <div>
                  <h1 className=" text-xl font-semibold">
                    Attestations/certificats
                  </h1>
                  <p>
                    Parlez-nous de toute certification professionnelle que vous
                    détenez et qui pourrait être pertinente pour votre
                    candidature, y compris toute certification linguistique
                    potentielle.
                  </p>
                </div>
                {inputs?.attestations?.map((edu: Attestations, index) => (
                  <div key={index} className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Attestation/certificat {index + 1}
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <Input
                        name="title"
                        label="Entrez le nom de l'attestion à ajouter ici"
                        placeholder=""
                        type="text"
                        value={edu.title_attestation}
                        errors={errors[`title_attestation${index}`]}
                        onFocus={() =>
                          hanldeError(null, `title_attestation${index}`)
                        }
                        onChange={(e: any) =>
                          handleOnChangeIndex(
                            e.target.value,
                            index,
                            "title_attestation"
                          )
                        }
                      />
                      <Input
                        name="certificate"
                        label="Entrez le nom de l'attestion à ajouter ici"
                        placeholder=""
                        type="file"
                        value={edu.file_attestation}
                        errors={errors[`file_attestation${index}`]}
                        onFocus={() =>
                          hanldeError(null, `file_attestation${index}`)
                        }
                        onChange={(e: any) =>
                          handleOnChangeIndex(
                            e.target.value,
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
                          handleOnChangeIndex(
                            e.target.value,
                            index,
                            "date_delivrance_attestation"
                          )
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center py-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        CV & Lettre de motivation
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                      <Input
                        name="cv"
                        label="Sélectionner votre CV"
                        placeholder=""
                        type="file"
                        errors={errors.cv}
                        value={inputs.cv}
                      />
                      <Input
                        name="cover_letter"
                        label="Sélectionner votre lettre de motivation"
                        placeholder=""
                        type="file"
                        errors={errors.cover_letter}
                        value={inputs.cover_letter}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between mt-6">
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
          {currentStep === totalSteps && (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Soumettre
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;
