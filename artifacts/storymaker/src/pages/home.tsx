import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import logoImage from "@assets/storymaker_logo_transparent.png";
import ownerImage from "@assets/WhatsApp_Image_2026-04-26_at_18.45.59_1777240064953.jpeg";

import heroSilhouettes from "@/assets/images/hero-silhouettes.png";
import ringsImage from "@/assets/images/rings.png";
import champagneImage from "@/assets/images/champagne.png";
import vowsImage from "@/assets/images/vows.png";
import laceImage from "@/assets/images/lace.png";

const WHATSAPP_LINK = "https://wa.me/5511999999999";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-primary selection:text-primary-foreground">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference flex items-center justify-between px-6 md:px-12 py-6">
        <div className="w-24 md:w-28 mix-blend-normal">
          <img src={logoImage} alt="Storymaker de Casamento" className="w-full h-auto drop-shadow-md" />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-[#fdfaf5]">
          <a href="#sobre" className="hover:opacity-70 transition-opacity">Sobre</a>
          <a href="#colecoes" className="hover:opacity-70 transition-opacity">Coleções</a>
          <a href="#complementos" className="hover:opacity-70 transition-opacity">Complementos</a>
        </div>
        <Button 
          variant="outline" 
          className="hidden md:flex rounded-none border-[#fdfaf5] text-[#fdfaf5] hover:bg-[#fdfaf5] hover:text-primary transition-colors bg-transparent backdrop-blur-sm"
          onClick={() => window.open(WHATSAPP_LINK, "_blank")}
        >
          Conversar no WhatsApp
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: heroY }}
        >
          <img 
            src={heroSilhouettes} 
            alt="Silhueta de noivos" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        <div className="relative z-10 text-center px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <p className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm mb-6">Filmes de Casamento</p>
            <h1 className="text-white text-6xl md:text-8xl lg:text-[9rem] leading-[0.8] script-font mb-8">
              O capítulo mais <br/>
              <span className="text-white/90">bonito</span> da sua história
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <Button 
              className="rounded-none bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto transition-all duration-500"
              onClick={() => window.open(WHATSAPP_LINK, "_blank")}
            >
              Reservar minha data
            </Button>
          </motion.div>
        </div>
      </section>

      {/* The Atelier Concept */}
      <section className="py-32 px-6 md:px-12 bg-background relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="space-y-8 max-w-lg"
            >
              <h2 className="text-5xl md:text-7xl script-font text-primary leading-tight">
                Um atelier <br/>de memória
              </h2>
              <p className="text-lg md:text-xl text-primary/80 leading-relaxed font-serif">
                Acreditamos no silêncio entre as palavras, na respiração antes do beijo, no toque imperceptível das mãos. Nossos filmes não são registros mecânicos — são heranças de família.
              </p>
              <p className="text-lg md:text-xl text-primary/80 leading-relaxed font-serif">
                Para casais que tratam o casamento como uma obra de arte: cultivado, íntimo e intemporal.
              </p>
            </motion.div>
            
            <div className="relative">
              <motion.img 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={ringsImage} 
                alt="Detalhe íntimo" 
                className="w-full aspect-[3/4] object-cover shadow-2xl"
              />
              <motion.img 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                src={laceImage} 
                alt="Textura de renda" 
                className="absolute -bottom-16 -left-12 md:-left-24 w-1/2 aspect-[3/4] object-cover border-8 border-background shadow-xl hidden md:block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Storymaker */}
      <section id="sobre" className="py-32 bg-[#f9f6f0] px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex-1 space-y-8"
          >
            <h2 className="text-4xl md:text-6xl script-font text-primary">Atrás da lente</h2>
            <div className="space-y-6 text-lg md:text-xl text-primary/80 font-serif leading-relaxed italic">
              <p>
                "Fotografar e filmar casamentos é, para mim, registrar o capítulo mais bonito de uma história que continua."
              </p>
              <p>
                "Eu não quero apenas entregar um vídeo bonito. Quero que daqui a vinte anos, quando vocês sentarem no sofá com uma taça de vinho para rever esse dia, vocês consigam sentir exatamente o mesmo perfume no ar, o mesmo frio na barriga, a mesma certeza."
              </p>
            </div>
            <div className="pt-8">
              <span className="text-4xl script-font text-primary/90">Sua Storymaker</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="flex-1 w-full"
          >
            <div className="aspect-[4/5] relative bg-secondary overflow-hidden group">
               <img src={ownerImage} alt="Fotógrafa" className="w-full h-full object-cover object-top transition-transform duration-[20s] group-hover:scale-105" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages / Coleções */}
      <section id="colecoes" className="py-32 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-24"
          >
            <span className="uppercase tracking-[0.2em] text-xs text-primary/60 mb-4 block">Investimento</span>
            <h2 className="text-6xl md:text-8xl script-font text-primary">Coleções</h2>
            <p className="mt-6 text-lg text-primary/70 max-w-2xl mx-auto">
              Cada celebração é única. Nossas coleções foram desenhadas para honrar a magnitude do seu dia com elegância e dedicação absoluta.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Package 1 */}
            <motion.div variants={fadeUp} className="border border-primary/10 p-8 flex flex-col hover:border-primary/30 transition-colors bg-[#fdfaf5]">
              <h3 className="text-3xl script-font mb-2">Essencial</h3>
              <p className="text-2xl font-serif mb-6">R$ 1.600</p>
              <div className="h-px w-12 bg-primary/20 mb-6"></div>
              <p className="text-primary/70 text-sm leading-relaxed mb-8 flex-1">
                A captura essencial do dia: cobertura cinematográfica do casamento e entrega de um filme curto que guarda a emoção dos momentos centrais.
              </p>
            </motion.div>

            {/* Package 2 */}
            <motion.div variants={fadeUp} className="border border-primary/10 p-8 flex flex-col hover:border-primary/30 transition-colors bg-[#fdfaf5]">
              <h3 className="text-3xl script-font mb-2">Intermediário I</h3>
              <p className="text-2xl font-serif mb-6">R$ 2.000</p>
              <div className="h-px w-12 bg-primary/20 mb-6"></div>
              <p className="text-primary/70 text-sm leading-relaxed mb-8 flex-1">
                Cobertura ampliada com mais tempo de presença, segundo ponto de vista e edição mais detalhada — para quem quer revisitar mais cenas do dia.
              </p>
            </motion.div>

            {/* Package 3 */}
            <motion.div variants={fadeUp} className="border border-primary/10 p-8 flex flex-col hover:border-primary/30 transition-colors bg-[#fdfaf5]">
              <h3 className="text-3xl script-font mb-2">Intermediário II</h3>
              <p className="text-2xl font-serif mb-6">R$ 2.390</p>
              <div className="h-px w-12 bg-primary/20 mb-6"></div>
              <p className="text-primary/70 text-sm leading-relaxed mb-8 flex-1">
                Inclui making-of dos noivos, cobertura completa da cerimônia e festa, e um filme longa com trilha cuidadosamente escolhida.
              </p>
            </motion.div>

            {/* Package 4 - Premium */}
            <motion.div variants={fadeUp} className="border-2 border-accent p-8 flex flex-col bg-primary text-primary-foreground relative shadow-2xl scale-105 z-10 transform origin-bottom">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-primary px-4 py-1 text-xs uppercase tracking-wider font-sans font-medium whitespace-nowrap">
                Mais Escolhido
              </div>
              <h3 className="text-4xl script-font mb-2 text-accent">Premium</h3>
              <p className="text-2xl font-serif mb-6 text-primary-foreground/90">R$ 2.790</p>
              <div className="h-px w-12 bg-accent/40 mb-6"></div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-8 flex-1">
                Experiência completa: making-of dele e dela, ensaio pré-wedding, filme cinematográfico longa, teaser para redes e entrega em embalagem assinada.
              </p>
              <Button 
                className="w-full bg-accent hover:bg-accent/90 text-primary rounded-none h-12"
                onClick={() => window.open(WHATSAPP_LINK, "_blank")}
              >
                Solicitar Reserva
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Decorative Image Break */}
      <section className="h-[70vh] relative overflow-hidden">
         <motion.div 
            className="absolute inset-0 w-full h-full"
            style={{ y: useTransform(scrollYProgress, [0.4, 0.8], ["-10%", "10%"]) }}
          >
            <img src={champagneImage} alt="Brinde" className="w-full h-full object-cover" />
         </motion.div>
      </section>

      {/* Add-ons / Complementos */}
      <section id="complementos" className="py-32 px-6 md:px-12 bg-[#f9f6f0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="md:w-1/3"
            >
              <span className="uppercase tracking-[0.2em] text-xs text-primary/60 mb-4 block">Personalização</span>
              <h2 className="text-5xl md:text-7xl script-font text-primary mb-6">Complementos</h2>
              <p className="text-lg text-primary/70 mb-8">
                Pequenos detalhes que transformam a experiência e guardam memórias adicionais do seu dia.
              </p>
              <img src={vowsImage} alt="Votos" className="w-full aspect-[4/3] object-cover shadow-lg" />
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-2/3 grid sm:grid-cols-2 gap-x-12 gap-y-16"
            >
              <motion.div variants={fadeUp} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-accent"></div>
                  <h4 className="text-2xl script-font text-primary">Votos gravados</h4>
                </div>
                <p className="text-primary/70 leading-relaxed">
                  Registro íntimo dos votos lidos pelos noivos antes da cerimônia, editado em peça à parte.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-accent"></div>
                  <h4 className="text-2xl script-font text-primary">Stories em tempo real</h4>
                </div>
                <p className="text-primary/70 leading-relaxed">
                  Bastidores publicados ao vivo durante o dia para compartilhar a emoção com quem está distante.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-accent"></div>
                  <h4 className="text-2xl script-font text-primary">Trends & reels</h4>
                </div>
                <p className="text-primary/70 leading-relaxed">
                  Peças curtas verticais pensadas para Instagram e TikTok, no ritmo do que viraliza.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-accent"></div>
                  <h4 className="text-2xl script-font text-primary">Vídeo carta</h4>
                </div>
                <p className="text-primary/70 leading-relaxed">
                  Uma carta em vídeo dos noivos um para o outro, entregue de surpresa no dia.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 px-6 md:px-12 bg-primary text-primary-foreground text-center flex flex-col items-center justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl space-y-12"
        >
          <h2 className="text-6xl md:text-8xl script-font text-accent leading-tight">
            Prontos para eternizar <br/>este capítulo?
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/80 font-serif max-w-xl mx-auto">
            Nossa agenda é limitada para garantir a dedicação que cada história merece.
          </p>
          
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-primary text-lg h-16 px-12 rounded-none transform transition-transform hover:scale-105"
            onClick={() => window.open(WHATSAPP_LINK, "_blank")}
          >
            Conversar no WhatsApp <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </motion.div>

        <div className="mt-32 w-28 opacity-60 hover:opacity-100 transition-opacity">
          <img src={logoImage} alt="Storymaker logo" className="w-full" />
        </div>
        <p className="mt-12 text-sm text-primary-foreground/40 tracking-widest uppercase">
          © {new Date().getFullYear()} Storymaker. Todos os direitos reservados.
        </p>
      </section>
      
    </div>
  );
}
