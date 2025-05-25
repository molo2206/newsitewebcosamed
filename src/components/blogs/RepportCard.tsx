import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface Props {
  report?: any;
}

const RepportCard = ({ report }: Props) => {
  const { lang } = useAuthContext();

  const translation = showingTranslateValue(report?.translations, lang);

  return (
    <div className="border-b border-gray-200 dark:border-slate-700 pb-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div>
          {/* Titre */}
          <h3
            className="text-xl font-semibold text-[#0072CE] dark:text-white hover:underline cursor-pointer"
            dangerouslySetInnerHTML={{
              __html: translation?.title,
            }}
          />

          {/* Date */}
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
            {report?.date}
          </p>

          {/* Description */}
          <p
            className="text-gray-700 dark:text-gray-100 text-sm mt-3 line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: translation?.description,
            }}
          />
        </div>

        {/* Lien vers le rapport */}
        <div className="mt-4 md:mt-0 md:ml-6">
          <a
            href={`/report/detail/${report?.id}`}
            className="inline-block text-[#0072CE] hover:underline text-sm font-medium"
          >
            Lire le rapport →
          </a>
        </div>
      </div>
    </div>
  );
};

export default RepportCard;
