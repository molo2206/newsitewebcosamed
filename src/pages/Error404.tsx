import { FlagIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
const Error404 = () => {
  const { t } = useTranslation();
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FlagIcon className="w-20 h-20 mx-auto text-principal" />
        <p
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          {t("Erreur_404")} <br /> {t("It_looks_404")}
        </p>
        <p className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          {t("Do_not_worry")}
        </p>
      </div>
    </div>
  );
};

export default Error404;
