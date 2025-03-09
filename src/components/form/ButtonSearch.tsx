import Spinner from "react-bootstrap/Spinner";
import { FaSearch } from "react-icons/fa";
interface props {
  onClick?: any;
  label?: any;
  type?: any;
  loading?: boolean | any;
}

const ButtonSearch = ({ onClick, label, type, loading }: props) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      type={type || "submit"}
      className={`px-3 ${
        loading ? "cursor-not-allowed opacity-50" : ""
      } p-4 bg-principal text-white rounded-full flex items-center justify-center w-10 h-10 md:w-12 md:h-12 hover:bg-hover dark:text-white dark:bg-slate-900`}
    >
      {label}
      <FaSearch size={14} className=" flex item-center " />
      <Spinner color="red" variant="primary" animation="border" />
    </button>
  );
};

export default ButtonSearch;
