import {
  useState,
  useEffect,
  useRef,
  type FC,
  type ReactNode,
  type FormEvent,
} from "react";
import { X, CheckCircle2, Download, Mail, Phone } from "lucide-react";
import { SITE_CONFIG } from "../config/siteConfig";
import type { EquipmentCategoryItem } from "./EquipmentCategories";
import { TransparentMachineImg } from "./TransparentMachineImg";
import {
  TRANSLATIONS,
  type Language,
  type Translations,
} from "../config/translations";

const sanitizeInput = (val: string, maxLen = 300): string => {
  return val
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/[<>]/g, "")
    .slice(0, maxLen);
};

const isValidEmail = (value: string): boolean => {
  const v = value.trim();
  if (v.length < 5 || v.length > 120) return false;
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
    v
  );
};

const isValidAlgerianPhone = (value: string): boolean => {
  const cleaned = value.replace(/[\s\-().]/g, "");
  if (cleaned.length < 9 || cleaned.length > 15) return false;
  return /^(?:\+213|00213|0)(?:[567234])\d{8}$/.test(cleaned);
};

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  isRtl?: boolean;
  children: ReactNode;
}

const ModalShell: FC<ModalShellProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  isRtl = false,
  children,
}) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hasad-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/65 dark:bg-black/75 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        dir={isRtl ? "rtl" : "ltr"}
        className="relative w-full max-w-lg rounded-t-3xl sm:rounded-2xl bg-white text-[#01341d] border-t sm:border border-neutral-200 dark:bg-[#024225] dark:text-white dark:border-white/15 px-5 pt-3.5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-8 max-h-[88dvh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          aria-hidden="true"
          className="sm:hidden w-10 h-1.5 rounded-full bg-neutral-300 dark:bg-white/25 mx-auto mb-4"
        />

        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            {subtitle && (
              <p className="text-xs font-bold text-[#14532D] dark:text-[#6fcb3b] mb-1">
                {subtitle}
              </p>
            )}
            <h3
              id="hasad-modal-title"
              className="font-display font-bold text-xl sm:text-2xl text-[#01341d] dark:text-white tracking-[-0.015em]"
            >
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre"
            className="w-11 h-11 -mr-1.5 -mt-1 rounded-xl inline-flex items-center justify-center text-[#41544A] hover:text-[#01341d] hover:bg-[#F6F8F6] dark:text-emerald-200 dark:hover:text-white dark:hover:bg-white/10 transition-colors duration-150 shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 1. Modal "Bientôt disponible" (Store Launch Notification)                  */
/* -------------------------------------------------------------------------- */

interface StoreLaunchModalProps {
  platform: "Google Play" | "App Store" | null;
  onClose: () => void;
  lang?: Language;
  t?: Translations;
}

