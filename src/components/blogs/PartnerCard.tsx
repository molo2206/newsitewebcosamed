
import { Link } from "react-router-dom";
interface props {
  partners?: any;
}
const PartnerCard = ({ partners }: props) => {
  return (
    <div className=" py-20 ">
      <Link target="_black" to={partners?.url} onClick={() => window.scroll}>
        <div className="  p-8 rounded-lg flex flex-col justify-center items-center gap-4">
          <img
            src={partners?.image}
            alt="not found"
            className=" object-cover rounded-full max-w-100 max-h-100 p-4 bg-[#26B2EC24] text-[#06aff6] hover:bg-hover hover:text-white"
          />
          <p className=" font-bold font-montserrat dark:text-slate-600">{partners?.full_name}</p>
        </div>
      </Link>
    </div>
  );
};

export default PartnerCard;
