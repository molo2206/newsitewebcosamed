
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  report?: any;
}

const RepportCard = ({ report }: props) => {
  const { lang } = useAuthContext();
  return (
    <>
      <div className="flex flex-col md:flex-row  items-start md:items-center justify-between border-b pb-4">
        <div>
          <h3
            className="text-lg font-medium text-principal dark:text-white hover:underline 
            cursor-pointer"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(report?.translations, lang)?.title,
            }}
          ></h3>
          <p className="text-gray-500 text-sm dark:text-white">{report.date}</p>
          <p
            className="text-gray-700 mt-2 dark:text-white line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(report?.translations, lang)
                ?.description,
            }}
          ></p>
        </div>
      </div>
      <a
        href={`/report/detail/` + report?.id}
        className="mt-4 md:mt-0 text-principal hover:text-hover hover:underline"
      >
        Lire le rapport →
      </a>
    </>
  );
};

export default RepportCard;
