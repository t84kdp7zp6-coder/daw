import { useRef } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

export interface CarouselItem {
  href: string;
  title: string;
  image: string;
  badge: string;
  meta: string; // e.g. "5 min read" or "12 cities"
}

interface Props {
  title: string;
  items: CarouselItem[];
}

export default function Carousel({ title, items }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  return (
    <section className="max-w-4xl mx-auto px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50"
          >
            <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50"
          >
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <a key={item.href} href={item.href} className="flex-none w-[220px] snap-start group">
            <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 rounded-md bg-white/90 px-2 py-0.5 text-xs font-medium text-neutral-800">
                  {item.badge}
                </span>
              </div>
              <div className="pt-3">
                <h3 className="text-sm font-semibold leading-snug line-clamp-2">{item.title}</h3>
                <div className="flex items-center gap-1 mt-1.5 text-xs text-neutral-400">
                  <Clock className="w-3 h-3" strokeWidth={2} />
                  <span>{item.meta}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
