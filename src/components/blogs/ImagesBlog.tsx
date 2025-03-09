
interface props {
  blogImage?: any;
  onClick?: any;
}
const ImagesBlog = ({ blogImage,onClick }: props) => {
  return (
      <div className="overflow-hidden  text-sm" onClick={onClick} role="button">
        <div className="overflow-hidden  hovering">
          <img
            src={blogImage?.image}
            
            alt="not found"
            className="mx-auto h-[80px] w-full  rounded-md
            object-cover "
          />
        </div>
    </div>
  );
};

export default ImagesBlog;
