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
} from "lucide-react";
const NavbarFirst = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useAuthContext();
  const { data } = useAsync(() => EventsServices.getLastEvent());

  const [eventEnded, setEventEnded] = useState(false);

  const eventStartDate = data?.debut;
  const eventEndDate = data?.fin;
  const eventInTime = data?.in;
  const eventOutTime = data?.out;
  const eventTitle = showingTranslateValue(data?.translations, lang)?.title;
  const [showDonate, setShowDonate] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 border-blue-100 shadow-md p-6">
      <div className="flex items-center gap-4 flex-nowrap overflow-auto">
        <div className="flex-shrink-0">
          <ButtonSearch
            onClick={() => navigate("/search-results-page")}
            label={t("Search")}
          />
        </div>
        <div className="ml-auto flex items-center gap-3 flex-shrink-0">
          <>
            <button
              onClick={() => setShowDonate(true)}
              className="bg-red-500 text-white text-[11px]  font-semibold px-2 py-2 rounded-md whitespace-nowrap flex items-center gap-1"
            >
              <HeartHandshake className="w-4 h-4 text-white animate-beat hover:animate-beat" />
              {t("Donate")}
            </button>
            <DonateModal
              isOpen={showDonate}
              onClose={() => setShowDonate(false)}
            />
          </>
          <button
            onClick={() => navigate("/aboutmedia")}
            className="bg-hover text-white text-[11px] font-semibold px-2 py-2 rounded-md whitespace-nowrap flex items-center gap-2"
          >
            <PlayCircleIcon className="w-4 h-4 text-white animate-wave  animate-wave" />
            {t("Media_resources")}
          </button>
        </div>
      </div>

      {!eventEnded && eventStartDate && (
        <div className="mt-4">
          <div>
            <div className="bg-slate-100 flex justify-center dark:bg-slate-900 rounded-md text-sm font-medium text-center select-none whitespace-nowrap">
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
        </div>
      )}
    </div>
  );
};

export default NavbarFirst;
