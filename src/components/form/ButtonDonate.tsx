import Spinner from "react-bootstrap/Spinner";
interface props {
  onClick?: any;
  label?: any;
  type?: any;
  loading?: boolean | any;
}

const ButtonDonate = ({ onClick, label, type, loading }: props) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      type={type || "submit"}
      className={`px-3 ${
        loading ? "cursor-not-allowed opacity-50" : ""
      } bg-principal hover:bg-hover text-white text-[12px] font-semibold rounded-md px-10 py-3 shadow-md transition-colors`}
    >
      {label}

      <Spinner color="red" variant="primary" animation="border" />
    </button>
  );
};

export default ButtonDonate;
