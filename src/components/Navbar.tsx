import { useState, useEffect, useRef, type FC } from "react";
import { Menu, X, Download, Sun, Moon, Globe, ChevronDown } from "lucide-react";
import { HasadLogo } from "./HasadLogo";
import type { Language, Translations } from "../config/translations";

interface NavbarProps {
  theme: "light" | "dark";
  onThemeChange: (nextTheme: "light" | "dark") => void;
  lang: Language;
  onLanguageChange: (nextLang: Language) => void;
  t: Translations;
  onDownloadClick: () => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "FR" },
  { code: "ar", label: "العربية", flag: "AR" },
  { code: "en", label: "English", flag: "EN" },
];

export const Navbar: FC<NavbarProps> = ({
  theme,
  onThemeChange,
  lang,
  onLanguageChange,
  t,
  onDownloadClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement | null>(null);

  const isRtl = lang === "ar";

  const navLinks = [
    { label: t.nav.home, href: "#accueil" },
    { label: t.nav.howItWorks, href: "#comment-ca-marche" },
    { label: t.nav.about, href: "#a-propos" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setLangMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-150 ${
        scrolled || mobileMenuOpen
          ? "bg-white/95 dark:bg-[#01341d]/95 backdrop-blur-xl border-b border-neutral-200/90 dark:border-white/12"
          : "bg-white/90 dark:bg-[#01341d]/85 backdrop-blur-md border-b border-neutral-200/60 dark:border-white/8"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-10 h-[60px] md:h-[74px] flex items-center justify-between gap-2 md:gap-8">
        {/* Zone 1: HASAD / حصاد Mark + Wordmark */}
        <a
          href="#accueil"
          aria-label={
            lang === "ar" ? "حصاد — العودة إلى الرئيسية" : "HASAD — Retour à l'accueil"
          }
          className="whitespace-nowrap shrink-0 rounded-md"
        >
          <span className="md:hidden">
            <HasadLogo
              size="sm"
              lang={lang}
              showLatin={lang !== "ar"}
              showArabic={lang === "ar"}
              markSizeClassName="w-8 h-8"
              wordmarkSizeClassName="text-[19px]"
              wordmarkColorClassName="text-[#6fcb3b]"
            />
          </span>
          <span className="hidden md:inline-flex">
            <HasadLogo
              size="md"
              lang={lang}
              showLatin={lang !== "ar"}
              showArabic={lang === "ar"}
              markSizeClassName="w-10 h-10"
              wordmarkSizeClassName="text-[23px]"
              wordmarkColorClassName="text-[#6fcb3b]"
            />
          </span>
        </a>

        {/* Zone 2: 4 Clean Single-Line Text Navigation Links */}
        <nav
          aria-label="Navigation principale"
          className={`hidden md:flex items-center gap-6 lg:gap-8 text-[15px] font-medium text-[#2E4237] dark:text-emerald-100/90 ${
            isRtl ? "font-arabic" : ""
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#01341d] dark:hover:text-white transition-colors duration-150 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#6fcb3b] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Language Selector + Theme Switcher + Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Selector Dropdown (Desktop & Mobile) */}
          <div ref={langDropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen((prev) => !prev)}
              aria-expanded={langMenuOpen}
              aria-label={t.nav.languageAria}
              className="h-9 sm:h-10 px-2 sm:px-2.5 rounded-full inline-flex items-center gap-1.5 bg-[#F6F8F6] hover:bg-emerald-50 border border-neutral-200/90 text-[#01341d] dark:bg-[#024225] dark:hover:bg-[#034e2c] dark:border-white/14 dark:text-white transition-colors duration-150 shrink-0 cursor-pointer text-xs font-semibold"
            >
              <Globe className="w-4 h-4 text-[#14532D] dark:text-[#6fcb3b] shrink-0" aria-hidden="true" />
              <span className="font-mono uppercase text-[11px] font-bold tracking-wider">
                {lang}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#41544A] dark:text-emerald-200 transition-transform duration-150 ${
                  langMenuOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {langMenuOpen && (
              <div
                className={`absolute top-[calc(100%+6px)] z-50 min-w-[130px] p-1 rounded-xl bg-white dark:bg-[#022817] border border-neutral-200/90 dark:border-white/15 shadow-xl ${
                  isRtl ? "left-0" : "right-0"
                }`}
              >
                {LANGUAGES.map((item) => {
                  const isActive = lang === item.code;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => {
                        onLanguageChange(item.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between gap-2.5 transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#6fcb3b]/20 text-[#01341d] dark:text-[#6fcb3b] font-bold"
                          : "text-[#0D1F15] hover:bg-[#F6F8F6] dark:text-emerald-100 dark:hover:bg-white/10"
                      } ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-[10px] opacity-75 uppercase">
                        {item.flag}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Segmented Light / Dark Switcher */}
          <div
            role="group"
            aria-label={t.nav.themeAria}
            className="hidden md:inline-flex items-center p-1 rounded-full bg-[#F6F8F6] border border-neutral-200/90 dark:bg-[#024225] dark:border-white/14 shrink-0"
          >
            <button
              type="button"
              onClick={() => onThemeChange("light")}
              aria-pressed={theme === "light"}
              title={t.nav.lightMode}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                theme === "light"
                  ? "bg-white text-[#01341d] shadow-xs"
                  : "text-emerald-100/80 hover:text-white"
              }`}
            >
              <Sun
                className={`w-3.5 h-3.5 shrink-0 ${
                  theme === "light" ? "text-[#14532D]" : ""
                }`}
                aria-hidden="true"
              />
              <span className="hidden xl:inline">{t.nav.lightMode}</span>
            </button>

            <button
              type="button"
              onClick={() => onThemeChange("dark")}
              aria-pressed={theme === "dark"}
              title={t.nav.darkMode}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                theme === "dark"
                  ? "bg-[#01341d] text-white shadow-xs ring-1 ring-white/15"
                  : "text-[#41544A] hover:text-[#01341d]"
              }`}
            >
              <Moon
                className={`w-3.5 h-3.5 shrink-0 ${
                  theme === "dark" ? "text-[#6fcb3b]" : ""
                }`}
                aria-hidden="true"
              />
              <span className="hidden xl:inline">{t.nav.darkMode}</span>
            </button>
          </div>

          {/* Mobile 1-Tap Theme Toggle */}
          <button
            type="button"
            onClick={() =>
              onThemeChange(theme === "dark" ? "light" : "dark")
            }
            aria-label={
              theme === "dark" ? t.nav.lightMode : t.nav.darkMode
            }
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full inline-flex items-center justify-center bg-[#F6F8F6] border border-neutral-200/90 text-[#01341d] dark:bg-[#024225] dark:border-white/14 dark:text-white transition-colors duration-150 shrink-0 cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[#6fcb3b]" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4 text-[#14532D]" aria-hidden="true" />
            )}
          </button>

          {/* Desktop Full CTA */}
          <button
            type="button"
            onClick={onDownloadClick}
            className="hidden md:inline-flex items-center gap-2 px-5 lg:px-6 py-2.5 text-sm font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] active:scale-[0.99] rounded-full transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.nav.downloadApp}</span>
          </button>

          {/* Adaptive Mobile Primary CTA */}
          <button
            type="button"
            onClick={onDownloadClick}
            title={t.nav.downloadApp}
            aria-label={t.nav.downloadApp}
            className="md:hidden h-9 w-9 sm:w-auto sm:px-3 sm:py-1.5 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] active:scale-[0.98] rounded-full transition-all duration-150 shrink-0 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline whitespace-nowrap">{t.nav.downloadCompact}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-[#01341d] hover:bg-[#F6F8F6] dark:text-white dark:hover:bg-white/10 transition-colors duration-150 cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer + Backdrop Scrim */}
      {mobileMenuOpen && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-x-0 top-[60px] bottom-0 bg-black/55 dark:bg-black/65 backdrop-blur-xs z-30"
          />
          <div
            id="mobile-navigation"
            className="md:hidden relative z-40 bg-white dark:bg-[#024225] border-b border-neutral-200 dark:border-white/12 px-4 pt-2 pb-6 shadow-2xl rounded-b-2xl"
          >
            <nav
              aria-label="Menu mobile"
              className={`flex flex-col divide-y divide-neutral-200/80 dark:divide-white/10 ${
                isRtl ? "text-right" : "text-left"
              }`}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[48px] flex items-center text-[15px] font-semibold text-[#0D1F15] dark:text-white hover:text-[#14532D] dark:hover:text-[#6fcb3b] transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile Drawer Language Strip */}
            <div className="mt-4 pt-3 border-t border-neutral-200/80 dark:border-white/10">
              <p className="text-xs font-semibold text-[#41544A] dark:text-emerald-200/80 mb-2">
                {t.nav.languageAria}
              </p>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#F6F8F6] dark:bg-[#01341d]">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      onLanguageChange(item.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`min-h-[38px] inline-flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      lang === item.code
                        ? "bg-white text-[#01341d] shadow-xs dark:bg-[#024225] dark:text-white"
                        : "text-[#41544A] hover:text-[#01341d] dark:text-emerald-100/80 dark:hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Drawer Theme Selector */}
            <div className="mt-3 grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#F6F8F6] dark:bg-[#01341d]">
              <button
                type="button"
                onClick={() => onThemeChange("light")}
                aria-pressed={theme === "light"}
                className={`min-h-[40px] inline-flex items-center justify-center gap-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  theme === "light"
                    ? "bg-white text-[#01341d] shadow-xs"
                    : "text-emerald-100/80 hover:text-white"
                }`}
              >
                <Sun
                  className={`w-4 h-4 ${
                    theme === "light" ? "text-[#14532D]" : ""
                  }`}
                  aria-hidden="true"
                />
                <span>{t.nav.lightMode}</span>
              </button>
              <button
                type="button"
                onClick={() => onThemeChange("dark")}
                aria-pressed={theme === "dark"}
                className={`min-h-[40px] inline-flex items-center justify-center gap-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  theme === "dark"
                    ? "bg-[#024225] text-white shadow-xs ring-1 ring-white/15"
                    : "text-[#41544A] hover:text-[#01341d]"
                }`}
              >
                <Moon
                  className={`w-4 h-4 ${
                    theme === "dark" ? "text-[#6fcb3b]" : ""
                  }`}
                  aria-hidden="true"
                />
                <span>{t.nav.darkMode}</span>
              </button>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onDownloadClick();
                }}
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-[#01341d] bg-[#6fcb3b] hover:bg-[#5eb82c] rounded-full transition-colors duration-150 whitespace-nowrap cursor-pointer"
              >
                <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.nav.downloadApp}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
