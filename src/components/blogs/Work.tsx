// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const Work = () => {
  // const notify = () => toast("En cours de développement");
  const { t } = useTranslation();
  return (
    <section className=" bg-slate-100  dark:bg-slate-900 dark:text-white rounded-lg shadow-md mb-12">
      <div className=" container flex flex-col items-center justify-center py-2 md:h-[300px]">
        <div className={"order-1"}>
          <h1 className="py-2 pl-2 text-left md:text-3xl sm:text-2xl font-bold">{t('OurWork')}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-200 font-montserrat mx-auto w-full p-4  ">
            Constituer une équipe multidisciplinaire disponible et efficace pour
            l’éducation sanitaire des populations, la recherche sur les
            problèmes de santé et le rapprochement des soins de santé primaires
            aux personnes vulnérables, aux plus marginalisées ainsi qu’aux
            malades chroniques.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Work;
