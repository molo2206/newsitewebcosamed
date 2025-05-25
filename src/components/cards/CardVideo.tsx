interface CardVideoProps {
  items?: {
    VideoLink?: string;
    snippet?: {
      title?: string;
      description?: string;
    };
  };
}

const CardVideo = ({ items }: CardVideoProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
      <div className="relative w-full" style={{ paddingTop: "56.25%" /* 16:9 */ }}>
        <iframe
          src={items?.VideoLink}
          title={items?.snippet?.title || "YouTube video player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full rounded-md"
          aria-label={items?.snippet?.title || "Vidéo YouTube"}
        ></iframe>
      </div>

      <div className="p-4">
        <h2 className="text-gray-900 dark:text-white font-semibold text-base line-clamp-2">
          {items?.snippet?.title}
        </h2>

        {/* Si tu souhaites afficher la description, décommente la ligne suivante et adapte */}
        {/* <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">
          {items?.snippet?.description}
        </p> */}
      </div>
    </div>
  );
};

export default CardVideo;
