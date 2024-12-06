import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import { useTranslation } from "react-i18next";
import SettingsServices from "../../services/SettingsServices";
import useAsync from "../../hooks/useAsync";
import Contact from "../../hooks/Contact";
import useValidation from "../../hooks/useValidation";
const LoginPage = () => {
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
    <div className="min-h-screen flex items-center justify-center mt-10 bg-slate-200 dark:bg-slate-900  text-white">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full dark:bg-slate-800 dark:border border-gray-700 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 dark:bg-slate-800 ">
          {/* Section Gauche */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Une seule plateforme digitale et bien plus qu'un CRM !
            </h2>
            <p className="text-gray-700 mb-6">
              La suite Sellsy associe tous les outils digitaux et tous les
              conseils nécessaires pour vous aider à faire de la croissance.
            </p>
            {/* Diagrammes */}
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 shadow">
                <h3 className="text-gray-500 text-sm">Ventes</h3>
                <div className="h-20 bg-blue-200 rounded"></div>
              </div>
              <div className="flex gap-4">
                <div className="bg-gray-100 rounded-lg p-4 shadow flex-1">
                  <h3 className="text-gray-500 text-sm">Recettes</h3>
                  <div className="h-12 bg-green-200 rounded"></div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 shadow flex-1">
                  <h3 className="text-gray-500 text-sm">Graphique</h3>
                  <div className="h-12 bg-purple-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Droite */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Connectez-vous à votre compte
            </h2>
            <p className="text-gray-700 mb-6">
              Configurez la double authentification sur laquelle vous allez
              recevoir un code de vérification lors de nouvelle connexion.
            </p>
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
  );
};

export default LoginPage;
