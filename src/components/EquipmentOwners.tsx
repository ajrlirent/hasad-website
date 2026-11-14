import { useState, type FC } from "react";
import {
  Tractor,
  BellRing,
  BadgeCheck,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

import type { Language, Translations } from "../config/translations";

interface EquipmentOwnersProps {
  onJoinClick: () => void;
  lang?: Language;
  t?: Translations;
}

export const EquipmentOwners: FC<EquipmentOwnersProps> = ({
  onJoinClick,
  lang = "fr",
  t,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isRtl = lang === "ar";

  const ownerBenefits = [
    {
      step: "01",
      title: t?.owners.steps.s1Title ?? "Enregistrez vos machines et photos.",
      description:
        t?.owners.steps.s1Desc ??
        "Ajoutez vos tracteurs, moissonneuses, charrues, pulvérisateurs ou remorques avec leurs fiches et photos réelles.",
      Icon: Tractor,
    },
    {
      step: "02",
      title: t?.owners.steps.s2Title ?? "Recevez des alertes géolocalisées.",
      description:
        t?.owners.steps.s2Desc ??
        "Dès qu'un agriculteur à proximité demande votre type d'équipement, vous recevez une notification immédiate.",
      Icon: BellRing,
    },
    {
      step: "03",
      title:
        t?.owners.steps.s3Title ?? "Soumettez votre disponibilité et tarif.",
      description:
        t?.owners.steps.s3Desc ??
        "Acceptez ou refusez en toute liberté en proposant votre prix et vos créneaux de disponibilité.",
      Icon: BadgeCheck,
    },
    {
      step: "04",
      title:
        t?.owners.steps.s4Title ?? "Bâtissez votre réputation et vos revenus.",
      description:
        t?.owners.steps.s4Desc ??
        "Réduisez les périodes d'inactivité saisonnière et gagnez la confiance des exploitants grâce aux avis vérifiés.",
      Icon: TrendingUp,
    },
  ];

  const badgeText = t?.owners.badge ?? "Propriétaires de matériel agricole";
  const titleText =
    t?.owners.title ??
    "Vous possédez des engins agricoles ? Maximisez leur utilisation.";
  const descriptionText =
    t?.owners.description ??
    "Plus besoin d'attendre qu'un client trouve votre annonce : sur HASAD, recevez directement les demandes des agriculteurs proches et répondez avec votre tarif.";
  const ctaJoinText = t?.owners.ctaJoin ?? "Inscrire mon matériel sur HASAD";

  return (
    <section
      id="proprietaires"
      className={`bg-[#F6F8F6] text-[#01341d] dark:bg-[#012917] dark:text-white py-14 sm:py-20 md:py-28 border-t border-neutral-200/80 dark:border-white/10 scroll-mt-16 transition-colors duration-200 ${
        isRtl ? "text-right" : "text-left"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-10">
        <div
          className={`flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-16 ${
            isRtl ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Left Sticky Pitch & Primary Owner CTA */}
          <div className="lg:w-[42%] lg:sticky lg:top-28">
            <p className="text-xs sm:text-[13px] font-bold text-[#14532D] dark:text-[#6fcb3b] tracking-wide mb-2.5 sm:mb-3">
              {badgeText}
            </p>
            <h2
              className={`font-display font-bold text-[#01341d] dark:text-white text-[1.75rem] sm:text-4xl lg:text-[2.45rem] leading-[1.15] sm:leading-[1.14] tracking-[-0.02em] ${
                isRtl ? "font-arabic" : ""
              }`}
            >
              {titleText}
            </h2>

            <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] text-[#3B4F43] dark:text-emerald-100/90 leading-[1.65] tracking-[0.005em]">
              {descriptionText}
            </p>

            {/* Desktop Primary CTA */}
            <div className={`hidden lg:block mt-9 ${isRtl ? "text-right" : ""}`}>
              <button
                type="button"
                onClick={onJoinClick}
                className={`min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[15px] font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] active:scale-[0.99] rounded-full transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isRtl ? "flex-row-reverse" : ""
                }`}
              >
                <span>{ctaJoinText}</span>
                <ArrowRight
                  className={`w-4 h-4 shrink-0 ${isRtl ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* Right Non-Grid Architectural Connected Vertical Progression */}
          <div className="lg:w-[54%] relative">
            <ol className="relative">
              {ownerBenefits.map(({ step, title, description, Icon }, idx) => {
                const isActive = activeIndex === idx;
                const isLast = idx === ownerBenefits.length - 1;

                return (
                  <li
                    key={step}
                    className={`relative ${isLast ? "pb-0" : "pb-6 sm:pb-8"}`}
                  >
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className={`absolute left-[21px] sm:left-[23px] top-11 sm:top-12 bottom-0 w-px transition-colors duration-200 ${
                          idx < activeIndex
                            ? "bg-[#6fcb3b]"
                            : "bg-neutral-200 dark:bg-white/14"
                        }`}
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`group w-full text-left flex items-start gap-4 sm:gap-6 transition-opacity duration-150 cursor-pointer ${
                        isActive ? "opacity-100" : "opacity-85 hover:opacity-100"
                      }`}
                    >
                      <span
                        className={`relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full inline-flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isActive
                            ? "bg-[#6fcb3b] text-[#01341d] shadow-[0_0_0_5px_rgba(111,203,59,0.22)]"
                            : "bg-white text-[#14532D] border border-neutral-200/95 group-hover:border-[#6fcb3b] dark:bg-[#024225] dark:text-[#6fcb3b] dark:border-white/15"
                        }`}
                      >
                        <Icon
                          className="w-5 h-5"
                          strokeWidth={1.85}
                          aria-hidden="true"
                        />
                      </span>

                      <div
                        className={`flex-1 min-w-0 pt-0.5 ${
                          isLast
                            ? "pb-0"
                            : "pb-6 sm:pb-7 border-b border-neutral-200/90 dark:border-white/10"
                        }`}
                      >
                        <span
                          className={`font-mono tabular-nums text-xs font-semibold tracking-wider block mb-1 transition-colors duration-150 ${
                            isActive
                              ? "text-[#14532D] dark:text-[#6fcb3b]"
                              : "text-[#41544A] dark:text-emerald-200/70"
                          }`}
                        >
                          {lang === "ar"
                            ? `المرحلة ${step}`
                            : lang === "en"
                            ? `STEP ${step}`
                            : `ÉTAPE ${step}`}
                        </span>

                        <h3 className="font-display font-bold text-lg sm:text-[22px] text-[#01341d] dark:text-white leading-snug tracking-[-0.015em]">
                          {title}
                        </h3>

                        <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-[#3B4F43] dark:text-emerald-100/85 leading-[1.6] tracking-[0.005em] max-w-[50ch]">
                          {description}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Mobile Natural Thumb-Zone CTA */}
            <div className="lg:hidden mt-8 pt-6 border-t border-neutral-200/90 dark:border-white/10">
              <button
                type="button"
                onClick={onJoinClick}
                className={`min-h-[48px] w-full max-w-full inline-flex items-center justify-center gap-2.5 px-4 sm:px-7 py-3.5 text-sm sm:text-[15px] font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] active:scale-[0.99] rounded-full transition-all duration-150 cursor-pointer ${
                  isRtl ? "flex-row-reverse" : ""
                }`}
              >
                <span className="truncate">{ctaJoinText}</span>
                <ArrowRight
                  className={`w-4 h-4 shrink-0 ${isRtl ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
