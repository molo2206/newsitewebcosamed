import { Suspense, lazy, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Globe, HeartHandshake, PlayCircleIcon } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import ButtonSearch from "../form/ButtonSearch";
import EventsServices from "../../services/EventsServices";
import useAsync from "../../hooks/useAsync";
import DonateModal from "../../pages/modal/DonateModal";
import { showingTranslateValue } from "../../utils/heleprs";
import { useLanguageContext } from "../../context/LanguageContext";
import useVisitor from "../../hooks/Visitors";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EventTimer = lazy(() => import("../bannerDetails/BannerEventTimer"));

const NavbarFirst = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguageContext();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data, loading } = useAsync(() => EventsServices.getLastEvent());
  const [eventEnded, setEventEnded] = useState(false);
  const [showDonate, setShowDonate] = useState(false);

  const eventStartDate = data?.debut;
  const eventEndDate = data?.fin;
  const eventInTime = data?.in;
  const eventOutTime = data?.out;
  const eventTitle = showingTranslateValue(data?.translations, language)?.title;

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectLanguage = (lang: string) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  const { registerVisitor } = useVisitor();
  const hasRegistered = useRef(false);

  useEffect(() => {
    if (hasRegistered.current) return;
    registerVisitor({
      type: "new",
      user_agent: navigator.userAgent,
      url: window.location.href,
    });
    hasRegistered.current = true;
  }, [registerVisitor]);

  const buttonCommonClasses =
    "text-[10px] font-medium rounded-md flex items-center gap-1 h-7 px-3 justify-center";

  return (
    <div className="bg-white dark:bg-slate-800 shadow-sm py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        {/* Bouton Recherche */}
        <div className="flex-shrink-0">
          <ButtonSearch
            onClick={() => navigate("/search-results-page")}
            label={t("Search")}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap justify-end min-h-[40px]">
          {loading ? (
            // Skeletons responsive
            <>
              <Skeleton
                height={32}
                width={96}
                baseColor="var(--skeleton-base)"
                highlightColor="var(--skeleton-highlight)"
              />
              <Skeleton
                height={32}
                width={80}
                baseColor="var(--skeleton-base)"
                highlightColor="var(--skeleton-highlight)"
              />
              <Skeleton
                height={32}
                width={112}
                baseColor="var(--skeleton-base)"
                highlightColor="var(--skeleton-highlight)"
              />
            </>
          ) : (
            <>
              {/* Dropdown Langue */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`bg-white dark:bg-slate-800 border dark:border-slate-700 text-gray-700 dark:text-gray-300 ${buttonCommonClasses}`}
                >
                  <Globe className="w-3 h-3" />
                  <ReactCountryFlag
                    className="rounded-md"
                    countryCode={language === "fr" ? "FR" : "GB"}
                    svg
                    style={{ width: "1.2em", height: "1.2em" }}
                  />
                  <span>{language.toUpperCase()}</span>
                  <span className="ml-1">▼</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 w-[106px] bg-principal dark:bg-slate-800 dark:border border-slate-700 shadow-lg z-40 rounded-md">
                    <button
                      className={`flex items-center gap-2 w-full px-4 py-2 text-[11px] font-semibold rounded-md ${
                        language === "en"
                          ? "bg-principal dark:bg-slate-800 dark:hover:bg-slate-900 text-white"
                          : "text-white hover:bg-hover dark:hover:bg-slate-900"
                      }`}
                      onClick={() => selectLanguage("en")}
                    >
                      <ReactCountryFlag
                        countryCode="GB"
                        svg
                        style={{ width: "1.2em", height: "1.2em" }}
                      />
                      English
                    </button>
                    <button
                      className={`flex items-center gap-2 w-full px-4 py-2 text-[11px] font-semibold rounded-md ${
                        language === "fr"
                          ? "bg-principal dark:hover:bg-slate-900 dark:bg-slate-800 text-white"
                          : "text-white hover:bg-hover dark:hover:bg-slate-900"
                      }`}
                      onClick={() => selectLanguage("fr")}
                    >
                      <ReactCountryFlag
                        countryCode="FR"
                        svg
                        style={{ width: "1.2em", height: "1.2em" }}
                      />
                      Français
                    </button>
                  </div>
                )}
              </div>

              {/* Bouton Donate */}
              <button
                onClick={() => setShowDonate(true)}
                className={`bg-red-500 text-white hidden md:inline-flex ${buttonCommonClasses}`}
              >
                <HeartHandshake className="w-3.5 h-3.5 animate-beat" />
                {t("Donate")}
              </button>

              <DonateModal
                isOpen={showDonate}
                onClose={() => setShowDonate(false)}
              />

              {/* Bouton Media Resources */}
              <button
                onClick={() => navigate("/aboutmedia")}
                className={`bg-principal hover:bg-hover hidden md:inline-flex dark:hover:bg-slate-900 dark:bg-slate-800 border dark:border-slate-700 text-white ${buttonCommonClasses}`}
              >
                <PlayCircleIcon className="w-3.5 h-3.5 animate-wave" />
                {t("Media_resources")}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Timer de l’événement */}
      {!eventEnded && eventStartDate && (
        <div className="mt-4 px-4">
          <div className="bg-slate-100 dark:bg-slate-900 rounded-md text-sm font-medium text-center min-h-[60px] flex items-center justify-center">
            <Suspense
              fallback={
                <div className="w-full px-4 py-4 flex flex-col items-center gap-2">
                  {/* Barre titre */}
                  <div className="w-2/3 h-4 rounded-md bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
                  {/* Barres sous-infos (dates/horaires) */}
                  <div className="w-1/2 h-3 rounded-md bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
                  <div className="w-1/3 h-3 rounded-md bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
                </div>
              }
            >
              <EventTimer
                startDate={eventStartDate}
                endDate={eventEndDate}
                title={eventTitle}
                inTime={eventInTime}
                outTime={eventOutTime}
                onEnd={() => setEventEnded(true)}
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarFirst;
