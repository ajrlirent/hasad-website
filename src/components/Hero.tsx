import { ArrowDownRight, Download } from "lucide-react";
import { motion } from "motion/react";
import { useState, type FC, type PointerEvent } from "react";
import { HeroAnimatedLogo } from "./HeroAnimatedLogo";
import { TransparentMachineImg } from "./TransparentMachineImg";
import type { Language, Translations } from "../config/translations";

import heroHarvesterCutout from "../assets/images/cutout_combine_harvester_1794618040929.jpg";
import heroTractorCutout from "../assets/images/cutout_agri_tractor_1794618039506.jpg";
import heroHarvestingBg from "../assets/images/hero_harvesting_left_1794619725236.jpg";

interface HeroProps {
  onDownloadClick: () => void;
  lang?: Language;
  t?: Translations;
}

export const Hero: FC<HeroProps> = ({ onDownloadClick, lang = "fr", t }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isRtl = lang === "ar";

  const kickerBrand = t?.hero.kickerBrand ?? "HASAD · حصاد Algérie";
  const kickerDesc = t?.hero.kickerDesc ?? "Matériel agricole à la demande · Soft Click Technologies";
  const titleStart = t?.hero.titleStart ?? "Votre terre. Vos machines.";
  const titleSimply = t?.hero.titleSimply ?? "Votre";
  const titleQuickly = t?.hero.titleQuickly ?? "récolte.";
  const description =
    t?.hero.description ??
    "La plateforme algérienne de location de matériel agricole à la demande. Demandez tracteurs, moissonneuses-batteuses ou semoirs et recevez directement les offres des propriétaires à proximité.";
  const ctaDownload = t?.hero.ctaDownload ?? "Télécharger l'application";
  const ctaDiscover = t?.hero.ctaDiscover ?? "Découvrir HASAD";
  const audFarmers = t?.hero.audFarmers ?? "Agriculteurs";
  const audCooperatives = t?.hero.audCooperatives ?? "Exploitations & Coopératives";
  const audWilayas = t?.hero.audWilayas ?? "69 Wilayas";

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
    setTilt({ x: nx, y: ny });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="accueil"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative bg-white dark:bg-[#01341d] overflow-hidden transition-colors duration-200 ${
        isRtl ? "text-right" : "text-left"
      }`}
    >
      {/* Background Agricultural Farmland at 20% opacity (crisp neutral white in light mode, +10% #01341d shade in dark mode) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src={heroHarvestingBg}
          alt=""
          loading="eager"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-left opacity-20 saturate-150 contrast-105 dark:brightness-100 dark:contrast-100 dark:saturate-75 select-none pointer-events-none ${
            isRtl ? "scale-x-[-1]" : ""
          }`}
        />
        <div className="hidden dark:block absolute inset-0 bg-[#01341d]/10" />
        <div
          className={`absolute inset-0 ${
            isRtl
              ? "bg-gradient-to-l from-white/25 via-transparent to-transparent dark:from-[#01341d]/25 dark:via-transparent dark:to-transparent"
              : "bg-gradient-to-r from-white/25 via-transparent to-transparent dark:from-[#01341d]/25 dark:via-transparent dark:to-transparent"
          }`}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-[#01341d] dark:via-[#01341d]/50 dark:to-transparent" />
      </div>

      {/* Subtle Ambient Harvest Glow Behind the HASAD Emblem & Machines (Dark Mode) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-transparent dark:bg-[#6fcb3b]/[0.10] blur-[120px]"
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-10 pt-8 pb-12 sm:pt-12 sm:pb-16 lg:py-20 lg:min-h-[calc(100svh-74px)] lg:max-h-[880px] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Hero Copy & Primary Actions */}
          <div
            className={`lg:col-span-5 flex flex-col justify-center order-1 ${
              isRtl ? "lg:order-2 text-right" : "lg:order-1 text-left"
            }`}
          >
            {/* Unboxed Clean Kicker */}
            <div
              className={`flex items-center gap-2 text-xs sm:text-[13px] font-medium text-[#41544A] dark:text-emerald-200/80 mb-3.5 sm:mb-5 ${
                isRtl ? "justify-end flex-row-reverse" : ""
              }`}
            >
              <span className="text-[#14532D] dark:text-[#6fcb3b] font-bold whitespace-nowrap">
                {kickerBrand}
              </span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{kickerDesc}</span>
            </div>

            {/* Hero Display Headline */}
            <h1
              className={`font-display font-bold text-[#01341d] dark:text-white text-[2.15rem] sm:text-[2.85rem] lg:text-[clamp(2.45rem,3.8vw,3.65rem)] leading-[1.09] tracking-[-0.025em] ${
                isRtl ? "font-arabic max-w-none" : "max-w-[18ch]"
              }`}
            >
              {titleStart}{" "}
              <span className="text-[#287D1B] dark:text-[#6fcb3b]">
                {titleSimply}
              </span>{" "}
              <span className="text-[#287D1B] dark:text-[#6fcb3b]">
                {titleQuickly}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              className={`mt-4 sm:mt-6 text-[15px] sm:text-[17px] text-[#3B4F43] dark:text-emerald-100/90 leading-[1.64] tracking-[0.005em] ${
                isRtl ? "font-arabic max-w-none" : "max-w-[48ch]"
              }`}
            >
              {description}
            </p>

            {/* Primary & Secondary CTAs */}
            <div
              className={`mt-6 sm:mt-9 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 ${
                isRtl ? "sm:flex-row-reverse" : ""
              }`}
            >
              <button
                type="button"
                onClick={onDownloadClick}
                className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-[15px] font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] active:scale-[0.99] rounded-full transition-all duration-150 cursor-pointer shadow-[0_10px_28px_rgba(111,203,59,0.28)] dark:shadow-[0_10px_28px_rgba(111,203,59,0.24)] max-w-full"
              >
                <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{ctaDownload}</span>
              </button>

              <a
                href="#a-propos"
                className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold text-[#01341d] bg-[#F6F8F6] sm:bg-white hover:bg-[#F6F8F6] border border-neutral-200 sm:border-neutral-300 hover:border-[#6fcb3b] dark:text-white dark:bg-[#024225] dark:hover:bg-[#034e2c] dark:border-white/15 dark:hover:border-[#6fcb3b] rounded-full transition-colors duration-150 max-w-full"
              >
                <span className="truncate">{ctaDiscover}</span>
                <ArrowDownRight
                  className={`w-4 h-4 text-[#14532D] dark:text-[#6fcb3b] shrink-0 ${
                    isRtl ? "rotate-90" : ""
                  }`}
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Quiet Unboxed Audience Metadata */}
            <div
              className={`mt-6 sm:mt-9 pt-4 sm:pt-6 border-t border-neutral-200/80 dark:border-white/12 flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1 text-xs sm:text-[13px] text-[#41544A] dark:text-emerald-200/80 ${
                isRtl ? "justify-end flex-row-reverse" : ""
              }`}
            >
              <span>{audFarmers}</span>
              <span aria-hidden="true">·</span>
              <span>{audCooperatives}</span>
              <span aria-hidden="true">·</span>
              <span>{audWilayas}</span>
            </div>
          </div>

          {/* Logo Emblem + Agricultural Machinery Stage */}
          <div
            className={`lg:col-span-7 relative flex items-center justify-center order-2 ${
              isRtl ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div className="relative w-full max-w-[660px] aspect-[12/10] sm:aspect-[12/9.6] select-none">
              {/* Soft Ground Contact Shadow Pool */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[6%] bottom-[3%] h-[14%] rounded-[100%] bg-[#01341d]/10 dark:bg-black/65 blur-xl"
              />

              {/* Layer 1: Official HASAD Emblem Backdrop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: tilt.x * -6,
                  y: tilt.y * -6,
                }}
                transition={{
                  opacity: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                  x: { type: "spring", stiffness: 120, damping: 22 },
                  y: { type: "spring", stiffness: 120, damping: 22 },
                }}
                className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[150%] sm:w-[147%] max-w-[965px] aspect-square flex items-center justify-center pointer-events-none"
              >
                <HeroAnimatedLogo />
              </motion.div>

              {/* Layer 2: Combine Harvester (Upper-Right Stage, header facing right) */}
              <motion.div
                initial={{ opacity: 0, x: 24, y: 10 }}
                animate={{
                  opacity: 1,
                  x: tilt.x * 8,
                  y: tilt.y * 6,
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] },
                  x: { type: "spring", stiffness: 110, damping: 20 },
                  y: { type: "spring", stiffness: 110, damping: 20 },
                }}
                className="absolute right-[-2%] sm:right-[-1%] top-[19%] sm:top-[18%] w-[70%] sm:w-[68%] z-10 pointer-events-none"
              >
                <TransparentMachineImg
                  src={heroHarvesterCutout}
                  alt="Moissonneuse-batteuse agricole HASAD"
                  loading="eager"
                  className="w-full h-auto object-contain scale-x-[-1] drop-shadow-[0_16px_26px_rgba(1,52,29,0.18)] dark:drop-shadow-[0_22px_34px_rgba(0,18,9,0.78)]"
                />
              </motion.div>

              {/* Layer 3: 4WD Agricultural Tractor (Foreground-Left Stage) */}
              <motion.div
                initial={{ opacity: 0, x: -24, y: 14 }}
                animate={{
                  opacity: 1,
                  x: tilt.x * 13,
                  y: tilt.y * 9,
                }}
                transition={{
                  opacity: { duration: 0.52, delay: 0.12, ease: [0.16, 1, 0.3, 1] },
                  x: { type: "spring", stiffness: 110, damping: 20 },
                  y: { type: "spring", stiffness: 110, damping: 20 },
                }}
                className="absolute left-[-2%] sm:left-[0%] bottom-[1%] sm:bottom-[2%] w-[64%] sm:w-[62%] z-20 pointer-events-none"
              >
                <TransparentMachineImg
                  src={heroTractorCutout}
                  alt="Tracteur agricole 4x4 HASAD"
                  cleanJpgBottomShadow
                  loading="eager"
                  className="w-full h-auto object-contain drop-shadow-[0_14px_22px_rgba(1,52,29,0.10)] dark:drop-shadow-[0_24px_38px_rgba(0,18,9,0.86)]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
