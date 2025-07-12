import ButtonSearch from "../form/ButtonSearch";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EventTimer from "../bannerDetails/BannerEventTimer";
import EventsServices from "../../services/EventsServices";
import useAsync from "../../hooks/useAsync";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import { useState } from "react";
import DonateModal from "../../pages/modal/DonateModal";
import {
  HeartHandshake,
  PlayCircleIcon,
  Globe,
} from "lucide-react";
import { FaFlag, FaSearch } from "react-icons/fa";

const NavbarFirst = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useAuthContext();
  const { data } = useAsync(() => EventsServices.getLastEvent());

  const [eventEnded, setEventEnded] = useState(false);
  const [showDonate, setShowDonate] = useState(false);

  const eventStartDate = data?.debut;
  const eventEndDate = data?.fin;
  const eventInTime = data?.in;
  const eventOutTime = data?.out;
  const eventTitle = showingTranslateValue(data?.translations, lang)?.title;

  return (
    <div className="bg-white dark:bg-slate-800 border-b border-blue-100 shadow-sm px-4 py-3">
      <div className="flex items-center gap-4 overflow-x-auto">
        {/* Left side: search button */}
        <div className="flex-shrink-0">
          <ButtonSearch
            onClick={() => navigate("/search-results-page")}
            label={t("Search")}
            
          />
        </div>

        {/* Right side buttons */}
        <div className="ml-auto flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
          {/* Language Selector (static 🇫🇷 as in image) */}
          <button className="bg-hover text-white px-3 py-2 text-xs font-semibold rounded-md flex items-center gap-1">
            <Globe className="w-4 h-4" />
            <span role="img" aria-label="fr">🇫🇷</span>
            <span>FR</span>
          </button>

          {/* DONATE */}
          <button
            onClick={() => setShowDonate(true)}
            className="bg-red-500 text-white text-xs font-semibold px-3 py-2 rounded-md flex items-center gap-1"
          >
            <HeartHandshake className="w-4 h-4 animate-beat" />
            {t("Donate")}
          </button>
          <DonateModal isOpen={showDonate} onClose={() => setShowDonate(false)} />

          {/* MEDIA */}
          <button
            onClick={() => navigate("/aboutmedia")}
            className="bg-hover text-white text-xs font-semibold px-3 py-2 rounded-md flex items-center gap-1"
          >
            <PlayCircleIcon className="w-4 h-4 animate-wave" />
            {t("Media_resources")}
          </button>
        </div>
      </div>

      {/* Event timer (only if active) */}
      {!eventEnded && eventStartDate && (
        <div className="mt-4">
          <div className="bg-slate-100 dark:bg-slate-900 rounded-md text-sm font-medium text-center">
            <EventTimer
              startDate={eventStartDate}
              endDate={eventEndDate}
              title={eventTitle}
              inTime={eventInTime}
              outTime={eventOutTime}
              onEnd={() => setEventEnded(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarFirst;
