import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";
import { useState } from "react";
import DonateModal from "../../pages/modal/DonateModal";

const Footer = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();

  const [showDonate, setShowDonate] = useState(false);

  const getDate = () => new Date().getFullYear();

  return (
    <footer className="text-white bg-principal py-8 font-montserrat dark:border-slate-700 bg-principal dark:bg-slate-800 text-white border-primary/50">
      <div className="container mx-auto grid md:grid-cols-6 gap-8 px-4">
        <div>
          <h3 className="font-bold mb-4">QUI SOMMES-NOUS</h3>
          <ul className="space-y-4 text-[12px]">
            <li>
              <a
                className=" cursor-pointer"
                onClick={() => navigation("/about")}
              >
                A propos
              </a>
            </li>
            <li>
              <a
                className=" cursor-pointer"
                onClick={() => navigation("/team")}
              >
                Gouvernance et direction
              </a>
            </li>
            <li>
              <a
                className=" cursor-pointer"
                onClick={() => navigation("/transparence")}
              >
                Financements & transparence
              </a>
            </li>
            <li>
              <a
                className=" cursor-pointer"
                onClick={() => navigation("/who-we-are/history")}
              >
                Notre histoire
              </a>
            </li>
            <li>
              <a
                className=" cursor-pointer"
                onClick={() => navigation("/partners")}
              >
                Nos partenaires
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">NOS ACTIONS</h3>
          <ul className="space-y-4 text-[12px]">
            <li>
              <a
                className=" cursor-pointer"
                onClick={() => navigation("/aide-sanitaire")}
              >
                Aide sanitaire
              </a>
            </li>
            <li>
              <a
                className=" cursor-pointer"
                onClick={() => navigation("/domaines/urgence")}
              >
                Urgences humanitaires
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">MÉDIAS & PUBLICATIONS</h3>
          <ul className="space-y-2 text-[12px]">
            <li>
              <a
                className=" cursor-pointer"
                onClick={() => navigation("/data-loading/blogs")}
              >
                Actualités
              </a>
            </li>
            <li>
              <a
                className=" cursor-pointer"
                onClick={() => navigation("/load-data/communicated")}
              >
                Communiqués de presse
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">IMPLIQUEZ-VOUS</h3>
          <ul className="space-y-2 text-[12px]">
            <li>
              <a
                className=" cursor-pointer"
                onClick={() => navigation("/job_openings")}
              >
                Carrières
              </a>
            </li>
            <li>
              <a
                className=" cursor-pointer"
                onClick={() => navigation("/community/join")}
              >
                Devenir volontaire
              </a>
            </li>
            <li>
              <button
                onClick={() => setShowDonate(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 text-[12px] rounded"
              >
                {t("Donate")}
              </button>
            </li>
            <li>
              <a href="/contact">Nous contacter</a>
            </li>
          </ul>
          <DonateModal
            isOpen={showDonate}
            onClose={() => setShowDonate(false)}
          />
        </div>

        <div>
          <h3 className="font-bold mb-4">POLITIQUES</h3>
          <ul className="space-y-2 text-[12px]">
            <li>
              <a
                className=" cursor-pointer"
                onClick={() => navigation("/confidentiality")}
              >
                Confidentialité
              </a>
            </li>
            <li>
              <a
                className=" cursor-pointer"
                onClick={() => navigation("/terms-of-service")}
              >
                Conditions d’utilisation
              </a>
            </li>
            <li>
              <a
                className=" cursor-pointer"
                onClick={() => navigation("/accessibility")}
              >
                Accessibilité
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">CONTACT & URGENCE</h3>
          <p className="text-[12px] mb-2">Besoin d’aide ? Contactez-nous à :</p>
          <a
            href="mailto:info@cosamed.org"
            target="_blank"
            className="text-[12px] text-white underline"
          >
            info@cosamed.org
          </a>
          <div className="flex gap-4 mt-4 text-white text-lg">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF size={13} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter size={13} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn size={13} />
            </a>
            <a href="mailto:info@cosamed.org" target="_blank" rel="noreferrer">
              <FaEnvelope size={13} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-[12px] text-white border-t border-white/20 pt-4">
        © {getDate()} COSAMED asbl — Tous droits réservés | Une ONG engagée pour
        la santé publique et la dignité humaine.
      </div>
    </footer>
  );
};

export default Footer;
