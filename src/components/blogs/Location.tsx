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
            {t("Location")}
          </h1>
          <div className="">
            <div className="">
              <div style={{width: "100%"}}>
                <iframe
                  width={"100%"}
                  height={800}
                  frameBorder={0}
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://maps.google.com/maps?width=100%&amp;height=800&amp;hl=en&amp;q=14,%20avenue%20:La%20Froti%C3%A8re,%20Q.Katindo%20+(COSAMED%20asbl)&amp;t=k&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                >
                  <a href="https://www.gps.ie/">gps vehicle tracker</a>
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
