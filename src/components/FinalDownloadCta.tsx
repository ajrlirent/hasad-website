import { useState, type FC } from "react";
import { SITE_CONFIG } from "../config/siteConfig";
import farmlandBackdrop from "../assets/images/hero_agriculture_farmland_1794618038323.jpg";
import type { Language, Translations } from "../config/translations";

interface FinalDownloadCtaProps {
  onStoreUnavailableClick: (platform: "Google Play" | "App Store") => void;
  lang?: Language;
  t?: Translations;
}

const GooglePlayIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 shrink-0"
    aria-hidden="true"
  >
    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
  </svg>
);

const AppleIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 shrink-0"
    aria-hidden="true"
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.79-.96 2.84 1.04.08 2.08-.52 2.72-1.3z" />
  </svg>
);

export const FinalDownloadCta: FC<FinalDownloadCtaProps> = ({
  onStoreUnavailableClick,
  lang = "fr",
  t,
}) => {
  const [bgFailed, setBgFailed] = useState(false);
  const isRtl = lang === "ar";

  const googlePlayUrl = SITE_CONFIG.downloads.googlePlayUrl.trim();
  const appStoreUrl = SITE_CONFIG.downloads.appStoreUrl.trim();
  const isDirectApk = googlePlayUrl.toLowerCase().endsWith(".apk");
  const isPreLaunch = !googlePlayUrl && !appStoreUrl;

  const badgeText =
    t?.downloadCta.badge ?? "Votre terre. Vos machines. Votre récolte.";
  const titleText =
    t?.downloadCta.title ??
    "Prêt à louer votre prochain équipement agricole à la demande ?";
  const descriptionText =
    t?.downloadCta.description ??
    "Téléchargez l'application mobile HASAD sur Android et iOS pour envoyer votre première demande aux propriétaires de matériel agricole près de vos terres.";
  const prelaunchNotice =
    t?.downloadCta.prelaunchNotice ??
    "L'application HASAD (développée par Soft Click Technologies) est en cours de déploiement sur les stores. Laissez vos coordonnées pour être averti dès la sortie.";
  const googlePlayBtn = t?.downloadCta.googlePlayBtn ?? "Disponible sur Google Play";
  const appStoreBtn = t?.downloadCta.appStoreBtn ?? "Télécharger sur l'App Store";

  return (
    <section
      id="telecharger"
      className={`bg-white dark:bg-[#01341d] py-12 sm:py-16 md:py-24 border-t border-neutral-200/80 dark:border-white/10 scroll-mt-16 transition-colors duration-200 ${
        isRtl ? "text-right" : "text-left"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="relative rounded-2xl overflow-hidden bg-[#01341d] dark:bg-[#024225] border border-[#03522E] dark:border-white/14 shadow-[0_18px_48px_rgba(1,52,29,0.16)] dark:shadow-none">
          {/* Background Farmland Photography with Measured Contrast Scrim */}
          {!bgFailed && (
            <img
              src={farmlandBackdrop}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              onError={() => setBgFailed(true)}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
            />
          )}
          <div
            className={`absolute inset-0 ${
              isRtl
                ? "bg-gradient-to-l from-[#01341d]/96 via-[#01341d]/88 to-[#01341d]/65"
                : "bg-gradient-to-r from-[#01341d]/96 via-[#01341d]/88 to-[#01341d]/65"
            }`}
            aria-hidden="true"
          />

          {/* Content */}
          <div
            className={`relative z-10 px-4 py-8 sm:px-12 sm:py-20 lg:px-16 lg:py-24 max-w-3xl ${
              isRtl ? "mr-0 ml-auto" : ""
            }`}
          >
            <p className="text-xs sm:text-[13px] font-bold text-[#6fcb3b] tracking-wide mb-2.5 sm:mb-3">
              {badgeText}
            </p>

            <h2
              className={`font-display font-bold text-white text-[1.65rem] sm:text-4xl lg:text-[2.75rem] leading-[1.14] sm:leading-[1.1] tracking-[-0.02em] ${
                isRtl ? "font-arabic" : ""
              }`}
            >
              {titleText}
            </h2>

            <p className="mt-3.5 sm:mt-5 text-[14px] sm:text-lg text-emerald-100/90 leading-[1.6] sm:leading-[1.65] max-w-[50ch]">
              {descriptionText}
            </p>

            {/* Store Buttons */}
            <div
              className={`mt-7 sm:mt-9 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 max-w-full ${
                isRtl ? "sm:flex-row-reverse" : ""
              }`}
            >
              {googlePlayUrl ? (
                <a
                  href={googlePlayUrl}
                  {...(isDirectApk
                    ? { download: "HASAD.apk" }
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  className="min-h-[48px] sm:min-h-[52px] w-full sm:w-auto max-w-full inline-flex items-center justify-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-[15px] font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] rounded-xl transition-colors duration-150"
                >
                  <GooglePlayIcon />
                  <span className="truncate">{googlePlayBtn}</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onStoreUnavailableClick("Google Play")}
                  className="min-h-[48px] sm:min-h-[52px] w-full sm:w-auto max-w-full inline-flex items-center justify-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-[15px] font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] active:scale-[0.99] rounded-xl transition-all duration-150 cursor-pointer"
                >
                  <GooglePlayIcon />
                  <span className="truncate">{googlePlayBtn}</span>
                </button>
              )}

              {appStoreUrl ? (
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] sm:min-h-[52px] w-full sm:w-auto max-w-full inline-flex items-center justify-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold text-[#01341d] bg-white hover:bg-neutral-100 rounded-xl transition-colors duration-150"
                >
                  <AppleIcon />
                  <span className="truncate">{appStoreBtn}</span>
                </a>
              ) : null}
            </div>

            {isPreLaunch && (
              <p className="mt-5 text-xs sm:text-[13px] text-emerald-100/80">
                {prelaunchNotice}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
