import React, { Suspense, lazy, useState, useRef, useEffect } from "react";
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
import Spinner from "react-bootstrap/Spinner";

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

  return (
    <div className="bg-white dark:bg-slate-800 shadow-sm py-3 w-full">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
        {/* Bouton Recherche */}
        <div className="flex-shrink-0">
          <ButtonSearch
            onClick={() => navigate("/search-results-page")}
            label={t("Search")}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap justify-end">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white dark:bg-slate-800 border dark:border-slate-700 text-gray-700 dark:text-gray-300 px-3 py-2 text-xs font-semibold rounded-md flex items-center gap-1"
            >
              <Globe className="w-4 h-4" />
              <ReactCountryFlag
                countryCode={language === "fr" ? "FR" : "GB"}
                svg
                style={{ width: "1.2em", height: "1.2em" }}
              />
              <span>{language.toUpperCase()}</span>
              <span className="ml-1">▼</span>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full  w-[100px] bg-principal dark:bg-slate-800 dark:border border-slate-700 shadow-lg z-40 rounded-md">
                <button
                  className={`flex items-center gap-2 w-full px-4 py-2 text-xs font-semibold rounded-md  ${
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
                  className={`flex items-center gap-2 w-full px-4 py-2 text-xs font-semibold rounded-md ${
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
          <button
            onClick={() => setShowDonate(true)}
            className="bg-red-500 text-white text-xs font-semibold rounded-md flex items-center gap-1 px-3 py-1.5"
          >
            <HeartHandshake className="w-4 h-4 animate-beat" />
            {t("Donate")}
          </button>
          <DonateModal
            isOpen={showDonate}
            onClose={() => setShowDonate(false)}
          />

          <button
            onClick={() => navigate("/aboutmedia")}
            className="bg-principal hover:bg-hover dark:hover:bg-slate-900 dark:bg-slate-800 border  dark:border-slate-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1"
          >
            <PlayCircleIcon className="w-4 h-4 animate-wave" />
            {t("Media_resources")}
          </button>
        </div>
      </div>

      {/* Affichage conditionnel du timer avec suspense et spinner centré */}
      {!eventEnded && eventStartDate && (
        <div className="mt-4 px-4">
          <div className="bg-slate-100 dark:bg-slate-900 rounded-md text-sm font-medium text-center min-h-[60px] flex items-center justify-center">
            <Suspense
              fallback={
                <Spinner
                  animation="border"
                  role="status"
                  variant="primary"
                  className="mx-auto"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
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
