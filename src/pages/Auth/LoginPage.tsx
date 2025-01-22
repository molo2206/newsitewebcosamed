import { useTranslation } from "react-i18next";
import useValidation from "../../hooks/useValidation";
import { useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import UseLogin from "../../hooks/LoginUser";
import Button from "../../components/form/Button";
import { ApplyForm } from "../../types";
const LoginPage = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const Register = () => {
    navigation("/recruiting/cosamed/job_openings/register"); // new line
  };
  const { Login, loading: loadingForm } = UseLogin();
  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation<ApplyForm>({
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
    if (!inputs.email) {
      hanldeError(t("Enter_email"), "email");
      valide = false;
    }
    if (valide) {
      Login(inputs);
    }
  };

  return (
    <div className="container min-h-screen flex flex-col items-center bg-gray-100 p-4 w-full dark:bg-slate-900   bg-white ">
      <div className="w-full">
        <img
          src="https://apicosamed.cosamed.org/uploads/blogs/505259756244493872b7709a8a01b536.png" // Remplacez par votre URL d'image
          alt="Banner"
          className="w-full object-cover h-72"
        />
      </div>

      {/* Formulaire de connexion */}
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-slate-800  p-4 mt-[-4rem]">
        <h2 className="text-center text-xl font-semibold mb-6">Connexion</h2>
        <form className="w-full max-w-sm space-y-4" onSubmit={validation}>
          <Input
            name="email"
            label={t("Enter_email")}
            placeholder=""
            type="text"
            errors={errors.email}
            value={inputs.email}
            onChange={(e: any) => handleOnChange(e.target.value, "email")}
            onFocus={() => hanldeError(null, `email`)}
          />
          <Input
            name="password"
            label={t("Password")}
            placeholder=""
            type="password"
            errors={errors.password}
            value={inputs.password}
            onFocus={() => hanldeError(null, `password`)}
            onChange={(e: any) => handleOnChange(e.target.value, "password")}
          />
          <div className="text-right text-sm text-principa cursor-pointer hover:underline">
            <a href="/auth/forgot-password">Mot de passe oublié ?</a>
          </div>
          <Button label={t("Login")} loading={loadingForm} />
        </form>

        {/* Lien supplémentaire */}
        <div className="mt-4 text-sm text-center">
          <p className="text-sm  mb-6">
            <p className="mt-6 text-gray-500 text-sm">
              Vous n’avez pas encore de compte ?{" "}
              <span
                onClick={Register}
                className="text-principal hover:underline cursor-pointer"
              >
                S’inscrire
              </span>
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
