import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useValidation from "../../hooks/useValidation";
import Button from "../../components/form/Button";
import { useAuthContext } from "../../context";
import Change_pass from "../../hooks/Change_pass";
import { ApplyForm } from "../../types";
import InputPassword from "../../components/form/InputPassword";
const NewPassword = () => {
  const { t } = useTranslation();
  const { forgetpassword } = useAuthContext();
  const { change_password, loading: loadingForm } = Change_pass();

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
    if (!inputs.password) {
      hanldeError(t("Password"), "password");
      valide = false;
    }

    if (!inputs.password_confirmation) {
      hanldeError(t("Confirm_password"), "password_confirmation");
      valide = false;
    }

    if (valide) {
      change_password({
        ...forgetpassword,
        password: inputs.password,
        password_confirmation: inputs.password_confirmation,
      });
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
            Nouveau mot de passe ?
          </h2>
          <form className="w-full max-w-sm space-y-4" onSubmit={validation}>
            <InputPassword
              name="password"
              label={t("Password")}
              placeholder=""
              type="password"
              errors={errors.password}
              value={inputs.password}
              onChange={(e: any) => handleOnChange(e.target.value, "password")}
            />
            <InputPassword
              name="password_confirmation"
              label={t("Confirm_password")}
              placeholder=""
              type="password"
              errors={errors.password_confirmation}
              value={inputs.password_confirmation}
              onChange={(e: any) =>
                handleOnChange(e.target.value, "password_confirmation")
              }
            />
            <Button
              label="Réinitialiser le mot de passe"
              loading={loadingForm}
            />
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

export default NewPassword;
