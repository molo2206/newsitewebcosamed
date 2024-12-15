import { useTranslation } from "react-i18next";
import useValidation from "../../hooks/useValidation";
import Input from "../../components/form/Input";
import RegisterUser from "../../hooks/RegisterUser";
import Button from "../../components/form/Button";

const RegisterPage = () => {
  const { t } = useTranslation();
  const { registeruser, loading: loadingForm } = RegisterUser();

  const { inputs, errors, handleOnChange, hanldeError } = useValidation({
    full_name: "",
    password: "",
    email: "",
    phone: "",
    password_confirmation: "",
  });
  const validation = (e: any) => {
    e.preventDefault();

    let valide = true;
    if (!inputs.password) {
      hanldeError(t("Password"), "password");
      valide = false;
    }
    if (!inputs.password_confirmation) {
      hanldeError(t("Confirm_password"), "password_confirmation");
      valide = false;
    }

    if (!inputs.full_name) {
      hanldeError(t("Full_name"), "full_name");
      valide = false;
    }
    if (!inputs.email) {
      hanldeError(t("Email"), "email");
      valide = false;
    }
    if (!inputs.phone) {
      hanldeError(t("Phone"), "phone");
      valide = false;
    }

    if (valide) {
      registeruser(inputs);
    }
  };
  return (
    <div className=" container py-4">
      <div
        className="min-h-screen flex md:flex-row w-full dark:bg-slate-800 
       bg-gray-50 dark:border dark:border-slate-700"
      >
        {/* Left Section */}
        <div className="md:w-1/2 p-10  dark:bg-slate-800 shadow-lg items-center justify-center text-center bg-white">
          <h1 className="lg:text-xl md:text-sm dark:text-white font-light mb-6">
            Compte confidentiel
          </h1>
          <p className="lg:text-sm md:text-sm dark:text-white font-light mb-6">
            Ce compte vous permettra de gérer vos candidatures, de suivre les
            statuts, de fournir des documents complémentaires et de gérer les
            offres potentielles que vous recevez.
          </p>
          <h1 className="lg:text-sm md:text-sm">
            Critères de mot de passe :
            <span className=" text-principallg:text-sm md:text-sm">
              Nombre, Lettre, Caractère spécial caractères Majuscule et
              Muniscule
            </span>
          </h1>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center items-center bg-gray-100 dark:bg-slate-900">
          <h2 className="lg:text-xl md:text-xl font-light mb-4  text-center">
            Créez votre compte gratuitement
          </h2>
          <form className="space-y-4" onSubmit={validation}>
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
              label={t("Email")}
              placeholder=""
              type="email"
              errors={errors.email}
              value={inputs.email}
              onChange={(e: any) => handleOnChange(e.target.value, "email")}
            />
            <Input
              required
              name="password"
              label={t("Password")}
              placeholder="Mot de passe"
              type="password"
              errors={errors.password}
              value={inputs.password}
              onChange={(e: any) => handleOnChange(e.target.value, "password")}
            />
            <Input
              required
              name="password_confirmation"
              label={t("Confirm_password")}
              type="password"
              errors={errors.password_confirmation}
              value={inputs.password_confirmation}
              onChange={(e: any) =>
                handleOnChange(e.target.value, "password_confirmation")
              }
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="marketing"
                className="mr-2 focus:ring focus:ring-blue-500"
              />
              <label htmlFor="marketing" className="text-sm text-gray-600">
                Je ne souhaite pas recevoir les communications de COSAMED
              </label>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              En cliquant sur{" "}
              <span className="font-semibold">"Créer mon compte"</span>, vous
              acceptez les{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Conditions Générales d’Utilisation
              </a>{" "}
              et notre{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Politique de confidentialité
              </a>
              .
            </div>
            <Button label={t("Register")} loading={loadingForm} />
            <div className="text-center mt-4 text-sm">
              Vous avez déjà un compte ?{" "}
              <a href="/auth/signin" className="text-blue-500 hover:underline">
                Se connecter
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
