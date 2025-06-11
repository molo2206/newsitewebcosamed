import { useState } from "react";
import { Share2, X } from "lucide-react";

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
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (!items?.VideoLink) return;
    navigator.clipboard.writeText(items.VideoLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 shadow-md hover:shadow-lg border border-gray-200 dark:border-slate-700 transition  overflow-hidden">
        <div
          className="relative w-full h-0 cursor-pointer"
          style={{ paddingBottom: "56.25%" }}
          onClick={() => setShowModal(true)}
        >
          <iframe
            src={items?.VideoLink}
            title={items?.snippet?.title || "YouTube video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full pointer-events-none "
          ></iframe>
        </div>

        <div className="p-4 flex items-start justify-between">
          <h2 className="text-gray-900 dark:text-white font-semibold text-base line-clamp-2 max-w-[90%]">
            {items?.snippet?.title}
          </h2>
          <button
            onClick={handleCopyLink}
            className="ml-2 text-principal hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            title="Partager la vidéo"
            aria-label="Partager"
          >
            <Share2 size={18} />
          </button>
        </div>
        {copied && (
          <div className="text-green-600 text-sm px-4 pb-2">
            Lien copié !
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center px-4 py-8">
          <div className="relative w-full max-w-5xl bg-white dark:bg-slate-800 shadow-lg overflow-hidden">

            <button
              onClick={() => setShowModal(false)}
              aria-label="Fermer la vidéo"
              className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-white/90 dark:bg-slate-700/80 text-slate-800 dark:text-white rounded-full p-2 shadow hover:bg-gray-200 dark:hover:bg-slate-600 transition"
              title="Fermer"
            >
              <X size={22} />
            </button>

            <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={items?.VideoLink}
                title={items?.snippet?.title || "YouTube video"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardVideo;
