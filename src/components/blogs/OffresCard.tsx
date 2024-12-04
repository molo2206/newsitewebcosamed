import { useTranslation } from "react-i18next";
interface props {
  job?: any;
}
const OffresCard = ({ job }: props) => {
  const { t } = useTranslation();
  return (
    <>
      <div
        key={job.id}
        className="bg-white border dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {job.title}
        </h2>
        <p className="text-gray-600 mt-1 dark:text-white">Cosamed sasbl</p>
        <p className="text-sm text-gray-500 dark:text-white">{job?.place}</p>
        <span className="inline-block bg-blue-100 text-principal  text-sm font-medium mt-2 px-3 py-1 rounded-full">
          {job.type}
        </span>
        <p
          className="text-gray-700 mt-4 text-sm line-clamp-2 dark:text-white"
          dangerouslySetInnerHTML={{ __html: job?.description }}
        ></p>
        <p className="text-gray-400 text-xs mt-4">
          Du {job?.startdate} au {job?.enddate}
        </p>
        <a
          href={`/offre/detail/` + job?.id}
          className="mt-4 md:mt-0 text-principal hover:text-hover hover:underline"
        >
          {t("Apply")} →
        </a>
      </div>
    </>
  );
};

export default OffresCard;
