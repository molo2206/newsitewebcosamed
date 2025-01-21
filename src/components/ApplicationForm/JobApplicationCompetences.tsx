import { useState } from "react";
import Input from "../form/Input";
import useValidation from "../../hooks/useValidation";
import JobApplicationAttestation from "./JobApplicationAttestation";
const JobApplicationCompetences = () => {
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
  const { inputs, errors, handleOnChange, hanldeError } = useValidation({
    username: "",
    password: "",
  });

  const handleChanges = (id: any, field: any, value: any) => {
    setCompetences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  return (
    <div>
      <div className="mb-4 border rounded-lg">
        <div className=" px-2 py-4">
          {competences.map((edu, index) => (
            <div key={edu.id} className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Competence {index + 1}
                </h2>
                {competences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCompetence(edu.id)}
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
                  errors={errors.skill_name}
                  value={inputs.skill_name}
                  onChange={(e: any) =>
                    handleChangeCompetences(edu.id, "skill_name", e.target.value)
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
      <JobApplicationAttestation />
    </div>
  );
};

export default JobApplicationCompetences;
