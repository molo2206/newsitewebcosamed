import { useState } from "react";
import Input from "../form/Input";
import useValidation from "../../hooks/useValidation";
import TextArea from "../form/TextArea";

const JobApplicationEducation = () => {
  const [educations, setEducations] = useState([
    {
      id: 1,
      school_name: "",
      diplome: "",
      domaine: "",
      startDate: "",
      endDate: "",
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
        school_name: "",
        degree: "",
        domaine: "",
        startDate: "",
        endDate: "",
        file: "",
      },
    ]);
  };
  const removeEducation = (id: any) => {
    setEducations((prev) => prev.filter((edu) => edu.id !== id));
  };
  const { inputs, errors, handleOnChange, hanldeError } = useValidation({
    title: "",
    institution: "",
    startDate: "",
    endDate: "",
    job_title: "",
    company_name: "",
    start_date: "",
    end_date: "",
    description: "",
  });
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
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
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (id: any) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <div>
      <div className="mb-4 border rounded-lg">
        <div className=" px-2 py-4">
          {educations.map((edu, index) => (
            <div key={edu.id} className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Education {index + 1}
                </h2>
                {educations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Input
                  name="email"
                  label="Établissement ou université*"
                  placeholder="Nom de l'institution"
                  type="text"
                  errors={errors.institution}
                  value={inputs.institution}
                  onChange={(e: any) =>
                    handleChangeEducations(
                      edu.id,
                      "school_name",
                      e.target.value
                    )
                  }
                />
                <Input
                  name="title"
                  label="title*"
                  placeholder=""
                  type="text"
                  errors={errors.title}
                  value={inputs.title}
                  onChange={(e: any) =>
                    handleChangeEducations(edu.id, "diplome", e.target.value)
                  }
                />
                <Input
                  name="startDate"
                  label="De*"
                  placeholder=""
                  type="date"
                  errors={errors.startDate}
                  value={inputs.startDate}
                  onChange={(e: any) =>
                    handleChangeEducations(edu.id, "startDate", e.target.value)
                  }
                />
                <Input
                  name="endDate"
                  label="À (année réelle ou prévue)*"
                  placeholder=""
                  type="date"
                  errors={errors.endDate}
                  value={inputs.endDate}
                  onChange={(e: any) =>
                    handleChangeEducations(edu.id, "endDate", e.target.value)
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
          {experiences.map((exp, index) => (
            <div key={exp.id} className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Expérience {index + 1}
                </h2>
                {experiences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
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
                  value={inputs.company_name}
                  errors={errors.company_name}
                  onChange={(e: { target: { value: any } }) =>
                    handleChanges(exp.id, "title", e.target.value)
                  }
                />
                <Input
                  required
                  name="select"
                  label="Titre du poste"
                  type="text"
                  value={inputs.job_title}
                  errors={errors.job_title}
                  onChange={(e: { target: { value: any } }) =>
                    handleChanges(exp.id, "title", e.target.value)
                  }
                />
                <Input
                  required
                  name="select"
                  label="De*"
                  type="date"
                  value={inputs.start_date}
                  errors={errors.start_date}
                  onChange={(e: { target: { value: any } }) =>
                    handleChanges(exp.id, "title", e.target.value)
                  }
                />
                <Input
                  required
                  name="select"
                  label="À*"
                  type="date"
                  value={inputs.end_date}
                  errors={errors.end_date}
                  onChange={(e: { target: { value: any } }) =>
                    handleChanges(exp.id, "title", e.target.value)
                  }
                />
                <TextArea
                  label="Description de l'expérience"
                  onChange=""
                  required=""
                  options=""
                  name=""
                  value=""
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
  );
};

export default JobApplicationEducation;
