import { Link } from "react-router-dom";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import useValidation from "../hooks/useValidation";
import TextArea from "../components/form/TextArea";
import Contact from "../hooks/Contact";
import Location from "../components/blogs/Location";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import BreadCumb from "../components/navbar/BreadCumb"


const ContactUs = () => {
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
      hanldeError("First name us is required", "first_name");
      valide = false;
    }
    if (!inputs.last_name) {
      hanldeError("Last name is required", "last_name");
      valide = false;
    }
    if (!inputs.email) {
      hanldeError("Email is required", "email");
      valide = false;
    }

    if (!inputs.phone) {
      hanldeError("Phone is required", "phone");
      valide = false;
    }

    if (!inputs.message) {
      hanldeError("Message is required", "message");
      valide = false;
    }

    if (valide) {
      createContact(inputs, setInputs);
    }
  };
  return (
    <div className="container dark:bg-slate-900 w-full dark:text-white ">
     
      <div className=" grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 row">
        <div className=" col-span-2 col-lg-8 col-md-8 px-2">
          <BreadCumb title={"Contact"}/>
          <Location />
        </div>
        <div className=" col-span-1 md:col-lg-4 col-md-4 gap-3 px-4 ">
          <div className="m-x-auto py-10">
            <div>
              <h2 className="font-montserrat mb-2 text-center text-xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Nous Contactez
              </h2>
              <p className="text-sm font-montserrat mb-2 font-base capitalize font-light font-font1 text-center text-slate-800 dark:text-light-gray-500 mt-2 dark:text-white">
                Envoyez un message via le formulaire indiqué. Si votre demande
                est urgente, veuillez utiliser les coordonnées ci-dessous.
              </p>
              <div className="px-4 ">
                <div className=" flex flex-col gap-3">
                  <div className="flex gap-3 mr-6 items-center justify-center text-center">
                    <a href="" className=" duration-200 hover:scale-105">
                      <FaTwitter className="text-3xl" />
                    </a>
                    <a href="" className=" duration-200 hover:scale-105">
                      <FaFacebook className=" text-3xl" />
                    </a>
                    <a
                      href="https://api.whatsapp.com/send?phone=243992036566"
                      className=" duration-200 hover:scale-105"
                    >
                      <FaWhatsapp className=" text-3xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <form className="mt-8 space-y-6 mb-8" onSubmit={validation}>
              <div className="space-y-px rounded-md items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  <Input
                    name="first_name"
                    label="VOTRE NOM"
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
                    label="VOTRE PRENOM"
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
                    label="EMAIL"
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
                    label="TELEPHONE"
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
                    placeholder="VOTRE MESSAGE"
                    type="text"
                    value={inputs.message}
                    onChange={(e: any) =>
                      handleOnChange(e.target.value, "message")
                    }
                    label={"VOTRE MESSAGE"}
                  />
                </div>
              </div>
              <Button label={"Envoyer"} loading={loadingForm} />
              <div className="justify-center items-center">
                <div className="mb-2">
                  <p className="text-sm font-montserrat text-slate-700 dark:text-slate-600 text-justify">
                    En cliquant sur Continuer, vous acceptez notre{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-principal font-bold"
                      target="_blank"
                    >
                      Politique de confidentialité
                    </Link>
                    . Vous recevrez peut-être des notifications par texto ou par
                    email de notre part.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
