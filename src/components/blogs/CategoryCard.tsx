import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useLanguageContext } from "../../context/LanguageContext";

// Lucide icons
import {
  Book,
  Brain,
  Stethoscope,
  Activity,
  Pill,
  ShieldAlert,
  HeartPulse,
  AlertTriangle,
  Microscope,
  Globe,
  GraduationCap,
  Cpu,
  Biohazard, // ✅ pour remplacer Virus
} from "lucide-react";

interface CategoryCardProps {
  cat?: {
    translations?: any[];
    icon?: string;
    description?: string;
  };
}

// Fallback aléatoire
const fallbackIcons = [
  Book,
  Brain,
  Stethoscope,
  Activity,
  Pill,
  ShieldAlert,
  HeartPulse,
  Microscope,
  Globe,
  GraduationCap,
  Cpu,
];

// ✅ Mapping nom catégorie → icône
const categoryIcons: Record<string, React.ElementType> = {
  "médecine clinique": Stethoscope,
  "surveillance des maladies": Microscope,
  "covid 19": Biohazard,   // ✅ remplacé
  "développement professionnel continue": GraduationCap,
  "attaques sur le système de santé (ssa)": ShieldAlert,
  "santé mentale": Brain,
  ebola: Biohazard,        // ✅ remplacé
  "monitoring de la santé (alerte et gaps)": AlertTriangle,
  "actualité santé": Globe,
  "santé publique": HeartPulse,
  "éducation sanitaire": Book,
  ai4mpox: Cpu,
};

const CategoryCard: React.FC<CategoryCardProps> = ({ cat }) => {
  const navigate = useNavigate();
  const { language: lang } = useLanguageContext();
  const translated = showingTranslateValue(cat?.translations, lang);

  // ✅ Choix de l'icône
  const IconToShow = useMemo(() => {
    if (!translated?.name) {
      return fallbackIcons[Math.floor(Math.random() * fallbackIcons.length)];
    }

    const normalized = translated.name.toLowerCase().trim();
    if (categoryIcons[normalized]) {
      return categoryIcons[normalized];
    }

    // fallback aléatoire
    return fallbackIcons[Math.floor(Math.random() * fallbackIcons.length)];
  }, [translated?.name]);

  const handleClick = () => {
    if (translated?.category_id) {
      navigate(`/blog/category/${translated.category_id}`);
    }
  };

  return (
    <div
      className="cursor-pointer text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white 
        transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
        w-full bg-principal sm:bg-transparent rounded-md flex"
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      {/* Colonne gauche : Icône */}
      <div className="flex items-center justify-center w-16 h-full bg-principal sm:bg-gray-100 dark:sm:bg-gray-800 rounded-l-md">
        {cat?.icon ? (
          <img
            src={cat.icon}
            alt={`${translated?.name || "Catégorie"} icon`}
            className="w-6 h-6 object-contain"
          />
        ) : (
          <IconToShow className="text-2xl text-white sm:text-principal" />
        )}
      </div>

      {/* Colonne droite : Texte */}
      <div className="flex-1 p-4 sm:p-6">
        <div className="mb-1">
          <span className="text-[13px] font-semibold">
            {translated?.name || "Catégorie"}
          </span>
        </div>
        {cat?.description && (
          <p className="text-[12px] text-gray-200 sm:text-gray-600 dark:text-gray-300">
            {cat.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
