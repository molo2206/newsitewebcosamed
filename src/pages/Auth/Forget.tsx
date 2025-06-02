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
    <div className="p-6">
      <div className="min-h-screen flex flex-col items-center bg-gray-100 w-full dark:bg-slate-900   bg-white ">
        <div className="w-full">
          <img
            src="https://apicosamed.cosamed.org/uploads/blogs/505259756244493872b7709a8a01b536.png" // Remplacez par votre URL d'image
            alt="Banner"
            className="w-full object-cover h-80 "
          />
        </div>
        <div className="w-full max-w-sm bg-white shadow-md dark:bg-slate-800 p-4 mt-[-4rem]">
          <h2 className="text-center text-xl font-semibold mb-6">
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
