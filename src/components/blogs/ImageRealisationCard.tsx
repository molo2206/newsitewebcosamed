import BlogDetailLoad from "./BlogDetailLoad";

interface Props {
  data?: any;
  loading?: boolean;
  onClick?: () => void;
}

const ImageRealisationCard = ({ data, loading, onClick }: Props) => {
  if (loading) {
    return (
      <>
        {Array.from(Array(20).keys()).map((_, i) => (
          <BlogDetailLoad key={i} />
        ))}
      </>
    );
  }

  return (
    <div
      key={data?.id}
      onClick={onClick}
      role="button"
      className="relative group overflow-hidden shadow-md cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <img
        src={data?.cover}
        alt="Image réalisation"
        className="w-full h-48 object-cover"
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Légende optionnelle */}
      <div className="absolute bottom-0 left-0 w-full text-white bg-gradient-to-t from-black/60 to-transparent px-3 py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition duration-300">
        {data?.title || ""}
      </div>
    </div>
  );
};

export default ImageRealisationCard;
