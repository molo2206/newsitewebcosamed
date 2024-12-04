import { useAuthContext } from "../../context";
import { showingTranslateValue } from "../../utils/heleprs";

interface props {
  event?: any;
}

const EventCard = ({ event }: props) => {
  const { lang } = useAuthContext();
  return (
    <div>
      <div
        key={event.id}
        className="border-b pb-4 flex justify-between items-center"
      >
        {/* Event Details */}
        <div>
          <h3
            className="text-xl font-semibold text-gray-800 dark:text-white"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(event?.translations, lang)?.title,
            }}
          >
          </h3>
          <p className="text-sm text-gray-600 dark:text-white">
            <span className="font-medium">Date:</span> {event?.debut} -
            {event?.fin}
            <br />
            <span className="font-medium ">Heure:</span> {event?.in} -{" "}
            {event?.out}
          </p>
          <p className="text-sm text-gray-600 dark:text-white">
            <span className="font-medium">Lieu:</span> {event?.country.name}
          </p>
          <p
            className="text-gray-700 mt-2 dark:text-white line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(event?.translations, lang)
                ?.description,
            }}
          ></p>
        </div>

        {/* Action Button */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Réserver
        </button>
      </div>
    </div>
  );
};

export default EventCard;
