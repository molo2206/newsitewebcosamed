import {
  FaFacebook,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
interface props {
  team?: any;
}
const TeamCard = ({ team }: props) => {
  return (
    <>
      <div className="contain p-4 shadow-lg">
        <div className="overflow-hidden">
          <img
            src={team?.image}
            alt="not found"
            className="mx-auto h-[150px] w-[150px] 
            object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
          />
        </div>
        <div className=" flex justify-center py-2 text-slate-600">
          <h1 className="text-sm">{team?.fonction}</h1>
        </div>
        <div className=" flex justify-center py-2 text-slate-600">
          <p className=" line-clamp-1 font-semibold text-sm">
            {team?.full_name}
          </p>
        </div>
        <div className="flex gap-3 justify-center mr-6 items-center">
          <a href={team?.twitter} target="_black" className=" duration-200 hover:scale-105">
            <FaTwitter className=" text-3xl" />
          </a>
          <a href={team?.facebook} target="_black" className=" duration-200 hover:scale-105">
            <FaFacebook className=" text-3xl" />
          </a>
          <a href={team?.linkedin} target="_black" className=" duration-200 hover:scale-105">
            <FaLinkedinIn className=" text-3xl" />
          </a>
        </div>
      </div>
    </>
  );
};

export default TeamCard;
