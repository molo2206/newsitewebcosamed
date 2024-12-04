interface props {
  partners?: any;
}
const PartnerCard = ({ partners }: props) => {
  return (
    <div className="  py-10">
      <div
        key={partners?.id}
        className=" bg-white dark:bg-slate-800 dark:text-white p-6 rounded-lg border shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={partners?.image}
          alt={`Logo de ${partners.image}`}
          className="w-64 h-64 object-contain mx-auto mb-4"
        />
        <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-white">
          {partners?.full_name}
        </h2>
        <p className="text-gray-600 mt-2 dark:text-white">
          Bureau de la coordination des affaires humanitations des Nations Unies
          (OCHA)
        </p>
        <a
          href={partners?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-500 hover:text-blue-600"
        >
          Visitez leur site
        </a>
      </div>
    </div>
  );
};

export default PartnerCard;
