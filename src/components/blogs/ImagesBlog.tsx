
interface props {
  blogImage?: any;
  onClick?: any;
}
const ImagesBlog = ({ blogImage,onClick }: props) => {
  return (
      <div className="p-4 px-4 overflow-hidden  text-sm" onClick={onClick} role="button">
        <div className="overflow-hidden  hovering">
          <img
            src={blogImage?.image}
            
            alt="not found"
            className="mx-auto h-[100px] w-full  rounded-lg
            object-cover "
          />
        </div>
    </div>
  );
};

export default ImagesBlog;
