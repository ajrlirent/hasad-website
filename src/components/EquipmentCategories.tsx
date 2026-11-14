import { useState, type FC } from "react";
import { ArrowUpRight, Tractor } from "lucide-react";
import { TransparentMachineImg } from "./TransparentMachineImg";
import type { Language, Translations } from "../config/translations";

import tractorImg from "../assets/images/cutout_agri_tractor_1794618039506.jpg";
import harvesterImg from "../assets/images/cutout_combine_harvester_1794618040929.jpg";
import seederImg from "../assets/images/cutout_seeder_planter_1794618040462.jpg";
import sprayerImg from "../assets/images/cutout_crop_sprayer_1794618040491.jpg";
import ploughImg from "../assets/images/cutout_plough_cultivator_1794618041513.jpg";
import balerImg from "../assets/images/cutout_hay_baler_1794618041948.jpg";
import trailerImg from "../assets/images/cutout_agri_trailer_1794618043738.jpg";
import irrigationImg from "../assets/images/cutout_irrigation_gear_1794618043105.jpg";
import specializedImg from "../assets/images/cutout_specialized_agri_1794618043637.jpg";

export interface EquipmentCategoryItem {
  id: string;
  name: string;
  nameAr?: string;
  nameEn?: string;
  group:
    | "tractors-tillage"
    | "harvest-hay"
    | "seeding-crop-care"
    | "transport-irrigation";
  groupLabel: string;
  groupLabelAr?: string;
  groupLabelEn?: string;
  summary: string;
  summaryAr?: string;
  summaryEn?: string;
  applications: string[];
  applicationsAr?: string[];
  applicationsEn?: string[];
  image: string;
  alt: string;
  altAr?: string;
  altEn?: string;
}

