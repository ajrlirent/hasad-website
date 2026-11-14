import { useMemo, useState, type FC } from "react";
import { Send, GitCompareArrows, CheckCircle2, ArrowRight } from "lucide-react";
import { AlgeriaHeroMap } from "./AlgeriaHeroMap";
import { WilayaDropdown } from "./WilayaDropdown";
import {
  ALGERIA_WILAYAS,
  type WilayaPolygon,
} from "../data/algeriaWilayas";
import darkFieldsAerialSrc from "../assets/images/dark_map_fields_aerial_1794618039072.jpg";
import type { Language, Translations } from "../config/translations";

interface WhatIsHasadProps {
  theme: "light" | "dark";
  lang?: Language;
  t?: Translations;
  onDownloadClick?: () => void;
}

const QUICK_WILAYA_CODES = ["09", "19", "16", "31", "25", "14", "07", "30", "47"];

export const WhatIsHasad: FC<WhatIsHasadProps> = ({
  theme,
  lang = "fr",
  t,
  onDownloadClick,
}) => {
  const [selectedWilaya, setSelectedWilaya] = useState<WilayaPolygon | null>(
    null
  );
  const isRtl = lang === "ar";

  const getLocalizedName = (w: WilayaPolygon) => {
    if (lang === "ar" && w.nameAr) return w.nameAr;
    if (lang === "en" && w.nameEn) return w.nameEn;
    return w.name;
  };

  const getLocalizedRegion = (w: WilayaPolygon) => {
    if (lang === "ar" && w.regionAr) return w.regionAr;
    if (lang === "en" && w.regionEn) return w.regionEn;
    return w.region;
  };

  const sortedUniqueWilayas = useMemo(() => {
    const byCode = new Map<string, WilayaPolygon>();
    for (const w of ALGERIA_WILAYAS) {
      if (!byCode.has(w.code)) {
        byCode.set(w.code, w);
      }
    }
    return Array.from(byCode.values()).sort(
      (a, b) => Number(a.code) - Number(b.code)
    );
  }, []);

  const quickWilayas = useMemo(
    () =>
      QUICK_WILAYA_CODES.map((code) =>
        sortedUniqueWilayas.find((w) => w.code === code)
      ).filter((w): w is WilayaPolygon => Boolean(w)),
    [sortedUniqueWilayas]
  );

  const kickerMobile = t?.about.kicker ?? "À propos de HASAD";
  const kickerLong =
    t?.about.kickerLong ??
    "À propos de HASAD · Système à la demande dans les 69 wilayas";
  const title =
    t?.about.title ?? "Le matériel agricole qu'il vous faut, à la demande.";
  const description1 =
    t?.about.description1 ??
    "Contrairement aux annonces classiques où l'on attend une réponse, HASAD fonctionne sur un modèle de demande et de mise en relation instantanée — vous formulez votre besoin et les propriétaires proches répondent avec leur disponibilité et leur tarif.";
  const description2 =
    t?.about.description2 ??
    "Inspiré du mot arabe حصاد (récolte) et développé par Soft Click Technologies, HASAD modernise l'accès aux machines agricoles partout en Algérie.";
  const wilayaWord = t?.about.wilayaPrefix ?? "WILAYA";
  const availableNearby =
    t?.about.availableNearby ??
    "Tracteurs, moissonneuses et équipements disponibles à la demande sur HASAD.";
  const rentIn = t?.about.rentIn ?? "Louer à";

  const benefits = [
    {
      index: "01",
      title: t?.about.benefits.b1Title ?? "Demandez",
      description:
        t?.about.benefits.b1Desc ??
        "Sélectionnez la machine agricole nécessaire, indiquez votre parcelle et envoyez votre demande en quelques secondes.",
      Icon: Send,
    },
    {
      index: "02",
      title: t?.about.benefits.b2Title ?? "Comparez",
      description:
        t?.about.benefits.b2Desc ??
        "Les propriétaires proches reçoivent une notification instantanée et soumettent leur disponibilité, prix et photos.",
      Icon: GitCompareArrows,
    },
    {
      index: "03",
      title: t?.about.benefits.b3Title ?? "Récoltez & Évaluez",
      description:
        t?.about.benefits.b3Desc ??
        "Choisissez la meilleure offre selon la distance, le tarif et les avis, puis notez l'expérience après la prestation.",
      Icon: CheckCircle2,
    },
  ];

  return (
    <section
      id="a-propos"
      className={`relative bg-white dark:bg-[#01341d] py-14 sm:py-20 md:py-28 border-t border-neutral-200/80 dark:border-white/10 scroll-mt-16 overflow-hidden transition-colors duration-200 ${
        isRtl ? "text-right" : "text-left"
      }`}
    >
      {/* Continuous Aerial Crop-Field Background Across Entire Section (Light & Dark Modes) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src={darkFieldsAerialSrc}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-[0.22] saturate-125 dark:opacity-100 dark:saturate-100 select-none pointer-events-none"
        />
        <div className="hidden dark:block absolute inset-0 bg-[#01341d]/68" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent dark:from-[#01341d]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-[#01341d]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* 2-Column Interactive Algerian Map & Mission Split */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
            isRtl ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Mobile Header First */}
          <div className="lg:hidden">
            <p className="text-xs font-bold text-[#14532D] dark:text-[#6fcb3b] mb-2">
              {kickerMobile}
            </p>
            <h2
              className={`font-display font-bold text-[#01341d] dark:text-white text-[1.75rem] leading-[1.14] tracking-[-0.02em] ${
                isRtl ? "font-arabic" : ""
              }`}
            >
              {title}
            </h2>
            <p className="mt-3 text-[15px] text-[#3B4F43] dark:text-emerald-100/85 leading-[1.6]">
              {description1}
            </p>
          </div>

          {/* Left: Interactive Algerian Agricultural Map */}
          <div className={`lg:col-span-6 ${isRtl ? "lg:order-2" : "lg:order-1"}`}>
            <AlgeriaHeroMap
              theme={theme}
              lang={lang}
              t={t}
              selectedWilaya={selectedWilaya}
              onSelectWilaya={setSelectedWilaya}
              className="max-w-[540px] sm:max-w-[640px] lg:max-w-none mx-auto"
            />
          </div>

          {/* Right: Desktop Heading + Unified Cross-Device Wilaya Control Panel */}
          <div className={`lg:col-span-6 ${isRtl ? "lg:order-1 text-right" : "lg:order-2 text-left"}`}>
            <div className="hidden lg:block">
              <p className="text-[13px] font-bold text-[#14532D] dark:text-[#6fcb3b] mb-3">
                {kickerLong}
              </p>
              <h2
                className={`font-display font-bold text-[#01341d] dark:text-white text-4xl lg:text-[2.55rem] leading-[1.12] tracking-[-0.02em] ${
                  isRtl ? "font-arabic" : ""
                }`}
              >
                {title}
              </h2>

              <div className="mt-6 space-y-4 text-[17px] text-[#3B4F43] dark:text-emerald-100/90 leading-[1.68] tracking-[0.005em]">
                <p>{description1}</p>
                <p>{description2}</p>
              </div>
            </div>

            {/* Unified Interactive Wilaya Selector & Status */}
            <div className="lg:mt-7 p-4 sm:p-5 rounded-2xl bg-[#F6F8F6]/95 dark:bg-[#024225]/95 backdrop-blur-xs border border-neutral-200/90 dark:border-white/12">
              {selectedWilaya ? (
                <div
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 mb-4 border-b border-neutral-200/80 dark:border-white/10 ${
                    isRtl ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <div className={isRtl ? "text-right" : "text-left"}>
                    <div
                      className={`flex items-center gap-2 ${
                        isRtl ? "justify-end flex-row-reverse" : ""
                      }`}
                    >
                      <span className="font-mono tabular-nums text-xs font-bold text-[#14532D] dark:text-[#6fcb3b]">
                        {wilayaWord} {selectedWilaya.code}
                      </span>
                      <span className="text-xs text-[#41544A] dark:text-emerald-200/80">
                        · {getLocalizedRegion(selectedWilaya)}
                      </span>
                    </div>
                    <p className="mt-0.5 font-display font-bold text-lg sm:text-xl text-[#01341d] dark:text-white">
                      {getLocalizedName(selectedWilaya)}
                    </p>
                    <p className="mt-0.5 text-xs sm:text-sm text-[#3B4F43] dark:text-emerald-100/85">
                      {availableNearby}
                    </p>
                  </div>

                  {onDownloadClick && (
                    <button
                      type="button"
                      onClick={onDownloadClick}
                      className={`min-h-[44px] w-full sm:w-auto max-w-full inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-[13px] font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] rounded-full transition-colors cursor-pointer ${
                        isRtl ? "flex-row-reverse" : ""
                      }`}
                    >
                      <span className="truncate">
                        {rentIn} {getLocalizedName(selectedWilaya)}
                      </span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 shrink-0 ${isRtl ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>
              ) : null}

              {/* Modern Searchable Custom Wilaya Dropdown covering all 69 Wilayas */}
              <WilayaDropdown
                wilayas={sortedUniqueWilayas}
                selectedWilaya={selectedWilaya}
                onSelect={setSelectedWilaya}
                lang={lang}
                t={t}
              />

              {/* Single-Row Swipeable Quick Wilaya Strip */}
              <div
                className={`mt-3 flex sm:flex-wrap items-center gap-2 overflow-x-auto no-scrollbar pb-0.5 ${
                  isRtl ? "flex-row-reverse" : ""
                }`}
              >
                {quickWilayas.map((w) => {
                  const isActive = selectedWilaya?.code === w.code;
                  return (
                    <button
                      key={w.code}
                      type="button"
                      onClick={() =>
                        setSelectedWilaya(isActive ? null : w)
                      }
                      className={`min-h-[38px] sm:min-h-[34px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? "bg-[#6fcb3b] text-[#01341d] border border-[#6fcb3b]"
                          : "bg-white text-[#2E4237] border border-neutral-200/90 hover:border-[#6fcb3b] hover:text-[#14532D] dark:bg-[#01341d] dark:text-emerald-100 dark:border-white/12 dark:hover:border-[#6fcb3b] dark:hover:text-[#6fcb3b]"
                      }`}
                    >
                      <span className="font-mono tabular-nums mr-1 opacity-80">
                        {w.code}
                      </span>
                      {getLocalizedName(w)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Three Simple Benefits */}
        <div
          className={`mt-12 sm:mt-16 md:mt-22 border-t border-neutral-200/90 dark:border-white/10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200/90 dark:divide-white/10 ${
            isRtl ? "md:divide-x-reverse" : ""
          }`}
        >
          {benefits.map(({ index, title: bTitle, description: bDesc, Icon }) => (
            <div
              key={index}
              className={`py-5 sm:py-8 md:py-10 md:px-8 first:md:pl-0 last:md:pr-0 flex flex-row md:flex-col items-start md:items-stretch gap-4 md:gap-0 justify-between ${
                isRtl ? "md:text-right" : "md:text-left"
              }`}
            >
              {/* Icon & Index */}
              <div
                className={`flex items-center md:justify-between md:w-full md:mb-6 shrink-0 ${
                  isRtl ? "flex-row-reverse" : ""
                }`}
              >
                <span className="hidden md:inline font-mono tabular-nums text-sm font-semibold text-[#41544A] dark:text-emerald-200/80">
                  {index}.
                </span>
                <span className="w-11 h-11 md:w-10 md:h-10 rounded-xl md:rounded-lg bg-[#F6F8F6] dark:bg-[#024225] border border-neutral-200/90 dark:border-white/12 inline-flex items-center justify-center text-[#14532D] dark:text-[#6fcb3b]">
                  <Icon className="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
              </div>

              {/* Benefit Copy */}
              <div className="flex-1 min-w-0">
                <div
                  className={`flex items-baseline gap-2 ${
                    isRtl ? "justify-end flex-row-reverse" : ""
                  }`}
                >
                  <span className="md:hidden font-mono tabular-nums text-xs font-bold text-[#14532D] dark:text-[#6fcb3b]">
                    {index}
                  </span>
                  <h3 className="font-display font-bold text-lg sm:text-2xl text-[#01341d] dark:text-white tracking-[-0.015em]">
                    {bTitle}
                  </h3>
                </div>
                <p className="mt-1.5 md:mt-3 text-sm sm:text-base text-[#3B4F43] dark:text-emerald-100/85 leading-[1.58] max-w-[38ch]">
                  {bDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
