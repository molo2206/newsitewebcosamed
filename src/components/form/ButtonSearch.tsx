import Spinner from "react-bootstrap/Spinner";
import { FaSearch } from "react-icons/fa";

interface Props {
  onClick?: () => void;
  label?: string;
  type?: "submit" | "button";
  loading?: boolean;
}

const ButtonSearch = ({ onClick, label = "Search", type = "submit", loading = false }: Props) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      type={type}
      className={`flex items-center justify-center gap-3 px-4 py-2 rounded-lg font-medium text-sm text-white bg-principal dark:bg-slate-800 border dark:border-slate-700 ${
        loading ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <>
          <span>{label}</span>
          <FaSearch size={14} />
        </>
      )}
    </button>
  );
};

export default ButtonSearch;
