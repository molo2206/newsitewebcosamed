import React from "react";

interface Partner {
  id: number;
  image: string;
  full_name: string;
  url: string;
}

interface Props {
  partners?: Partner;
}

const PartnerCard: React.FC<Props> = ({ partners }) => {
  if (!partners) return null;

  return (
    <div className="py-2">
      <div
        className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-lg border dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={partners.image}
          alt={`Logo de ${partners.full_name}`}
          className="w-20 h-20 border-2 rounded-full shadow-xl object-contain mx-auto mb-4"
        />
        <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-white">
          {partners.full_name}
        </h2>
        {partners.url && (
          <a
            href={partners.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex justify-center text-blue-500 hover:text-blue-600 text-sm"
          >
            Visitez leur site
          </a>
        )}
      </div>
    </div>
  );
};

export default PartnerCard;
