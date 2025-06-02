import { useTranslation } from "react-i18next";
import useValidation from "../../hooks/useValidation";
import Input from "../../components/form/Input";
import RegisterUser from "../../hooks/RegisterUser";
import Button from "../../components/form/Button";
import { ApplyForm } from "../../types";
import InputPassword from "../../components/form/InputPassword";

const RegisterPage = () => {
  const { t } = useTranslation();
  const { registeruser, loading: loadingForm } = RegisterUser();

  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation<ApplyForm>({
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
    <div className=" min-h-screen flex flex-col items-center bg-gray-100 p-6 w-full dark:bg-slate-900   bg-white ">
      <div className="w-full">
        <img
          src="https://apicosamed.cosamed.org/uploads/blogs/505259756244493872b7709a8a01b536.png" // Remplacez par votre URL d'image
          alt="Banner"
          className="w-full object-cover h-80"
        />
      </div>

      {/* Formulaire de connexion */}
      <div className="w-full max-w-sm bg-white shadow-md dark:bg-slate-800  p-4 mt-[-4rem] ">
        <h2 className="lg:text-xl md:text-xl font-light mb-4  text-center">
          Créez votre compte gratuitement
        </h2>
        <form className="w-full max-w-sm space-y-4" onSubmit={validation}> 
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
          <InputPassword
            required
            name="password"
            label={t("Password")}
            placeholder="Mot de passe"
            type="password"
            errors={errors.password}
            value={inputs.password}
            onChange={(e: any) => handleOnChange(e.target.value, "password")}
          />
          <InputPassword
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
              className="mr-2 focus:ring focus:ring-gray-100"
            />
            <label htmlFor="marketing" className="text-sm text-gray-600">
              Je ne souhaite pas recevoir les communications de COSAMED
            </label>
          </div>
          <div className="text-sm text-gray-500 mb-4">
            En cliquant sur{" "}
            <span className="font-semibold">"Créer mon compte"</span>, vous
            acceptez les{" "}
            <a href="/confidentiality" className="text-principal hover:underline">
              Conditions Générales d’Utilisation
            </a>{" "}
            et notre{" "}
            <a href="/confidentiality" className="text-principal hover:underline">
              Politique de confidentialité
            </a>
            .
          </div>
          <Button label={t("Register")} loading={loadingForm} />
          <div className="text-center mt-4 text-sm">
            Vous avez déjà un compte ?{" "}
            <a href="/auth/signin" className="text-principal hover:underline">
              Se connecter
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
