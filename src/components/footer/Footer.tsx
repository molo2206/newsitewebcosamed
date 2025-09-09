import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";
import DonateModal from "../../pages/modal/DonateModal";

const Footer = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const [showDonate, setShowDonate] = useState(false);
  const getDate = () => new Date().getFullYear();

  return (
    <footer className="bg-principal dark:bg-slate-800 text-white font-montserrat border-t border-primary/50">
      {/* Wrapper centralisé */}
      <div className="max-w-7xl mx-auto px-6  py-8 grid md:grid-cols-6 gap-8">
        {/* Qui sommes-nous */}
        <div>
          <h3 className="font-bold mb-4 text-sm">{t("AboutUs")}</h3>
          <ul className="space-y-4 text-[13px]">
            <li>
              <a
                onClick={() => navigation("/about")}
                className="cursor-pointer"
              >
                {t("AboutUs")}
              </a>
            </li>
            <li>
              <a onClick={() => navigation("/team")} className="cursor-pointer">
                {t("Governance")}
              </a>
            </li>
            <li>
              <a
                onClick={() => navigation("/transparence")}
                className="cursor-pointer"
              >
                {t("Funding_transparency")}
              </a>
            </li>
            <li>
              <a
                onClick={() => navigation("/who-we-are/history")}
                className="cursor-pointer"
              >
                {t("Our_history")}
              </a>
            </li>
            <li>
              <a
                onClick={() => navigation("/partners")}
                className="cursor-pointer"
              >
                {t("Our_partners")}
              </a>
            </li>
          </ul>
        </div>

        {/* Nos actions */}
        <div>
          <h3 className="font-bold mb-4 text-sm">{t("HOW_ACTIONS")}</h3>
          <ul className="space-y-4 text-[13px]">
            <li>
              <a
                onClick={() => navigation("/aide-sanitaire")}
                className="cursor-pointer"
              >
                {t("Health_aid")}
              </a>
            </li>
            <li>
              <a
                onClick={() => navigation("/domaines/urgence")}
                className="cursor-pointer"
              >
                {t("Humanitarian_emergencies")}
              </a>
            </li>
          </ul>
        </div>

        {/* Médias & publications */}
        <div>
          <h3 className="font-bold mb-4 text-sm">{t("Newsroom")}</h3>
          <ul className="space-y-2 text-[13px]">
            <li>
              <a
                onClick={() => navigation("/load-data/communicated")}
                className="cursor-pointer"
              >
                {t("Press")}
              </a>
            </li>
            <li>
              <a
                onClick={() => navigation("/data-loading/videos")}
                className="cursor-pointer"
              >
                {t("Videos")}
              </a>
            </li>
            <li>
              <a
                onClick={() => navigation("/data-loading/blogs")}
                className="cursor-pointer"
              >
                {t("Blog")}
              </a>
            </li>
            <li>
              <a
                onClick={() => navigation("/data-loading/gallery")}
                className="cursor-pointer"
              >
                {t("Gallery")}
              </a>
            </li>
            <li>
              <a
                onClick={() => navigation("/evements")}
                className="cursor-pointer"
              >
                {t("Events")}
              </a>
            </li>
          </ul>
        </div>

        {/* Impliquez-vous */}
        <div>
          <h3 className="font-bold mb-4 text-sm">{t("GET_INVOLVED")}</h3>
          <ul className="space-y-2 text-[13px]">
            <li>
              <a
                onClick={() => navigation("/job_openings")}
                className="cursor-pointer"
              >
                {t("Careers")}
              </a>
            </li>
            <li>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeWErBfd5Fmme0xaGvi2XMmK6PJO7XF-zftjvKzjjuzGkaIHg/viewform?pli=1"
                target="_blank"
                className="flex items-center gap-[2px] h-[40px] text-sm hover:text-slate-300"
              >
                {t("Expressions_of_interest")}
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
              <a className="flex items-center gap-[2px] h-[40px] text-sm hover:text-slate-300 cursor-pointer" onClick={() => navigation("/contact")}>{t("Contact")}</a>
            </li>
          </ul>
          <DonateModal
            isOpen={showDonate}
            onClose={() => setShowDonate(false)}
          />
        </div>

        {/* Politiques */}
        <div>
          <h3 className="font-bold mb-4 text-sm">{t("POLICIES")}</h3>
          <ul className="space-y-2 text-[13px]">
            <li>
              <a
                onClick={() => navigation("/confidentiality")}
                className="cursor-pointer"
              >
                {t("Confidentiality")}
              </a>
            </li>
            <li>
              <a
                onClick={() => navigation("/terms-of-service")}
                className="cursor-pointer"
              >
                {t("Terms_of_use")}
              </a>
            </li>
            <li>
              <a
                onClick={() => navigation("/accessibility")}
                className="cursor-pointer"
              >
                {t("Accessibility")}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & urgence */}
        <div>
          <h3 className="font-bold mb-4 text-sm">{t("CONTACT_EMERGENCY")}</h3>
          <p className="text-[13px] mb-2">{t("Need_help_Contact_us_at")}</p>
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
