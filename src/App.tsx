/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhatIsHasad } from "./components/WhatIsHasad";
import {
  EquipmentCategories,
  type EquipmentCategoryItem,
} from "./components/EquipmentCategories";
import { HowItWorks } from "./components/HowItWorks";
import { EquipmentOwners } from "./components/EquipmentOwners";
import { FinalDownloadCta } from "./components/FinalDownloadCta";
import { Footer } from "./components/Footer";
import {
  StoreLaunchModal,
  InquiryModal,
  CategoryDetailModal,
  LegalModal,
} from "./components/Modals";
import { TRANSLATIONS, type Language } from "./config/translations";
import { SITE_CONFIG } from "./config/siteConfig";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      const saved = window.localStorage.getItem("hasad-theme");
      return saved === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem("hasad-lang");
      if (saved === "ar" || saved === "en" || saved === "fr") {
        return saved;
      }
      const navLang = navigator.language?.slice(0, 2).toLowerCase();
      if (navLang === "ar") return "ar";
      if (navLang === "en") return "en";
      return "fr";
    } catch {
      return "fr";
    }
  });

  const [storeModalPlatform, setStoreModalPlatform] = useState<
    "Google Play" | "App Store" | null
  >(null);
  const [inquiryMode, setInquiryMode] = useState<"owner" | "contact" | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] =
    useState<EquipmentCategoryItem | null>(null);
  const [legalType, setLegalType] = useState<"privacy" | "terms" | null>(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute(
        "content",
        theme === "dark" ? "#01341d" : "#FFFFFF"
      );
    }

    try {
      window.localStorage.setItem("hasad-theme", theme);
    } catch {
      // Ignore storage write errors in restricted browsing modes
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";

    document.title =
      lang === "ar"
        ? "حصاد — كراء الآلات والمعدات الفلاحية عند الطلب في الجزائر"
        : lang === "en"
        ? "HASAD — On-Demand Agricultural Machinery Rental in Algeria"
        : "HASAD | حصاد — Location de matériel agricole à la demande en Algérie";

    try {
      window.localStorage.setItem("hasad-lang", lang);
    } catch {
      // Ignore storage write errors
    }
  }, [lang]);

  const downloadApk = () => {
    const url = SITE_CONFIG.downloads.googlePlayUrl.trim();
    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.download = "HASAD.apk";
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }
    const el = document.getElementById("telecharger");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen min-h-[100dvh] flex flex-col bg-white text-[#0D1F15] dark:bg-[#01341d] dark:text-white overflow-x-clip transition-colors duration-200"
    >
      {/* Section 1 — Navigation with Theme & Language switchers */}
      <Navbar
        theme={theme}
        onThemeChange={setTheme}
        lang={lang}
        onLanguageChange={setLang}
        t={t}
        onDownloadClick={downloadApk}
      />

      <main className="flex-1">
        {/* Section 2 — Hero */}
        <Hero lang={lang} t={t} onDownloadClick={downloadApk} />

        {/* Section 3 — What is HASAD? (With 69 Wilayas Map & Dropdown) */}
        <WhatIsHasad
          theme={theme}
          lang={lang}
          t={t}
          onDownloadClick={downloadApk}
        />

        {/* Section 4 — Agricultural Machinery Categories */}
        <EquipmentCategories
          lang={lang}
          t={t}
          onSelectCategory={setSelectedCategory}
        />

        {/* Section 5 — How HASAD Works */}
        <HowItWorks lang={lang} t={t} />

        {/* Section 6 — For Agricultural Equipment Owners */}
        <EquipmentOwners
          lang={lang}
          t={t}
          onJoinClick={() => setInquiryMode("owner")}
        />

        {/* Section 7 — Final Download CTA */}
        <FinalDownloadCta
          lang={lang}
          t={t}
          onStoreUnavailableClick={setStoreModalPlatform}
        />
      </main>

      {/* Section 8 — Footer */}
      <Footer
        lang={lang}
        t={t}
        onOpenContact={() => setInquiryMode("contact")}
        onOpenLegal={setLegalType}
      />

      {/* Interactive Modals */}
      <StoreLaunchModal
        platform={storeModalPlatform}
        onClose={() => setStoreModalPlatform(null)}
        lang={lang}
        t={t}
      />

      <InquiryModal
        mode={inquiryMode}
        onClose={() => setInquiryMode(null)}
        lang={lang}
        t={t}
      />

      <CategoryDetailModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onDownloadApp={downloadApk}
        lang={lang}
        t={t}
      />

      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
        lang={lang}
        t={t}
      />
    </div>
  );
}
