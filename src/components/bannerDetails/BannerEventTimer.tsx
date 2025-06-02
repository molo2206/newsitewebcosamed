import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface EventTimerProps {
  startDate: string; // format: 'DD/MM/YYYY'
  endDate?: string;
  title?: string;
}

const parseDateDDMMYYYY = (dateString?: string): Date | null => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const formatDuration = (ms: number) => {
  if (ms <= 0) return "";
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return `${days}j ${hours}h ${minutes}m ${seconds}s`;
};

const truncateText = (text = "", maxLength = 80): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const EventTimer = ({ startDate, endDate, title }: EventTimerProps) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [maxLength, setMaxLength] = useState(80);
  const navigate = useNavigate();

  // Gestion responsive de la longueur max du titre
  useEffect(() => {
    const updateMaxLength = () => {
      const width = window.innerWidth;
      setMaxLength(width >= 768 ? 200 : 80);
    };

    updateMaxLength(); // Initial call

    window.addEventListener("resize", updateMaxLength);
    return () => {
      window.removeEventListener("resize", updateMaxLength);
    };
  }, []);

  // Timer qui met à jour le temps restant toutes les secondes
  useEffect(() => {
    const start = parseDateDDMMYYYY(startDate);
    const end = parseDateDDMMYYYY(endDate);
    if (!start) return;

    const interval = setInterval(() => {
      const now = new Date();
      const truncatedTitle = truncateText(title ?? "", maxLength);

      if (now < start) {
        const diff = start.getTime() - now.getTime();
        setTimeLeft(`${truncatedTitle} commence dans ${formatDuration(diff)}`);
      } else if (end && now >= start && now <= end) {
        const diff = end.getTime() - now.getTime();
        setTimeLeft(
          `🟢 ${truncatedTitle} se termine dans ${formatDuration(diff)}`
        );
      } else {
        setTimeLeft(`⛔ ${truncatedTitle} terminé`);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate, title, maxLength]);

  return (
    <div
      onClick={() => navigate("/evements")}
      className="flex items-center cursor-pointer text-xs md:text-sm font-medium text-center md:text-left max-w-full"
      style={{ minWidth: 0 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-principal dark:text-white flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <span
        className="truncate  font-semibold mx-1"
        style={{
          maxWidth: maxLength === 200 ? "60rem" : "100%",
          minWidth: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={title}
      >
        {truncateText(title ?? "", maxLength)}
      </span>

      <span className="whitespace-nowrap flex-shrink-0">
        {timeLeft.replace(/^[^0-9]*\s*/, "")}
      </span>
    </div>
  );
};

export default EventTimer;
