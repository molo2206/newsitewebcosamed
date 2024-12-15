import { useTranslation } from "react-i18next";
import useValidation from "../../hooks/useValidation";
import { useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import UseLogin from "../../hooks/LoginUser";
import Button from "../../components/form/Button";
const LoginPage = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const Register = () => {
    navigation("/recruiting/cosamed/job_openings/register"); // new line
  };
  const { Login, loading: loadingForm } = UseLogin();
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
    if (!inputs.email) {
      hanldeError(t("Enter_email"), "email");
      valide = false;
    }
    if (valide) {
      Login(inputs);
    }
  };

  return (
    <div className=" container py-4">
      <div className="min-h-screen flex flex-col md:flex-row w-full dark:bg-slate-800  bg-gray-50 dark:border dark:border-slate-700">
        {/* Left Section */}
        <div className="md:w-1/2 p-10 flex flex-col dark:bg-slate-800 shadow-lg items-center justify-center text-center bg-white">
          <h1 className="lg:text-xl md:text-sm dark:text-white font-light mb-6">
            Pour profiter pleinement de nos opportunités, il est indispensable
            de se connecter!
          </h1>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center items-center bg-gray-100 dark:bg-slate-900">
          <h2 className="lg:text-2xl md:text-xl font-light mb-4 ">
            Se connecter
          </h2>
          <form className="w-full max-w-sm space-y-4" onSubmit={validation}>
            <Input
              name="email"
              label={t("Enter_email")}
              placeholder=""
              type="text"
              errors={errors.email}
              value={inputs.email}
              onChange={(e: any) => handleOnChange(e.target.value, "email")}
            />
            <Input
              name="password"
              label={t("Password")}
              placeholder=""
              type="password"
              errors={errors.password}
              value={inputs.password}
              onChange={(e: any) => handleOnChange(e.target.value, "password")}
            />
            <div className="text-right text-sm text-blue-500 cursor-pointer hover:underline">
              <a href="/auth/forgot-password">Mot de passe oublié ?</a>
            </div>
            <Button label={t("Login")} loading={loadingForm} />
          </form>
          <p className="text-sm  mb-6">
            <p className="mt-6 text-gray-500 text-sm">
              Vous n’avez pas encore de compte ?{" "}
              <span
                onClick={Register}
                className="text-blue-500 hover:underline cursor-pointer"
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
