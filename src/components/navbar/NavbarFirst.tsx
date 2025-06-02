import InputSearch from "../form/InputSearch";
import ButtonSearch from "../form/ButtonSearch";
import useValidation from "../../hooks/useValidation";
import { useNavigate } from "react-router-dom";
import { ApplyForm } from "../../types";
import { useTranslation } from "react-i18next";
import EventTimer from "../bannerDetails/BannerEventTimer";
import EventsServices from "../../services/EventsServices";
import useAsync from "../../hooks/useAsync";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

const NavbarFirst = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useAuthContext();
  const { data } = useAsync(() => EventsServices.getLastEvent());

  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation<ApplyForm>({ keyword: "" });

  const validation = (e: any) => {
    e.preventDefault();
    if (!inputs.keyword) {
      hanldeError("keyword is required", "keyword");
      return;
    }
    navigate("/search?q=" + inputs.keyword);
  };

  const eventStartDate = data?.debut;
  const eventEndDate = data?.fin;
  const eventTitle = showingTranslateValue(data?.translations, lang)?.title;

  const isEventUpcoming = () => {
    if (!eventStartDate) return false;

    const [day, month, year] = eventStartDate.split("/").map(Number);
    const startDateObj = new Date(year, month - 1, day);
    const now = new Date();

    return now < startDateObj;
  };

  return (
    <div className="bg-white dark:bg-slate-800 border-b border-blue-100 shadow-md px-4 py-6">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-4">
        <div className="w-full lg:w-2/3 flex justify-center lg:justify-start items-center gap-3">
          <form
            onSubmit={validation}
            className="w-full max-w-md flex flex-col sm:flex-row items-center gap-3"
          >
            <InputSearch
              name="keyword"
              placeholder={t("Search")}
              type="text"
              errors={errors.keyword}
              value={inputs.keyword}
              onChange={(e: any) => handleOnChange(e.target.value, "keyword")}
            />
          </form>

          <div>
            <ButtonSearch label="" loading={""} />
          </div>
        </div>

        {eventStartDate && isEventUpcoming() && (
          <div className="w-full lg:w-2/3 flex justify-center">
            <div className="bg-slate-100 dark:bg-slate-900 text-principal p-2 rounded-full text-sm font-medium text-center select-none max-w-full">
              <EventTimer
                startDate={eventStartDate}
                endDate={eventEndDate}
                title={eventTitle}
              />
            </div>
          </div>
        )}

        <div className="w-full lg:w-1/3 flex justify-center lg:justify-end items-center gap-4">
          <button
            onClick={() => navigate("/donation")}
            className="hidden sm:inline-block bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-md"
          >
            {t("Donate")}
          </button>
          <span
            onClick={() => navigate("/aboutmedia")}
            className="hidden sm:inline-block text-gray-700 dark:text-white text-sm cursor-pointer hover:text-hover"
          >
            {t("Media_resources")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavbarFirst;
