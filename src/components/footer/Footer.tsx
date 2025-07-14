import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();

  const donatelink = () => {
    navigation("/donate");
  };
  const getDate = () => new Date().getFullYear();

  return (
    <footer className="text-white bg-principal py-8 font-montserrat dark:border-slate-700 bg-principal dark:bg-slate-800 text-white border-primary/50">
      <div className="container mx-auto grid md:grid-cols-6 gap-8 px-4">
        {/* QUI SOMMES-NOUS */}
        <div>
          <h3 className="font-bold mb-4">QUI SOMMES-NOUS</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about">A propos</a></li>
            <li><a href="/team">Gouvernance et direction</a></li>
            <li><a href="/transparence">Financements & transparence</a></li>
            <li><a href="/histoire">Notre histoire</a></li>
            <li><a href="/partenaires">Nos partenaires</a></li>
          </ul>
        </div>

        {/* NOS ACTIONS */}
        <div>
          <h3 className="font-bold mb-4">NOS ACTIONS</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/aide-sanitaire">Aide sanitaire</a></li>
            <li><a href="/urgences">Urgences humanitaires</a></li>
            <li><a href="/renforcement">Renforcement communautaire</a></li>
          </ul>
        </div>

        {/* MÉDIAS & PUBLICATIONS */}
        <div>
          <h3 className="font-bold mb-4">MÉDIAS & PUBLICATIONS</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/data-loading/blogs">Actualités</a></li>
            <li><a href="/load-data/communicated">Communiqués de presse</a></li>
          </ul>
        </div>

        {/* IMPLIQUEZ-VOUS */}
        <div>
          <h3 className="font-bold mb-4">IMPLIQUEZ-VOUS</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/job_openings">Carrières</a></li>
            <li><a href="/community/join">Devenir volontaire</a></li>
            <li>
              <button
                onClick={donatelink}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 text-sm rounded"
              >
                Faire un don
              </button>
            </li>
            <li><a href="/contact">Nous contacter</a></li>
          </ul>
        </div>

        {/* POLITIQUES */}
        <div>
          <h3 className="font-bold mb-4">POLITIQUES</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/confidentiality">Confidentialité</a></li>
            <li><a href="/terms">Conditions d’utilisation</a></li>
            <li><a href="/don-policy">Politique de dons</a></li>
            <li><a href="/code">Code de conduite</a></li>
            <li><a href="/accessibility">Accessibilité</a></li>
            <li><a href="/cookies">Politique de cookies</a></li>
          </ul>
        </div>

        {/* CONTACT & URGENCE */}
        <div>
          <h3 className="font-bold mb-4">CONTACT & URGENCE</h3>
          <p className="text-sm mb-2">Besoin d’aide ? Contactez-nous à :</p>
          <a
            href="mailto:cosamed17@gmail.com"
            className="text-sm text-white underline"
          >
            cosamed17@gmail.com
          </a>
          <div className="flex gap-4 mt-4 text-white text-lg">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="mailto:cosamed17@gmail.com">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-10 text-center text-sm text-white border-t border-white/20 pt-4">
        © {getDate()} COSAMED asbl — Tous droits réservés | Une ONG engagée pour la santé publique et la dignité humaine.
      </div>
    </footer>
  );
};

export default Footer;
