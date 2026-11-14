# HASAD | حصاد — Developer & Architecture Guide

Welcome to the **HASAD | حصاد** codebase (`On-Demand Agricultural Machinery Rental Platform` in Algeria, developed by **Soft Click Technologies**).
This application is built with **React 19 + TypeScript + Vite + Tailwind CSS v4**.

---

## 1. Project Architecture & Directory Structure

```
├── index.html                    # HTML shell, SEO metadata, CSP headers, Google Fonts & theme-init script
├── metadata.json                 # App name & description metadata
├── package.json                  # Dependencies and scripts (dev, build, lint, preview)
├── vite.config.ts                # Vite build configuration & plugins
├── public/
│   ├── favicon.svg               # HASAD brand SVG favicon
│   └── assets/aistudio/
│       └── Logo_feuille_verte_minimaliste_d5f2311b.png  # Official HASAD mark
└── src/
    ├── main.tsx                  # App entry point wrapped with RootErrorBoundary
    ├── App.tsx                   # Root state orchestration (Theme, Language, Modals)
    ├── index.css                 # Tailwind v4 tokens (#01341d, #6fcb3b), Alexandria & IBM Plex Sans Arabic fonts
    ├── config/
    │   ├── siteConfig.ts         # Global constants: contact email, phone, store URLs, branding
    │   └── translations.ts       # Trilingual dictionary (Français, العربية, English)
    ├── data/
    │   └── algeriaWilayas.ts     # All 69 Algerian Wilayas (Codes, Names, Regions, SVG Coordinates)
    ├── components/
    │   ├── HasadLogo.tsx         # Official HASAD / حصاد mark + wordmark component
    │   ├── Navbar.tsx            # Sticky header, trilingual switcher, Light/Dark toggle, mobile drawer
    │   ├── Hero.tsx              # Hero section, harvesting field backdrop, emblem, harvester & tractor cutouts
    │   ├── WhatIsHasad.tsx       # "About HASAD" on-demand dispatch overview + interactive 69-wilaya selector
    │   ├── AlgeriaHeroMap.tsx    # Interactive Algeria map (Light Mode #6fcb3b SVG, Dark Mode 2D Canvas)
    │   ├── WilayaDropdown.tsx    # Accessible searchable dropdown across all 69 wilayas
    │   ├── EquipmentCategories.tsx # 9 agricultural machinery categories with domain filter tabs
    │   ├── HowItWorks.tsx        # 3-step on-demand request/offers/confirm & review interactive simulator
    │   ├── EquipmentOwners.tsx   # Value proposition & onboarding steps for agricultural machinery owners
    │   ├── FinalDownloadCta.tsx  # Download banner with Google Play & App Store actions
    │   ├── Footer.tsx            # Legal links, copyright, contact info, quick links
    │   ├── Modals.tsx            # Store pre-launch, Owner/Contact inquiry, Category detail, Legal modals
    │   └── TransparentMachineImg.tsx # Canvas-based background & bottom floor-shadow stripper for cutouts
    └── assets/
        └── images/               # Agricultural photography & 9 machinery category cutouts
```

---

## 2. Common Customization Tasks

### A. Updating Contact Details & Store Links
Edit `/src/config/siteConfig.ts`:
- `SITE_CONFIG.contact.phoneDisplay`
- `SITE_CONFIG.contact.email` (`contact@hasad.dz`)
- `SITE_CONFIG.downloads.googlePlayUrl` / `appStoreUrl`

### B. Updating Copy & Translations (`fr` / `ar` / `en`)
Edit `/src/config/translations.ts`:
- Sections: `nav`, `hero`, `about`, `dropdown`, `categories`, `howItWorks`, `owners`, `downloadCta`, `footer`, `modals`.
- Switching to `ar` triggers `dir="rtl"`, shows **حصاد** exclusively, and applies **Alexandria** (headings/brand) and **IBM Plex Sans Arabic** (body/UI).

### C. Managing Agricultural Machinery Categories
Edit `/src/components/EquipmentCategories.tsx`:
- `EQUIPMENT_CATEGORIES` defines all 9 agricultural machinery categories (`tractors`, `combine-harvesters`, `ploughs-cultivators`, `seeders-planters`, `sprayers`, `balers`, `agricultural-trailers`, `irrigation-equipment`, `specialized-machinery`).
- `CLEAN_DARK_BOTTOM_IDS` controls dark-mode bottom shadow stripping via `TransparentMachineImg`.

### D. Updating Algerian Wilayas
Edit `/src/data/algeriaWilayas.ts`:
- Single source of truth for all 69 wilayas across `AlgeriaHeroMap.tsx` and `WilayaDropdown.tsx`.
