import { useEffect, useRef, useState } from "react";
import { Globe, BookOpen, Check } from "lucide-react";
import { LANGUAGES } from "../i18n/languages";
import { getLocalizedPath } from "../i18n/utils";

interface Props {
  currentLang: string;
  currentPath: string; // full pathname, e.g. /ru/wiki/japan/tokyo/
  wikiLabel: string;   // translated "Destinations Wiki" label
}

export default function LanguageGlobeMenu({ currentLang, currentPath, wikiLabel }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const wikiHref = `/${currentLang}/wiki/`;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Language and destinations wiki menu"
        className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors"
      >
        <Globe className="w-4 h-4" strokeWidth={2} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 rounded-2xl border border-neutral-100 bg-white shadow-lg shadow-neutral-900/5 overflow-hidden z-20"
        >
          <a
            href={wikiHref}
            role="menuitem"
            className="flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 border-b border-neutral-100"
          >
            <BookOpen className="w-4 h-4" strokeWidth={2} />
            {wikiLabel}
          </a>

          <div className="max-h-72 overflow-y-auto py-1">
            {LANGUAGES.map((l) => {
              const active = l.code === currentLang;
              return (
                <a
                  key={l.code}
                  href={getLocalizedPath(currentPath, l.code)}
                  role="menuitem"
                  className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-neutral-50 ${
                    active ? "text-neutral-900 font-semibold" : "text-neutral-600"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-xs text-neutral-400 uppercase w-6">{l.code}</span>
                    {l.label}
                  </span>
                  {active && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
