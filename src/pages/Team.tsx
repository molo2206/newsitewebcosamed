import TeamsServices from "../services/TeamsServices";
import useAsync from "../hooks/useAsync";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import TeamCard from "../components/blogs/TeamCard";
import BreadCumb from "../components/navbar/BreadCumb";

import { useTranslation } from "react-i18next";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";
import usePageSEO from "../components/Seo/usePageSEO";

const Team = () => {
  const { data, loading } = useAsync(() => TeamsServices.getTeam());
  const { t } = useTranslation();
  usePageSEO({
    title: "Gouvernance",
    description: "Gouvernance",
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: "Cosamed asbl",
    ogDescription:
      "Est une association à but non lucratif reconnue par le gouvernement congolais et composée de prestataires de santé allant des agents de santé communautaires aux médecins.",
    ogImage: "https://www.cosamed.org/",
    ogUrl: window.location.href,
  });
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className=" dark:bg-slate-900 w-full dark:text-white p-6">
          <div>
            <BreadCumb title={t("Reports")} />
            <section className="mb-10">
              <header
                className="bg-principal dark:bg-slate-800 dark:text-white 
             text-white py-10"
              >
                <div className="p-6 mx-auto px-4 text-center">
                  <h1 className="text-4xl font-bold">
                    Rencontrez notre équipe
                  </h1>
                  <p className="mt-4 text-lg">
                    Nous sommes une équipe de professionnels dévoués qui
                    travaillent pour réaliser de grandes choses.
                  </p>
                </div>
              </header>

              {/* Team Members Section */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-10">
                {loading
                  ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                  : data.map(
                      (
                        member: {
                          image: string | undefined;
                          full_name:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | null
                            | undefined;
                          fonction:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | Iterable<ReactNode>
                            | null
                            | undefined;
                        },
                        index: Key | null | undefined
                      ) => <TeamCard team={member} key={index} />
                    )}
              </section>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Team;
