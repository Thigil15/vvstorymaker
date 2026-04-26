import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import logoImage from "@assets/storymaker_logo_transparent.png";
import ownerImage from "@assets/WhatsApp_Image_2026-04-26_at_18.45.59_1777240064953.jpeg";

import heroSilhouettes from "@/assets/images/hero-silhouettes.png";
import ringsImage from "@/assets/images/rings.png";
import champagneImage from "@/assets/images/champagne.png";
import vowsImage from "@/assets/images/vows.png";
import laceImage from "@/assets/images/lace.png";
import details1 from "@/assets/images/details-1.png";
import details2 from "@/assets/images/details-2.png";
import heroAlt from "@/assets/images/hero.png";

const WHATSAPP_LINK = "https://wa.me/5511999999999";
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

const FEATURED_FILMS = [
  { couple: "Júlia & Rafael", city: "Campos do Jordão · SP", image: heroSilhouettes },
  { couple: "Marina & Lucas", city: "Trancoso · BA", image: laceImage },
  { couple: "Beatriz & Pedro", city: "Búzios · RJ", image: champagneImage },
  { couple: "Carolina & Tiago", city: "Tiradentes · MG", image: vowsImage },
  { couple: "Helena & Felipe", city: "Holambra · SP", image: ringsImage },
  { couple: "Antonia & Gabriel", city: "Brotas · SP", image: details1 },
];

const TESTIMONIAL_PHOTOS = [
  { src: heroSilhouettes, label: "Júlia & Rafael" },
  { src: champagneImage, label: "Marina & Lucas" },
  { src: laceImage, label: "Beatriz & Pedro" },
  { src: vowsImage, label: "Carolina & Tiago" },
  { src: ringsImage, label: "Helena & Felipe" },
  { src: details2, label: "Antonia & Gabriel" },
];

const TRUST_ICONS = [
  { title: "atendemos todo o Brasil", desc: "Disponíveis para destination weddings em qualquer cidade." },
  { title: "qualidade 4K cinema", desc: "Câmeras profissionais, lentes cinematográficas e áudio tratado." },
  { title: "edição autoral", desc: "Cada filme é montado à mão, com narrativa pensada para o casal." },
  { title: "equipe experiente", desc: "Mais de 200 casamentos filmados desde 2019." },
  { title: "entrega em até 90 dias", desc: "Trailer em 7 dias, filme completo em até 3 meses." },
  { title: "resposta em 1 hora", desc: "Atendimento direto pelo WhatsApp, sem intermediários." },
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollFeatured = (dir: 1 | -1) => {
    const el = featuredRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] text-[#1a1410] selection:bg-[#1a1410] selection:text-[#fdfaf5]">

      {/* TOPBAR — announcement */}
      <div className="bg-[#0c0a08] text-[#fdfaf5] text-[12px] tracking-[0.3em] uppercase text-center py-2.5 px-4">
        Atendemos casamentos em todo o Brasil · Resposta pelo WhatsApp em até 1 hora
      </div>

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
              className={`h-10 md:h-12 w-auto transition-all duration-500 ${
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
              className={`hidden md:inline-block text-[12px] tracking-[0.25em] uppercase border px-5 py-2.5 transition-colors ${
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
      <section id="top" className="relative h-[92vh] min-h-[620px] max-h-[920px] -mt-[88px] overflow-hidden">
        <img
          src={heroSilhouettes}
          alt="Silhueta de noivos ao pôr do sol"
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
        <p className="mt-8 text-[17px] md:text-[18px] leading-[1.85] font-light text-[#3b322a]">
          Somos especialistas em filmar casamentos com olhar autoral, captação
          em 4K e edição cinematográfica. Cada filme é construído à mão por uma
          equipe pequena e dedicada — para que você possa, anos depois, sentar
          no sofá, apertar play e voltar exatamente para aquele dia.
        </p>
      </motion.section>

      {/* FEATURED FILMS — Bestsellers */}
      <section id="casais" className="border-t border-[#1a1410]/10 py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="smallcaps text-[12px] tracking-[0.3em] text-[#8a6a2e] mb-3">
                em destaque
              </p>
              <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-light">
                Casamentos que filmamos
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
            {FEATURED_FILMS.map((f) => (
              <a
                key={f.couple}
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 w-[260px] md:w-[300px] snap-start group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1410]/5">
                  <img
                    src={f.image}
                    alt={f.couple}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pt-4">
                  <h3 className="text-[20px] font-light italic">{f.couple}</h3>
                  <p className="smallcaps text-[11px] tracking-[0.2em] text-[#6a5a48] mt-1">
                    {f.city}
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
                className={`group relative block aspect-[16/11] md:aspect-[16/10] overflow-hidden ${
                  pkg.featured ? "md:col-span-2 md:aspect-[24/9]" : ""
                }`}
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                {pkg.featured && (
                  <div className="absolute top-6 left-6 smallcaps text-[10px] tracking-[0.3em] text-[#fdfaf5] border border-[#fdfaf5]/60 px-3 py-1.5">
                    mais escolhido
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

      {/* TESTIMONIALS — make it Unforgettable grid */}
      <section className="py-20 md:py-28 bg-[#f4eee2]/40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="smallcaps text-[12px] tracking-[0.3em] text-[#8a6a2e] mb-3">
              casais
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light leading-tight">
              <span className="italic">make it</span> Unforgettable
            </h2>
            <p className="mt-5 max-w-[640px] mx-auto text-[16px] font-light text-[#3b322a] leading-[1.8]">
              Histórias reais de amor que tivemos a honra de filmar — cada uma
              com seu próprio ritmo, sua própria luz, seu próprio final feliz.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {TESTIMONIAL_PHOTOS.map((p) => (
              <div
                key={p.label}
                className="group relative aspect-square overflow-hidden bg-[#1a1410]/5"
              >
                <img
                  src={p.src}
                  alt={p.label}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-[#fdfaf5] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <p className="text-[18px] font-light italic">{p.label}</p>
                </div>
              </div>
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

      {/* INFOBAR — 6 trust signals */}
      <section className="border-t border-[#1a1410]/10 py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {TRUST_ICONS.map((t) => (
              <div key={t.title} className="text-center">
                <p className="smallcaps text-[12px] tracking-[0.22em] text-[#1a1410]">
                  {t.title}
                </p>
                <p className="mt-2 text-[12.5px] leading-[1.6] font-light text-[#5a4f43]">
                  {t.desc}
                </p>
              </div>
            ))}
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
                className="h-14 w-auto brightness-0 invert"
              />
              <p className="mt-6 text-[14px] leading-[1.8] font-light text-[#fdfaf5]/70">
                Filmes de casamento autorais. Captação em 4K, edição
                cinematográfica e atendimento direto com o diretor.
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
                <li>
                  <a
                    href="https://instagram.com/storymakerdecasamento"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#d8b87a] transition-colors"
                  >
                    @storymakerdecasamento
                  </a>
                </li>
                <li className="text-[#fdfaf5]/70">contato@storymakerdecasamento.com.br</li>
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

      {/* WhatsApp floating button */}
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-8 md:h-8 fill-current">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l.43.683-1.005 3.668 3.554-.91zM17.39 14.382c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.298-.495.099-.198.05-.371-.025-.521-.074-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01a1.099 1.099 0 0 0-.793.371c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
        </svg>
      </a>
    </div>
  );
}
