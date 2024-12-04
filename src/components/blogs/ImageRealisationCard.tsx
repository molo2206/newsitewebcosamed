import BlogDetailLoad from "./BlogDetailLoad";

interface props {
  data?: any;
  loading?: any;
  onClick?: any;
}
const ImageRealisationCard = ({ data, loading,onClick }: props) => {
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div key={data?.index} onClick={onClick} role="button">
          <img
            src={data?.cover}
            alt="Image 1"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}
    </>
  );
};

export default ImageRealisationCard;
