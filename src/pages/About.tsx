import SettingsServices from "../services/SettingsServices";
import useAsync from "../hooks/useAsync";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import { useTranslation } from "react-i18next";
import BulletinLoad from "../components/blogs/BulletinLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import usePageSEO from "../components/Seo/usePageSEO";

const About = () => {
  const { data, loading } = useAsync(() => SettingsServices.getSettings());
  const { lang } = useAuthContext();
  const { t } = useTranslation();

  usePageSEO({
    title: t("AboutUs"),
    description: t("AboutUsDescription"),
    keywords: ["Santé", "Humanitaire", "ONG", "COSAMED"],
    ogTitle: "COSAMED asbl",
    ogDescription:
      "ONG reconnue en RDC pour son engagement dans la santé publique, l'humanitaire et le développement.",
    ogImage: "https://www.cosamed.org/assets/og-banner.jpg",
    ogUrl: window.location.href,
  });

  const translations = showingTranslateValue(data?.translations, lang);

  return loading ? (
    Array.from({ length: 8 }).map((_, i) => <BulletinLoad key={i} />)
  ) : (
    <main className="bg-white dark:bg-slate-900 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Fil d'Ariane */}
        <BreadCumb title={t("AboutUs")} />

        {/* Hero */}
        <section className="bg-[#0067b8] dark:bg-slate-800 text-white rounded-xl shadow-md mb-12 p-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide">
            {t("AboutUs")}
          </h1>
          <p className="mt-4 text-sm sm:text-base max-w-2xl mx-auto font-light opacity-90">
            {t("AboutUsDescription") ??
              "Nous œuvrons pour une santé équitable, inclusive et durable pour tous."}
          </p>
        </section>

        {/* Bloc À propos */}
        <section className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg border dark:border-slate-700 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t("WhoWeAre")}
          </h2>
          <p
             className="prose max-w-none text-gray-700 dark:text-gray-200 leading-relaxed font-light [&_p]:my-2 [&_br]:hidden"
            dangerouslySetInnerHTML={{
              __html: translations?.about_us || "",
            }}
          />
        </section>

        {/* MISSION */}
        <section className="flex flex-col md:flex-row items-center gap-10 mb-16 bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md border dark:border-slate-700">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {t("Mission")}
            </h3>
            <p
               className="prose max-w-none text-gray-700 dark:text-gray-200 leading-relaxed font-light [&_p]:my-2 [&_br]:hidden"
              dangerouslySetInnerHTML={{ __html: translations?.mission || "" }}
            />
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/assets/images/mission.svg"
              alt="Mission illustration"
              className="w-3/4 max-w-sm"
            />
          </div>
        </section>

        {/* VISION */}
        <section className="flex flex-col-reverse md:flex-row items-center gap-10 mb-16 bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md border dark:border-slate-700">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/assets/images/vision.svg"
              alt="Vision illustration"
              className="w-3/4 max-w-sm"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {t("Vision")}
            </h3>
            <p
               className="prose max-w-none text-gray-700 dark:text-gray-200 leading-relaxed font-light [&_p]:my-2 [&_br]:hidden"
              dangerouslySetInnerHTML={{ __html: translations?.vision || "" }}
            />
          </div>
        </section>

        {/* VALEURS */}
        <section className="bg-gray-100 dark:bg-slate-700 py-12 px-6 rounded-lg shadow-md mb-16 border dark:border-slate-600">
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
            {t("Our_Values")}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {[
              { key: "Professionalism", icon: "👨‍⚕️" },
              { key: "Responsibility", icon: "✅" },
              { key: "Mutual_respect", icon: "🤝" },
              { key: "Gender_sensitivity", icon: "♀️" },
              { key: "Excellence", icon: "🌟" },
              { key: "Equity", icon: "⚖️" },
              { key: "Inclusion", icon: "🌍" },
              { key: "Innovation", icon: "💡" },
            ].map((val, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 p-4 rounded-md hover:shadow transition-all"
              >
                <div className="text-3xl mb-2">{val.icon}</div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {t(val.key)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
