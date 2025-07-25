import { useTranslation } from "react-i18next";
import useValidation from "../../hooks/useValidation";
import { useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import UseLogin from "../../hooks/LoginUser";
import Button from "../../components/form/Button";
import { ApplyForm } from "../../types";
import InputPassword from "../../components/form/InputPassword";
import { FcGoogle } from "react-icons/fc";
import AuthService from "../../services/AuthService";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();

  const Register = () => {
    navigation("/recruiting/cosamed/job_openings/register");
  };

  const { Login, loading: loadingForm, redirectUrl } = UseLogin();

  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation<ApplyForm>({
      email: "",
      password: "",
    });

  const validation = (e: React.FormEvent<HTMLFormElement>) => {
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
      Login(inputs)
        .then(() => {
          navigation(redirectUrl);
        })
        .catch(() => {
          // erreur gérée dans UseLogin
        });
    }
  };

  const handleGoogleLogin = () => {
    AuthService.loginWithGoogle();
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-gray-100 w-full dark:bg-slate-900 bg-white">
      <div className="w-full">
        <img
          src="https://apicosamed.cosamed.org/uploads/blogs/505259756244493872b7709a8a01b536.png"
          alt="Banner"
          className="w-full object-cover h-80"
        />
      </div>

      <div className="w-full max-w-sm bg-white shadow-md dark:bg-slate-800 p-4 mt-[-4rem] rounded-md">
        <h2 className="text-center text-[14px] font-semibold mb-6">Connexion</h2>
        <form className="w-full max-w-sm space-y-4" onSubmit={validation}>
          <Input
            name="email"
            label={t("Enter_email")}
            placeholder=""
            type="text"
            errors={errors.email}
            value={inputs.email}
            onChange={(e: any) => handleOnChange(e.target.value, "email")}
            onFocus={() => hanldeError(null, "email")}
          />
          <InputPassword
            name="password"
            label={t("Password")}
            placeholder=""
            type="password"
            errors={errors.password}
            value={inputs.password}
            onChange={(e: any) => handleOnChange(e.target.value, "password")}
          />
          <div className="text-right text-[12px] text-principal cursor-pointer hover:underline">
            <a href="/auth/forgot-password">Mot de passe oublié ?</a>
          </div>
          <Button label={t("Login")} loading={loadingForm} />
        </form>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full max-w-sm border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            type="button"
            aria-label="Continuer avec Google"
          >
            <FcGoogle className="w-6 h-6" />
            <span className="text-gray-700 dark:text-gray-200 font-medium text-[11px]">
              Continuer avec Google
            </span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm mb-6">
            <span className="mt-6 text-gray-500 text-[12px]">
              Vous n’avez pas encore de compte ?{" "}
              <span
                onClick={Register}
                className="text-principal hover:underline cursor-pointer"
              >
                S’inscrire
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
