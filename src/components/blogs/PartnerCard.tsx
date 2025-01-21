interface props {
  partners?: any;
}
const PartnerCard = ({ partners }: props) => {
  return (
    <div className="  py-10">
      <div
        key={partners?.id}
        className=" bg-white dark:bg-slate-800 dark:text-white p-6 rounded-lg dark:border border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={partners?.image}
          alt={`Logo de ${partners.image}`}
          className="w-20 h-20 border-2 rounded-full shadow-xl object-contain mx-auto mb-4"
        />
        <h2 style={{fontSize:11}} className="text-center text-xl font-semibold text-gray-800 dark:text-white">
          {partners?.full_name}
        </h2>
        <a
          href={partners?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex justify-center text-blue-500 hover:text-blue-600"
        >
          Visitez leur site
        </a>
      </div>
    </div>
  );
};

export default PartnerCard;
