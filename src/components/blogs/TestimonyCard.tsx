import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  testimony?: any;
  index?: any;
}
const TestimonyCard = ({ testimony, index }: props) => {
  const { lang } = useAuthContext();
  return (
    <div>
      <div
        key={index}
        className="bg-white dark:bg-slate-800  rounded-lg border shadow-md p-6 flex flex-col"
      >
        <p
          className="text-gray-600 italic dark:text-white font-semibold"
          dangerouslySetInnerHTML={{
            __html: showingTranslateValue(testimony?.translations, lang)
              ?.message,
          }}
        ></p>
        <div className=" flex justify-right space-x-2">
          <img
            src={testimony?.image}
            className=" h-[40px] w-[40px] rounded-full duration-200 "
          />
          <p className=" line-clamp-1 mt-1 dark:text-white">
            — {testimony?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonyCard;
