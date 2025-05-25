interface props {
  team?: any;
}
const TeamCard = ({ team }: props) => {
  return (
    <>
      <div
        key={team?.index}
        className="bg-white border dark:border-slate-700 dark:bg-slate-800  p-6 text-center hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={team?.image}
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {team?.full_name}
        </h3>
        <p className="text-gray-500 dark:text-white">{team?.fonction}</p>
      </div>
    </>
  );
};

export default TeamCard;
