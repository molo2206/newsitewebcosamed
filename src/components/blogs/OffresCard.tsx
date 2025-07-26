import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Props {
  job?: {
    id: string | number;
    title: string;
    place: string;
    type: string;
    description: string;
    startdate: string;
    enddate: string;
  };
}

const OffresCard = ({ job }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToDetail = () => {
    if (job?.id) navigate(`/offre/detail/${job.id}`);
  };

  if (!job) return null;

  return (
    <motion.div
      key={job.id}
      onClick={goToDetail}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="cursor-pointer bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md p-6 shadow-sm hover:shadow-lg transition-shadow"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") goToDetail();
      }}
    >
      {/* Titre */}
      <h2 className="text-[13px] font-semibold text-gray-800 dark:text-white">
        {job.title}
      </h2>

      {/* Organisation */}
      <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-1">
        Cosamed asbl – {job.place}
      </p>

      {/* Type de contrat */}
      <span className="inline-block bg-blue-100 text-principal text-[8px] font-semibold mt-3 px-3 py-1 rounded-full uppercase tracking-wide">
        {job.type}
      </span>

      {/* Description */}
      <p
        className="mt-4 text-sm text-gray-700 dark:text-gray-300 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: job?.description }}
      />

      {/* Dates */}
      <p className="mt-4 text-[11px] text-gray-500 dark:text-gray-400">
        Du <span className="font-medium">{job.startdate}</span> au{" "}
        <span className="font-medium">{job.enddate}</span>
      </p>

      {/* CTA */}
      <div className="mt-6 text-right">
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToDetail();
          }}
          className="text-[12px] font-medium text-principal hover:text-hover hover:underline transition"
        >
          {t("Apply", "Postuler")} →
        </button>
      </div>
    </motion.div>
  );
};

export default OffresCard;
