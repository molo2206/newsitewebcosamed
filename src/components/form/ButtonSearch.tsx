import Spinner from "react-bootstrap/Spinner";
import { FaSearch } from "react-icons/fa";

interface Props {
  onClick?: () => void;
  label?: string;
  type?: "submit" | "button";
  loading?: boolean;
}

const ButtonSearch = ({
  onClick,
  label = "Chercher!",
  type = "submit",
  loading = false,
}: Props) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      type={type}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs font-bold text-white bg-[#0067b8] hover:bg-[#005aa1] transition-all duration-200 ${
        loading ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <>
          <span>{label}</span>
          <FaSearch className="w-3 h-3" />
        </>
      )}
    </button>
  );
};

export default ButtonSearch;
