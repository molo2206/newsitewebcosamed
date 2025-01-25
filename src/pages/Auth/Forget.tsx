import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useValidation from "../../hooks/useValidation";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import ForgetPassword from "../../hooks/ForgetPassword";
import { ApplyForm } from "../../types";
const Forget = () => {
  const { t } = useTranslation();
  const { forget, loading: loadingForm } = ForgetPassword();

  const navigation = useNavigate();
  const Login = () => {
    navigation("/auth/signin"); // new line
  };

  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation<ApplyForm>({
      email: "",
    });
  const validation = (e: any) => {
    e.preventDefault();

    let valide = true;
    if (!inputs.email) {
      hanldeError(t("Enter_email"), "email");
      valide = false;
    }

    if (valide) {
      forget(inputs);
    }
  };
  return (
    <div className=" container py-4">
      <div
        className="min-h-screen flex flex-col md:flex-row w-full dark:bg-slate-800 
       bg-white "
      >
        <div
          className="md:w-full p-10 flex flex-col justify-center items-center bg-gray-100
         dark:bg-slate-900"
        >
          <h2 className="lg:text-2xl md:text-xl font-light mb-4 ">
            Mot de passe oublié ?
          </h2>
          <form className="w-full max-w-sm space-y-4" onSubmit={validation}>
            <Input
              name="email"
              label={t("Enter_email")}
              placeholder=""
              type="email"
              errors={errors.email}
              value={inputs.email}
              onChange={(e: any) => handleOnChange(e.target.value, "email")}
            />
            <Button label={t("SendMessage")} loading={loadingForm} />
          </form>
          <p className="mt-6 text-gray-500 text-sm">
            <span
              onClick={Login}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Se connecter
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forget;
