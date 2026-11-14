import { type FC } from "react";
import { TransparentMachineImg } from "./TransparentMachineImg";
import type { Language } from "../config/translations";

interface HasadLogoProps {
  size?: "sm" | "md" | "lg";
  lang?: Language;
  showMark?: boolean;
  showWordmark?: boolean;
  showLatin?: boolean;
  showArabic?: boolean;
  markSizeClassName?: string;
  wordmarkSizeClassName?: string;
  wordmarkColorClassName?: string;
  className?: string;
}

const HASAD_LOGO_SRC = "/assets/aistudio/Logo_feuille_verte_minimaliste_d5f2311b.png";

/**
 * Emblème officiel HASAD | حصاد (fichier logo fourni) détouré sans fond blanc
 * pour s'intégrer proprement en mode clair (#FFFFFF) et sombre (#01341d).
 */
export const HasadMark: FC<{ className?: string; loading?: "eager" | "lazy" }> = ({
  className = "w-8 h-8",
  loading = "eager",
}) => (
  <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
    <TransparentMachineImg
      src={HASAD_LOGO_SRC}
      alt="HASAD logo"
      loading={loading}
      className="w-full h-full object-contain"
    />
  </span>
);

export const HasadLogo: FC<HasadLogoProps> = ({
  size = "md",
  lang,
  showMark = true,
  showWordmark = true,
  showLatin,
  showArabic,
  markSizeClassName,
  wordmarkSizeClassName,
  wordmarkColorClassName,
  className = "",
}) => {
  const isArabicOnly = lang === "ar";
  const renderLatin = showLatin ?? !isArabicOnly;
  const renderArabic = showArabic ?? true;

  const markSize =
    markSizeClassName ??
    (size === "sm" ? "w-7 h-7" : size === "lg" ? "w-11 h-11" : "w-9 h-9");

  const textSize =
    wordmarkSizeClassName ??
    (size === "sm"
      ? "text-[17px]"
      : size === "lg"
        ? "text-[26px]"
        : "text-[21px]");

  const arTextSize = isArabicOnly
    ? wordmarkSizeClassName ??
      (size === "sm"
        ? "text-[19px]"
        : size === "lg"
          ? "text-[28px]"
          : "text-[23px]")
    : size === "sm"
      ? "text-[13px]"
      : size === "lg"
        ? "text-[19px]"
        : "text-[15px]";

  const latinColor = wordmarkColorClassName ?? "text-[#01341d] dark:text-white";
  const arabicColor = isArabicOnly
    ? wordmarkColorClassName ?? "text-[#14532D] dark:text-[#6fcb3b]"
    : "text-[#14532D] dark:text-[#6fcb3b]";

  return (
    <span
      className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none ${className}`}
    >
      {showMark && <HasadMark className={markSize} />}
      {showWordmark && (
        <span className="inline-flex items-baseline gap-1.5">
          {renderLatin && (
            <span
              className={`font-display font-bold tracking-[-0.03em] leading-none ${latinColor} ${textSize}`}
            >
              HASAD
            </span>
          )}
          {renderArabic && (
            <span
              className={`font-arabic-display font-bold leading-none ${arabicColor} ${arTextSize}`}
            >
              حصاد
            </span>
          )}
        </span>
      )}
    </span>
  );
};
