import SettingsServices from "../services/SettingsServices";
import useAsync from "../hooks/useAsync";
import { showingTranslateValue } from "../utils/heleprs";
import { useTranslation } from "react-i18next";
import BreadCumb from "../components/navbar/BreadCumb";
import usePageSEO from "../components/Seo/usePageSEO";
import { useLanguageContext } from "../context/LanguageContext";
import AboutLoad from "../components/hero/AboutLoad";

const About = () => {
  const { data, loading } = useAsync(() => SettingsServices.getSettings());
  const { language: lang } = useLanguageContext();
  const { t } = useTranslation();
  const translations = showingTranslateValue(data?.translations, lang);

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <AboutLoad key={i} />
        ))}
      </div>
    );
  }

  return (
    <main className="bg-white dark:bg-slate-900 w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <BreadCumb title={t("AboutUs")} />

        <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
          <h1 className="text-[16px] font-bold uppercase tracking-widest">
            {t("AboutUs")}
          </h1>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="space-y-6">
            <p
              className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm sm:text-base font-light [&_strong]:font-normal [&_b]:font-normal"
              dangerouslySetInnerHTML={{ __html: translations?.about_us || "" }}
            />
            <span className="inline-block bg-blue-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
              {t("Mission")}
            </span>
            <img
              src="https://apicosamed.cosamed.org/uploads/media/94b5bde6de888ddf9cde6748ad2523d1.png"
              alt="Mission COSAMED"
              className="w-full h-[300px] object-cover rounded-md shadow-md"
            />
            <p
              className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm sm:text-base font-light [&_strong]:font-normal [&_b]:font-normal"
              dangerouslySetInnerHTML={{ __html: translations?.mission || "" }}
            />
          </div>

          <div className="space-y-6">
            <span className="inline-block bg-blue-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
              {t("Vision")}
            </span>
            <img
              src="https://apicosamed.cosamed.org/uploads/media/d0b4e54ddd9f0982db522becb8041071.png"
              alt="Vision COSAMED"
              className="w-full h-[300px] object-cover rounded-md shadow-md"
            />
            <p
              className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm sm:text-base font-light [&_strong]:font-normal [&_b]:font-normal"
              dangerouslySetInnerHTML={{ __html: translations?.vision || "" }}
            />
            <span className="inline-block bg-blue-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
              {t("OurDomains", "Domaines d'activité")}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                "Éducation sanitaire",
                "Offre de services de soins de santé",
                "Recherche et numerique",
              ].map((domain, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-gray-50 dark:bg-slate-800 p-4 dark:border-slate-600 rounded-md"
                >
                  <p className="text-gray-700 dark:text-gray-200 text-sm leading-snug font-light">
                    {domain}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="bg-gray-100 dark:bg-slate-800 p-6 shadow-md mb-10 rounded-md">
          <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-8">
            {t("OurAddresses", "Nos adresses")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                city: "Kinshasa",
                address: "Avenue des Huileries 10, Gombe, Kinshasa",
                phone: "+243 900 000 001",
              },
              {
                city: "Lubumbashi",
                address: "Boulevard Kamanyola 15, Lubumbashi",
                phone: "+243 900 000 002",
              },
              {
                city: "Goma",
                address: "Rue de la Paix 22, Goma",
                phone: "+243 900 000 003",
              },
            ].map((loc, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 bg-white dark:bg-slate-800 rounded-md border border-gray-200 dark:border-slate-600 p-6 hover:shadow-sm transition"
              >
                <h4 className="text-base font-medium text-gray-800 dark:text-white">
                  {loc.city}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{loc.address}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{loc.phone}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
