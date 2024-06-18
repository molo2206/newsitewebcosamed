import { useTranslation } from "react-i18next";
import SettingsServices from "../../services/SettingsServices";
import { useAuthContext } from "../../context";
import useAsync from "../../hooks/useAsync";
import { showingTranslateValue } from "../../utils/heleprs";
interface props {
  reverse?: any;
}
const BannerLastBlog = ({ reverse }: props) => {
  const { lang } = useAuthContext();
  const { t } = useTranslation();
  const { data } = useAsync(() => SettingsServices.getSettings());

  return (
    <section className=" bg-slate-100 dark:bg-slate-900 dark:text-white">
      <div className=" container flex flex-col items-center justify-center md:h-[300px]">
        <div className=" grid grid-cols-1 items-center gap-4 md:grid-cols-2">
          <div className={reverse ? "order-1" : ""}>
            <img
              src="https://picsum.photos/400/300"
              alt="not found"
              className=" mx-auto w-full h-[600px] p-4 max-w-[600px]"
            />
          </div>
          {/* text container */}
          <div
            className={`flex flex-col items-start gap-4 text-right 
          md:items-start md:p-8 md:text-left ${reverse ? "md:order-last" : ""}`}
          >
            <h1 className="text-2xl md:text-4xl">{t("Vision")}</h1>
            <p
              className="text-lg text-slate-600 dark:text-slate-200 font-montserrat "
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(data?.translations, lang)?.vision,
              }}
            ></p>
          </div>
          {/* image container */}
        </div>
      </div>
    </section>
  );
};

export default BannerLastBlog;
