import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import logoImage from "@assets/Logo_StoryMaker_Casamento_Sem_fundo_1777242203099.png";
import ownerImage from "@assets/WhatsApp_Image_2026-04-26_at_18.45.59_1777240064953.jpeg";
import julioThaliaPhoto from "@assets/ChatGPT_Image_26_04_2026,_19_39_46_1777243190988.png";
import filmJulioThalia1 from "@assets/film_julio_thalia_1.mp4";
import filmJulioThalia2 from "@assets/film_julio_thalia_2.mp4";
import filmJulioThalia3 from "@assets/film_julio_thalia_3.mp4";
import filmJulioThalia4 from "@assets/film_julio_thalia_4.mp4";

import heroSilhouettes from "@/assets/images/hero-silhouettes.png";
import ringsImage from "@/assets/images/rings.png";
import champagneImage from "@/assets/images/champagne.png";
import vowsImage from "@/assets/images/vows.png";
import laceImage from "@/assets/images/lace.png";
import details1 from "@/assets/images/details-1.png";
import details2 from "@/assets/images/details-2.png";

const WHATSAPP_LINK = "https://wa.me/5512982355909";
const waHref = (text: string) =>
  `${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`;

const WA_MESSAGES = {
  generic:
    "Olá! Vim pelo site vvstorymaker e gostaria de conversar sobre o filme do meu casamento.",
  about:
    "Olá! Vim pelo site vvstorymaker e gostaria de agendar uma conversa para falar sobre o filme do meu casamento.",
};

const WHATSAPP_HREF = waHref(WA_MESSAGES.generic);

const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

const blurUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE_CINEMATIC },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: EASE_CINEMATIC },
  },
};

