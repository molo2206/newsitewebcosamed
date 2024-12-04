import BlogServices from "../services/BlogsServices";
import useAsync from "../hooks/useAsync";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useNavigate } from "react-router-dom";
import SimpleBannerQuestionsDon from "../components/simpleBanner/SimpleBannerQuestionsDon";
const questions = [
  {
    question: "Qu'est-ce qu'un don?",
    answer:
      "Un don est un acte volontaire par lequel une personne offre une somme d'argent, des biens ou du temps sans contrepartie.",
  },
  {
    question: "Comment puis-je effectuer un don?",
    answer:
      "Vous pouvez effectuer un don en ligne via notre plateforme sécurisée, par virement bancaire ou en personne dans nos bureaux.",
  },
  {
    question: "Les dons sont-ils déductibles des impôts?",
    answer:
      "Oui, dans certains cas, vos dons peuvent être déductibles des impôts selon les lois de votre pays.",
  },
  {
    question: "Comment mes dons sont-ils utilisés?",
    answer:
      "Vos dons sont utilisés pour financer nos projets, soutenir les bénéficiaires et couvrir les frais opérationnels.",
  },
  {
    question: "Puis-je annuler ou modifier un don récurrent?",
    answer:
      "Oui, vous pouvez gérer vos dons récurrents depuis votre compte ou en contactant notre support.",
  },
];
const TouteslesQuestionsDon = () => {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate("/contact"); // Remplace "/about" par la route cible
  };
  const { data, loading } = useAsync(() => BlogServices.getBlog());
  console.log(data)
  //Get current blog
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white ">
          <div>
            <BreadCumb title={"Toutes les questions sur le don"} />
            <section className="mb-10">
              <SimpleBannerQuestionsDon />
              <h1 className=" mb-8 border-l-8 py-2 pl-2 text-center text-3xl font-bold">
                Trouvez des réponses à vos questions les plus fréquentes
                concernant les dons.
              </h1>
              <section
                className="bg-white  p-6 rounded-lg shadow-md dark:border-slate-50  border
               dark:bg-slate-800"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">
                  Questions Fréquemment Posées
                </h2>
                <ul className="space-y-4">
                  {questions.map((faq, index) => (
                    <li key={index} className="border-b pb-4">
                      <details className="group">
                        <summary className="text-lg font-medium text-gray-700 cursor-pointer dark:text-white">
                          {faq.question}
                          <span className="float-right group-open:rotate-180 transition-transform duration-200">
                            ⌄
                          </span>
                        </summary>
                        <p className="mt-2 text-gray-600 dark:text-white">
                          {faq.answer}
                        </p>
                      </details>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Call to Action */}
              <div className="mt-10 text-center">
                <h2 className="text-xl font-medium text-gray-800 mb-2 dark:text-white">
                  Vous avez encore des questions ?
                </h2>
                <p className="text-gray-600 dark:text-slate-300">
                  Contactez-nous et nous serons ravis de vous aider.
                </p>
                <button
                  onClick={goToAbout}
                  className="mt-4 px-6 py-2 bg-principal text-white rounded-md hover:bg-hover"
                >
                  Aller à la page contactez-nous
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default TouteslesQuestionsDon;
