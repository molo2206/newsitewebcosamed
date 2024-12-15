interface props {
  items?: any;
}

const CardVideo = ({ items }: props) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border dark:bg-slate-800 ">
      <iframe
        height="350"
        width="460"
        src={items?.VideoLink}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className=" rounded-md max-h-full max-w-full"
      ></iframe>

      <div className="p-4">
        <h2 className="sm:text-sm md:text-sm lg:text-sm font-semibold text-gray-800  dark:text-white">
          {items?.snippet?.title}
        </h2>
        <p className="text-gray-600 sm:text-sm md:text-sm lg:text-sm  mb-4 line-clamp-2 dark:text-white"></p>
      </div>
    </div>
  );
};

export default CardVideo;
