import { useNavigate } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import { useTranslation } from "react-i18next";

interface Props {
  bulletin?: any;
}

const BulletinCard = ({ bulletin }: Props) => {
  const { lang } = useAuthContext();
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/bulletin/detail/${bulletin?.id}`);
  };
  const { t } = useTranslation();

  const translated = showingTranslateValue(bulletin?.translations, lang);

  return (
    <div className="border dark:border-gray-700 p-4 bg-gray-50 dark:bg-slate-900 dark:text-white">
      <img
        src={bulletin.image}
        alt={translated?.title}
        className="h-40 w-auto mb-2 mx-auto"
      />
      <p className="text-sm text-gray-500 dark:text-white ">
        {translated?.month}-{translated?.year}
      </p>
      <p className="font-medium text-sm text-gray-800 dark:text-gray-200 mt-1 line-clamp-2">
        {translated?.title}
      </p>
      <div className="mt-3 flex space-x-4 text-sm">
        <a
          href={bulletin?.file}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="text-blue-700 dark:text-white  font-medium"
        >
          {t("Download")}
        </a>
        <a
          onClick={(e) => {
            e.stopPropagation();
            goToDetail();
          }}
          className="text-blue-700 font-medium dark:text-white cursor-pointer"
        >
          {t("Read_more")}
        </a>
      </div>
    </div>
  );
};

export default BulletinCard;
