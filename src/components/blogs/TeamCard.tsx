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
    
      <div className="contain p-4 shadow-lg py-4 bg-transparent">
        <div className="overflow-hidden">
          <img
            src={team?.image}
            alt="not found"
            className="mx-auto h-[300px] w-[300px] 
            object-cover "
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
