import { useState } from "react";
import { Share2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleCopyLink = () => {
    if (!items?.VideoLink) return;
    navigator.clipboard.writeText(items.VideoLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* CARD */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg border border-gray-200 dark:border-slate-700 rounded-md overflow-hidden"
      >
        {/* Video Preview */}
        <div
          className="relative w-full h-0 cursor-pointer"
          style={{ paddingBottom: "56.25%" }}
          onClick={() => {
            setShowModal(true);
            setIframeLoaded(false);
          }}
        >
          <iframe
            src={items?.VideoLink}
            title={items?.snippet?.title || "YouTube video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full pointer-events-none rounded-t-md"
          ></iframe>
        </div>

        {/* Text + Actions */}
        <div className="p-4 flex items-start justify-between">
          <h2 className="text-gray-900 dark:text-white font-medium text-sm line-clamp-2 max-w-[90%]">
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
          <div className="text-green-600 dark:text-green-400 text-xs px-4 pb-3">
            ✅ Lien copié !
          </div>
        )}
      </motion.div>

      {/* MODAL VIDEO PLAYER */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl bg-white dark:bg-slate-800 shadow-lg rounded-md overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                aria-label="Fermer la vidéo"
                className="absolute top-3 right-3 md:top-4 md:right-4 z-10 bg-white/90 dark:bg-slate-700/80 text-slate-800 dark:text-white rounded-full p-2 shadow hover:bg-gray-200 dark:hover:bg-slate-600 transition"
              >
                <X size={22} />
              </button>

              {/* Skeleton loading (while iframe loads) */}
              {!iframeLoaded && (
                <div className="absolute inset-0 z-0 flex items-center justify-center bg-gray-200 dark:bg-slate-700 animate-pulse">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* Video Iframe */}
              <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={items?.VideoLink}
                  title={items?.snippet?.title || "YouTube video"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full rounded-md"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CardVideo;
