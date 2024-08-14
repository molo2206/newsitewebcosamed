
interface props {
  blogImage?: any;
}
const ImagesBlog = ({ blogImage }: props) => {
  return (
      <div className="p-4 shadow-lg  relative overflow-hidden  text-sm">
        <div className="overflow-hidden  hovering">
          <img
            src={blogImage?.image}
            alt="not found"
            className="mx-auto h-[150px] w-full
            object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
          />
        </div>
    </div>
  );
};

export default ImagesBlog;
