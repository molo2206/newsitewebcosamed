import { useTranslation } from "react-i18next";

const NewsLetter = () => {
    const { t } = useTranslation();
  return (
    <div>
      <section className="text-center bg-blue-50 p-10 rounded-lg mt-20">
        <h2 className="text-2xl font-semibold text-gray-800">{t('Stay_inform')}</h2>
        <p className="text-gray-600 mt-2">
          {t('Subscribe_to_receive')}
        </p>
        <form className="mt-6 max-w-md mx-auto flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder={t('Enter_email')}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {t('Suscribe')}
          </button>
        </form>
      </section>
    </div>
  );
};

export default NewsLetter;
