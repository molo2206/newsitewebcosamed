import BlogServices from "../services/BlogsServices";
import useAsync from "../hooks/useAsync";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useTranslation } from "react-i18next";
import Contact from "../hooks/Contact";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import useValidation from "../hooks/useValidation";
import TextArea from "../components/form/TextArea";
import { Link } from "react-router-dom";
import SimpleBannerToutSavoir from "../components/simpleBanner/SimpleBannerToutSavoir";

const ToutSavoirSurDon = () => {
  const { data, loading } = useAsync(() => BlogServices.getBlog());
  //Get current blog
  console.log(data);
  const { t } = useTranslation();
  const { createContact, loading: loadingForm } = Contact();

  const { inputs, errors, handleOnChange, hanldeError, setInputs } =
    useValidation({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
    });
  const validation = (e: any) => {
    e.preventDefault();

    let valide = true;
    if (!inputs.first_name) {
      hanldeError(t("Error_First_name"), "first_name");
      valide = false;
    }
    if (!inputs.last_name) {
      hanldeError(t("Error_Last_name"), "last_name");
      valide = false;
    }
    if (!inputs.email) {
      hanldeError(t("Error_Email"), "email");
      valide = false;
    }

    if (!inputs.phone) {
      hanldeError(t("Error_Phone"), "phone");
      valide = false;
    }

    if (!inputs.message) {
      hanldeError(t("Error_Message"), "message");
      valide = false;
    }

    if (valide) {
      createContact(inputs, setInputs);
    }
  };

  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white ">
          <div>
            <BreadCumb title={"Obtenir toutes les informations sur le don"} />
            <section className="mb-10">
              <SimpleBannerToutSavoir />
              <h1 className=" mb-8 border-l-8 py-2 pl-2 text-center text-3xl font-bold">
                Découvrez l'impact de votre générosité et comment vos
                contributions changent des vies.
              </h1>

              {/* <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {loading
                  ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                  : currentBlogs.map((item: any, index: number) => (
                      <BlogCard blog={item} key={index} />
                    ))}
              </div> */}
              <section className="py-16 px-6 md:px-12 lg:px-24 bg-white dark:bg-slate-900 w-full dark:text-white">
                <h2 className="text-2xl font-semibold text-center mb-8">
                  Pourquoi choisir le don régulier ?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Benefit 1 */}
                  <div className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition">
                    <h3 className="text-lg font-bold text-blue-600 mb-2">
                      Simplicité
                    </h3>
                    <p>
                      Configurez une fois vos dons et contribuez sans effort à
                      nos actions tout au long de l'année.
                    </p>
                  </div>
                  {/* Benefit 2 */}
                  <div className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition">
                    <h3 className="text-lg font-bold text-blue-600 mb-2">
                      Impact durable
                    </h3>
                    <p>
                      Les dons réguliers permettent de planifier et de soutenir
                      des projets à long terme.
                    </p>
                  </div>
                  {/* Benefit 3 */}
                  <div className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition">
                    <h3 className="text-lg font-bold text-blue-600 mb-2">
                      Flexibilité
                    </h3>
                    <p>
                      Modifiez ou annulez votre engagement à tout moment, selon
                      vos besoins.
                    </p>
                  </div>
                </div>
              </section>

              {/* Call to Action Section */}
              <section className="bg-blue-100 py-16 px-6 md:px-12 lg:px-24 text-center border rounded-lg dark:bg-slate-900 w-full dark:text-white">
                <h2 className="text-2xl font-semibold mb-6">
                  Prêt à faire la différence ?
                </h2>
                <p className="mb-8">
                  Rejoignez notre communauté de donateurs réguliers et
                  contribuez à créer un monde meilleur.
                </p>
                <a
                  href="/donation"
                  className="bg-principal text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-hover transition"
                >
                  Devenir donateur régulier
                </a>
              </section>

              {/* Contact Form Section */}
              <section
                id="contact"
                className="py-16 px-6 md:px-12 lg:px-24 bg-white text-gray-800 dark:bg-slate-900 w-full dark:text-white"
              >
                <h2 className="text-2xl font-semibold text-center mb-8">
                  Contactez-nous pour en savoir plus
                </h2>
                <div>
                  <form className="mt-8 space-y-6 mb-8" onSubmit={validation}>
                    <div className="space-y-px rounded-md items-center">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <Input
                          name="first_name"
                          label={t("Name")}
                          placeholder=""
                          type="text"
                          errors={errors.first_name}
                          value={inputs.first_name}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "first_name")
                          }
                        />
                        <Input
                          name="last_name"
                          label={t("Prename")}
                          placeholder=""
                          type="text"
                          errors={errors.last_name}
                          value={inputs.last_name}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "last_name")
                          }
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <Input
                          name="email"
                          label={t("Enter_email")}
                          placeholder=""
                          type="text"
                          errors={errors.email}
                          value={inputs.email}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "email")
                          }
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <Input
                          name="phone"
                          label={t("Phone")}
                          placeholder=""
                          type="phone"
                          errors={errors.phone}
                          value={inputs.phone}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "phone")
                          }
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <TextArea
                          name="message"
                          placeholder={t("Message")}
                          type="text"
                          value={inputs.message}
                          onChange={(e: any) =>
                            handleOnChange(e.target.value, "message")
                          }
                          label={t("Message")}
                        />
                      </div>
                    </div>
                    <Button label={t("SendMessage")} loading={loadingForm} />
                    <div className="justify-center items-center">
                      <div className="mb-2">
                        <p className="text-sm font-montserrat text-slate-700 dark:text-slate-600 text-justify">
                          {t("Politic_clic")}
                          <Link
                            to="/privacy-policy"
                            className="text-principal font-bold"
                            target="_blank"
                          >
                            {t("To_clic_politic")}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </section>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ToutSavoirSurDon;
