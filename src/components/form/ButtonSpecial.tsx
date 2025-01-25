import Spinner from "react-bootstrap/Spinner";
interface props {
  onClick?: any;
  label?: any;
  type?: any;
  loading?: boolean | any;
}

const ButtonSpecial = ({ onClick, label, type, loading }: props) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      type={type || "submit"}
      className={`px-3 ${
        loading ? "cursor-not-allowed opacity-50" : ""
      } px-6 py-2 bg-principal text-white rounded-md hover:bg-hover`}
    >
      {label}

      <Spinner color="red" variant="primary" animation="border" />
    </button>
  );
};

export default ButtonSpecial;