export const EQUIPMENT_CATEGORIES: EquipmentCategoryItem[] = [
  {
    id: "tractors",
    name: "Tracteurs agricoles",
    nameAr: "الجرارات الفلاحية",
    nameEn: "Tractors",
    group: "tractors-tillage",
    groupLabel: "Tracteurs & Labour",
    groupLabelAr: "الجرارات والحرث",
    groupLabelEn: "Tractors & Tillage",
    summary: "Traction polyvalente 4x4, préparation des sols et remorquage lourd.",
    summaryAr: "جرارات دفع رباعي لجميع الأعمال الفلاحية، الحرث، والجر.",
    summaryEn: "Heavy-duty 4WD farm traction, primary tillage, and implement haulage.",
    applications: [
      "Tracteurs 4x4 de moyenne et forte puissance (75 à 220 CV)",
      "Travaux de labour, remorquage et entraînement par prise de force",
      "Tracteurs étroits adaptés aux vergers, oliveraies et vignobles",
    ],
    applicationsAr: [
      "جرارات دفع رباعي بقدرات متنوعة من 75 إلى 220 حصان",
      "أشغال الحرث العميق والجر وتشغيل المعدات المقطورة",
      "جرارات مدمجة مخصصة للبساتين وبساتين الزيتون والكروم",
    ],
    applicationsEn: [
      "Mid-to-high horsepower 4WD utility & row-crop tractors",
      "PTO implement operation, deep ploughing, and heavy haulage",
      "Narrow orchard & vineyard tractors for specialized crops",
    ],
    image: tractorImg,
    alt: "Tracteur agricole 4x4 sans arrière-plan",
    altAr: "جرار فلاحي رباعي الدفع بدون خلفية",
    altEn: "4WD agricultural tractor cutout",
  },
  {
    id: "combine-harvesters",
    name: "Moissonneuses-batteuses",
    nameAr: "آلات الحصاد والدراس",
    nameEn: "Combine Harvesters",
    group: "harvest-hay",
    groupLabel: "Récolte & Fourrage",
    groupLabelAr: "الحصاد والأعلاف",
    groupLabelEn: "Harvest & Hay",
    summary: "Récolte rapide des céréales, blé dur, orge et grandes cultures.",
    summaryAr: "حصاد ودراس سريع وفعّال للقمح الصلب، الشعير والمحاصيل الكبرى.",
    summaryEn: "High-capacity harvesting for wheat, barley, and cereal grain crops.",
    applications: [
      "Moissonneuses-batteuses haute capacité pour blé dur, tendre et orge",
      "Barres de coupe larges avec battage et nettoyage optimisés",
      "Intervention rapide à la demande durant les fenêtres de récolte",
    ],
    applicationsAr: [
      "حاصدات دارسة عالية المردودية للقمح الصلب واللين والشعير",
      "مقاطع حصاد عريضة مع فصل وتنظيف دقيق للحبوب",
      "تدخل سريع عند الطلب خلال ذروة مواسم الحصاد",
    ],
    applicationsEn: [
      "High-output grain combines for durum wheat, soft wheat, and barley",
      "Wide grain headers with efficient threshing and separation",
      "On-demand dispatch during peak harvest windows",
    ],
    image: harvesterImg,
    alt: "Moissonneuse-batteuse agricole sans arrière-plan",
    altAr: "آلة حصاد ودراس بدون خلفية",
    altEn: "Combine harvester cutout",
  },
  {
    id: "ploughs-cultivators",
    name: "Charrues et cultivateurs",
    nameAr: "المحاريث وآلات حرث التربة",
    nameEn: "Ploughs & Cultivators",
    group: "tractors-tillage",
    groupLabel: "Tracteurs & Labour",
    groupLabelAr: "الجرارات والحرث",
    groupLabelEn: "Tractors & Tillage",
    summary: "Labour profond, déchaumage et préparation du lit de semence.",
    summaryAr: "قلب التربة العميق، تفتيت الكتل وتجهيز مهد البذار.",
    summaryEn: "Deep soil inversion, stubble tillage, and seedbed preparation.",
    applications: [
      "Charrues réversibles multi-socs pour labour profond",
      "Cover-crops, herses à disques et cultivateurs lourds",
      "Aération des sols et enfouissement des résidus végétaux",
    ],
    applicationsAr: [
      "محاريث قلاّبة متعددة الأسلحة للحرث العميق",
      "أمشاط الأقراص (كوفركروب) وآلات تحضير التربة",
      "تهوية التربة ودمج البقايا النباتية قبل البذر",
    ],
    applicationsEn: [
      "Multi-furrow reversible mouldboard ploughs for deep tillage",
      "Heavy disc harrows and spring-tine cultivators",
      "Soil aeration and crop residue incorporation",
    ],
    image: ploughImg,
    alt: "Charrue et cultivateur à disques sans arrière-plan",
    altAr: "محراث فلاحي وآلة تقليب التربة بدون خلفية",
    altEn: "Reversible plough and disc cultivator cutout",
  },
  {
    id: "seeders-planters",
    name: "Semoirs et planteuses",
    nameAr: "البذارات وآلات الغرس",
    nameEn: "Seeders & Planters",
    group: "seeding-crop-care",
    groupLabel: "Semis & Traitement",
    groupLabelAr: "البذر والمعالجة",
    groupLabelEn: "Seeding & Crop Care",
    summary: "Semis de précision en lignes, céréales, maraîchage et maïs.",
    summaryAr: "بذر دقيق في صفوف منتظمة للحبوب، الذرة والزراعات الموسمية.",
    summaryEn: "Precision row seeding for cereals, legumes, and row crops.",
    applications: [
      "Semoirs mécaniques et pneumatiques à céréales et légumineuses",
      "Planteuses de pommes de terre et semoirs monograines",
      "Réglage précis de la densité et profondeur de semis",
    ],
    applicationsAr: [
      "بذارات ميكانيكية وهوائية للحبوب والبقوليات",
      "آلات غرس البطاطا وبذارات الحبة الواحدة الدقيقة",
      "ضبط دقيق لكثافة البذر وعمق التغطية لرفع المردودية",
    ],
    applicationsEn: [
      "Mechanical and pneumatic grain drills for cereals and legumes",
      "Precision single-seed row planters and tuber planters",
      "Uniform seed spacing and depth control for higher yields",
    ],
    image: seederImg,
    alt: "Semoir agricole de précision sans arrière-plan",
    altAr: "بذارة فلاحية دقيقة بدون خلفية",
    altEn: "Precision seed drill planter cutout",
  },
  {
    id: "sprayers",
    name: "Pulvérisateurs agricoles",
    nameAr: "الرشاشات الفلاحية",
    nameEn: "Sprayers",
    group: "seeding-crop-care",
    groupLabel: "Semis & Traitement",
    groupLabelAr: "البذر والمعالجة",
    groupLabelEn: "Seeding & Crop Care",
    summary: "Protection phytosanitaire des cultures et fertilisation foliaire.",
    summaryAr: "معالجة المحاصيل ضد الآفات ورش الأسمدة السائلة بدقة عالية.",
    summaryEn: "Precision crop protection, weed control, and liquid fertilization.",
    applications: [
      "Pulvérisateurs automoteurs et portés à rampes larges",
      "Atomiseurs pour arboriculture, agrumes et oliveraies",
      "Dosage homogène réduisant les pertes d'intrants",
    ],
    applicationsAr: [
      "رشاشات ذاتية الدفع ومحمولة بأذرع واسعة للمحاصيل الكبرى",
      "رشاشات ضبابية (أوتوميزور) لبساتين الأشجار المثمرة والحوامض",
      "توزيع متوازن يقلص هدر المبيدات والأسمدة السائلة",
    ],
    applicationsEn: [
      "Self-propelled and tractor-mounted boom sprayers",
      "Air-blast orchard sprayers for citrus, olives, and fruit trees",
      "Uniform droplet application minimizing chemical waste",
    ],
    image: sprayerImg,
    alt: "Pulvérisateur agricole automoteur sans arrière-plan",
    altAr: "رشاشة فلاحية ذاتية الدفع بدون خلفية",
    altEn: "Self-propelled agricultural crop sprayer cutout",
  },
  {
    id: "balers",
    name: "Presses à balles et fenaison",
    nameAr: "مكابس التبن والأعلاف",
    nameEn: "Balers & Hay Equipment",
    group: "harvest-hay",
    groupLabel: "Récolte & Fourrage",
    groupLabelAr: "الحصاد والأعلاف",
    groupLabelEn: "Harvest & Hay",
    summary: "Ramassage, pressage en balles rondes ou carrées de paille et fourrage.",
    summaryAr: "جمع وكبس التبن والأعلاف في حزم دائرية أو مربعة لتسهيل التخزين.",
    summaryEn: "Fast baling of hay, straw, and forage into round or square bales.",
    applications: [
      "Presses à balles rondes et presses haute densité pour foin et paille",
      "Faucheuses rotatives, faneuses et andaineurs de fourrage",
      "Conditionnement compact pour transport et stockage longue durée",
    ],
    applicationsAr: [
      "مكابس حزم دائرية ومربعة عالية الكثافة للتبن والقرط",
      "آلات جز وحش الأعلاف وتقليبها وجمعها في صفوف",
      "تغليف مضغوط يسهل عملية النقل والتخزين طويل المدى",
    ],
    applicationsEn: [
      "Round balers and high-density square balers for hay and straw",
      "Rotary mowers, tedders, and forage rakes",
      "Tightly compressed bales for easy transport and storage",
    ],
    image: balerImg,
    alt: "Presse à balles rondes agricole sans arrière-plan",
    altAr: "مكبس أعلاف وتبن دائري بدون خلفية",
    altEn: "Agricultural round hay baler cutout",
  },
  {
    id: "agricultural-trailers",
    name: "Remorques agricoles",
    nameAr: "المقطورات الفلاحية",
    nameEn: "Agricultural Trailers",
    group: "transport-irrigation",
    groupLabel: "Transport & Irrigation",
    groupLabelAr: "النقل والسقي",
    groupLabelEn: "Transport & Irrigation",
    summary: "Transport de récoltes, céréales, balles de foin et intrants.",
    summaryAr: "نقل المحاصيل، الحبوب، حزم التبن والأسمدة بين الحقول والمخازن.",
    summaryEn: "Bulk haulage of harvested grain, hay bales, and farm supplies.",
    applications: [
      "Bennes céréalières basculantes simple et double essieu",
      "Plateaux fourragers pour transport de balles de paille",
      "Pneus basse pression respectueux des sols cultivés",
    ],
    applicationsAr: [
      "مقطورات قلاّبة لنقل الحبوب بأحادية أو ثنائية المحاور",
      "منصات مسطحة مخصصة لنقل حزم التبن والأعلاف",
      "عجلات عريضة منخفضة الضغط تحافظ على بنية التربة",
    ],
    applicationsEn: [
      "Single and tandem-axle hydraulic tipping grain trailers",
      "Flatbed bale trailers for hay and straw logistics",
      "Wide flotation tires minimizing soil compaction",
    ],
    image: trailerImg,
    alt: "Remorque agricole basculante sans arrière-plan",
    altAr: "مقطورة فلاحية قلاّبة بدون خلفية",
    altEn: "Tandem-axle agricultural grain trailer cutout",
  },
  {
    id: "irrigation-equipment",
    name: "Équipements d'irrigation",
    nameAr: "معدات السقي والري",
    nameEn: "Irrigation Equipment",
    group: "transport-irrigation",
    groupLabel: "Transport & Irrigation",
    groupLabelAr: "النقل والسقي",
    groupLabelEn: "Transport & Irrigation",
    summary: "Enrouleurs d'irrigation, motopompes mobiles et asperseurs.",
    summaryAr: "بكر الري المتنقل، مضخات المياه الفلاحية وأنظمة الرش المحوري.",
    summaryEn: "Hose-reel irrigators, mobile diesel water pumps, and sprinkler lines.",
    applications: [
      "Enrouleurs d'arrosage à tambour longue portée pour grandes parcelles",
      "Groupes motopompes diesel et électriques haut débit",
      "Solutions mobiles adaptées aux saisons sèches et cultures maraîchères",
    ],
    applicationsAr: [
      "أنظمة السقي بالبكرة المتنقلة (Enrouleur) للمساحات الواسعة",
      "مضخات مياه تعمل بالديزل أو الكهرباء بتدفق عالٍ",
      "تجهيزات سقي مرنة لدعم المحاصيل خلال فترات الجفاف",
    ],
    applicationsEn: [
      "Long-reach hose-reel drum irrigators for field crops",
      "High-flow mobile diesel and electric water pump units",
      "Flexible water delivery for dry seasons and vegetable plots",
    ],
    image: irrigationImg,
    alt: "Enrouleur d'irrigation et motopompe agricole sans arrière-plan",
    altAr: "معدات السقي والري ومضخة مياه فلاحية بدون خلفية",
    altEn: "Hose-reel irrigation system and mobile pump cutout",
  },
  {
    id: "specialized-machinery",
    name: "Machines agricoles spécialisées",
    nameAr: "معدات فلاحية متخصصة",
    nameEn: "Specialized Machinery",
    group: "tractors-tillage",
    groupLabel: "Tracteurs & Labour",
    groupLabelAr: "الجرارات والحرث",
    groupLabelEn: "Tractors & Tillage",
    summary: "Rotavators, épandeurs d'engrais, broyeurs et matériel d'arboriculture.",
    summaryAr: "فرازات التربة (روطافاتور)، ناثرات الأسمدة ومعدات خدمة البساتين.",
    summaryEn: "Rotavators, fertilizer spreaders, mulchers, and orchard attachments.",
    applications: [
      "Rotavators et fraises rotatives pour maraîchage et serres",
      "Épandeurs centrifuges d'engrais et amendements organiques",
      "Broyeurs de sarments, tailleuses et vibreurs d'oliviers",
    ],
    applicationsAr: [
      "فرازات التربة الدورانية للزراعات المحمية والخضروات",
      "ناثرات الأسمدة الحبيبية والعضوية بتوزيع منتظم",
      "فرامات الأغصان ومعدات جني الزيتون وخدمة الأشجار المثمرة",
    ],
    applicationsEn: [
      "Rotary tillers and rotavators for greenhouses and vegetables",
      "Centrifugal granular fertilizer and compost spreaders",
      "Orchard flail mulchers and olive harvesting equipment",
    ],
    image: specializedImg,
    alt: "Rotavator et épandeur d'engrais agricole sans arrière-plan",
    altAr: "معدات فلاحية متخصصة وناثرة أسمدة بدون خلفية",
    altEn: "Rotary tiller and precision fertilizer spreader cutout",
  },
];

