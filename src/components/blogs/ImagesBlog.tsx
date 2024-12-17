
interface props {
  blogImage?: any;
  onClick?: any;
}
const ImagesBlog = ({ blogImage,onClick }: props) => {
  return (
      <div className="p-4 shadow-lg  relative overflow-hidden  text-sm " onClick={onClick} role="button">
        <div className="overflow-hidden  hovering">
          <img
            src={blogImage?.image}
            
            alt="not found"
            className="mx-auto h-[100px] w-full
            object-cover "
          />
        </div>
    </div>
  );
};

export default ImagesBlog;
