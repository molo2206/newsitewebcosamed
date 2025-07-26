import { useState, useEffect } from "react";
import { useAuthContext } from "../../context";
import { showingTranslateValue } from "../../utils/heleprs";
import LightboxViewer from "../LightBox";

interface props {
  event?: any;
  images?: { src: string; caption?: string; alt?: string }[];
}

const parseDateDDMMYYYY = (dateString?: string): Date | null => {
  if (!dateString) return null;
  const parts = dateString.split("/");
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
};

const formatDateTime = (date: Date | null) => {
  if (!date) return "";
  return date.toLocaleString("fr-FR", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDuration = (ms: number) => {
  if (ms <= 0) return "";
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return `${days}j ${hours}h ${minutes}m ${seconds}s`;
};

const EventCard = ({ event, images = [] }: props) => {
  const { lang } = useAuthContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>("");

  const openLightbox = (index: number = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const lightboxImages =
    images.length > 0
      ? images
      : event?.image
      ? [
          {
            src: event.image,
            alt:
              showingTranslateValue(event?.translations, lang)?.title ||
              "Event image",
          },
        ]
      : [];

  useEffect(() => {
    const startDate = parseDateDDMMYYYY(event?.debut);
    const endDate = parseDateDDMMYYYY(event?.fin);
    if (!startDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      if (now < startDate) {
        const diff = startDate.getTime() - now.getTime();
        setTimeLeft("Commence dans : " + formatDuration(diff));
      } else if (endDate && now >= startDate && now <= endDate) {
        const diff = endDate.getTime() - now.getTime();
        setTimeLeft("Se termine dans : " + formatDuration(diff));
      } else {
        setTimeLeft("Événement terminé");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [event]);

  return (
    <div className="w-full">
      <div
        key={event?.id}
        className="bg-white dark:bg-slate-800  flex flex-col lg:flex-row items-start gap-4  p-3"
      >
        {/* Image */}
        <div
          className="w-full  sm:w-full lg:w-1/3 max-h-[400px] overflow-hidden  hover:shadow-md transition-shadow duration-300 cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          {/* <div className="relative aspect-[3/3] sm:aspect-video lg:aspect-square bg-white">
            <img
              src={event?.image || "/default-event.jpg"}
              alt={
                showingTranslateValue(event?.translations, lang)?.title ||
                "Event image"
              }
              className="absolute inset-0 w-full h-full object-contain sm:object-cover"
            />
          </div> */}
          <div className="relative w-full aspect-[4/3] bg-white flex items-center justify-center">
            <img
              src={event?.image || "/default-event.jpg"}
              alt={
                showingTranslateValue(event?.translations, lang)?.title ||
                "Event image"
              }
              className=" lg:max-w-full lg:max-h-full object-contain sm:object-cover"
            />
          </div>
        </div>

        <LightboxViewer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          images={lightboxImages}
        />

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between w-full">
          <div>
            <h3
              className="text-[14px] dark:text-white font-semibold text-gray-900 break-words whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html:
                  showingTranslateValue(event?.translations, lang)?.title || "",
              }}
            ></h3>

            {/* Timer */}
            <p className="text-[12px] font-semibold text-red-600 mt-2">
              {timeLeft}
            </p>

            {/* Infos */}
            <div className="text-gray-700 mt-3 space-y-1 text-[12px] dark:text-white break-words">
              <p>
                <span className="font-semibold">Date début: </span>
                {formatDateTime(parseDateDDMMYYYY(event?.debut))}
              </p>
              <p>
                <span className="font-semibold">Date fin: </span>
                {event?.fin
                  ? formatDateTime(parseDateDDMMYYYY(event?.fin))
                  : "—"}
              </p>
              <p>
                <span className="font-semibold ">Heure: </span>
                {event?.in} - {event?.out}
              </p>
              <p className="break-words">
                <span className="font-semibold">Lieu: </span>
                {event?.country?.name}
              </p>
            </div>

            <p
              className="text-gray-800 mt-4 text-[12px] dark:text-white leading-relaxed break-words whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html:
                  showingTranslateValue(event?.translations, lang)
                    ?.description || "",
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
