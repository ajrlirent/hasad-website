import { useState, type FC } from "react";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { HasadLogo } from "./HasadLogo";
import { SITE_CONFIG } from "../config/siteConfig";
import { TRANSLATIONS, type Language, type Translations } from "../config/translations";

interface FooterProps {
  onOpenContact: () => void;
  onOpenLegal: (type: "privacy" | "terms") => void;
  lang?: Language;
  t?: Translations;
}

export const Footer: FC<FooterProps> = ({
  onOpenContact,
  onOpenLegal,
  lang = "fr",
  t,
}) => {
  const activeT = t || TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRtl = lang === "ar";
  const [socialNotice, setSocialNotice] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (name: string, url: string) => {
    if (url.trim()) {
      return;
    }
    const message = activeT.footer.socialSoon.replace("{name}", name);
    setSocialNotice(message);
    window.setTimeout(() => {
      setSocialNotice(null);
    }, 4000);
  };

  return (
    <footer
      id="contact"
      dir={isRtl ? "rtl" : "ltr"}
      className="bg-[#F6F8F6] text-[#3B4F43] border-t border-neutral-200/90 dark:bg-[#01341d] dark:text-emerald-100/85 dark:border-white/10 scroll-mt-16 pb-[env(safe-area-inset-bottom)] transition-colors duration-200"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-10 py-14 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: HASAD Logo & Soft Click Technologies Ecosystem Note */}
          <div className="lg:col-span-5">
            <a href="#accueil" className="inline-block">
              <HasadLogo size="md" lang={lang} />
            </a>
            <p className="mt-4 text-sm text-[#3B4F43] dark:text-emerald-100/85 leading-relaxed max-w-[44ch]">
              {activeT.footer.description}
            </p>
            <p className="mt-2.5 text-xs text-[#41544A] dark:text-emerald-200/75 leading-relaxed max-w-[44ch]">
              {activeT.footer.ecosystemNote}
            </p>

            <div className="mt-6 flex items-center gap-4 text-xs text-[#2E4237] dark:text-emerald-100">
              {[
                { name: "LinkedIn", url: SITE_CONFIG.socials.linkedinUrl },
                { name: "Facebook", url: SITE_CONFIG.socials.facebookUrl },
                { name: "Instagram", url: SITE_CONFIG.socials.instagramUrl },
              ].map((social) =>
                social.url.trim() ? (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#14532D] dark:hover:text-[#6fcb3b] underline-offset-4 hover:underline transition-colors duration-150"
                  >
                    {social.name}
                  </a>
                ) : (
                  <button
                    key={social.name}
                    type="button"
                    onClick={() => handleSocialClick(social.name, social.url)}
                    className="hover:text-[#14532D] dark:hover:text-[#6fcb3b] underline-offset-4 hover:underline transition-colors duration-150 cursor-pointer"
                  >
                    {social.name}
                  </button>
                )
              )}
            </div>
            {socialNotice && (
              <p
                role="status"
                className="mt-3 text-xs text-[#14532D] dark:text-[#6fcb3b] leading-normal"
              >
                {socialNotice}
              </p>
            )}
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-3">
            <h3 className="font-display font-semibold text-sm text-[#01341d] dark:text-white mb-3.5 sm:mb-4">
              {activeT.footer.quickLinks}
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2.5 text-sm">
              <li>
                <a
                  href="#accueil"
                  className="inline-block py-1 hover:text-[#01341d] dark:hover:text-white transition-colors duration-150"
                >
                  {activeT.nav.home}
                </a>
              </li>
              <li>
                <a
                  href="#a-propos"
                  className="inline-block py-1 hover:text-[#01341d] dark:hover:text-white transition-colors duration-150"
                >
                  {activeT.nav.about}
                </a>
              </li>
              <li>
                <a
                  href="#equipements"
                  className="inline-block py-1 hover:text-[#01341d] dark:hover:text-white transition-colors duration-150"
                >
                  {activeT.footer.equipment}
                </a>
              </li>
              <li>
                <a
                  href="#comment-ca-marche"
                  className="inline-block py-1 hover:text-[#01341d] dark:hover:text-white transition-colors duration-150"
                >
                  {activeT.nav.howItWorks}
                </a>
              </li>
              <li>
                <a
                  href="#proprietaires"
                  className="inline-block py-1 hover:text-[#01341d] dark:hover:text-white transition-colors duration-150"
                >
                  {lang === "ar"
                    ? "ملاك العتاد"
                    : lang === "en"
                    ? "Equipment Owners"
                    : "Propriétaires"}
                </a>
              </li>
              <li>
                <a
                  href="#telecharger"
                  className="inline-block py-1 hover:text-[#01341d] dark:hover:text-white transition-colors duration-150"
                >
                  {activeT.nav.downloadCompact}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="lg:col-span-4">
            <h3 className="font-display font-semibold text-sm text-[#01341d] dark:text-white mb-3.5 sm:mb-4">
              {activeT.footer.contactUs}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="inline-flex items-center gap-2.5 py-1 hover:text-[#01341d] dark:hover:text-white transition-colors duration-150"
                >
                  <Mail
                    className="w-4 h-4 text-[#14532D] dark:text-[#6fcb3b] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{SITE_CONFIG.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.contact.phoneHref}
                  className="inline-flex items-center gap-2.5 py-1 font-mono tabular-nums hover:text-[#01341d] dark:hover:text-white transition-colors duration-150"
                  dir="ltr"
                >
                  <Phone
                    className="w-4 h-4 text-[#14532D] dark:text-[#6fcb3b] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{SITE_CONFIG.contact.phoneDisplay}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 py-1">
                <MapPin
                  className="w-4 h-4 text-[#14532D] dark:text-[#6fcb3b] shrink-0"
                  aria-hidden="true"
                />
                <span>{SITE_CONFIG.contact.location}</span>
              </li>
            </ul>

            <div className="mt-5">
              <button
                type="button"
                onClick={onOpenContact}
                className="min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-[13px] font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] rounded-xl sm:rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer shadow-sm hover:shadow active:scale-95"
              >
                <MessageSquare
                  className="w-3.5 h-3.5 text-[#01341d] shrink-0"
                  aria-hidden="true"
                />
                <span>{activeT.footer.sendInquiry}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-200/90 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#41544A] dark:text-emerald-200/75">
          <p>
            © {currentYear} {lang === "ar" ? "حصاد" : "HASAD | حصاد"}.{" "}
            {activeT.footer.rightsReserved}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenLegal("privacy")}
              className="hover:text-[#01341d] dark:hover:text-white transition-colors duration-150 cursor-pointer"
            >
              {activeT.footer.privacy}
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal("terms")}
              className="hover:text-[#01341d] dark:hover:text-white transition-colors duration-150 cursor-pointer"
            >
              {activeT.footer.terms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
