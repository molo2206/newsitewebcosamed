import { CalendarDaysIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface EventTimerProps {
  startDate: string; // format "DD/MM/YYYY"
  endDate?: string; // format "DD/MM/YYYY"
  title?: string;
  inTime?: string; // format "HH:mm"
  outTime?: string; // format "HH:mm"
  onEnd?: () => void;
}

const parseDateTime = (
  dateString?: string,
  timeString?: string
): Date | null => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("/").map(Number);
  let hours = 0,
    minutes = 0;
  if (timeString) {
    const parts = timeString.split(":");
    hours = parseInt(parts[0], 10) || 0;
    minutes = parseInt(parts[1], 10) || 0;
  }
  return new Date(year, month - 1, day, hours, minutes);
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
  return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
};

const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const EventTimer = ({
  startDate,
  endDate,
  title,
  inTime,
  outTime,
  onEnd,
}: EventTimerProps) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [loading, setLoading] = useState(true);
  const [maxLength, setMaxLength] = useState(80);
  const hasCalledOnEnd = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateMaxLength = () => {
      setMaxLength(window.innerWidth >= 768 ? 200 : 80);
    };
    updateMaxLength();
    window.addEventListener("resize", updateMaxLength);
    return () => window.removeEventListener("resize", updateMaxLength);
  }, []);

  useEffect(() => {
    const start = parseDateTime(startDate, inTime);
    const end = parseDateTime(endDate, outTime);
    if (!start) return;

    const timeout = setTimeout(() => setLoading(false), 500); // simulate loading delay

    const interval = setInterval(() => {
      const now = new Date();
      const truncatedTitle = truncateText(title ?? "", maxLength);
      const inOutDisplay = [
        inTime ? `Heure début: ${inTime}` : null,
        outTime ? `Heure fin: ${outTime}` : null,
      ]
        .filter(Boolean)
        .join(" | ");

      if (isSameDay(now, start) && (!end || now < end)) {
        setTimeLeft(`${truncatedTitle} aujourd’hui. ${inOutDisplay}`);
      } else if (now < start) {
        const diff = start.getTime() - now.getTime();
        setTimeLeft(
          `${truncatedTitle} commence dans ${formatDuration(
            diff
          )}. ${inOutDisplay}`
        );
      } else if (end && now >= start && now <= end) {
        const diff = end.getTime() - now.getTime();
        setTimeLeft(
          `${truncatedTitle} se termine dans ${formatDuration(
            diff
          )}. ${inOutDisplay}`
        );
      } else {
        setTimeLeft(`${truncatedTitle} terminé.`);
        clearInterval(interval);
        if (!hasCalledOnEnd.current) {
          hasCalledOnEnd.current = true;
          onEnd?.();
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [startDate, endDate, title, inTime, outTime, maxLength, onEnd]);

  return (
    <div
      onClick={() => navigate("/evements")}
      className="cursor-pointer max-w-full p-4 rounded-md"
    >
      {loading ? (
        <div className="animate-pulse flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <div className="h-4 w-3/4 bg-slate-300 dark:bg-slate-700 rounded"></div>
        </div>
      ) : (
        <div className="flex items-start gap-2 text-xs md:text-sm font-semibold text-center md:text-left break-words leading-snug">
          <CalendarDaysIcon className="h-4 w-4 mt-0.5 shrink-0 text-current" />
          <span className="whitespace-normal break-words">{timeLeft}</span>
        </div>
      )}
    </div>
  );
};

export default EventTimer;
