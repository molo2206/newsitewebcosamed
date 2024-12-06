import React from "react";
import Button from "../../components/form/Button";
import { useTranslation } from "react-i18next";
import Contact from "../../hooks/Contact";
import SettingsServices from "../../services/SettingsServices";
import useAsync from "../../hooks/useAsync";
import useValidation from "../../hooks/useValidation";
import Input from "../../components/form/Input";

const UpdateEmail = () => {
  const { t } = useTranslation();
  const { createContact, loading: loadingForm } = Contact();
  const { data } = useAsync(() => SettingsServices.getSettings());
  const { data: dataadress } = useAsync(() => SettingsServices.getAdresse());
  const { inputs, errors, handleOnChange, hanldeError } = useValidation({
    username: "",
    password: "",
  });
  const validation = (e: any) => {
    e.preventDefault();

    let valide = true;
    if (!inputs.password) {
      hanldeError(t("Password"), "password");
      valide = false;
    }

    if (!inputs.username) {
      hanldeError(t("Username"), "username");
      valide = false;
    }
  };
  return (
    <div className=" container py-4">
      <div className="  bg-white shadow-lg rounded-lg p-8  w-full dark:bg-slate-800 dark:border border-gray-700 text-white">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 dark:bg-slate-800 ">
            {/* Section Gauche */}
            <div>
              <h2 className="text-2xl font-bold text-principal">
                Paramètres du compte !
              </h2>
              <p className="text-gray-700 dark:text-white mb-6">
                voici le regroupement de toutes les options nécessaires pour
                personnaliser ou sécuriser votre compte utilisateur.
              </p>
              {/* Diagrammes */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className=" rounded-lg p-4  flex-1">
                    <button className="bg-principal text-white px-4 py-2 rounded-lg hover:bg-hover">
                      Modifier votre adresse e-mail
                    </button>
                  </div>
                  <div className=" rounded-lg p-4 flex-1">
                    <button className="bg-gray-100 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200">
                      Supprimer mes données personnelles
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-principal mb-4">
                Modifier votre adresse Email
              </h2>

              <form className="mt-8 space-y-6 mb-8" onSubmit={validation}>
                <div className="space-y-px rounded-md items-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <Input
                      name="username"
                      label={t("Username")}
                      placeholder=""
                      type="text"
                      errors={errors.username}
                      value={inputs.username}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "username")
                      }
                    />
                    <Input
                      name="password"
                      label={t("Password")}
                      placeholder=""
                      type="text"
                      errors={errors.password}
                      value={inputs.password}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "password")
                      }
                    />
                  </div>
                </div>
                <Button label={t("SendMessage")} loading={loadingForm} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className=" mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    //   <h2 className="text-xl font-bold mb-4">Modifier l'e-mail</h2>
    //   <form>
    //     <div className="mb-4">
    //       <label className="block text-sm font-medium text-gray-700">
    //         E-mail actuel
    //       </label>
    //       <input
    //         type="email"
    //         value="devmolomolo@gmail.com"
    //         readOnly
    //         className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100"
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block text-sm font-medium text-gray-700">
    //         Nouvel e-mail
    //       </label>
    //       <input
    //         type="email"
    //         placeholder="Entrez votre nouvel e-mail"
    //         className="w-full mt-1 p-2 border border-gray-300 rounded-md"
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
    //     >
    //       Soumettre
    //     </button>
    //   </form>
    // </div>
  );
};

export default UpdateEmail;
