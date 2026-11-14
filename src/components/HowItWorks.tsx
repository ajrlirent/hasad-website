import { useState, type FC } from "react";
import {
  MapPin,
  SlidersHorizontal,
  Star,
  Check,
  CheckCircle2,
} from "lucide-react";
import { HasadLogo } from "./HasadLogo";
import { TransparentMachineImg } from "./TransparentMachineImg";
import type { Language, Translations } from "../config/translations";

import tractorCutout from "../assets/images/cutout_agri_tractor_1794618039506.jpg";
import harvesterCutout from "../assets/images/cutout_combine_harvester_1794618040929.jpg";
import sprayerCutout from "../assets/images/cutout_crop_sprayer_1794618040491.jpg";

const VIEWER_MACHINES = [
  {
    id: "tractor",
    image: tractorCutout,
  },
  {
    id: "harvester",
    image: harvesterCutout,
  },
  {
    id: "sprayer",
    image: sprayerCutout,
  },
];

interface HowItWorksProps {
  lang?: Language;
  t?: Translations;
}

export const HowItWorks: FC<HowItWorksProps> = ({ lang = "fr", t }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedViewerMachine, setSelectedViewerMachine] = useState<number>(0);
  const [selectedOfferIdx, setSelectedOfferIdx] = useState<number>(0);
  const isRtl = lang === "ar";

  const rawMachine = VIEWER_MACHINES[selectedViewerMachine];
  const currentMachine = {
    ...rawMachine,
    label:
      rawMachine.id === "tractor"
        ? lang === "ar"
          ? "جرار فلاحي 4x4"
          : lang === "en"
          ? "4WD Farm Tractor"
          : "Tracteur agricole 4x4"
        : rawMachine.id === "harvester"
        ? lang === "ar"
          ? "آلة حصاد ودراس"
          : lang === "en"
          ? "Combine Harvester"
          : "Moissonneuse-batteuse"
        : lang === "ar"
        ? "رشاشة فلاحية"
        : lang === "en"
        ? "Crop Boom Sprayer"
        : "Pulvérisateur agricole",
    category:
      rawMachine.id === "tractor"
        ? lang === "ar"
          ? "الحرث والجر · متوفر عند الطلب"
          : lang === "en"
          ? "Traction & Tillage · On Demand"
          : "Traction & Labour · À la demande"
        : rawMachine.id === "harvester"
        ? lang === "ar"
          ? "موسم الحصاد · متوفر عند الطلب"
          : lang === "en"
          ? "Grain Harvest · On Demand"
          : "Récolte céréales · À la demande"
        : lang === "ar"
        ? "المعالجة والتسميد · متوفر عند الطلب"
        : lang === "en"
        ? "Crop Protection · On Demand"
        : "Protection cultures · À la demande",
  };

  const mockOffers = [
    {
      owner:
        lang === "ar"
          ? "مزرعة المتيجة للعتاد"
          : lang === "en"
          ? "Mitidja Agri Fleet"
          : "Parc Agricole Mitidja",
      distance: "6 km",
      price:
        lang === "ar"
          ? "14,000 دج / يوم"
          : lang === "en"
          ? "14,000 DZD / day"
          : "14 000 DA / jour",
      rating: "4.9",
    },
    {
      owner:
        lang === "ar"
          ? "تعاونية الهضاب الفلاحية"
          : lang === "en"
          ? "Highlands Co-op"
          : "Coopérative El Baraka",
      distance: "12 km",
      price:
        lang === "ar"
          ? "12,500 دج / يوم"
          : lang === "en"
          ? "12,500 DZD / day"
          : "12 500 DA / jour",
      rating: "4.8",
    },
  ];

  const steps = [
    {
      number: "01" as const,
      shortLabel: t?.howItWorks.steps.s1Short ?? "01 · Demander",
      title:
        t?.howItWorks.steps.s1Title ??
        "Demandez l'équipement agricole nécessaire.",
      detail:
        t?.howItWorks.steps.s1Detail ??
        "Choisissez le type de machine (tracteur, moissonneuse, semoir…), précisez la localisation de votre exploitation, vos besoins et le rayon géographique.",
    },
    {
      number: "02" as const,
      shortLabel: t?.howItWorks.steps.s2Short ?? "02 · Offres",
      title:
        t?.howItWorks.steps.s2Title ??
        "Recevez les réponses des propriétaires proches.",
      detail:
        t?.howItWorks.steps.s2Detail ??
        "HASAD notifie instantanément les propriétaires dans votre zone. Ils acceptent la demande en soumettant leur disponibilité, tarif et photos du matériel.",
    },
    {
      number: "03" as const,
      shortLabel: t?.howItWorks.steps.s3Short ?? "03 · Confirmer",
      title:
        t?.howItWorks.steps.s3Title ??
        "Comparez, confirmez et évaluez la prestation.",
      detail:
        t?.howItWorks.steps.s3Detail ??
        "Comparez les offres selon la distance, le prix et les notes, confirmez votre location puis laissez un avis transparent une fois le travail terminé.",
    },
  ];

  const badgeText = t?.howItWorks.badge ?? "À la demande · Rapide · Transparent";
  const titleText = t?.howItWorks.title ?? "Comment fonctionne HASAD ?";

  return (
    <section
      id="comment-ca-marche"
      className={`bg-white dark:bg-[#01341d] py-14 sm:py-20 md:py-28 border-t border-neutral-200/80 dark:border-white/10 scroll-mt-16 transition-colors duration-200 ${
        isRtl ? "text-right" : "text-left"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div
          className={`max-w-2xl mb-8 sm:mb-14 md:mb-16 ${
            isRtl ? "mr-0 ml-auto" : ""
          }`}
        >
          <p className="text-xs sm:text-[13px] font-bold text-[#14532D] dark:text-[#6fcb3b] mb-2 sm:mb-3">
            {badgeText}
          </p>
          <h2
            className={`font-display font-bold text-[#01341d] dark:text-white text-[1.75rem] sm:text-4xl lg:text-[2.5rem] leading-[1.14] sm:leading-[1.12] tracking-[-0.02em] ${
              isRtl ? "font-arabic" : ""
            }`}
          >
            {titleText}
          </h2>
        </div>

        {/* Asymmetric 2-Column Layout */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
            isRtl ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Left: 01, 02, 03 Interactive Steps */}
          <div
            className={`lg:col-span-7 divide-y divide-neutral-200/90 dark:divide-white/10 border-y border-neutral-200/90 dark:border-white/10 ${
              isRtl ? "lg:order-2" : "lg:order-1"
            }`}
          >
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`w-full py-4 sm:py-8 px-3 sm:px-6 transition-colors duration-150 flex items-start gap-4 sm:gap-7 cursor-pointer ${
                    isRtl ? "flex-row-reverse text-right" : "text-left"
                  } ${
                    isSelected
                      ? "bg-[#F6F8F6] dark:bg-[#024225]"
                      : "hover:bg-[#F6F8F6]/65 dark:hover:bg-[#024225]/55"
                  }`}
                >
                  <span
                    className={`font-mono tabular-nums text-xl sm:text-3xl font-semibold leading-none pt-0.5 transition-colors duration-150 ${
                      isSelected
                        ? "text-[#14532D] dark:text-[#6fcb3b]"
                        : "text-neutral-400 dark:text-emerald-200/40"
                    }`}
                  >
                    {step.number}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-base sm:text-[22px] text-[#01341d] dark:text-white tracking-[-0.015em] leading-snug">
                      {step.title}
                    </h3>
                    <p
                      className={`mt-1.5 sm:mt-2.5 text-sm sm:text-base text-[#3B4F43] dark:text-emerald-100/85 leading-[1.58] max-w-[52ch] ${
                        isSelected ? "block" : "hidden sm:block"
                      }`}
                    >
                      {step.detail}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Interactive HASAD Mobile App Dispatch Simulator */}
          <div
            className={`lg:col-span-5 flex flex-col items-center ${
              isRtl ? "lg:order-1" : "lg:order-2"
            }`}
          >
            {/* Mobile Direct Step Tabs Attached to Viewer */}
            <div
              role="tablist"
              aria-label="Étapes de l'application HASAD"
              className={`lg:hidden w-full max-w-[368px] mb-3 grid grid-cols-3 gap-1 p-1 bg-[#F6F8F6] dark:bg-[#024225] border border-neutral-200/90 dark:border-white/12 rounded-xl ${
                isRtl ? "direction-rtl" : ""
              }`}
            >
              {steps.map((s, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <button
                    key={s.number}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveStep(idx)}
                    className={`min-h-[38px] px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "bg-[#6fcb3b] text-[#01341d] shadow-xs"
                        : "text-[#41544A] hover:text-[#01341d] dark:text-emerald-100/80 dark:hover:text-white"
                    }`}
                  >
                    {s.shortLabel}
                  </button>
                );
              })}
            </div>

            <div className="w-full max-w-[368px] sm:max-w-[376px] rounded-[26px] sm:rounded-[28px] bg-white dark:bg-[#024225] border border-neutral-200/95 dark:border-white/14 shadow-[0_18px_48px_rgba(1,52,29,0.08)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.45)] overflow-hidden">
              {/* Thin Top Speaker Indicator + App Header */}
              <div className="pt-3.5 px-4 sm:px-5 pb-3 border-b border-neutral-100 dark:border-white/10 bg-white dark:bg-[#012917]">
                <div className="w-12 h-1 rounded-full bg-neutral-200 dark:bg-white/20 mx-auto mb-3" />
                <div className="flex items-center justify-between">
                  <HasadLogo size="sm" />
                  <span className="font-mono tabular-nums text-xs text-[#41544A] dark:text-emerald-200/80">
                    {lang === "ar"
                      ? `المرحلة ${steps[activeStep].number}/03`
                      : lang === "en"
                      ? `Step ${steps[activeStep].number}/03`
                      : `Étape ${steps[activeStep].number}/03`}
                  </span>
                </div>
              </div>

              {/* Dynamic Screen Body */}
              <div className="p-4 sm:p-5 min-h-[340px] sm:min-h-[355px] flex flex-col justify-between bg-white dark:bg-[#012917]">
                {activeStep === 0 && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-[11px] text-[#41544A] dark:text-emerald-200/75">
                          {lang === "ar"
                            ? "موقع المستثمرة الفلاحية"
                            : lang === "en"
                            ? "Farm / Parcel Location"
                            : "Localisation de la parcelle"}
                        </p>
                        <div className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-[#01341d] dark:text-white">
                          <MapPin
                            className="w-4 h-4 text-[#14532D] dark:text-[#6fcb3b] shrink-0"
                            aria-hidden="true"
                          />
                          <span>
                            {lang === "ar"
                              ? "سهل متيجة، البليدة"
                              : lang === "en"
                              ? "Mitidja Plain, Blida"
                              : "Plaine de la Mitidja, Blida"}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono tabular-nums text-[11px] font-semibold text-[#14532D] dark:text-[#6fcb3b] whitespace-nowrap">
                        15 — 80 km
                      </span>
                    </div>

                    {/* Slim Radius Bar */}
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal
                        className="w-3.5 h-3.5 text-[#14532D] dark:text-[#6fcb3b] shrink-0"
                        aria-hidden="true"
                      />
                      <div className="h-1.5 flex-1 bg-neutral-100 dark:bg-white/12 rounded-full overflow-hidden">
                        <div className="h-full w-2/5 bg-[#6fcb3b] rounded-full" />
                      </div>
                    </div>

                    {/* Machine Stage Inside Step 01 */}
                    <div className="pt-1">
                      <div className="h-32 sm:h-36 w-full rounded-xl overflow-hidden bg-[#F6F8F6] dark:bg-[#01341d] border border-neutral-200/80 dark:border-white/8 flex items-center justify-center p-2.5">
                        <TransparentMachineImg
                          src={currentMachine.image}
                          alt={currentMachine.label}
                          loading="eager"
                          className="w-full h-full object-contain object-center drop-shadow-[0_10px_16px_rgba(1,52,29,0.14)] dark:drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)] transition-all duration-150"
                        />
                      </div>

                      <div className="mt-2 p-3 rounded-xl bg-[#F3FAEE] dark:bg-[#024225] border border-[#6fcb3b]/70 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#01341d] dark:text-white truncate">
                            {currentMachine.label}
                          </p>
                          <p className="text-xs text-[#41544A] dark:text-emerald-200/80 truncate">
                            {currentMachine.category}
                          </p>
                        </div>
                        <Check
                          className="w-4 h-4 text-[#14532D] dark:text-[#6fcb3b] shrink-0"
                          aria-hidden="true"
                        />
                      </div>

                      {/* Quick Equipment Switcher */}
                      <div className="mt-2.5 flex items-center gap-1.5">
                        {VIEWER_MACHINES.map((m, i) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setSelectedViewerMachine(i)}
                            className={`flex-1 min-h-[38px] sm:min-h-[34px] py-1.5 px-2 rounded-lg sm:rounded-md text-xs sm:text-[11px] font-semibold transition-colors cursor-pointer truncate ${
                              selectedViewerMachine === i
                                ? "bg-[#6fcb3b] text-[#01341d]"
                                : "bg-[#F6F8F6] text-[#41544A] border border-neutral-200/90 hover:text-[#01341d] dark:bg-[#01341d] dark:text-emerald-100/80 dark:border-white/10 dark:hover:text-white"
                            }`}
                          >
                            {m.id === "tractor"
                              ? lang === "ar"
                                ? "جرار"
                                : lang === "en"
                                ? "Tractor"
                                : "Tracteur"
                              : m.id === "harvester"
                              ? lang === "ar"
                                ? "حاصدة"
                                : lang === "en"
                                ? "Harvester"
                                : "Moissonneuse"
                              : lang === "ar"
                              ? "رشاشة"
                              : lang === "en"
                              ? "Sprayer"
                              : "Pulvérisateur"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-3 pb-3 border-b border-neutral-100 dark:border-white/10">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-[#F6F8F6] dark:bg-[#01341d] border border-neutral-200/85 dark:border-white/10 flex items-center justify-center p-1 shrink-0">
                        <TransparentMachineImg
                          src={currentMachine.image}
                          alt={currentMachine.label}
                          loading="eager"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-[#41544A] dark:text-emerald-200/80">
                          {lang === "ar"
                            ? "عروض الملاك القريبين (استجابة فورية)"
                            : lang === "en"
                            ? "Incoming Provider Offers"
                            : "Réponses des propriétaires proches"}
                        </p>
                        <p className="text-sm font-display font-bold text-[#01341d] dark:text-white mt-0.5 truncate">
                          {currentMachine.label}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {mockOffers.map((offer, idx) => {
                        const isPicked = selectedOfferIdx === idx;
                        return (
                          <button
                            key={offer.owner}
                            type="button"
                            onClick={() => setSelectedOfferIdx(idx)}
                            className={`w-full p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                              isRtl ? "text-right" : "text-left"
                            } ${
                              isPicked
                                ? "bg-[#F3FAEE] dark:bg-[#024225] border-[#6fcb3b]"
                                : "bg-[#F6F8F6] dark:bg-[#01341d] border-neutral-200/85 dark:border-white/10"
                            }`}
                          >
                            <div
                              className={`flex items-center justify-between gap-2 ${
                                isRtl ? "flex-row-reverse" : ""
                              }`}
                            >
                              <span className="text-xs font-bold text-[#01341d] dark:text-white truncate">
                                {offer.owner}
                              </span>
                              <span className="font-mono tabular-nums text-xs font-bold text-[#14532D] dark:text-[#6fcb3b] shrink-0">
                                {offer.price}
                              </span>
                            </div>
                            <div
                              className={`mt-1.5 flex items-center justify-between text-[11px] text-[#41544A] dark:text-emerald-200/80 ${
                                isRtl ? "flex-row-reverse" : ""
                              }`}
                            >
                              <span>
                                {offer.distance} ·{" "}
                                {lang === "ar"
                                  ? "متوفر الآن"
                                  : lang === "en"
                                  ? "Available now"
                                  : "Disponible"}
                              </span>
                              <span className="inline-flex items-center gap-1 font-mono tabular-nums font-semibold">
                                <Star
                                  className="w-3 h-3 text-[#6fcb3b] fill-[#6fcb3b]"
                                  aria-hidden="true"
                                />
                                {offer.rating}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="w-full py-2.5 px-4 rounded-full bg-[#6fcb3b] hover:bg-[#5eb82c] text-[#01341d] text-xs font-bold text-center transition-colors cursor-pointer"
                    >
                      {lang === "ar"
                        ? "مقارنة واختيار العرض الأنسب"
                        : lang === "en"
                        ? "Compare & Select Best Offer"
                        : "Comparer et choisir l'offre"}
                    </button>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5 pb-3 border-b border-neutral-100 dark:border-white/10">
                      <div className="w-20 h-14 rounded-lg overflow-hidden bg-[#F6F8F6] dark:bg-[#01341d] border border-neutral-200/85 dark:border-white/10 flex items-center justify-center p-1 shrink-0">
                        <TransparentMachineImg
                          src={currentMachine.image}
                          alt={currentMachine.label}
                          loading="eager"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-[#41544A] dark:text-emerald-200/80">
                          {lang === "ar"
                            ? "تم تأكيد الكراء بنجاح"
                            : lang === "en"
                            ? "Rental Arrangement Confirmed"
                            : "Location confirmée"}
                        </p>
                        <p className="text-base font-display font-bold text-[#01341d] dark:text-white mt-0.5 truncate">
                          {mockOffers[selectedOfferIdx].owner}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F6F8F6] dark:bg-[#01341d] border border-neutral-200/85 dark:border-white/10 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#41544A] dark:text-emerald-200/80">
                          {lang === "ar"
                            ? "المسافة"
                            : lang === "en"
                            ? "Distance"
                            : "Distance"}
                        </span>
                        <span className="font-mono tabular-nums font-semibold text-[#01341d] dark:text-white">
                          {mockOffers[selectedOfferIdx].distance}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-200/80 dark:border-white/10">
                        <span className="text-[#41544A] dark:text-emerald-200/80">
                          {lang === "ar"
                            ? "السعر المتفق عليه"
                            : lang === "en"
                            ? "Agreed rate"
                            : "Tarif convenu"}
                        </span>
                        <span className="font-mono tabular-nums font-bold text-[#14532D] dark:text-[#6fcb3b]">
                          {mockOffers[selectedOfferIdx].price}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-neutral-200/80 dark:border-white/10 text-xs text-[#3B4F43] dark:text-emerald-100/85 leading-relaxed">
                        {lang === "ar"
                          ? "بعد إتمام العمل في الحقل، يمكن للفلاح ومالك العتاد تقييم التجربة بشفافية."
                          : lang === "en"
                          ? "Once field work is complete, both farmer and provider rate & review the experience."
                          : "Une fois la prestation terminée, les deux parties peuvent noter et évaluer leur expérience."}
                      </div>
                    </div>

                    <div className="py-2.5 px-4 rounded-full bg-[#6fcb3b] text-[#01341d] text-xs font-bold flex items-center justify-center gap-2">
                      <CheckCircle2
                        className="w-4 h-4 text-[#01341d] shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        {lang === "ar"
                          ? "تأكيد الكراء والتقييم المتبادل"
                          : lang === "en"
                          ? "Confirmed · Mutual Review Ready"
                          : "Confirmé · Évaluation mutuelle"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Interactive Step Indicator Dots */}
                <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-white/10 flex items-center justify-between text-[11px] text-[#41544A] dark:text-emerald-200/80">
                  <span>
                    {lang === "ar"
                      ? "تطبيق حصاد للهاتف المحمول"
                      : lang === "en"
                      ? "HASAD Mobile App"
                      : "Application mobile HASAD | حصاد"}
                  </span>
                  <div className="flex items-center gap-2">
                    {[0, 1, 2].map((i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Aller à l'étape ${i + 1}`}
                        onClick={() => setActiveStep(i)}
                        className={`h-2 rounded-full transition-all duration-150 cursor-pointer ${
                          activeStep === i
                            ? "w-6 bg-[#6fcb3b]"
                            : "w-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-white/20 dark:hover:bg-white/35"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
