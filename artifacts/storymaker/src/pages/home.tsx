import { motion } from "framer-motion";
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
const WHATSAPP_TEXT =
  "Olá! Vim pelo site e gostaria de conversar sobre o filme do meu casamento.";
const WHATSAPP_HREF = `${WHATSAPP_LINK}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

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
    bullets: ["Cobertura de 4h", "Trailer de 90s", "Filme de 4 minutos"],
    image: ringsImage,
  },
  {
    name: "Intermediário I",
    price: "R$ 2.000",
    bullets: ["Cobertura de 6h", "Trailer de 90s", "Filme de 8 minutos"],
    image: champagneImage,
  },
  {
    name: "Intermediário II",
    price: "R$ 2.390",
    bullets: ["Cobertura de 8h", "Trailer de 90s", "Filme de 12 minutos"],
    image: laceImage,
  },
  {
    name: "Premium",
    price: "R$ 2.790",
    bullets: [
      "Cobertura completa",
      "Trailer + filme de 18 min",
      "Documentário do casal",
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
  const featuredRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean);
    if (videos.length === 0) return;

    const tryPlay = (v: HTMLVideoElement) => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            tryPlay(v);
          } else {
            v.pause();
          }
        });
      },
      { rootMargin: "200px", threshold: 0.1 },
    );

    videos.forEach((v) => {
      io.observe(v);
      tryPlay(v);
    });
    return () => io.disconnect();
  }, []);

  const scrollFeatured = (dir: 1 | -1) => {
    const el = featuredRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] text-[#1a1410] selection:bg-[#1a1410] selection:text-[#fdfaf5]">

      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#fdfaf5]/95 backdrop-blur-md border-b border-[#1a1410]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 md:py-5 grid grid-cols-3 items-center">
          {/* Logo (left) */}
          <a href="#top" className="flex items-center">
            <img
              src={logoImage}
              alt="Storymaker de Casamento"
              className={`h-14 md:h-16 w-auto transition-all duration-500 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
            />
          </a>

          {/* Nav (center) */}
          <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10">
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
          <div className="flex items-center justify-end gap-4">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className={`smallcaps text-[10px] md:text-[12px] tracking-[0.22em] md:tracking-[0.25em] uppercase border px-3.5 md:px-5 py-2 md:py-2.5 transition-colors ${
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

      {/* HERO — fullbanner */}
      <section id="top" className="relative h-[92vh] min-h-[620px] max-h-[920px] -mt-[88px] md:-mt-[104px] overflow-hidden">
        <img
          src={heroSilhouettes}
          alt="Silhueta de noivos entre velas"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p
              className="text-[#fdfaf5] font-light text-[clamp(2.4rem,6vw,5.6rem)] leading-[1.05]"
              style={{ letterSpacing: "0.18em" }}
            >
              feita para reviver
            </p>
            <p className="mt-6 text-[#fdfaf5]/85 italic font-light text-[clamp(1rem,1.6vw,1.25rem)] tracking-wide">
              filmes de casamento, feitos com afeto
            </p>
          </motion.div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#fdfaf5]/70 text-[10px] tracking-[0.4em] uppercase">
          role para descobrir
        </div>
      </section>

      {/* INTRO — text-middle */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="max-w-[820px] mx-auto px-6 py-24 md:py-32 text-center"
      >
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-light leading-tight">
          Made with love by <span className="italic">Storymaker</span>
        </h1>
        <p className="mt-8 text-[17px] md:text-[18px] leading-[1.9] font-light text-[#3b322a]">
          Acreditamos que cada casamento merece ser contado com a delicadeza
          de um filme — não documentado, mas{" "}
          <span className="italic">eternizado</span>. Trabalhamos com poucos
          casais por ano, com tempo, escuta e olhar atento, para que cada
          gesto, cada respiração e cada lágrima permaneçam exatamente como
          aconteceram. O que entregamos não é um vídeo. É a sua história,
          guardada para sempre.
        </p>
      </motion.section>

      {/* FEATURED FILMS — Bestsellers */}
      <section id="casais" className="border-t border-[#1a1410]/10 py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="smallcaps text-[12px] tracking-[0.3em] text-[#8a6a2e] mb-3">
                demonstração
              </p>
              <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-light italic">
                uma pequena amostra do nosso olhar
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                aria-label="Anterior"
                onClick={() => scrollFeatured(-1)}
                className="w-11 h-11 border border-[#1a1410]/30 hover:bg-[#1a1410] hover:text-[#fdfaf5] transition-colors flex items-center justify-center"
              >
                ‹
              </button>
              <button
                aria-label="Próximo"
                onClick={() => scrollFeatured(1)}
                className="w-11 h-11 border border-[#1a1410]/30 hover:bg-[#1a1410] hover:text-[#fdfaf5] transition-colors flex items-center justify-center"
              >
                ›
              </button>
            </div>
          </div>

          <div
            ref={featuredRef}
            className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6"
          >
            {FEATURED_FILMS.map((f, i) => (
              <a
                key={`${f.couple}-${i}`}
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 w-[240px] md:w-[300px] lg:w-[340px] snap-start group"
              >
                <div className="relative aspect-[9/16] overflow-hidden bg-[#0c0a08]">
                  {f.video ? (
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[i] = el;
                      }}
                      src={f.video}
                      poster={f.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={f.poster}
                      alt={f.couple}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute top-3 right-3 smallcaps text-[10px] tracking-[0.25em] text-[#fdfaf5] bg-[#0c0a08]/70 backdrop-blur-sm px-2.5 py-1">
                    filme
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="text-[20px] font-light italic">{f.couple}</h3>
                  <p className="smallcaps text-[11px] tracking-[0.2em] text-[#6a5a48] mt-1">
                    {f.scene}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES — home-banners-grid (2x2) */}
      <section id="colecoes" className="py-20 md:py-28 bg-[#f4eee2]/40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-14 md:mb-16">
            <p className="smallcaps text-[12px] tracking-[0.3em] text-[#8a6a2e] mb-3">
              coleções
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light leading-tight">
              Quatro caminhos para contar a sua história
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {PACKAGES.map((pkg) => (
              <motion.a
                key={pkg.name}
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="group relative block aspect-[16/11] md:aspect-[16/10] overflow-hidden"
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                {pkg.featured && (
                  <div className="absolute top-6 left-6 smallcaps text-[10px] tracking-[0.3em] text-[#fdfaf5] border border-[#fdfaf5]/60 px-3 py-1.5">
                    coleção completa
                  </div>
                )}

                <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-end text-[#fdfaf5]">
                  <p className="smallcaps text-[11px] tracking-[0.3em] opacity-80 mb-2">
                    coleção
                  </p>
                  <h3 className="text-[clamp(1.7rem,2.8vw,2.4rem)] font-light leading-tight">
                    {pkg.name}
                  </h3>
                  <ul className="mt-3 space-y-1 text-[14px] md:text-[15px] font-light opacity-90">
                    {pkg.bullets.map((b) => (
                      <li key={b}>· {b}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <p className="text-[clamp(1.4rem,2vw,1.8rem)] font-light">
                      {pkg.price}
                    </p>
                    <span className="smallcaps text-[11px] tracking-[0.25em] border-b border-[#fdfaf5]/70 pb-0.5 group-hover:border-[#fdfaf5] transition-colors">
                      conversar →
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ADD-ONS — banners-middle pattern adapted */}
      <section id="complementos" className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={champagneImage}
                alt="Detalhes do casamento"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="smallcaps text-[12px] tracking-[0.3em] text-[#8a6a2e] mb-4">
                complementos
              </p>
              <h2 className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-tight">
                Detalhes que tornam cada filme único
              </h2>
              <p className="mt-6 text-[16px] md:text-[17px] leading-[1.85] font-light text-[#3b322a]">
                Some à sua coleção pequenos cuidados que fazem toda a diferença
                — dos votos gravados ao vídeo carta dos convidados. Cada
                complemento pode ser combinado com qualquer pacote.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {ADDONS.map((a) => (
              <motion.div
                key={a.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1410]/5">
                  <img
                    src={a.image}
                    alt={a.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pt-5">
                  <h3 className="text-[20px] md:text-[22px] font-light italic">
                    {a.name}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.7] font-light text-[#5a4f43]">
                    {a.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE — banner_footer / concierge pattern */}
      <section id="sobre" className="py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative aspect-[4/5] overflow-hidden order-2 md:order-1">
            <img
              src={ownerImage}
              alt="Fotógrafo e diretor da Storymaker"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="smallcaps text-[12px] tracking-[0.3em] text-[#8a6a2e] mb-4">
              quem está atrás da câmera
            </p>
            <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] font-light leading-tight">
              Atendimento <span className="italic">personalizado</span>, do
              primeiro <span className="italic">olá</span> à entrega final.
            </h2>
            <p className="mt-6 text-[16px] md:text-[17px] leading-[1.85] font-light text-[#3b322a]">
              Eu acompanho cada casal pessoalmente. Antes do casamento,
              conversamos sobre a história de vocês. No dia, filmo com calma e
              presença, sem atrapalhar. Depois, edito ouvindo a trilha que faz
              sentido para vocês — para que o filme final seja exatamente como
              vocês se lembram daquele dia.
            </p>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-block smallcaps text-[12px] tracking-[0.3em] border border-[#1a1410] text-[#1a1410] hover:bg-[#1a1410] hover:text-[#fdfaf5] transition-colors px-7 py-3.5"
            >
              agendar uma conversa
            </a>
          </div>
        </div>
      </section>

      {/* CONTATO / FOOTER */}
      <footer id="contato" className="bg-[#0c0a08] text-[#fdfaf5] pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-10 md:gap-12 pb-16 border-b border-[#fdfaf5]/15">
            <div>
              <img
                src={logoImage}
                alt="Storymaker"
                loading="lazy"
                className="h-20 w-auto brightness-0 invert"
              />
              <p className="mt-6 text-[14px] leading-[1.8] font-light text-[#fdfaf5]/70">
                Filmes de casamento autorais, com olhar cinematográfico e
                atendimento direto com o diretor.
              </p>
            </div>

            <div>
              <h3 className="smallcaps text-[12px] tracking-[0.3em] text-[#fdfaf5]/60 mb-5">
                coleções
              </h3>
              <ul className="space-y-2.5 text-[14px] font-light">
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
              <h3 className="smallcaps text-[12px] tracking-[0.3em] text-[#fdfaf5]/60 mb-5">
                complementos
              </h3>
              <ul className="space-y-2.5 text-[14px] font-light">
                {ADDONS.map((a) => (
                  <li key={a.name}>
                    <a href="#complementos" className="hover:text-[#d8b87a] transition-colors">
                      {a.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="smallcaps text-[12px] tracking-[0.3em] text-[#fdfaf5]/60 mb-5">
                contato
              </h3>
              <ul className="space-y-2.5 text-[14px] font-light">
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

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#fdfaf5]/50">
            <p>© {new Date().getFullYear()} Storymaker de Casamento · Todos os direitos reservados</p>
            <p className="smallcaps tracking-[0.3em]">made with love</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
