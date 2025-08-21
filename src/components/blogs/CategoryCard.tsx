import React from "react";
import { useNavigate } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useLanguageContext } from "../../context/LanguageContext";

interface CategoryCardProps {
  cat?: {
    translations?: any[];
    icon?: string;
    description?: string;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ cat }) => {
  const navigate = useNavigate();
  const { language: lang } = useLanguageContext();
  const translated = showingTranslateValue(cat?.translations, lang);

  const handleClick = () => {
    if (translated?.category_id) {
      navigate(`/blog/category/${translated.category_id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
      className="cursor-pointer font-semibold text-white sm:text-gray-900 dark:sm:text-white
        transition hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700
        p-4 sm:p-6 w-full  sm:bg-transparent rounded-md"
    >
      <div className="flex items-center gap-2 mb-1">
        {cat?.icon && (
          <img
            src={cat.icon}
            alt={`${translated?.name || "Catégorie"} icon`}
            className="w-5 h-5 object-contain"
          />
        )}
        <span className="text-[13px]">{translated?.name || "Catégorie"}</span>
      </div>
      {cat?.description && (
        <p className="text-[11px] text-gray-600 dark:text-gray-300">
          {cat.description}
        </p>
      )}
    </div>
  );
};

export default CategoryCard;
