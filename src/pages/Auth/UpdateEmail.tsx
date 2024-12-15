import Button from "../../components/form/Button";
import { useTranslation } from "react-i18next";
import useAsync from "../../hooks/useAsync";
import useValidation from "../../hooks/useValidation";
import Input from "../../components/form/Input";
import { useAuthContext } from "../../context";
import Showprofil from "../../services/AuthService";
import { useEffect, useState } from "react";
import Editeprofile from "../../hooks/Editeprofile";
import InputPassword from "../../components/form/InputPassword";

const UpdateEmail = () => {
  const { t } = useTranslation();
  const { user, pageLang } = useAuthContext();
  const { editprof, loading: loadingForm } = Editeprofile();
  const { update_password, loading: loadingPassword } = Editeprofile();
  const { data: profil } = useAsync(() => Showprofil.showprofile(user?.id));
  const [image, setImage] = useState(null);

  // Gestion du changement de fichier
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Stocke l'image en base64 pour l'aperçu
      };
      reader.readAsDataURL(file);
    }
  };

  const { inputs, errors, handleOnChange, hanldeError, setInputs } =
    useValidation({
      full_name: "",
      email: "",
      phone: "",
      gender: "",
      image: "",
    });
  useEffect(() => {
    setInputs({
      id: user?.id,
      full_name: profil?.full_name || "",
      email: profil?.email || "",
      phone: profil?.phone || "",
      gender: profil?.gender || "",
      // image: profil?.image || "",
    });
  }, [profil, pageLang]);
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
    const MAX_FILE_SIZE = 5120; // 5MB
    const fileSizeKiloBytes = inputs?.image?.size / 1024;
    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      hanldeError("Cover image is too big (max 5 mb) ", "image");
      valide = false;
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
    <div className=" min-h-screen bg-gray-100 p-6 dark:bg-slate-900">
      {/* Titre et Description */}
      <div
        className="relative h-40 md:h-60 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://apicosamed.cosamed.org/uploads/media/bg-profile-38acc387.jpg')",
        }}
      ></div>
      <div className=" mx-auto bg-white shadow-md rounded-lg mt-2 p-4 dark:bg-slate-800 ">
        <div className="flex flex-col items-center md:flex-row md:items-end">
          <div className="flex flex-col items-center gap-4">
            {/* Aperçu de l'image */}
            <form action="" className="py-4">
              <div className="w-40 h-40  ">
                <img
                  src={user?.image}
                  alt="Uploaded"
                  className="w-40 h-40 rounded-full border-4 border-white shadow-md"
                />
              </div>
              {image ? (
                <div className=" flex justify-between gap-3  py-4">
                  <label
                    htmlFor="upload-image"
                    className="cursor-pointer px-4 py-2 w-full bg-red-100 text-red-600 rounded-md border border-red-300 hover:bg-red-200 flex items-center gap-2"
                  >
                    <img
                      src={image || "https://via.placeholder.com/150"}
                      alt="icon"
                      className="w-10 h-10 rounded-full border-4 border-white shadow-md"
                    />{" "}
                    Modifier photo
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="upload-image"
                  className="cursor-pointer px-4 py-2 bg-red-100 text-red-600 rounded-md border border-red-300 hover:bg-red-200 flex items-center gap-2"
                >
                  {" "}
                  <img
                    src={image || "https://via.placeholder.com/150"}
                    alt="icon"
                    className="w-10 h-10 rounded-full border-4 border-white shadow-md"
                  />
                  Edit Picture
                </label>
              )}

              <input
                type="file"
                name="image"
                value={inputs.image}
                id="upload-image"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </form>
          </div>
        </div>
        {/* Information and Form */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold border-b-2 border-gray-300 pb-2 mb-4">
            Informations
          </h2>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={validation}
          >
            {/* Full Name */}
            <div>
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
                onChange={(e: any) => handleOnChange(e.target.value, "email")}
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
                onChange={(e: any) => handleOnChange(e.target.value, "phone")}
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
                onChange={(e: any) => handleOnChange(e.target.value, "gender")}
                options={genres?.map((item: any) => ({
                  label: item.label,
                  value: item.value,
                }))}
              />
            </div>

            <div className="mt-6 text-center">
              <Button label="Modifier votre compte" loading={loadingForm} />
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
    </div>
  );
};

export default UpdateEmail;
