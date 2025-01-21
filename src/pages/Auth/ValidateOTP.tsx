import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useValidation from "../../hooks/useValidation";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { useAuthContext } from "../../context";
import RegisterUser from "../../hooks/RegisterUser";
const ValidateOTP = () => {
  const { t } = useTranslation();
  const { register } = useAuthContext();
  const { registeruser, loading: loadingForm } = RegisterUser();

  const navigation = useNavigate();
  const Login = () => {
    navigation("/auth/signin"); // new line
  };

  const { inputs, errors, handleOnChange, hanldeError } = useValidation({
    otp: "",
  });
  const validation = (e: any) => {
    e.preventDefault();

    let valide = true;
    if (!inputs.otp) {
      hanldeError(t("Otp"), "otp");
      valide = false;
    }
    
    if (valide) {
      registeruser({ ...register, otp: inputs.otp });
      // console.log({ ...register, code: inputs.code })
    }
  };
  return (
    <div className="container py-4">
      <div className="min-h-screen flex flex-col md:flex-row w-full dark:bg-slate-800  bg-white ">
        <div className="md:w-full p-10 flex flex-col justify-center items-center bg-white dark:bg-slate-900">
          <h2 className="text-2xl font-semibold mb-4 ">
            Code de validation
          </h2>
          <form className="w-full max-w-sm space-y-4" onSubmit={validation}>
            <Input
              name="otp"
              placeholder=""
              type="number"
              errors={errors.otp}
              value={inputs.otp}
              onChange={(e: any) => handleOnChange(e.target.value, "otp")}
            />
            <Button label="Confirmer" loading={loadingForm} />
          </form>
          <p className="mt-6 text-gray-500 text-sm">
            Vous avez déjà un compte ?{" "}
            <span
              onClick={Login}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              S’inscrire
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValidateOTP;
