import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../context";
import useValidation from "../../hooks/useValidation";
import CountryServices from "../../services/CountryServices";
import useAsync from "../../hooks/useAsync";
import Input from "../form/Input";
import { useEffect, useState } from "react";

const JobApplicationPersonnal = () => {
  const { t } = useTranslation();
  const { user, pageLang } = useAuthContext();
  const { inputs, errors, handleOnChange, hanldeError, setInputs } =
    useValidation({
      language: "",
      comprehension: "",
      writing: "",
      reading: "",
      speaking: "",
      full_name: "",
      email: "",
      phone: "",
      gender: "",
      image: "",
    });

  const validation = (e: any) => {
    e.preventDefault();

    let valide = true;
    if (!inputs.password) {
      hanldeError(t("Password"), "password");
      valide = false;
    }
    if (!inputs.email) {
      hanldeError(t("Enter_email"), "email");
      valide = false;
    }
  };
  const { data: country } = useAsync(() => CountryServices.getCountry());
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
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const addLanguageExperience = () => {
    setLanguageExperience((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeLanguageExperience = (id: any) => {
    setLanguageExperience((prev) => prev.filter((exp) => exp.id !== id));
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
      id: user?.id,
      full_name: user?.full_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      country: user?.country || "",
      town: user?.town || "",
      // image: profil?.image || "",
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
  return (
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
            onChange={(e: any) => handleOnChange(e.target.value, "full_name")}
          />
          <Input
            required
            name="select"
            label={t("Select_Sexe")}
            type="select"
            value={inputs.gender}
            errors={errors.gender}
            onChange={(e: any) => handleOnChange(e.target.value, "gender")}
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
            onChange={(e: any) => handleOnChange(e.target.value, "country")}
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
          Langues Énumérez chacune des langues que vous parlez, lisez ou écrivez
          ainsi que leurs niveaux de compétence. Veuillez préciser toutes vos
          qualifications linguistiques, en particulier les langues de l'ONU
          (anglais, espagnol, français, arabe, russe, portugais, chinois). Si
          vous possédez une certification linguistique, veuillez la joindre dans
          la section Certification.
        </p>
      </div>
      <div className=" px-2 py-4">
        {language_experience.map((edu, index) => (
          <div key={edu.id} className="border-b pb-4 mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Langues {index + 1}
              </h2>
              {language_experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLanguageExperience(edu.id)}
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
              value={inputs.language}
              errors={errors.language}
              onChange={(e: any) => handleOnChange(e.target.value, "language")}
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
                value={inputs.writing}
                errors={errors.writing}
                onChange={(e: any) => handleOnChange(e.target.value, "writing")}
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
                value={inputs.reading}
                errors={errors.reading}
                onChange={(e: any) => handleOnChange(e.target.value, "reading")}
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
                value={inputs.speaking}
                errors={errors.speaking}
                onChange={(e: any) =>
                  handleOnChange(e.target.value, "speaking")
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
                value={inputs.comprehension}
                errors={errors.comprehension}
                onChange={(e: any) =>
                  handleOnChange(e.target.value, "comprehension")
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
  );
};

export default JobApplicationPersonnal;
