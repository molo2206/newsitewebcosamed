import { useState } from "react";
import useValidation from "../../hooks/useValidation";
import Input from "../form/Input";

const JobApplicationAttestation = () => {
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
  const { inputs, errors, handleOnChange } = useValidation({
    title: "",
    file: "",
    date_delivrance: "",
  });

  return (
    <div>
      <div className="mb-4 border rounded-lg">
        <div className=" px-2 py-4">
          <div>
            <h1 className=" text-xl font-semibold">Attestations/certificats</h1>
            <p>
              Parlez-nous de toute certification professionnelle que vous
              détenez et qui pourrait être pertinente pour votre candidature, y
              compris toute certification linguistique potentielle.
            </p>
          </div>
          {attestation.map((edu, index) => (
            <div key={edu.id} className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Attestation/certificat {index + 1}
                </h2>
                {attestation.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAttestation(edu.id)}
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
                  errors={errors.title}
                  value={inputs.title}
                  onChange={(e: any) => handleOnChange(e.target.value, "title")}
                />
                <Input
                  name="certificate"
                  label="Entrez le nom de l'attestion à ajouter ici"
                  placeholder=""
                  type="file"
                  errors={errors.certificate}
                  value={inputs.certificate}
                />

                <Input
                  name="date_delivrance"
                  label="Date de délivrance"
                  placeholder=""
                  type="date"
                  errors={errors.date_delivrance}
                  value={inputs.date_delivrance}
                  onChange={(e: any) =>
                    handleOnChange(e.target.value, "date_delivrance")
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

      <div></div>
    </div>
  );
};

export default JobApplicationAttestation;
