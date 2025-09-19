import Button from "../../components/form/Button";
import { useTranslation } from "react-i18next";
import useValidation from "../../hooks/useValidation";
import Input from "../../components/form/Input";
import { useAuthContext } from "../../context";
import { useEffect } from "react";
import Editeprofile from "../../hooks/Editeprofile";
import InputPassword from "../../components/form/InputPassword";
import { ApplyForm } from "../../types";
import { FaUserCircle } from "react-icons/fa";
import LoginPage from "./LoginPage";
import UpdateEmailLoad from "../../components/hero/UpdateEmailLoad";

const UpdateEmail = () => {
  const { t } = useTranslation();
  const { user, pageLang } = useAuthContext();

  const { editprof, loading: loadingForm } = Editeprofile();
  const { update_password, loading: loadingPassword } = Editeprofile();

  const { inputs, errors, handleOnChange, hanldeError, setInputs } =
    useValidation<ApplyForm>({
      full_name: "",
      email: "",
      phone: "",
      gender: "",
      image: "",
    });
  useEffect(() => {
    setInputs({
      id: user?.id,
      full_name: user?.full_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      image: user?.image || "",
    });
  }, [user, pageLang]);
  const genres = [
    {
      value: "Masculin",
      label: "Masculin",
    },
    {
      value: "Feminin",
      label: "Feminin",
    },
  ];
  const validation = (e: any) => {
    e.preventDefault();

    let valide = true;
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
    if (!inputs.gender) {
      hanldeError(t("Sexe"), "gender");
      valide = false;
    }

    if (!inputs.image) {
      hanldeError("Cover is required", "image");
      valide = false;
    } else {
      const MAX_FILE_SIZE = 5120; // 5MB
      const fileSizeKiloBytes = inputs?.image?.size / 1024;
      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        hanldeError("Cover image is too big (max 5 mb) ", "image");
        valide = false;
      }
    }

    if (valide) {
      editprof(inputs);
    }
  };

  const validation_password = (e: any) => {
    e.preventDefault();

    let valide = true;
    if (!inputs.old_password) {
      hanldeError("Old Password is required", "old_password");
      valide = false;
    }
    if (!inputs.new_password) {
      hanldeError("New Password is required", "new_password");
      valide = false;
    }
    if (valide) {
      update_password(inputs);
    }
  };

  return (
    <>
      {!user ? (
        <LoginPage />
      ) : (
        <div className="max-w-7xl mx-auto flex flex-col items-center bg-gray-100 p-6 w-full dark:bg-slate-900   bg-white ">
          <div className="w-full">
            <img
              src="https://apicosamed.cosamed.org/uploads/media/bg-profile-38acc387.jpg" // Remplacez par votre URL d'image
              alt="Banner"
              className="w-full object-cover h-72 rounded-md"
            />
          </div>
          <div className="w-full max-w-6xl bg-white shadow-md dark:bg-slate-800  p-4 mt-[-4rem]">
            <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-2 mb-4">
              Informations
            </h2>
            {loadingForm ? (
              <UpdateEmailLoad /> 
            ) : (
              <div className="">
                <div className="">
                  {!user?.image ? (
                    <FaUserCircle
                      className="md:w-38 md:h-38 w-16 h-16 rounded-full "
                      size={24}
                    />
                  ) : (
                    <img
                      src={
                        inputs?.image?.name
                          ? URL.createObjectURL(inputs?.image)
                          : inputs?.image
                      }
                      alt=""
                      className="md:w-38 md:h-38 w-16 h-16 rounded-full "
                    />
                  )}
                </div>
                {/* Information and Form */}
                <div className="mt-4">
                  <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 "
                    onSubmit={validation}
                  >
                    <div className="">
                      <div className=" flex justify-between gap-3">
                        <label
                          htmlFor="upload-image"
                          className="cursor-pointer px-4 py-2 text-[12px] bg-red-100 text-red-600 rounded-md border border-red-300 hover:bg-red-200 flex items-center gap-2"
                        >
                          Modifier photo
                        </label>
                      </div>
                      <input
                        type="file"
                        name="image"
                        id="upload-image"
                        accept="image/*"
                        className="hidden"
                        onFocus={() => {
                          hanldeError(null, "image");
                        }}
                        onChange={(e: any) => {
                          // setImageUrl(URL.createObjectURL(e.target.files[0]));
                          handleOnChange(e.target.files[0], "image");
                        }}
                      />
                    </div>
                    <div className="">
                      <Input
                        required
                        name="full_name"
                        label={t("Full_name")}
                        placeholder=""
                        type="text"
                        errors={errors.full_name}
                        value={inputs.full_name}
                        onChange={(e: any) =>
                          handleOnChange(e.target.value, "full_name")
                        }
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <Input
                        required
                        name="email"
                        label={t("Email")}
                        placeholder=""
                        type="email"
                        errors={errors.email}
                        value={inputs.email}
                        onChange={(e: any) =>
                          handleOnChange(e.target.value, "email")
                        }
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <Input
                        required
                        name="phone"
                        label={t("Phone")}
                        type="phone"
                        errors={errors.phone}
                        value={inputs.phone}
                        onChange={(e: any) =>
                          handleOnChange(e.target.value, "phone")
                        }
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <Input
                        required
                        name="select"
                        label={t("Select_Sexe")}
                        type="select"
                        value={inputs.gender}
                        errors={errors.gender}
                        onChange={(e: any) =>
                          handleOnChange(e.target.value, "gender")
                        }
                        options={genres?.map((item: any) => ({
                          label: item.label,
                          value: item.value,
                        }))}
                      />
                    </div>

                    <div className="mt-6 text-center">
                      <Button
                        label="Modifier votre compte"
                        loading={loadingForm}
                      />
                    </div>
                  </form>

                  {/* Save Button */}
                </div>
                <div className="mt-8">
                  <h2 className="text-lg font-semibold border-b-2 border-gray-300 pb-2 mb-4">
                    Changer mot passe
                  </h2>
                  <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    onSubmit={validation_password}
                  >
                    {/* Full Name */}
                    <div>
                      <InputPassword
                        required
                        name="old_password"
                        label="Ancien mot de passe"
                        type="password"
                        errors={errors.old_password}
                        value={inputs.old_password}
                        onChange={(e: any) =>
                          handleOnChange(e.target.value, "old_password")
                        }
                      />
                    </div>
                    <div>
                      <InputPassword
                        required
                        name="new_password"
                        label="Nouveau mot de passe"
                        placeholder="Mot de passe"
                        type="password"
                        errors={errors.new_password}
                        value={inputs.new_password}
                        onChange={(e: any) =>
                          handleOnChange(e.target.value, "new_password")
                        }
                      />
                    </div>
                    {/* Email */}
                    <div className="mt-6 text-center">
                      <Button
                        label="Changer votre mot de passe"
                        loading={loadingPassword}
                      />
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateEmail;
