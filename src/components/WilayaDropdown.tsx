import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FC,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Check, ChevronDown, MapPin, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { WilayaPolygon } from "../data/algeriaWilayas";
import type { Language, Translations } from "../config/translations";

interface WilayaDropdownProps {
  wilayas: WilayaPolygon[];
  selectedWilaya: WilayaPolygon | null;
  onSelect: (wilaya: WilayaPolygon | null) => void;
  lang?: Language;
  t?: Translations;
}

function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export const WilayaDropdown: FC<WilayaDropdownProps> = ({
  wilayas,
  selectedWilaya,
  onSelect,
  lang = "fr",
  t,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

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

  const filteredWilayas = useMemo(() => {
    const q = normalizeSearch(query);
    if (!q) return wilayas;
    return wilayas.filter((w) => {
      const codeMatch =
        w.code.toLowerCase().includes(q) ||
        String(Number(w.code)) === q;
      const nameMatch = normalizeSearch(w.name).includes(q);
      const nameArMatch = w.nameAr ? w.nameAr.includes(query.trim()) : false;
      const regionMatch = normalizeSearch(w.region).includes(q);
      const regionArMatch = w.regionAr ? w.regionAr.includes(query.trim()) : false;
      return codeMatch || nameMatch || nameArMatch || regionMatch || regionArMatch;
    });
  }, [wilayas, query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    const selectedIdx = selectedWilaya
      ? wilayas.findIndex((w) => w.code === selectedWilaya.code)
      : 0;
    setHighlightedIndex(selectedIdx >= 0 ? selectedIdx : 0);

    if (window.matchMedia("(min-width: 640px) and (pointer: fine)").matches) {
      window.requestAnimationFrame(() => {
        searchInputRef.current?.focus({ preventScroll: true });
      });
    }
  }, [isOpen, selectedWilaya, wilayas]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(
      `[data-wilaya-idx="${highlightedIndex}"]`
    );
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex, isOpen]);

  const handleKeyDown = (e: ReactKeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredWilayas.length > 0) {
        setHighlightedIndex((prev) => (prev + 1) % filteredWilayas.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filteredWilayas.length > 0) {
        setHighlightedIndex(
          (prev) => (prev - 1 + filteredWilayas.length) % filteredWilayas.length
        );
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filteredWilayas[highlightedIndex];
      if (target) {
        onSelect(selectedWilaya?.code === target.code ? null : target);
        setIsOpen(false);
      }
    } else if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  const selectLabel = t?.dropdown.selectWilaya ?? "Choisir une wilaya";
  const searchPrompt = t?.dropdown.searchPrompt ?? "Rechercher parmi les 69 wilayas agricoles d'Algérie";
  const placeholder = t?.dropdown.placeholder ?? "Nom, code (ex: 09, Blida, Sétif) ou région...";
  const clearSelectedAria = t?.dropdown.clearSelected ?? "Effacer la wilaya sélectionnée";
  const clearSearchAria = t?.dropdown.clearSearch ?? "Effacer la recherche";
  const noResultsText = t?.dropdown.noResults ?? "Aucune wilaya ne correspond à";
  const showAllText = t?.dropdown.showAll ?? "Afficher toutes les 69 wilayas";
  const wilayaWord = t?.about.wilayaPrefix ?? "Wilaya";

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={`relative w-full ${isRtl ? "text-right" : "text-left"}`}
    >
      {/* Custom Combobox Trigger */}
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={selectLabel}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group w-full min-h-[54px] px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer ${
          isRtl ? "flex-row-reverse text-right" : "text-left"
        } ${
          isOpen
            ? "bg-white dark:bg-[#01341d] border border-[#6fcb3b] ring-3 ring-[#6fcb3b]/20 shadow-sm"
            : "bg-white hover:bg-neutral-50/90 dark:bg-[#01341d] dark:hover:bg-[#023c22] border border-neutral-200/95 hover:border-[#6fcb3b]/80 dark:border-white/14 dark:hover:border-[#6fcb3b]/80 shadow-[0_1px_2px_rgba(1,52,29,0.04)] dark:shadow-none"
        }`}
      >
        <span className={`flex items-center gap-3 min-w-0 ${isRtl ? "flex-row-reverse" : ""}`}>
          {selectedWilaya ? (
            <span className="w-9 h-9 rounded-lg bg-[#6fcb3b] text-[#01341d] font-mono tabular-nums text-xs font-bold inline-flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(111,203,59,0.28)]">
              {selectedWilaya.code}
            </span>
          ) : (
            <span className="w-9 h-9 rounded-lg bg-[#6fcb3b]/18 dark:bg-[#6fcb3b]/20 text-[#14532D] dark:text-[#6fcb3b] inline-flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" aria-hidden="true" />
            </span>
          )}

          <span className="min-w-0 flex flex-col">
            {selectedWilaya ? (
              <>
                <span className="font-display font-bold text-sm text-[#01341d] dark:text-white truncate leading-tight">
                  {getLocalizedName(selectedWilaya)}
                </span>
                <span className="text-[11px] text-[#41544A] dark:text-emerald-200/80 truncate mt-0.5">
                  {wilayaWord} {selectedWilaya.code} · {getLocalizedRegion(selectedWilaya)}
                </span>
              </>
            ) : (
              <>
                <span className="text-sm font-semibold text-[#01341d] dark:text-white truncate leading-tight">
                  {selectLabel}
                </span>
                <span className="text-[11px] text-[#41544A] dark:text-emerald-200/80 truncate mt-0.5">
                  {searchPrompt}
                </span>
              </>
            )}
          </span>
        </span>

        <span className={`flex items-center gap-1.5 shrink-0 ${isRtl ? "flex-row-reverse" : ""}`}>
          {selectedWilaya && (
            <span
              role="button"
              tabIndex={0}
              aria-label={clearSelectedAria}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  e.preventDefault();
                  onSelect(null);
                }
              }}
              className="w-7 h-7 rounded-lg inline-flex items-center justify-center text-[#41544A] hover:text-[#01341d] hover:bg-neutral-100 dark:text-emerald-200/80 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          )}

          <span
            className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-colors duration-150 ${
              isOpen
                ? "bg-[#6fcb3b]/20 text-[#14532D] dark:text-[#6fcb3b]"
                : "bg-[#F6F8F6] text-[#41544A] group-hover:text-[#14532D] dark:bg-white/[0.08] dark:text-emerald-200/80 dark:group-hover:text-[#6fcb3b]"
            }`}
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-150 ${
                isOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </span>
        </span>
      </button>

      {/* Animated Searchable Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.99 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-2xl bg-white dark:bg-[#022817] border border-neutral-200/95 dark:border-white/15 shadow-[0_20px_48px_rgba(1,52,29,0.16)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.72)] overflow-hidden"
          >
            {/* Sticky Search Bar */}
            <div className="p-2.5 border-b border-neutral-100 dark:border-white/10 bg-white dark:bg-[#022817]">
              <div className="relative flex items-center">
                <Search
                  className={`pointer-events-none absolute w-4 h-4 text-[#41544A] dark:text-emerald-200/75 ${
                    isRtl ? "right-3" : "left-3"
                  }`}
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={placeholder}
                  aria-label={placeholder}
                  className={`w-full py-2 text-base sm:text-[13px] text-[#01341d] dark:text-white placeholder:text-[#41544A]/80 dark:placeholder:text-emerald-200/60 bg-[#F6F8F6] dark:bg-[#01341d] border border-neutral-200/85 dark:border-white/12 focus:border-[#6fcb3b] dark:focus:border-[#6fcb3b] rounded-xl focus:outline-none transition-colors ${
                    isRtl ? "pr-9 pl-8 text-right" : "pl-9 pr-8 text-left"
                  }`}
                />
                {query && (
                  <button
                    type="button"
                    aria-label={clearSearchAria}
                    onClick={() => {
                      setQuery("");
                      searchInputRef.current?.focus();
                    }}
                    className={`absolute w-6 h-6 rounded-md inline-flex items-center justify-center text-[#41544A] hover:text-[#01341d] dark:text-emerald-200/80 dark:hover:text-white cursor-pointer ${
                      isRtl ? "left-2" : "right-2"
                    }`}
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Wilaya Options List */}
            <div
              id={listboxId}
              ref={listRef}
              role="listbox"
              aria-label="Liste des wilayas d'Algérie"
              className="max-h-[264px] overflow-y-auto overscroll-contain p-1.5 space-y-0.5"
            >
              {filteredWilayas.length > 0 ? (
                filteredWilayas.map((w, idx) => {
                  const isSelected = selectedWilaya?.code === w.code;
                  const isHighlighted = highlightedIndex === idx;
                  const localizedName = getLocalizedName(w);
                  const localizedRegion = getLocalizedRegion(w);

                  return (
                    <button
                      key={w.code}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      data-wilaya-idx={idx}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      onClick={() => {
                        onSelect(isSelected ? null : w);
                        setIsOpen(false);
                      }}
                      className={`w-full min-h-[42px] px-2.5 py-2 rounded-xl flex items-center justify-between gap-3 transition-colors duration-100 cursor-pointer ${
                        isRtl ? "flex-row-reverse text-right" : "text-left"
                      } ${
                        isSelected
                          ? "bg-[#6fcb3b]/18 dark:bg-[#6fcb3b]/20"
                          : isHighlighted
                            ? "bg-[#F6F8F6] dark:bg-white/[0.08]"
                            : "hover:bg-[#F6F8F6]/80 dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className={`flex items-center gap-2.5 min-w-0 ${isRtl ? "flex-row-reverse" : ""}`}>
                        <span
                          className={`w-8 h-6 rounded-md font-mono tabular-nums text-xs font-bold inline-flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[#6fcb3b] text-[#01341d]"
                              : "bg-[#F6F8F6] text-[#14532D] dark:bg-[#024225] dark:text-emerald-100"
                          }`}
                        >
                          {w.code}
                        </span>
                        <span className="font-semibold text-sm text-[#01341d] dark:text-white truncate">
                          {localizedName}
                        </span>
                        <span className="text-xs text-[#41544A] dark:text-emerald-200/75 truncate">
                          · {localizedRegion}
                        </span>
                      </span>

                      {isSelected && (
                        <Check
                          className="w-4 h-4 text-[#14532D] dark:text-[#6fcb3b] shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="py-7 px-4 text-center">
                  <p className="text-sm font-medium text-[#01341d] dark:text-white">
                    {noResultsText} « {query} »
                  </p>
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="mt-2 text-xs font-semibold text-[#14532D] dark:text-[#6fcb3b] hover:underline cursor-pointer"
                  >
                    {showAllText}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
