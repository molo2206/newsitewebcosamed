import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context";
import LoginPage from "./Auth/LoginPage";
import { useEffect, useState } from "react";
import CandidateServices from "../services/CandidateServices";
import useAsync from "../hooks/useAsync";
import { date_format, limittext } from "../utils/heleprs";
import AllPageLoad from "../components/blogs/AllPageLoad";
import {
  ApplyForm,
  Attestations,
  Education,
  Experience,
  Languages,
  Skills,
} from "../types";
import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";
import InputPdf from "../components/form/InputPdf";
import InputFile from "../components/form/InputFile";
import Button from "../components/form/Button";
import { useTranslation } from "react-i18next";
import OffresServices from "../services/OffresServices";
import CountryServices from "../services/CountryServices";
import JobApplication from "../services/JobApplication";
import Application from "../hooks/Application";
import useValidation from "../hooks/useValidation";
import InputDisable from "../components/form/InputDisable";
import { FaDeleteLeft } from "react-icons/fa6";

const OurCandidate = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user, pageLang } = useAuthContext();
  const { data: offre } = useAsync(() => OffresServices.oneOffre(id), id);
  const { data: country } = useAsync(() => CountryServices.getCountry());
  const { data: apply } = useAsync(
    () => JobApplication.Apply_User(user?.id),
    user?.id
  );


  const { update_apply_offre, loading } = Application();
  //==============================Mes données personnelles=========
  const { inputs, errors, handleOnChange, hanldeError, setInputs } =
    useValidation<ApplyForm>({
      id_apply: "",
      offer_id: "",
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
            hanldeError(
              t("Veuillez entrer le titre du diplôme"),
              `title_edu${index}`
            );
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
              t("Veuillez entrer l'année de l'obtention du diplôme!"),
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
        if (inputs?.skills?.length === 0) {
          hanldeError(
            t("Veuillez entrer une de vos compétenses!"),
            "skill_name"
          );
          isValid = false;
        }
        inputs.skills?.map((item: Skills, index: number) => {
          if (!item.skill_name) {
            hanldeError(
              t("Veuillez entrer une de vos compétenses!"),
              `skill_name${index}`
            );
            isValid = false;
          }
        });

        if (inputs?.attestations?.length === 0) {
          hanldeError(
            t("Veuillez entrer une de vos compétenses!"),
            "title_attestation"
          );
          isValid = false;
        }
        inputs.attestations?.map((item: Attestations, index: number) => {
          if (!item.title_attestation) {
            hanldeError(
              t("Veuillez entrer le titre du certificat!"),
              `title_attestation${index}`
            );
            isValid = false;
          }
          // if (!item.file_attestation) {
          //   hanldeError(
          //     t("Veuillez selectionner un certificat!"),
          //     `file_attestation${index}`
          //   );
          //   isValid = false;
          // }
          if (!item.date_delivrance_attestation) {
            hanldeError(
              t("Veuillez entrer la date de délivrance du certificat!"),
              `date_delivrance_attestation${index}`
            );
            isValid = false;
          }
        });

        if (inputs.cover_letter) {
          const MAX_FILE_SIZE = 5120; // 5MB
          const fileSizeKiloBytes = inputs?.cover_letter?.size / 1024;
          if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            hanldeError(
              "La lettre de motivation est trop volumineuse (max 5 Mo)",
              "cover_letter"
            );
            isValid = false;
          }
        }
        if (inputs.cv) {
          const MAX_FILE_SIZE = 5120; // 5MB
          const fileSizeKiloBytes = inputs?.cv?.size / 1024;
          if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            hanldeError("Le CV est trop gros (max 5 Mo)", "cv");
            isValid = false;
          }
        }
        if (inputs.carte) {
          const MAX_FILE_SIZE = 5120; // 5MB
          const fileSizeKiloBytes = inputs?.carte?.size / 1024;
          if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            hanldeError(
              "Le fichier de la carte d'identité est trop volumineuse (max 5 Mo) ",
              "carte"
            );
            isValid = false;
          }
        }
        if (inputs.dossier) {
          const MAX_FILE_SIZE = 5120; // 5MB
          const fileSizeKiloBytes = inputs?.dossier?.size / 1024;
          if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            hanldeError("Le dossier est trop gros (max 5 Mo)", "dossier");
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
                t(
                  "Veuillez entrer la date que vous avez commencé à travailler"
                ),
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
      id_apply: apply?.id || "",
      id: user?.id,
      full_name: user?.full_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      country: user?.country || "",
      town: user?.town || "",
      languages: apply?.user?.languages?.map((item: any) => ({
        language: item?.langue,
        comprehension: item.comprehension,
        writing: item.writing,
        reading: item.reading,
        speaking: item.speaking,
      })),
      educations: apply?.user?.etude?.map((item: any) => ({
        title_edu: item.title,
        institution: item.institution,
        endDate_edu: item.endDate,
      })),
      experiences: apply?.user?.experiences?.map((item: any) => ({
        job_title_ex: item?.job_title,
        company_name_exp: item?.company_name,
        start_date_exp: item?.start_date,
        end_date_exp: item?.end_date,
        description_exp: item?.description,
      })),
      skills: apply?.user?.skills?.map((item: any) => ({
        skill_name: item?.skill_name,
      })),
      attestations: apply?.user?.certificates?.map((item: any) => ({
        title_attestation: item?.title,
        file_attestation: item?.file,
        date_delivrance_attestation: item?.date_delivrance,
      })),
    });
  }, [user, apply, pageLang]);

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
    console.log(inputs);
    if (validateStep()) {
      update_apply_offre(inputs, user?.id);
    }
  };

  const navigate = useNavigate();
  const [selected, setSelected] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpens, setIsOpens] = useState(false);

  const togglePanel = (row: any) => {
    setSelected(row);
    setIsOpen(!isOpen);
  };
  const closePanel = () => {
    setSelected(null);
    setIsOpen(false);
  };

  const tagglePanelUpdates = (row: any) => {
    setSelected(row);
    setIsOpens(!isOpens);
  };
  const closePanelUpdates = () => {
    setSelected(null);
    setIsOpens(false);
  };

  
  const { data, loading: load } = useAsync(
    () => CandidateServices.getCandidate(user?.id),
    [user?.id]
  );

  const { data: candidate_reject } = useAsync(
    () => JobApplication.getCandidateRejected(user?.id),
    user?.id
  );

  const Accountsettings = () => {
    navigate("/recruiting/cosamed/job_openings/accountsettings"); // Remplace "/about" par la route cible
  };

  const [currentTab, setCurrentTab] = useState(1);

  const onChangeTab = (tab: any) => {
    setCurrentTab(tab.id);
  };

  const tabs = [
    { id: 1, title: "Actives" },
    { id: 2, title: "Inactives" },
  ];

  return (
    <div>
      {!user ? (
        <LoginPage />
      ) : (
        <div className="min-h-screen bg-gray-100 p-6 dark:bg-slate-900">
          {/* Titre et Description */}
          <h1 className="text-2xl font-light mb-2">Mes candidatures</h1>
          <p className=" mb-6">
            Nous sommes en train d’examiner avec toute l’attention toutes les
            candidatures à ce poste vacant. Dans la mesure où vos compétences
            correspondent à nos exigences, nous prendrons contact avec vous.
            Vous pouvez vérifier le dernier statut de votre candidature via
            l'onglet « Ma candidature » ​​sur le portail des carrières. Merci de
            votre intérêt à rejoindre notre équipe !
          </p>
          {/* Tabs */}
          {load ? (
            Array.from(Array(20).keys()).map(() => <AllPageLoad />)
          ) : (
            <div className="flex border-b mb-4">
              {tabs.map((tab) => (
                <button
                  onClick={() => onChangeTab(tab)}
                  key={tab.id}
                  className={`font-bold py-2 px-4 border-b-2 border-principal
                    ${
                      currentTab === tab.id
                        ? "bg-principal text-white "
                        : "bg-white text-principal"
                    }  hover:bg-hover hover:text-white font-extrabold text-center`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          )}

          {/* Tableau */}
          <div className="overflow-x-auto">
            {currentTab === 1 && (
              <table className="min-w-full text-sm table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 dark:bg-slate-800">
                    <th className="border border-gray-200 p-3 text-left">
                      Désignation de l'emploi
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Type d'emploi
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Statut de ma candidature
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Date de soumission
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.application_pending?.map((item: any) => (
                    <tr className="bg-gray-50 dark:bg-slate-900 text-sm">
                      <td className="border border-gray-200 p-3">
                        {limittext(item?.offres?.title, 38)}
                      </td>
                      <td className="border border-gray-200 p-3">
                        {item?.offres?.type}
                      </td>
                      <td className="border border-gray-200 p-3 text-green-600 font-bold">
                        <button className="p-2 bg-green-100 rounded-md shadow-xl ">
                          Your Application Is {item?.status}
                        </button>
                      </td>
                      <td className="border border-gray-200 p-3">
                        {date_format(item?.updated_at)}
                      </td>
                      <td className="border border-gray-200 p-3 text-center">
                        <div className=" flex justify-between space-x-2">
                          <button
                            onClick={() => togglePanel(item)}
                            className="bg-principal text-white px-4 py-2 rounded hover:bg-hover transition"
                          >
                            {isOpen
                              ? "Fermer le panneau"
                              : limittext("Afficher la candidature", 8)}
                          </button>
                          <button
                            onClick={() => tagglePanelUpdates(item)}
                            className="bg-principal text-white px-4 py-2 rounded hover:bg-hover transition"
                          >
                            {isOpens
                              ? "Fermer le panneau"
                              : limittext("Modifier", 10)}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="overflow-x-auto">
            {currentTab === 2 && (
              <table className="min-w-full text-sm table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 dark:bg-slate-800">
                    <th className="border border-gray-200 p-3 text-left">
                      Désignation de l'emploi
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Type d'emploi
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Statut de ma candidature
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Date de soumission
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {candidate_reject?.application_rejected?.map((item: any) => (
                    <tr className="bg-gray-50 dark:bg-slate-900">
                      <td className="border border-gray-200 p-3">
                        {item?.offres?.title}
                      </td>
                      <td className="border border-gray-200 p-3">
                        {item?.offres?.type}
                      </td>
                      <td className="border border-gray-200 p-3 text-red-400 font-bold">
                        <button className=" p-2 bg-red-100 shadow-xl">
                          Your Application Is {item?.status}
                        </button>
                      </td>
                      <td className="border border-gray-200 p-3">
                        {date_format(item?.updated_at)}
                      </td>
                      <td className="border border-gray-200 p-3 text-center">
                        <button
                          onClick={togglePanel}
                          className="bg-principal text-white px-4 py-2 rounded hover:bg-hover transition"
                        >
                          {isOpen
                            ? "Fermer le panneau"
                            : limittext("Afficher la candidature", 8)}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <br />

          <div className=" mt-10  mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-slate-800">
            <h1 className="text-2xl font-semibold  mb-4 ">Mon compte</h1>
            {/* Description */}
            <p className=" mb-6">
              Pour mettre à jour vos données personnelles, cliquez sur{" "}
              <strong>Mettre à jour les coordonnées</strong>. Pour modifier
              l'adresse e-mail de votre compte, cliquez sur{" "}
              <strong>Modifier les paramètres du compte</strong>.
            </p>
            {/* Boutons */}
            <div className="flex gap-4">
              <button
                onClick={Accountsettings}
                className="bg-principal text-white dark:text-text-900 border  dark:bg-slate-800  px-4 py-2 rounded-lg hover:bg-hover"
              >
                Mettre à jour les coordonnées
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-gray-100 flex items-center justify-center">
        {/* Panneau coulissant */}
        <div
          className={`fixed  top-0 mt-auto right-0 h-full md:w-[700px] text-sm w-full bg-white shadow-lg border-l border-gray-300 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 h-full overflow-y-scroll">
            <button
              onClick={closePanel}
              className="self-end text-gray-500 hover:text-gray-700 mb-4"
            >
              ✖
            </button>
            <div className="border-b pb-4 mb-4">
              <h1 className="text-2xl font-semibold text-gray-700">
                {selected?.offres?.title}
              </h1>
              <p className="p-2 font-medium mt-2">
                Statut de la candidature :{" "}
                <button className="font-semibold p-2 bg-green-200 shadow-xl text-green-600 bg-green-100 rounded-md">
                  Your Application Is Currently {selected?.status}
                </button>
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Mes données personnelles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-800">Nom légal :</p>
                  <p className="text-gray-600">Mr/Mm. {user?.full_name}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Téléphone :</p>
                  <p className="text-gray-600">{user?.phone}(Private Mobile)</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Adresse :</p>
                  <p className="text-gray-600">
                    -
                    <br />
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Comment nous avez-vous connus ?
                  </p>
                  <p className="text-gray-600">Cosamed Career site</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="font-medium text-gray-800">E-mail :</p>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
            </div>
            <div className="mb-6 border-t pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Mes études
              </h2>
              {data?.etude?.map((item: any, index: number) => (
                <div className="mb-6 border-t-1">
                  <h3 className="text-sm font-bold text-gray-700">
                    Étude {index + 1}
                  </h3>
                  <div className="mt-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">
                        Établissement ou université:
                      </span>{" "}
                      {item.institution}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Diplôme:</span>{" "}
                      {item.title}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Domaine d'études:</span> -
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">De:</span>{" "}
                      {date_format(item.endDate)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">
                        À (année réelle ou prévue):
                      </span>{" "}
                      {date_format(item.endDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-6 border-t pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Expérience professionnelle
              </h2>
              {data?.experiences?.map((item: any, index: number) => (
                <div className="">
                  {/* Expérience professionnelle 1 */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-700">
                      Expérience professionnelle {index + 1}
                    </h3>
                    <div className="mt-2">
                      <p className="text-gray-600">
                        <span className="font-semibold">
                          Désignation de l'emploi:
                        </span>{" "}
                        {item?.job_title}/{item?.company_name}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Unité légale:</span> No
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Emploi actuel:</span> No
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">De:</span>{" "}
                        {item?.start_date}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">À:</span>{" "}
                        {item?.end_date}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">
                          Description du rôle:
                        </span>{" "}
                        {item?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-6 border-t pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Langues
              </h2>
              {data?.languages?.map((item: any, index: number) => (
                <div>
                  <h2 className="text-sm font-semibold text-gray-800 mb-4">
                    Langue {index + 1} / {item?.langue}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 ">
                    <div className="py-2">
                      <p className="text-gray-600">
                        <span className="font-semibold">1. Speaking:</span>{" "}
                        {item?.speaking}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">2. Reading:</span>{" "}
                        {item?.reading}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        <span className="font-semibold">3. Writing:</span>{" "}
                        {item?.writing}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">4. Comprehension:</span>{" "}
                        {item?.comprehension}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Aptitudes</h2>
              <ul className="list-disc list-inside space-y-2">
                {data?.skills?.map((item: any) => (
                  <li>{item?.skill_name}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">CV</h2>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    <a
                      className=" cursor-pointer"
                      target="__black"
                      href={selected?.cv}
                    >
                      📂 cv_pacifique {selected?.full_name}.pdf
                    </a>
                  </span>
                </div>
                <div className="text-sm text-gray-500">1,05 MB</div>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Cover Letter</h2>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    <a
                      className=" cursor-pointer"
                      target="__black"
                      href={selected?.cover_letter}
                    >
                      📂 cover_letter_pacifique {selected?.full_name}.pdf
                    </a>
                  </span>
                </div>
                <div className="text-sm text-gray-500">1,05 MB</div>
              </div>
            </div>
            <div className="mb-6 border-t pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Certificats/Attestation
              </h2>
              {data?.certificates?.map((item: any, index: number) => (
                <div>
                  <h2 className="text-sm font-semibold text-gray-800 mb-4">
                    Attestation {index + 1} / {item?.title}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        📂 {item?.title}.pdf
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">1,05 MB</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {" "}
                Dossier au complet
              </h2>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    <a
                      className=" cursor-pointer"
                      target="__black"
                      href={selected?.dossier}
                    >
                      📂 dossier_au_complet {selected?.full_name}.pdf
                    </a>
                  </span>
                </div>
                <div className="text-sm text-gray-500">1,05 MB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 flex items-center justify-center">
        {/* Panneau coulissant */}
        <div
          className={`fixed  top-0 mt-auto right-0 h-full md:w-[700px] text-sm w-full bg-white shadow-lg border-l border-gray-300 transform transition-transform duration-300 ${
            isOpens ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 h-full overflow-y-scroll">
            <button
              onClick={closePanelUpdates}
              className="self-end text-gray-500 hover:text-gray-700 mb-4"
            >
              ✖
            </button>
            <div className="border-b pb-4 mb-4">
              <h1 className="text-2xl font-semibold text-gray-700">
                {selected?.offres?.title}
              </h1>
              <p className="p-2 font-medium mt-2">
                Statut de la candidature :{" "}
                <button className="font-semibold p-2 bg-green-200 shadow-xl text-green-600 bg-green-100 rounded-md">
                  Your Application Is Currently {selected?.status}
                </button>
              </p>
            </div>

            <div>
              <div className="flex justify-center items-center mb-4">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                  {offre?.title}
                </h1>
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-full dark:bg-slate-800 dark:text-white bg-white rounded-lg  "
              >
                {currentStep === 1 && (
                  <div className="mb-4 rounded-lg dark:border border-slate-700 dark:bg-slate-900 dark:text-white">
                    <div className=" px-2">
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
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <InputDisable
                          required
                          name="id_apply"
                          label=""
                          placeholder=""
                          type="text"
                          errors={errors.id_apply}
                          value={selected?.id}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "id_apply")
                          }
                          onFocus={() => hanldeError(null, `id_apply`)}
                        />
                        <InputDisable
                          required
                          name="offer_id"
                          label=""
                          placeholder=""
                          type="text"
                          errors={errors.offer_id}
                          value={selected?.offer_id}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "offer_id")
                          }
                          onFocus={() => hanldeError(null, `offer_id`)}
                        />
                      </div>
                    </div>
                    <div className=" px-2 py-4">
                      <h1 className=" text-xl font-semibold">Langues</h1>
                      <p className="font-light lg:text-sm">
                        Langues Énumérez chacune des langues que vous parlez,
                        lisez ou écrivez ainsi que leurs niveaux de compétence.
                        Veuillez préciser toutes vos qualifications
                        linguistiques, en particulier les langues de l'ONU
                        (anglais, espagnol, français, arabe, russe, portugais,
                        chinois). Si vous possédez une certification
                        linguistique, veuillez la joindre dans la section
                        Certification.
                      </p>
                    </div>
                    <div className=" px-2 py-4">
                      {inputs?.languages?.map((edu: Languages, index) => (
                        <div key={index} className="border-b pb-4 mb-4">
                          <div className="flex justify-between items-center">
                            <h2 className="text-sm font-semibold font-semibold text-gray-800">
                              Langues {index + 1}
                            </h2>
                            {inputs?.languages &&
                              inputs?.languages?.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeLanguageExperience(index)
                                  }
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <FaDeleteLeft size={20} />{" "}
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
                              handleOnChangeIndex(
                                e.target.value,
                                index,
                                "language"
                              )
                            }
                            onFocus={() =>
                              hanldeError(null, `language${index}`)
                            }
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
                                handleOnChangeIndex(
                                  e.target.value,
                                  index,
                                  "writing"
                                )
                              }
                              onFocus={() =>
                                hanldeError(null, `writing${index}`)
                              }
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
                                handleOnChangeIndex(
                                  e.target.value,
                                  index,
                                  "reading"
                                )
                              }
                              onFocus={() =>
                                hanldeError(null, `reading${index}`)
                              }
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
                                handleOnChangeIndex(
                                  e.target.value,
                                  index,
                                  "speaking"
                                )
                              }
                              onFocus={() =>
                                hanldeError(null, `speaking${index}`)
                              }
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
                        Le parcours scolaire est l'ensemble des étapes
                        d'apprentissage et de formation qu'une personne suit
                        tout au long de sa vie académique. Il commence
                        généralement par l'école primaire, où les bases de
                        l'éducation sont posées, suivie par l'enseignement
                        secondaire, qui permet de développer des compétences
                        plus spécifiques et d'approfondir les connaissances
                        générales. Ensuite, certains choisissent de poursuivre
                        dans l'enseignement supérieur pour acquérir une
                        expertise dans un domaine particulier, en passant par
                        des études universitaires, des formations
                        professionnelles, ou des écoles spécialisées.
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
                                    <FaDeleteLeft size={20} />
                                  </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                              <Input
                                required
                                name="institution_edu"
                                label="Établissement"
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
                                required
                                name="title_edu"
                                label="Titre du diplôme ou de la certification"
                                placeholder=""
                                type="text"
                                value={edu.title_edu}
                                errors={errors[`title_edu${index}`]}
                                onFocus={() =>
                                  hanldeError(null, `title_edu${index}`)
                                }
                                onChange={(e: any) =>
                                  handleOnChangeIndexEtude(
                                    e.target.value,
                                    index,
                                    "title_edu"
                                  )
                                }
                              />
                              <Input
                                required
                                name="endDate_edu"
                                label="Année"
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
                        Les expériences professionnelles font référence à
                        l’ensemble des postes, missions ou projets que vous avez
                        occupés ou réalisés dans le cadre de votre vie active.
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
                                    <FaDeleteLeft size={20} />
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
                        Les compétences (habiletés et capacités) représentent
                        les aptitudes techniques, relationnelles et personnelles
                        qui permettent à un individu d'accomplir efficacement
                        des tâches dans un contexte professionnel.
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
                                  <FaDeleteLeft size={20} />
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                              <Input
                                required
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
                      <h1 className=" text-xl font-semibold">
                        Brevet/certificat
                      </h1>
                      <p className="font-light text-sm lg:text-sm">
                        Parlez-nous de toute Certificat,brevet professionnelle
                        que vous détenez et qui pourrait être pertinente pour
                        votre candidature, y compris toute certification
                        linguistique potentielle.
                      </p>
                    </div>
                    <div className="mb-4 border rounded-lg">
                      <div className=" px-2 py-2">
                        {inputs?.attestations?.map(
                          (edu: Attestations, index) => (
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
                                      <FaDeleteLeft size={20} />
                                    </button>
                                  )}
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                                <Input
                                  required
                                  name="title"
                                  label="Précisez le titre de ce document(Ex:Conduite,Pharmacie,etc.)"
                                  placeholder=""
                                  type="text"
                                  value={edu.title_attestation}
                                  errors={errors[`title_attestation${index}`]}
                                  onFocus={() =>
                                    hanldeError(
                                      null,
                                      `title_attestation${index}`
                                    )
                                  }
                                  onChange={(e: any) =>
                                    handleOnChangeIndexAttestation(
                                      e.target.value,
                                      index,
                                      "title_attestation"
                                    )
                                  }
                                />
                                <InputPdf
                                  required
                                  name="certificate"
                                  label="Sélectionnez la copie de ce document en pdf"
                                  placeholder=""
                                  type="file"
                                  // value={edu.file_attestation}
                                  errors={errors[`file_attestation${index}`]}
                                  onFocus={() =>
                                    hanldeError(
                                      null,
                                      `file_attestation${index}`
                                    )
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
                                  required
                                  name="date_delivrance"
                                  label="Date de délivrance"
                                  placeholder=""
                                  type="date"
                                  value={edu.date_delivrance_attestation}
                                  errors={
                                    errors[
                                      `date_delivrance_attestation${index}`
                                    ]
                                  }
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
                          )
                        )}
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
                        Cosamed cherche ainsi à maximiser les chances de trouver
                        un candidat bien aligné.
                      </p>
                    </div>
                    <div className=" ">
                      <div className="mb-4 border rounded-lg p-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                          <InputPdf
                            required
                            name="cv"
                            label="Sélectionner votre CV"
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
                            label="Sélectionner votre lettre de motivation"
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
                            label="Sélectionner la copie de votre carte d'identité"
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
                    <div className="">
                      <h1 className=" text-xl font-semibold">
                        {" "}
                        Dossier au complet
                      </h1>
                      <p className="font-light text-sm lg:text-sm">
                        Afin de nous simplifier l'évaluation et la prise de
                        décision.
                      </p>
                      <p className="py-2 line-coverage">
                        Note : Tous les documents demandés doivent être
                        regroupés dans un seul fichier PDF (dossier complet).
                      </p>
                    </div>
                    <div className=" py-2 ">
                      <div className="mb-4 border rounded-lg p-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                          <InputPdf
                            required
                            name="dossier"
                            label="Sélectionner  votre dossier complet"
                            placeholder=""
                            type="file"
                            errors={errors.dossier}
                            onFocus={() => hanldeError(null, `dossier`)}
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
                    <Button loading={loading} label={t("Update")} />
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
        </div>
      </div>
    </div>
  );
};

export default OurCandidate;
