import { useTranslation } from "react-i18next";
const Location = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <div className="pb-10">
          <h1
            className=" inline-block border-l-8 border-primary/50 py-2
                 pl-2 mb-4 text-xl font-bold sm:text-3xl"
          >
            {t('Location')}
          </h1>
          <div className="">
            <div className="">
              <iframe
                width="100%"
                height="700"
                src="https://maps.google.com/maps?width=100%25&amp;height=700&amp;hl=en&amp;q=14,%20avenue%20:La%20Froti%C3%A8re,%20Q.Katindo,%20Commune%20de%20Goma,%20Ville%20de%20Goma,%20RDC+(COSAMED%20asbl)&amp;t=k&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              >
                <a href="https://www.gps.ie/">gps systems</a>
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
