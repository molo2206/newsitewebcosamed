import React from "react";
import { useNavigate } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface CategoryCardProps {
  cat?: {
    translations?: any[];
    icon?: string;
    description?: string;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ cat }) => {
  const navigate = useNavigate();
  const { lang } = useAuthContext();

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
      className="cursor-pointer transition hover:bg-hover dark:hover:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-4 w-full dark:bg-slate-800 bg-principal sm:bg-transparent rounded-lg"
    >
      <div className="flex items-center gap-4">
        {cat?.icon && (
          <img
            src={cat.icon}
            alt="Icône"
            className="w-8 h-8 rounded-full object-cover"
          />
        )}

        <div className="flex flex-col">
          <h3 className="text-sm sm:text-base font-semibold text-white sm:text-gray-900 dark:sm:text-white">
            {translated?.name || "Catégorie"}
          </h3>

          {cat?.description && (
            <p className="text-xs sm:text-sm text-white sm:text-gray-600 dark:sm:text-gray-300 mt-1 line-clamp-2">
              {cat.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