/** Word-by-word reveal for plain-text headlines. */
function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={`inline-block ${className ?? ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.07, delayChildren: delay },
        },
      }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.9, ease: EASE_CINEMATIC },
              },
            }}
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

type Pkg = {
  name: string;
  price: string;
  bullets: string[];
  image: string;
  featured?: boolean;
};

const PACKAGES: Pkg[] = [
  {
    name: "Essencial",
    price: "R$ 1.600",
    bullets: ["Cerimônia", "Festa", "Edição dinâmica"],
    image: ringsImage,
  },
  {
    name: "Intermediário 1",
    price: "R$ 2.000",
    bullets: ["Making off", "Cerimônia", "Festa", "Edição mais emocional"],
    image: champagneImage,
  },
  {
    name: "Intermediário 2",
    price: "R$ 2.390",
    bullets: [
      "Pré-wedding",
      "Cerimônia",
      "Festa",
      "Edição com storytelling mais trabalhado",
    ],
    image: laceImage,
  },
  {
    name: "Premium",
    price: "R$ 2.790",
    bullets: [
      "Pré-wedding",
      "Making off",
      "Cerimônia",
      "Festa",
      "Edição cinematográfica completa",
      "Conteúdo pensado para redes",
    ],
    image: vowsImage,
    featured: true,
  },
];

const ADDONS = [
  {
    name: "Votos gravados",
    desc: "Áudio limpo e tratado dos votos para reviver cada palavra dita ao pé do altar.",
    image: vowsImage,
  },
  {
    name: "Stories ao vivo",
    desc: "Cobertura ao vivo no Instagram do casal durante a festa, com cortes prontos para repostar.",
    image: details1,
  },
  {
    name: "Trends & Reels",
    desc: "Reels verticais editados em tendências do momento, prontos para postar nas redes.",
    image: details2,
  },
  {
    name: "Vídeo carta",
    desc: "Mensagens gravadas dos convidados editadas em uma carta em vídeo emocionante.",
    image: champagneImage,
  },
];

type FeaturedFilm = {
  couple: string;
  scene: string;
  video?: string;
  poster?: string;
};

const FEATURED_FILMS: FeaturedFilm[] = [
  { couple: "Julio & Thalia", scene: "Cerimônia ao ar livre", video: filmJulioThalia1, poster: julioThaliaPhoto },
  { couple: "Julio & Thalia", scene: "Entrada da noiva", video: filmJulioThalia2, poster: julioThaliaPhoto },
  { couple: "Julio & Thalia", scene: "Votos no altar", video: filmJulioThalia3, poster: julioThaliaPhoto },
  { couple: "Julio & Thalia", scene: "Primeira dança", video: filmJulioThalia4, poster: julioThaliaPhoto },
];

const NAV_LINKS = [
  { href: "#colecoes", label: "Coleções" },
  { href: "#complementos", label: "Complementos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#casais", label: "Casais" },
  { href: "#contato", label: "Contato" },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [lightboxFilm, setLightboxFilm] = useState<number | null>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const filmCardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const heroRef = useRef<HTMLElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxOpenerIdxRef = useRef<number | null>(null);

  // Page scroll progress (smoothed) — drives the gold progress bar at the top.
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  // Hero parallax — image scales/lifts gently as you scroll past the hero.
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "18%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1.05, 1.18]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "-15%"]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lightbox: lock body scroll, close on Esc, focus trap, and restore focus
  // to the originating card on close (full a11y modal lifecycle).
  useEffect(() => {
    if (lightboxFilm === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the modal so keyboard / screen-reader users land here.
    const focusRaf = requestAnimationFrame(() => {
      lightboxCloseRef.current?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxFilm(null);
        return;
      }
      if (e.key !== "Tab") return;
      // Focus trap: keep Tab cycling within the modal.
      const root = lightboxRef.current;
      if (!root) return;
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>(
          'button, [href], video, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (el) =>
          !el.hasAttribute("disabled") && el.getAttribute("tabindex") !== "-1",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(focusRaf);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      // Restore focus to the card the user clicked to open the lightbox.
      const openerIdx = lightboxOpenerIdxRef.current;
      if (openerIdx !== null) {
        filmCardRefs.current[openerIdx]?.focus?.();
      }
    };
  }, [lightboxFilm]);

  const scrollFeatured = (dir: 1 | -1) => {
    const el = featuredRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-[#fdfaf5] text-[#1a1410] selection:bg-[#1a1410] selection:text-[#fdfaf5]">
      {/* SCROLL PROGRESS BAR — fine gold thread that fills as the page scrolls */}
      <motion.div
        aria-hidden
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-gradient-to-r from-[#d8b87a] via-[#b8923f] to-[#8a6a2e] pointer-events-none"
      />

      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#fdfaf5]/95 backdrop-blur-md border-b border-[#1a1410]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-12 py-3 md:py-5 flex lg:grid lg:grid-cols-3 items-center justify-between lg:justify-stretch">
          {/* Logo (left) */}
          <a href="#top" className="flex items-center shrink-0">
            <img
              src={logoImage}
              alt="Storymaker de Casamento"
              className={`h-11 md:h-14 lg:h-16 w-auto transition-all duration-500 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
            />
          </a>

          {/* Nav (center) */}
          <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-10">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`smallcaps text-[13px] tracking-[0.18em] transition-colors ${
                  scrolled
                    ? "text-[#1a1410] hover:text-[#8a6a2e]"
                    : "text-[#fdfaf5] hover:opacity-70"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA (right) */}
          <div className="flex items-center lg:justify-end">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className={`smallcaps text-[10px] md:text-[12px] tracking-[0.2em] md:tracking-[0.25em] uppercase border min-h-[44px] inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 transition-colors ${
                scrolled
                  ? "border-[#1a1410] text-[#1a1410] hover:bg-[#1a1410] hover:text-[#fdfaf5]"
                  : "border-[#fdfaf5] text-[#fdfaf5] hover:bg-[#fdfaf5] hover:text-[#1a1410]"
              }`}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* HERO — fullbanner with parallax */}
      <section
        ref={heroRef}
        id="top"
        className="relative h-[88vh] min-h-[560px] max-h-[920px] -mt-[68px] md:-mt-[104px] overflow-hidden"
      >
        <motion.img
          src={heroSilhouettes}
          alt="Silhueta de noivos entre velas"
          fetchPriority="high"
          style={{ y: heroImageY, scale: heroImageScale }}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        {/* Vignette to focus the gaze on the headline */}
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)] pointer-events-none" />

        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="relative z-10 h-full flex items-center justify-center text-center px-4 md:px-5"
        >
          <div>
            <h1 className="text-[#fdfaf5] font-light text-[clamp(2.1rem,7vw,5.6rem)] leading-[1.05] tracking-[0.04em] sm:tracking-[0.08em] md:tracking-[0.18em] whitespace-nowrap">
              <WordReveal text="feita para reviver" />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.1, ease: EASE_CINEMATIC }}
              className="mt-5 md:mt-6 text-[#fdfaf5]/85 italic font-light text-[clamp(0.95rem,1.6vw,1.25rem)] tracking-wide px-4"
            >
              filmes de casamento, feitos com afeto
            </motion.p>
          </div>
        </motion.div>

        {/* scroll cue with breathing animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.6, ease: EASE_CINEMATIC }}
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 text-[#fdfaf5]/70 text-[10px] tracking-[0.35em] md:tracking-[0.4em] uppercase whitespace-nowrap flex flex-col items-center gap-2"
        >
          <span>role para descobrir</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="block w-px h-6 bg-gradient-to-b from-[#fdfaf5]/0 via-[#fdfaf5]/70 to-[#fdfaf5]/0"
          />
        </motion.div>
      </section>

      {/* INTRO — text-middle */}
      <section className="max-w-[820px] mx-auto px-5 md:px-6 py-16 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
          style={{ transformOrigin: "center" }}
          className="w-12 h-px bg-[#8a6a2e] mx-auto mb-8 md:mb-10"
        />
        <h2 className="text-[clamp(1.7rem,4vw,3rem)] font-light leading-tight">
          <WordReveal text="Made with love by" />
          <br className="sm:hidden" />{" "}
          <span className="italic inline-block overflow-hidden align-bottom">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 1,
                delay: 0.45,
                ease: EASE_CINEMATIC,
              }}
              className="inline-block"
            >
              Storymaker
            </motion.span>
          </span>
        </h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={blurUp}
          transition={{ delay: 0.6 }}
          className="mt-6 md:mt-8 text-[15.5px] md:text-[18px] leading-[1.8] md:leading-[1.9] font-light text-[#3b322a]"
        >
          Acreditamos que cada casamento merece ser contado com a delicadeza
          de um filme — não documentado, mas{" "}
          <span className="italic">eternizado</span>. Trabalhamos com poucos
          casais por ano, com tempo, escuta e olhar atento, para que cada
          gesto, cada respiração e cada lágrima permaneçam exatamente como
          aconteceram. O que entregamos não é um vídeo. É a sua história,
          guardada para sempre.
        </motion.p>
      </section>

      {/* FEATURED FILMS — cinematic carousel (poster + play, opens lightbox) */}
      <section
        id="casais"
        className="relative py-16 md:py-28 overflow-hidden"
      >
        {/* Subtle warm ambient glows on cream bg */}
        <div
          aria-hidden
          className="absolute -top-32 -left-32 w-[380px] h-[380px] rounded-full bg-[#8a6a2e]/10 blur-[120px] pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-[#b8923f]/10 blur-[140px] pointer-events-none"
        />

        <div className="relative max-w-[1400px] mx-auto px-5 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="flex items-end justify-between gap-6 mb-8 md:mb-12"
          >
            <div>
              <motion.p
                variants={staggerItem}
                className="smallcaps text-[11px] md:text-[12px] tracking-[0.35em] text-[#8a6a2e] mb-3 md:mb-4"
              >
                demonstração
              </motion.p>
              <motion.h2
                variants={staggerItem}
                className="text-[clamp(1.8rem,3.8vw,2.8rem)] font-light italic leading-[1.15] max-w-[560px]"
              >
                uma pequena amostra do nosso olhar
              </motion.h2>
              <motion.div
                variants={staggerItem}
                className="mt-5 flex items-center gap-3 text-[#5a4f43] text-[12px] md:text-[13px] tracking-[0.2em] uppercase"
              >
                <span className="block w-8 h-px bg-[#8a6a2e]" />
                <span>
                  {FEATURED_FILMS.length} filmes — toque para assistir
                </span>
              </motion.div>
            </div>

            <motion.div
              variants={staggerItem}
              className="hidden md:flex items-center gap-3"
            >
              <button
                aria-label="Filme anterior"
                onClick={() => scrollFeatured(-1)}
                className="group w-12 h-12 border border-[#1a1410]/25 hover:border-[#1a1410] hover:bg-[#1a1410] hover:text-[#fdfaf5] text-[#1a1410] transition-all duration-500 flex items-center justify-center"
              >
                <span className="inline-block transition-transform duration-500 group-hover:-translate-x-0.5">
                  ‹
                </span>
              </button>
              <button
                aria-label="Próximo filme"
                onClick={() => scrollFeatured(1)}
                className="group w-12 h-12 border border-[#1a1410]/25 hover:border-[#1a1410] hover:bg-[#1a1410] hover:text-[#fdfaf5] text-[#1a1410] transition-all duration-500 flex items-center justify-center"
              >
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-0.5">
                  ›
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Carousel */}
          <div
            ref={featuredRef}
            className="no-scrollbar flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory -mx-5 md:-mx-12 px-5 md:px-12 pb-3"
            style={{ scrollPaddingLeft: 20 }}
          >
            {FEATURED_FILMS.map((f, i) => {
              return (
                <motion.button
                  type="button"
                  key={`${f.couple}-${i}`}
                  ref={(el) => {
                    filmCardRefs.current[i] = el;
                  }}
                  data-idx={i}
                  onClick={() => {
                    lightboxOpenerIdxRef.current = i;
                    setLightboxFilm(i);
                  }}
                  aria-label={`Assistir ${f.couple} — ${f.scene}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.08,
                    ease: EASE_CINEMATIC,
                  }}
                  className="shrink-0 w-[82vw] sm:w-[300px] md:w-[320px] lg:w-[340px] snap-start group block text-left"
                  style={{ transformOrigin: "center" }}
                >
                  <div className="relative aspect-[9/16] max-h-[72vh] overflow-hidden bg-[#1a1410] shadow-[0_20px_60px_-20px_rgba(26,20,16,0.35)]">
                    <img
                      src={f.poster}
                      alt={`${f.couple} — ${f.scene}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />

                    {/* Soft darken overlay so the play button reads */}
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30 transition-opacity duration-500 group-hover:opacity-90"
                    />

                    {/* Centered play button */}
                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <span className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20">
                        {/* Outer breathing ring */}
                        <span className="absolute inset-0 rounded-full border border-[#fdfaf5]/60 transition-all duration-700 group-hover:scale-110 group-hover:border-[#d8b87a]" />
                        {/* Inner cream disc */}
                        <span className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#fdfaf5]/95 backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5 md:w-6 md:h-6 text-[#1a1410] translate-x-[1.5px]"
                            fill="currentColor"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </span>
                    </span>

                    {/* Gold corner accents */}
                    <span
                      aria-hidden
                      className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#d8b87a]/80 transition-all duration-500 group-hover:w-8 group-hover:h-8"
                    />
                    <span
                      aria-hidden
                      className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#d8b87a]/80 transition-all duration-500 group-hover:w-8 group-hover:h-8"
                    />

                    {/* "filme" tag */}
                    <div className="absolute top-3 right-3 smallcaps text-[10px] tracking-[0.3em] text-[#fdfaf5] bg-[#0c0a08]/60 backdrop-blur-sm px-3 py-1">
                      filme
                    </div>

                    {/* Bottom info strip */}
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                      <p className="smallcaps text-[10px] md:text-[11px] tracking-[0.3em] text-[#d8b87a]">
                        {f.couple}
                      </p>
                      <p className="mt-1.5 text-[15px] md:text-[16px] font-light italic text-[#fdfaf5]">
                        {f.scene}
                      </p>
                    </div>

                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Hint for mobile users */}
          <p className="md:hidden text-center smallcaps text-[10px] tracking-[0.3em] text-[#5a4f43]/60 mt-6">
            arraste para o lado e toque para assistir
          </p>
        </div>
      </section>

      {/* PACKAGES — home-banners-grid (2x2) */}
      <section id="colecoes" className="py-14 md:py-28 bg-[#f4eee2]/40">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={staggerContainer}
            className="text-center mb-10 md:mb-16"
          >
            <motion.p
              variants={staggerItem}
              className="smallcaps text-[11px] md:text-[12px] tracking-[0.35em] text-[#8a6a2e] mb-3 md:mb-4"
            >
              coleções
            </motion.p>
            <motion.h2
              variants={staggerItem}
              className="text-[clamp(1.7rem,4vw,3.2rem)] font-light leading-tight max-w-[720px] mx-auto"
            >
              Quatro caminhos para contar a sua história
            </motion.h2>
            <motion.div
              variants={staggerItem}
              className="w-12 h-px bg-[#8a6a2e] mx-auto mt-6 md:mt-8"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-4 md:gap-6"
          >
            {PACKAGES.map((pkg) => (
              <motion.a
                key={pkg.name}
                href={waHref(
                  `Olá! Vim pelo site vvstorymaker e tenho interesse na coleção ${pkg.name}. Pode me passar mais detalhes?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
                className="group relative block aspect-[16/11] md:aspect-[16/10] overflow-hidden shadow-[0_4px_24px_-12px_rgba(26,20,16,0.25)] hover:shadow-[0_24px_60px_-20px_rgba(26,20,16,0.45)] transition-shadow duration-700"
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-700 group-hover:from-black/90" />

                {/* Gold corner accents */}
                <span
                  aria-hidden
                  className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[#d8b87a]/0 group-hover:border-[#d8b87a]/80 transition-all duration-700 group-hover:w-8 group-hover:h-8"
                />
                <span
                  aria-hidden
                  className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[#d8b87a]/0 group-hover:border-[#d8b87a]/80 transition-all duration-700 group-hover:w-8 group-hover:h-8"
                />

                {pkg.featured && (
                  <div className="absolute top-5 right-5 md:top-6 md:right-6 smallcaps text-[10px] tracking-[0.3em] text-[#fdfaf5] border border-[#d8b87a]/80 bg-[#0c0a08]/40 backdrop-blur-sm px-3 py-1.5">
                    coleção completa
                  </div>
                )}

                <div className="absolute inset-0 p-5 md:p-10 flex flex-col justify-end text-[#fdfaf5]">
                  <p className="smallcaps text-[10px] md:text-[11px] tracking-[0.3em] text-[#d8b87a] mb-1.5 md:mb-2">
                    coleção
                  </p>
                  <h3 className="text-[clamp(1.5rem,2.8vw,2.4rem)] font-light leading-tight">
                    {pkg.name}
                  </h3>
                  <ul className="mt-2.5 md:mt-3 space-y-0.5 md:space-y-1 text-[13.5px] md:text-[15px] font-light opacity-90">
                    {pkg.bullets.map((b) => (
                      <li key={b}>· {b}</li>
                    ))}
                  </ul>
                  <div className="mt-4 md:mt-5 flex items-end justify-between gap-3 md:gap-4">
                    <p className="text-[clamp(1.25rem,2vw,1.8rem)] font-light">
                      {pkg.price}
                    </p>
                    <span className="smallcaps text-[10px] md:text-[11px] tracking-[0.25em] inline-flex items-center gap-2">
                      conversar
                      <span className="block w-5 h-px bg-[#fdfaf5]/70 transition-all duration-500 group-hover:w-9 group-hover:bg-[#d8b87a]" />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ADD-ONS — banners-middle pattern adapted */}
      <section id="complementos" className="py-14 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 1.06 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, ease: EASE_CINEMATIC }}
              className="relative aspect-[4/3] md:aspect-[4/5] overflow-hidden"
            >
              <img
                src={champagneImage}
                alt="Detalhes do casamento"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.p
                variants={staggerItem}
                className="smallcaps text-[11px] md:text-[12px] tracking-[0.35em] text-[#8a6a2e] mb-3 md:mb-4"
              >
                complementos
              </motion.p>
              <motion.h2
                variants={staggerItem}
                className="text-[clamp(1.6rem,3.4vw,2.8rem)] font-light leading-tight"
              >
                Detalhes que tornam cada filme único
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="mt-5 md:mt-6 text-[15.5px] md:text-[17px] leading-[1.8] md:leading-[1.85] font-light text-[#3b322a]"
              >
                Some à sua coleção pequenos cuidados que fazem toda a diferença
                — dos votos gravados ao vídeo carta dos convidados. Cada
                complemento pode ser combinado com qualquer pacote.
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {ADDONS.map((a) => (
              <motion.div
                key={a.name}
                variants={staggerItem}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1410]/5">
                  <img
                    src={a.image}
                    alt={a.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  {/* Subtle gold glow on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[#d8b87a]/0 group-hover:bg-[#d8b87a]/10 mix-blend-overlay transition-colors duration-700"
                  />
                  {/* Gold corner reveal */}
                  <span
                    aria-hidden
                    className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#d8b87a]/0 group-hover:border-[#d8b87a]/80 transition-all duration-700 group-hover:w-7 group-hover:h-7"
                  />
                </div>
                <div className="pt-3.5 md:pt-5">
                  <h3 className="text-[17px] md:text-[22px] font-light italic group-hover:text-[#8a6a2e] transition-colors duration-500">
                    {a.name}
                  </h3>
                  <p className="mt-1.5 md:mt-2 text-[13px] md:text-[14px] leading-[1.6] md:leading-[1.7] font-light text-[#5a4f43]">
                    {a.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SOBRE — banner_footer / concierge pattern */}
      <section id="sobre" className="py-14 md:py-28">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12 grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: EASE_CINEMATIC }}
            className="relative aspect-[4/5] overflow-hidden order-2 md:order-1"
          >
            <img
              src={ownerImage}
              alt="Fotógrafo e diretor da Storymaker"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <span
              aria-hidden
              className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-[#d8b87a]/70"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="order-1 md:order-2"
          >
            <motion.p
              variants={staggerItem}
              className="smallcaps text-[11px] md:text-[12px] tracking-[0.35em] text-[#8a6a2e] mb-3 md:mb-4"
            >
              quem está atrás da câmera
            </motion.p>
            <motion.h2
              variants={staggerItem}
              className="text-[clamp(1.7rem,3.6vw,2.8rem)] font-light leading-tight"
            >
              Atendimento <span className="italic">personalizado</span>, do
              primeiro <span className="italic">olá</span> à entrega final.
            </motion.h2>
            <motion.p
              variants={staggerItem}
              className="mt-5 md:mt-6 text-[15.5px] md:text-[17px] leading-[1.8] md:leading-[1.85] font-light text-[#3b322a]"
            >
              Eu acompanho cada casal pessoalmente. Antes do casamento,
              conversamos sobre a história de vocês. No dia, filmo com calma e
              presença, sem atrapalhar. Depois, edito ouvindo a trilha que faz
              sentido para vocês — para que o filme final seja exatamente como
              vocês se lembram daquele dia.
            </motion.p>
            <motion.a
              variants={staggerItem}
              href={waHref(WA_MESSAGES.about)}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 md:mt-9 inline-flex items-center gap-3 smallcaps text-[11px] md:text-[12px] tracking-[0.28em] md:tracking-[0.3em] border border-[#1a1410] text-[#1a1410] hover:bg-[#1a1410] hover:text-[#fdfaf5] transition-colors min-h-[44px] px-6 md:px-7 py-3 md:py-3.5"
            >
              agendar uma conversa
              <span className="block w-4 h-px bg-current transition-all duration-500 group-hover:w-8" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* CONTATO / FOOTER */}
      <footer id="contato" className="bg-[#0c0a08] text-[#fdfaf5] pt-14 md:pt-20 pb-8 md:pb-10">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-12 md:pb-16 border-b border-[#fdfaf5]/15">
            <div className="col-span-2 md:col-span-1">
              <img
                src={logoImage}
                alt="Storymaker"
                loading="lazy"
                className="h-16 md:h-20 w-auto brightness-0 invert"
              />
              <p className="mt-4 md:mt-6 text-[13.5px] md:text-[14px] leading-[1.7] md:leading-[1.8] font-light text-[#fdfaf5]/70 max-w-[420px]">
                Filmes de casamento autorais, com olhar cinematográfico e
                atendimento direto com o diretor.
              </p>
            </div>

            <div>
              <h3 className="smallcaps text-[11px] md:text-[12px] tracking-[0.3em] text-[#fdfaf5]/60 mb-4 md:mb-5">
                coleções
              </h3>
              <ul className="space-y-2 md:space-y-2.5 text-[13.5px] md:text-[14px] font-light">
                {PACKAGES.map((p) => (
                  <li key={p.name}>
                    <a href="#colecoes" className="hover:text-[#d8b87a] transition-colors">
                      {p.name} — {p.price}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="smallcaps text-[11px] md:text-[12px] tracking-[0.3em] text-[#fdfaf5]/60 mb-4 md:mb-5">
                complementos
              </h3>
              <ul className="space-y-2 md:space-y-2.5 text-[13.5px] md:text-[14px] font-light">
                {ADDONS.map((a) => (
                  <li key={a.name}>
                    <a href="#complementos" className="hover:text-[#d8b87a] transition-colors">
                      {a.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="smallcaps text-[11px] md:text-[12px] tracking-[0.3em] text-[#fdfaf5]/60 mb-4 md:mb-5">
                contato
              </h3>
              <ul className="space-y-2 md:space-y-2.5 text-[13.5px] md:text-[14px] font-light">
                <li>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#d8b87a] transition-colors"
                  >
                    WhatsApp — fale com o diretor
                  </a>
                </li>
                <li className="text-[#fdfaf5]/70">+55 12 98235-5909</li>
                <li className="text-[#fdfaf5]/70">Atendemos todo o Brasil</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-[11px] md:text-[12px] text-[#fdfaf5]/50 text-center md:text-left">
            <p>© {new Date().getFullYear()} Storymaker de Casamento · Todos os direitos reservados</p>
            <p className="smallcaps tracking-[0.3em]">made with love</p>
          </div>
        </div>
      </footer>

      {/* FILM LIGHTBOX — elegant overlay player */}
      <AnimatePresence>
        {lightboxFilm !== null && (
          <motion.div
            key="lightbox"
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
            onClick={() => setLightboxFilm(null)}
            className="fixed inset-0 z-[80] bg-[#0c0a08]/92 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            {/* Close button */}
            <button
              ref={lightboxCloseRef}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxFilm(null);
              }}
              aria-label="Fechar"
              className="group absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center text-[#fdfaf5] border border-[#fdfaf5]/30 hover:border-[#d8b87a] hover:bg-[#d8b87a] hover:text-[#0c0a08] transition-all duration-500 z-10"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {/* Player container — stop propagation so clicking video doesn't close */}
            <motion.div
              key={`player-${lightboxFilm}`}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.55, ease: EASE_CINEMATIC }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[420px] md:max-w-[460px]"
            >
              {/* Gold corner accents around the player */}
              <span aria-hidden className="absolute -top-3 -left-3 w-6 h-6 md:w-8 md:h-8 border-t border-l border-[#d8b87a]/80 pointer-events-none" />
              <span aria-hidden className="absolute -top-3 -right-3 w-6 h-6 md:w-8 md:h-8 border-t border-r border-[#d8b87a]/80 pointer-events-none" />
              <span aria-hidden className="absolute -bottom-3 -left-3 w-6 h-6 md:w-8 md:h-8 border-b border-l border-[#d8b87a]/80 pointer-events-none" />
              <span aria-hidden className="absolute -bottom-3 -right-3 w-6 h-6 md:w-8 md:h-8 border-b border-r border-[#d8b87a]/80 pointer-events-none" />

              <div className="relative aspect-[9/16] max-h-[82vh] mx-auto overflow-hidden bg-[#0c0a08] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
                <video
                  key={FEATURED_FILMS[lightboxFilm].video}
                  src={FEATURED_FILMS[lightboxFilm].video ?? undefined}
                  poster={FEATURED_FILMS[lightboxFilm].poster}
                  autoPlay
                  controls
                  playsInline
                  preload="auto"
                  onCanPlay={(e) => {
                    // Some browsers block autoplay even when muted is omitted; we
                    // try once and stay quiet if blocked — controls are visible.
                    const v = e.currentTarget;
                    const p = v.play();
                    if (p && typeof p.catch === "function") p.catch(() => {});
                  }}
                  className="absolute inset-0 w-full h-full object-contain bg-[#0c0a08]"
                />
              </div>

              {/* Caption + WhatsApp CTA */}
              <div className="mt-5 md:mt-6 text-center text-[#fdfaf5]">
                <p
                  id="lightbox-title"
                  className="smallcaps text-[10px] md:text-[11px] tracking-[0.35em] text-[#d8b87a]"
                >
                  {FEATURED_FILMS[lightboxFilm].couple}
                </p>
                <p className="mt-1 text-[16px] md:text-[18px] font-light italic">
                  {FEATURED_FILMS[lightboxFilm].scene}
                </p>
                <a
                  href={waHref(
                    `Olá! Vim pelo site vvstorymaker, vi o filme do casal ${FEATURED_FILMS[lightboxFilm].couple} (cena "${FEATURED_FILMS[lightboxFilm].scene}") e gostaria de conversar sobre o meu casamento.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 md:mt-5 inline-flex items-center gap-3 smallcaps text-[10px] md:text-[11px] tracking-[0.3em] border border-[#fdfaf5]/40 hover:border-[#d8b87a] hover:bg-[#d8b87a] hover:text-[#0c0a08] text-[#fdfaf5] transition-colors min-h-[44px] px-5 md:px-6 py-3"
                >
                  conversar sobre este filme
                  <span className="block w-4 h-px bg-current transition-all duration-500 group-hover:w-8" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}