export function getLocalizedCategory(
  item: EquipmentCategoryItem,
  lang: Language = "fr"
): EquipmentCategoryItem {
  if (lang === "ar") {
    return {
      ...item,
      name: item.nameAr || item.name,
      groupLabel: item.groupLabelAr || item.groupLabel,
      summary: item.summaryAr || item.summary,
      applications: item.applicationsAr || item.applications,
      alt: item.altAr || item.alt,
    };
  }
  if (lang === "en") {
    return {
      ...item,
      name: item.nameEn || item.name,
      groupLabel: item.groupLabelEn || item.groupLabel,
      summary: item.summaryEn || item.summary,
      applications: item.applicationsEn || item.applications,
      alt: item.altEn || item.alt,
    };
  }
  return item;
}

type FilterKey =
  | "all"
  | "tractors-tillage"
  | "harvest-hay"
  | "seeding-crop-care"
  | "transport-irrigation";

interface EquipmentCategoriesProps {
  onSelectCategory: (category: EquipmentCategoryItem) => void;
  lang?: Language;
  t?: Translations;
}

const CLEAN_DARK_BOTTOM_IDS = new Set([
  "tractors",
  "sprayers",
  "balers",
  "agricultural-trailers",
  "irrigation-equipment",
]);

const CategoryImageCard: FC<{
  item: EquipmentCategoryItem;
  spanMobileWide?: boolean;
  onSelect: (item: EquipmentCategoryItem) => void;
  lang?: Language;
}> = ({ item, spanMobileWide = false, onSelect, lang = "fr" }) => {
  const [failed, setFailed] = useState(false);
  const isRtl = lang === "ar";
  const cleanDarkBottom = CLEAN_DARK_BOTTOM_IDS.has(item.id);

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`group bg-white dark:bg-[#024225] border border-neutral-200/85 dark:border-white/12 hover:border-[#6fcb3b] dark:hover:border-[#6fcb3b] active:scale-[0.99] rounded-2xl overflow-hidden transition-all duration-150 cursor-pointer ${
        isRtl ? "text-right" : "text-left"
      } ${
        spanMobileWide
          ? "col-span-2 lg:col-span-1 flex flex-row sm:flex-col items-center sm:items-stretch"
          : "flex flex-col"
      }`}
    >
      {/* Backgroundless Machine Cutout Stage */}
      <div
        className={`relative overflow-hidden bg-white dark:bg-[#01341d] flex items-center justify-center ${
          spanMobileWide
            ? "w-2/5 sm:w-full aspect-square sm:aspect-[4/3] p-3 sm:p-5 shrink-0"
            : "aspect-[4/3] w-full p-2.5 sm:p-5"
        }`}
      >
        {!failed ? (
          cleanDarkBottom ? (
            <>
              <div className="w-full h-full block dark:hidden">
                <TransparentMachineImg
                  src={item.image}
                  alt={item.alt}
                  onError={() => setFailed(true)}
                  className="w-full h-full object-contain object-center drop-shadow-[0_12px_20px_rgba(1,52,29,0.14)] group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="w-full h-full hidden dark:block">
                <TransparentMachineImg
                  src={item.image}
                  alt={item.alt}
                  cleanJpgBottomShadow
                  onError={() => setFailed(true)}
                  className="w-full h-full object-contain object-center drop-shadow-[0_14px_24px_rgba(0,0,0,0.55)] group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            </>
          ) : (
            <TransparentMachineImg
              src={item.image}
              alt={item.alt}
              onError={() => setFailed(true)}
              className="w-full h-full object-contain object-center drop-shadow-[0_12px_20px_rgba(1,52,29,0.14)] dark:drop-shadow-[0_14px_24px_rgba(0,0,0,0.55)] group-hover:scale-105 transition-transform duration-200"
            />
          )
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-white dark:bg-[#01341d] text-[#01341d] dark:text-white">
            <Tractor
              className="w-7 h-7 text-[#14532D] dark:text-[#6fcb3b] mb-1.5"
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-[#3B4F43] dark:text-emerald-100 text-center">
              {item.name}
            </span>
          </div>
        )}
      </div>

      {/* Clean Unboxed Card Body */}
      <div
        className={`flex-1 flex flex-col justify-between bg-white dark:bg-[#024225] ${
          spanMobileWide
            ? "p-3.5 sm:px-5 sm:pb-5 sm:pt-3.5 border-l sm:border-l-0 sm:border-t border-neutral-100 dark:border-white/10"
            : "p-3 sm:px-5 sm:pb-5 sm:pt-3.5 border-t border-neutral-100 dark:border-white/10"
        }`}
      >
        <div>
          <p className="text-[11px] sm:text-xs text-[#41544A] dark:text-emerald-200/80 mb-1 truncate">
            {item.groupLabel}
          </p>
          <div
            className={`flex items-start justify-between gap-2 ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            <h3 className="font-display font-bold text-sm sm:text-lg text-[#01341d] dark:text-white group-hover:text-[#14532D] dark:group-hover:text-[#6fcb3b] transition-colors duration-150 leading-snug">
              {item.name}
            </h3>
            <ArrowUpRight
              className={`w-4 h-4 text-[#41544A] dark:text-emerald-200/80 group-hover:text-[#14532D] dark:group-hover:text-[#6fcb3b] transition-all duration-150 shrink-0 mt-0.5 sm:mt-1 ${
                isRtl
                  ? "rotate-[-90deg]"
                  : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              }`}
              aria-hidden="true"
            />
          </div>
          <p
            className={`mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#3B4F43] dark:text-emerald-100/85 leading-relaxed ${
              spanMobileWide
                ? "line-clamp-2 sm:line-clamp-none"
                : "hidden sm:block"
            }`}
          >
            {item.summary}
          </p>
        </div>
      </div>
    </button>
  );
};

export const EquipmentCategories: FC<EquipmentCategoriesProps> = ({
  onSelectCategory,
  lang = "fr",
  t,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const isRtl = lang === "ar";

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: t?.categories.filterAll ?? "Tous les équipements" },
    {
      key: "tractors-tillage",
      label: t?.categories.filterTractorsTillage ?? "Tracteurs & Labour",
    },
    {
      key: "harvest-hay",
      label: t?.categories.filterHarvestHay ?? "Récolte & Fourrage",
    },
    {
      key: "seeding-crop-care",
      label: t?.categories.filterSeedingCropCare ?? "Semis & Traitement",
    },
    {
      key: "transport-irrigation",
      label:
        t?.categories.filterTransportIrrigation ?? "Transport & Irrigation",
    },
  ];

  const visibleCategories = (
    activeFilter === "all"
      ? EQUIPMENT_CATEGORIES
      : EQUIPMENT_CATEGORIES.filter((cat) => cat.group === activeFilter)
  ).map((cat) => getLocalizedCategory(cat, lang));

  const hasOddCount = visibleCategories.length % 2 === 1;

  const badgeText =
    t?.categories.badge ?? "Catégories d'équipements agricoles";
  const titleText =
    t?.categories.title ??
    "Toutes vos machines agricoles à portée de demande.";

  return (
    <section
      id="equipements"
      className={`bg-[#F6F8F6] dark:bg-[#012917] py-14 sm:py-20 md:py-28 border-t border-neutral-200/80 dark:border-white/10 scroll-mt-16 transition-colors duration-200 ${
        isRtl ? "text-right" : "text-left"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header + Functional Segmented Filter */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-7 sm:mb-12 ${
            isRtl ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div>
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

          {/* Interactive Segmented Control */}
          <div
            role="tablist"
            aria-label="Filtrer par catégorie de matériel agricole"
            className={`w-full lg:w-auto overflow-x-auto no-scrollbar flex lg:inline-flex flex-nowrap items-center gap-1 p-1 bg-white dark:bg-[#01341d] border border-neutral-200/90 dark:border-white/12 rounded-xl lg:rounded-lg ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={`min-h-[40px] sm:min-h-[36px] px-3.5 py-2 text-xs sm:text-[13px] font-semibold rounded-lg lg:rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#6fcb3b] text-[#01341d] shadow-xs"
                      : "text-[#41544A] hover:text-[#01341d] dark:text-emerald-100/80 dark:hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Grid on Mobile & Tablet, 3-Column Grid on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {visibleCategories.map((item, idx) => (
            <CategoryImageCard
              key={item.id}
              item={item}
              lang={lang}
              spanMobileWide={
                hasOddCount && idx === visibleCategories.length - 1
              }
              onSelect={onSelectCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
