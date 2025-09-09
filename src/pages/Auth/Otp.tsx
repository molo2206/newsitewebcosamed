import { useTranslation } from "react-i18next";
import useValidation from "../../hooks/useValidation";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { useAuthContext } from "../../context";
import VerifyOtp from "../../hooks/VerifyOtp";
import { ApplyForm } from "../../types";
const Otp = () => {
  const { t } = useTranslation();
  const { forgetpassword } = useAuthContext();
  const { verify, loading: loadingForm } = VerifyOtp();


  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation<ApplyForm>({
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
      verify({ ...forgetpassword, otp: inputs.otp });
    }
  };
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center bg-gray-100 w-full dark:bg-slate-900 bg-white ">
        <div className="w-full">
          <img
            src="https://apicosamed.cosamed.org/uploads/blogs/505259756244493872b7709a8a01b536.png" // Remplacez par votre URL d'image
            alt="Banner"
            className="w-full object-cover h-80 rounded-md"
          />
        </div>
        <div className="w-full rounded-md max-w-sm bg-white shadow-md dark:bg-slate-800 p-4 mt-[-4rem]">
          <h2 className="text-center text-sm font-semibold mb-6">
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
        </div>
      </div>
    </div>
  );
};

export default Otp;
