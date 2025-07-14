import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HeartHandshake, PlayCircleIcon } from "lucide-react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";

import ButtonSearch from "../form/ButtonSearch";
import EventTimer from "../bannerDetails/BannerEventTimer";
import EventsServices from "../../services/EventsServices";
import useAsync from "../../hooks/useAsync";
import DonateModal from "../../pages/modal/DonateModal";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import { useThemeContext } from "../../context/useThemeContext";

const NavbarFirst = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { settings, toggleTheme } = useThemeContext();
  const theme = settings.theme;

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
        {/* Bouton recherche */}
        <div className="flex-shrink-0">
          <ButtonSearch
            onClick={() => navigate("/search-results-page")}
            label={t("Search")}
          />
        </div>

        {/* Boutons à droite */}
        <div className="ml-auto flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
          {/* ✅ Theme switcher */}
          <div className="px-2 flex cursor-pointer">
            {theme === "dark" ? (
              <BiSolidSun
                size={18}
                className="rounded-full border border-slate-400 dark:border-slate-700 text-yellow-400"
                onClick={toggleTheme}
                title={t("Switch to light mode")}
              />
            ) : (
              <BiSolidMoon
                size={18}
                className="rounded-full border border-slate-400 dark:border-slate-700 text-slate-700"
                onClick={toggleTheme}
                title={t("Switch to dark mode")}
              />
            )}
          </div>

          {/* Bouton DONATE */}
          <button
            onClick={() => setShowDonate(true)}
            className="bg-red-500 text-white text-[11px] font-semibold rounded-md flex items-center gap-1 px-3 py-1.5"
          >
            <HeartHandshake className="w-4 h-4 animate-beat" />
            {t("Donate")}
          </button>

          <DonateModal
            isOpen={showDonate}
            onClose={() => setShowDonate(false)}
          />

          {/* Bouton MEDIA */}
          <button
            onClick={() => navigate("/aboutmedia")}
            className="bg-hover text-white text-[11px] font-semibold px-3 py-1.5 rounded-md flex items-center gap-1"
          >
            <PlayCircleIcon className="w-4 h-4 animate-wave" />
            {t("Media_resources")}
          </button>
        </div>
      </div>

      {/* Timer d’événement */}
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