export const StoreLaunchModal: FC<StoreLaunchModalProps> = ({
  platform,
  onClose,
  lang = "fr",
  t,
}) => {
  const activeT = t || TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRtl = lang === "ar";
  const [contactInput, setContactInput] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const lastSubmitTime = useRef<number>(0);

  useEffect(() => {
    if (platform) {
      setContactInput("");
      setHoneypot("");
      setError("");
      setSubmitted(false);
    }
  }, [platform]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (honeypot.trim().length > 0) {
      setSubmitted(true);
      return;
    }

    const now = Date.now();
    if (now - lastSubmitTime.current < 2000) {
      return;
    }
    lastSubmitTime.current = now;

    const sanitized = sanitizeInput(contactInput.trim(), 120);
    if (!isValidEmail(sanitized) && !isValidAlgerianPhone(sanitized)) {
      setError(
        lang === "ar"
          ? "يرجى إدخال بريد إلكتروني صالح أو رقم هاتف جزائري (مثال: 0550 12 34 56)."
          : lang === "en"
          ? "Please provide a valid email address or Algerian phone number (e.g. 0550 12 34 56)."
          : "Veuillez saisir une adresse e-mail valide ou un numéro de téléphone algérien (ex. 0550 00 00 00)."
      );
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const titleText = activeT.modals.prelaunchTitle.replace(
    "{platform}",
    platform ?? "mobile"
  );

  return (
    <ModalShell
      isOpen={platform !== null}
      onClose={onClose}
      isRtl={isRtl}
      subtitle={SITE_CONFIG.downloads.comingSoonLabel}
      title={titleText}
    >
      {!submitted ? (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="hasad_hp_website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <p className="text-sm sm:text-[15px] text-[#3B4F43] dark:text-emerald-100/85 leading-relaxed">
            {activeT.modals.prelaunchSubtitle}
          </p>

          <div>
            <label
              htmlFor="launch-contact-input"
              className="block text-xs font-semibold text-[#01341d] dark:text-emerald-100 mb-1.5"
            >
              {activeT.modals.notifyMePrompt}
            </label>
            <input
              id="launch-contact-input"
              type="text"
              maxLength={120}
              value={contactInput}
              onChange={(e) => {
                setContactInput(sanitizeInput(e.target.value, 120));
                if (error) setError("");
              }}
              placeholder={
                lang === "ar"
                  ? "0550 12 34 56 أو ferme@exemple.dz"
                  : "ex. ferme@exploitation.dz ou 0793 67 04 00"
              }
              className="w-full px-4 py-3 text-base sm:text-sm text-[#01341d] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-emerald-200/50 bg-[#F6F8F6] dark:bg-[#01341d] border border-neutral-300 dark:border-white/15 rounded-lg focus:border-[#6fcb3b] focus:outline-none transition-colors"
            />
            {error && (
              <p
                role="alert"
                className="mt-1.5 text-xs text-rose-600 dark:text-rose-400"
              >
                {error}
              </p>
            )}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-[#41544A] hover:text-[#01341d] dark:text-emerald-200 dark:hover:text-white transition-colors cursor-pointer"
            >
              {activeT.modals.close}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm hover:shadow"
            >
              {activeT.modals.submitNotify}
            </button>
          </div>
        </form>
      ) : (
        <div className="py-3 space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2
              className="w-6 h-6 text-[#14532D] dark:text-[#6fcb3b] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="text-base font-semibold text-[#01341d] dark:text-white">
                {activeT.modals.inquirySuccessTitle}
              </p>
              <p className="mt-1 text-sm text-[#3B4F43] dark:text-emerald-100/85 leading-relaxed">
                {activeT.modals.notifySuccess}
              </p>
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] rounded-lg transition-colors cursor-pointer"
            >
              {activeT.modals.close}
            </button>
          </div>
        </div>
      )}
    </ModalShell>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. Modal Propriétaires ("Inscrire sur HASAD") & Contact                    */
/* -------------------------------------------------------------------------- */

interface InquiryModalProps {
  mode: "owner" | "contact" | null;
  onClose: () => void;
  lang?: Language;
  t?: Translations;
}

export const InquiryModal: FC<InquiryModalProps> = ({
  mode,
  onClose,
  lang = "fr",
  t,
}) => {
  const activeT = t || TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRtl = lang === "ar";
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [details, setDetails] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const lastSubmitTime = useRef<number>(0);

  useEffect(() => {
    if (mode) {
      setFullName("");
      setContact("");
      setWilaya("");
      setDetails("");
      setHoneypot("");
      setError("");
      setSubmitted(false);
    }
  }, [mode]);

  const isOwner = mode === "owner";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (honeypot.trim().length > 0) {
      setSubmitted(true);
      return;
    }

    const now = Date.now();
    if (now - lastSubmitTime.current < 2000) {
      return;
    }
    lastSubmitTime.current = now;

    const cleanName = sanitizeInput(fullName.trim(), 80);
    const cleanContact = sanitizeInput(contact.trim(), 120);
    const cleanDetails = sanitizeInput(details.trim(), 800);

    if (cleanName.length < 2) {
      setError(
        lang === "ar"
          ? "يرجى إدخال اسمك الكامل أو اسم المستثمرة."
          : lang === "en"
          ? "Please provide your full name or farm/cooperative name."
          : "Veuillez indiquer votre nom ou celui de votre exploitation."
      );
      return;
    }
    if (!isValidEmail(cleanContact) && !isValidAlgerianPhone(cleanContact)) {
      setError(
        lang === "ar"
          ? "يرجى إدخال رقم هاتف جزائري صحيح أو بريد إلكتروني صالح."
          : lang === "en"
          ? "Please enter a valid phone number or email address."
          : "Veuillez indiquer un numéro de téléphone algérien valide ou une adresse e-mail."
      );
      return;
    }
    if (cleanDetails.length < 3) {
      setError(
        isOwner
          ? activeT.modals.equipPlaceholder
          : activeT.modals.messagePlaceholder
      );
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <ModalShell
      isOpen={mode !== null}
      onClose={onClose}
      isRtl={isRtl}
      subtitle={
        isOwner
          ? lang === "ar"
            ? "ملاك الآلات الفلاحية"
            : lang === "en"
            ? "Agricultural Machinery Owners"
            : "Propriétaires de matériel agricole"
          : activeT.footer.contactUs
      }
      title={
        isOwner
          ? activeT.modals.inquiryOwnerTitle
          : activeT.modals.inquiryContactTitle
      }
    >
      {!submitted ? (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="hasad_inquiry_hp"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <p className="text-sm text-[#3B4F43] dark:text-emerald-100/85 leading-relaxed">
            {isOwner
              ? activeT.modals.inquiryOwnerSubtitle
              : activeT.modals.inquiryContactSubtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label
                htmlFor="inquiry-name"
                className="block text-xs font-semibold text-[#01341d] dark:text-emerald-100 mb-1.5"
              >
                {activeT.modals.nameLabel}
              </label>
              <input
                id="inquiry-name"
                type="text"
                maxLength={80}
                value={fullName}
                onChange={(e) => {
                  setFullName(sanitizeInput(e.target.value, 80));
                  if (error) setError("");
                }}
                placeholder={activeT.modals.namePlaceholder}
                className="w-full px-3.5 py-2.5 text-base sm:text-sm text-[#01341d] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-emerald-200/50 bg-[#F6F8F6] dark:bg-[#01341d] border border-neutral-300 dark:border-white/15 rounded-lg focus:border-[#6fcb3b] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-wilaya"
                className="block text-xs font-semibold text-[#01341d] dark:text-emerald-100 mb-1.5"
              >
                {activeT.modals.wilayaLabel}
              </label>
              <input
                id="inquiry-wilaya"
                type="text"
                maxLength={80}
                value={wilaya}
                onChange={(e) => setWilaya(sanitizeInput(e.target.value, 80))}
                placeholder={activeT.modals.wilayaPlaceholder}
                className="w-full px-3.5 py-2.5 text-base sm:text-sm text-[#01341d] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-emerald-200/50 bg-[#F6F8F6] dark:bg-[#01341d] border border-neutral-300 dark:border-white/15 rounded-lg focus:border-[#6fcb3b] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="inquiry-contact"
              className="block text-xs font-semibold text-[#01341d] dark:text-emerald-100 mb-1.5"
            >
              {lang === "ar"
                ? "الهاتف أو البريد الإلكتروني"
                : lang === "en"
                ? "Phone or Email"
                : "Téléphone ou E-mail"}
            </label>
            <input
              id="inquiry-contact"
              type="text"
              maxLength={120}
              value={contact}
              onChange={(e) => {
                setContact(sanitizeInput(e.target.value, 120));
                if (error) setError("");
              }}
              placeholder={
                lang === "ar"
                  ? "0550 12 34 56 أو contact@hasad.dz"
                  : "ex. 0550 12 34 56 ou contact@hasad.dz"
              }
              className="w-full px-3.5 py-2.5 text-base sm:text-sm text-[#01341d] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-emerald-200/50 bg-[#F6F8F6] dark:bg-[#01341d] border border-neutral-300 dark:border-white/15 rounded-lg focus:border-[#6fcb3b] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="inquiry-details"
              className="block text-xs font-semibold text-[#01341d] dark:text-emerald-100 mb-1.5"
            >
              {isOwner
                ? activeT.modals.equipLabel
                : activeT.modals.messageLabel}
            </label>
            <textarea
              id="inquiry-details"
              rows={3}
              maxLength={800}
              value={details}
              onChange={(e) => {
                setDetails(sanitizeInput(e.target.value, 800));
                if (error) setError("");
              }}
              placeholder={
                isOwner
                  ? activeT.modals.equipPlaceholder
                  : activeT.modals.messagePlaceholder
              }
              className="w-full px-3.5 py-2.5 text-base sm:text-sm text-[#01341d] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-emerald-200/50 bg-[#F6F8F6] dark:bg-[#01341d] border border-neutral-300 dark:border-white/15 rounded-lg focus:border-[#6fcb3b] focus:outline-none resize-none"
            />
          </div>

          {error && (
            <p role="alert" className="text-xs text-rose-600 dark:text-rose-400">
              {error}
            </p>
          )}

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 dark:border-white/10">
            <div className="flex items-center gap-4 text-xs text-[#41544A] dark:text-emerald-200/80">
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="inline-flex items-center gap-1 hover:text-[#01341d] dark:hover:text-white"
              >
                <Mail className="w-3.5 h-3.5 text-[#14532D] dark:text-[#6fcb3b]" aria-hidden="true" />
                <span>{SITE_CONFIG.contact.email}</span>
              </a>
              <a
                href={SITE_CONFIG.contact.phoneHref}
                className="inline-flex items-center gap-1 font-mono tabular-nums hover:text-[#01341d] dark:hover:text-white"
                dir="ltr"
              >
                <Phone className="w-3.5 h-3.5 text-[#14532D] dark:text-[#6fcb3b]" aria-hidden="true" />
                <span>{SITE_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm hover:shadow"
            >
              {activeT.modals.submitInquiry}
            </button>
          </div>
        </form>
      ) : (
        <div className="py-3 space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2
              className="w-6 h-6 text-[#14532D] dark:text-[#6fcb3b] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="text-base font-semibold text-[#01341d] dark:text-white">
                {activeT.modals.inquirySuccessTitle}
              </p>
              <p className="mt-1 text-sm text-[#3B4F43] dark:text-emerald-100/85 leading-relaxed">
                {activeT.modals.inquirySuccessMsg}
              </p>
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] rounded-lg transition-colors cursor-pointer"
            >
              {activeT.modals.close}
            </button>
          </div>
        </div>
      )}
    </ModalShell>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. Modal Aperçu d'une Catégorie d'Équipement Agricole                      */
/* -------------------------------------------------------------------------- */

interface CategoryDetailModalProps {
  category: EquipmentCategoryItem | null;
  onClose: () => void;
  onDownloadApp: () => void;
  lang?: Language;
  t?: Translations;
}

export const CategoryDetailModal: FC<CategoryDetailModalProps> = ({
  category,
  onClose,
  onDownloadApp,
  lang = "fr",
  t,
}) => {
  const activeT = t || TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRtl = lang === "ar";

  return (
    <ModalShell
      isOpen={category !== null}
      onClose={onClose}
      isRtl={isRtl}
      subtitle={category?.groupLabel}
      title={category?.name ?? ""}
    >
      {category && (
        <div className="space-y-5">
          <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#F6F8F6] dark:bg-[#01341d] border border-neutral-200 dark:border-white/12 flex items-center justify-center p-4">
            <div className="w-full h-full block dark:hidden">
              <TransparentMachineImg
                src={category.image}
                alt={category.alt}
                loading="eager"
                className="w-full h-full object-contain object-center drop-shadow-[0_12px_20px_rgba(1,52,29,0.16)]"
              />
            </div>
            <div className="w-full h-full hidden dark:block">
              <TransparentMachineImg
                src={category.image}
                alt={category.alt}
                cleanJpgBottomShadow={[
                  "tractors",
                  "sprayers",
                  "balers",
                  "agricultural-trailers",
                  "irrigation-equipment",
                ].includes(category.id)}
                loading="eager"
                className="w-full h-full object-contain object-center drop-shadow-[0_14px_24px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>

          <p className="text-sm sm:text-[15px] text-[#3B4F43] dark:text-emerald-100/85 leading-relaxed">
            {category.summary}
          </p>

          <div>
            <p className="text-xs font-semibold text-[#01341d] dark:text-white mb-2.5">
              {lang === "ar"
                ? "الاستخدامات الفلاحية الشائعة :"
                : lang === "en"
                ? "Common agricultural applications:"
                : "Usages agricoles courants :"}
            </p>
            <ul className="space-y-2 text-sm text-[#3B4F43] dark:text-emerald-100/85">
              {category.applications.map((app) => (
                <li key={app} className="flex items-start gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#6fcb3b] mt-2 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-neutral-200 dark:border-white/10 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-[#41544A] hover:text-[#01341d] dark:text-emerald-200 dark:hover:text-white cursor-pointer"
            >
              {activeT.modals.close}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onDownloadApp();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm hover:shadow"
            >
              <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{activeT.nav.downloadApp}</span>
            </button>
          </div>
        </div>
      )}
    </ModalShell>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. Modal Mentions Légales (Confidentialité & CGU)                          */
/* -------------------------------------------------------------------------- */

interface LegalModalProps {
  type: "privacy" | "terms" | null;
  onClose: () => void;
  lang?: Language;
  t?: Translations;
}

export const LegalModal: FC<LegalModalProps> = ({
  type,
  onClose,
  lang = "fr",
  t,
}) => {
  const activeT = t || TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRtl = lang === "ar";
  const isPrivacy = type === "privacy";

  return (
    <ModalShell
      isOpen={type !== null}
      onClose={onClose}
      isRtl={isRtl}
      subtitle={
        lang === "ar"
          ? "المعلومات القانونية - حصاد (Soft Click Technologies)"
          : lang === "en"
          ? "HASAD Legal Information (Soft Click Technologies)"
          : "Informations légales HASAD (Soft Click Technologies)"
      }
      title={
        isPrivacy ? activeT.modals.privacyTitle : activeT.modals.termsTitle
      }
    >
      {isPrivacy ? (
        <div className="space-y-4 text-sm text-[#3B4F43] dark:text-emerald-100/85 leading-relaxed">
          <p>
            {lang === "ar"
              ? "تولي منصة حصاد من تطوير Soft Click Technologies أهمية قصوى لحماية البيانات الشخصية للفلاحين وملاك العتاد الفلاحي في الجزائر وفقاً للقانون الجزائري رقم 18-07."
              : lang === "en"
              ? "HASAD, developed by Soft Click Technologies, attaches paramount importance to protecting personal data of farmers and agricultural machinery owners in Algeria, compliant with Algerian Law No. 18-07."
              : "HASAD, développée par Soft Click Technologies, accorde une importance primordiale à la protection des données personnelles des agriculteurs et propriétaires de matériel agricole en Algérie, conformément à la loi algérienne n° 18-07."}
          </p>
          <div>
            <h4 className="font-semibold text-[#01341d] dark:text-white mb-1">
              {lang === "ar"
                ? "1. البيانات التي يتم جمعها"
                : lang === "en"
                ? "1. Data Collected"
                : "1. Données collectées"}
            </h4>
            <p>
              {lang === "ar"
                ? "المعلومات المقدمة عبر استمارات الاتصال أو تطبيق الهاتف المحمول (الاسم، الهاتف، الولاية، ومواصفات المعدات) تُستخدم حصرياً لتوجيه طلبات الكراء الفلاحي إلى الملاك القريبين."
                : lang === "en"
                ? "Information submitted via our contact forms or mobile app (name, phone, wilaya, and machinery details) is strictly used to dispatch on-demand agricultural machinery requests to nearby providers."
                : "Les informations communiquées via nos formulaires ou l'application mobile (nom, coordonnées, wilaya et caractéristiques des équipements) sont strictement utilisées pour transmettre les demandes de location agricole aux propriétaires proches."}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#01341d] dark:text-white mb-1">
              {lang === "ar"
                ? "2. السرية والأمان"
                : lang === "en"
                ? "2. Confidentiality & Security"
                : "2. Confidentialité et sécurité"}
            </h4>
            <p>
              {lang === "ar"
                ? "لا تبيع منصة حصاد بياناتك لأي جهة غير مصرح لها. يمكنك طلب الوصول أو التعديل أو الحذف بمراسلتنا على "
                : lang === "en"
                ? "HASAD never sells or leases your personal details. You can request access, rectification, or deletion by emailing us at "
                : "HASAD ne vend ni ne cède vos données personnelles à des tiers non autorisés. Vous disposez d'un droit d'accès, de rectification et de suppression en nous contactant à "}
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="text-[#14532D] dark:text-[#6fcb3b] font-semibold hover:underline"
              >
                {SITE_CONFIG.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-sm text-[#3B4F43] dark:text-emerald-100/85 leading-relaxed">
          <p>
            {lang === "ar" ? (
              <>
                يهدف هذا الموقع إلى تقديم منصة{" "}
                <strong className="text-[#01341d] dark:text-white">حصاد</strong>{" "}
                المطوّرة من طرف Soft Click Technologies لتسهيل كراء الآلات
                الفلاحية عند الطلب في الجزائر.
              </>
            ) : lang === "en" ? (
              <>
                This website presents the{" "}
                <strong className="text-[#01341d] dark:text-white">HASAD</strong>{" "}
                on-demand agricultural machinery rental platform developed by Soft
                Click Technologies in Algeria.
              </>
            ) : (
              <>
                Le présent site web présente la plateforme{" "}
                <strong className="text-[#01341d] dark:text-white">HASAD</strong>{" "}
                développée par Soft Click Technologies pour la location de matériel
                agricole à la demande en Algérie.
              </>
            )}
          </p>
          <div>
            <h4 className="font-semibold text-[#01341d] dark:text-white mb-1">
              {lang === "ar"
                ? "1. دور المنصة"
                : lang === "en"
                ? "1. Platform Role"
                : "1. Rôle de la plateforme"}
            </h4>
            <p>
              {lang === "ar"
                ? "تعمل حصاد كمنصة رقمية تعتمد نموذج الطلب والاستجابة المباشرة لربط الفلاحين بملاك ومؤجري العتاد الفلاحي القريبين جغرافياً."
                : lang === "en"
                ? "HASAD operates as an on-demand request-and-response platform connecting farmers with nearby agricultural equipment owners."
                : "HASAD agit comme plateforme de mise en relation géolocalisée à la demande entre agriculteurs et propriétaires de matériel agricole."}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#01341d] dark:text-white mb-1">
              {lang === "ar"
                ? "2. الملكية الفكرية"
                : lang === "en"
                ? "2. Intellectual Property"
                : "2. Propriété intellectuelle"}
            </h4>
            <p>
              {lang === "ar"
                ? "علامة حصاد وشعارها ومحتوياتها محمية لصالح Soft Click Technologies. يُمنع أي نسخ غير مصرح به."
                : lang === "en"
                ? "The HASAD brand, logo, and content are protected property of Soft Click Technologies. Unauthorized reproduction is prohibited."
                : "La marque HASAD, son logo et ses contenus sont la propriété de Soft Click Technologies. Toute reproduction non autorisée est interdite."}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/10 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 text-sm font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] rounded-lg transition-colors cursor-pointer"
        >
          {activeT.modals.legalClose}
        </button>
      </div>
    </ModalShell>
  );
};
