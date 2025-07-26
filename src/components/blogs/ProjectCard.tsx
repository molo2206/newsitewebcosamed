import { motion } from "framer-motion";
import { useAuthContext } from "../../context";
import {
  date_format,
  limittext,
  showingTranslateValue,
} from "../../utils/heleprs";

interface Props {
  projet?: any;
  index?: number;
}

const ProjectCard = ({ projet, index }: Props) => {
  const { lang } = useAuthContext();
  const translation =
    showingTranslateValue(projet?.translations || [], lang) || {};

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index ? index * 0.05 : 0 }}
      className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      {/* Image du projet avec effet zoom au hover */}
      {projet?.image && (
        <div className="relative group h-40 overflow-hidden rounded-t-xl">
          <motion.img
            src={projet.image}
            alt={translation?.title || "Project image"}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Overlay foncé au survol */}
          <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-25 transition duration-300" />
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex flex-col flex-grow p-6">
        {/* Date de publication */}
        {projet?.created_at && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs text-gray-500 dark:text-gray-400 mb-1"
          >
            {date_format(projet.created_at)}
          </motion.p>
        )}

        {/* Titre animé */}
        {translation?.title && (
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-bold text-blue-900 dark:text-white mb-2 leading-snug hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            dangerouslySetInnerHTML={{ __html: translation.title }}
          />
        )}

        {/* Description avec effet reveal */}
        {translation?.description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-700 dark:text-gray-200 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: limittext(translation.description, 200),
            }}
          />
        )}

        {/* Dates du projet */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className=" text-[12px] text-gray-400 dark:text-gray-300 mb-4"
        >
          <strong>Début :</strong> {projet?.datestarted || "N/A"} —{" "}
          <strong>Fin :</strong> {projet?.dateend || "N/A"}
        </motion.p>

        {/* Bouton/lien animé */}
        <motion.a
          href={`/project/detail/${projet?.id}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="mt-auto inline-block text-[12px] text-blue-600 dark:text-blue-400 hover:underline transition"
        >
          Voir le projet →
        </motion.a>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
