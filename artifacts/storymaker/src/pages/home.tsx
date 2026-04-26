import React from "react";
import { motion } from "framer-motion";
import { Heart, Film, Video, Star, Phone, ArrowRight, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Assets
import logoImage from "@assets/WhatsApp_Image_2026-04-26_at_18.45.58_1777240064951.jpeg";
import ownerPhoto from "@assets/WhatsApp_Image_2026-04-26_at_18.45.59_1777240064953.jpeg";
import heroImg from "@/assets/images/hero.png";
import details1Img from "@/assets/images/details-1.png";
import details2Img from "@/assets/images/details-2.png";

const WHATSAPP_LINK = "https://wa.me/5511999999999";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <img src={logoImage} alt="Storymaker de Casamento" className="h-12 w-auto object-contain mix-blend-multiply" />
          <Button asChild variant="outline" className="hidden md:inline-flex border-primary/20 hover:bg-primary/10">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Falar com a equipe
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Casamento Cinematográfico" 
            className="w-full h-full object-cover scale-105 animate-in fade-in zoom-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white mt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-6"
          >
            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-7xl font-serif text-white drop-shadow-lg leading-tight"
            >
              A eternidade contada em <span className="italic text-primary-foreground/90">fração de segundos</span>
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-lg md:text-xl text-white/90 drop-shadow-md font-light tracking-wide"
            >
              Capturamos a essência, o calor e a intimidade do dia mais emocionante da sua vida através de storytelling cinematográfico.
            </motion.p>
            <motion.div variants={fadeIn} className="pt-8">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 rounded-none tracking-wide">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Solicite um orçamento <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 relative"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img 
                  src={ownerPhoto} 
                  alt="Storymaker" 
                  className="w-full h-full object-cover rounded-sm shadow-xl"
                />
                <div className="absolute inset-0 border border-primary/20 rounded-sm scale-[0.95]" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 space-y-6"
            >
              <h2 className="text-sm tracking-widest uppercase text-primary/80 font-sans font-semibold">Nossa Essência</h2>
              <h3 className="text-4xl md:text-5xl text-foreground leading-tight">
                Muito além de <span className="italic text-primary">apertar o rec</span>
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg font-light">
                <p>
                  Acreditamos que cada casamento tem um ritmo, uma respiração própria. Não somos apenas cinegrafistas; somos espectadores invisíveis dos momentos que você nem sabia que haviam acontecido.
                </p>
                <p>
                  O olhar afetuoso da sua mãe, o nervosismo silencioso do noivo, a taça de champanhe brindando a uma nova vida. Transformamos esses instantes em um filme que você vai assistir daqui a vinte anos e sentir o mesmo frio na barriga.
                </p>
              </div>
              <div className="pt-6">
                <img src={logoImage} alt="Assinatura" className="h-16 opacity-80 mix-blend-multiply" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cinematic Break */}
      <section className="py-0 relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={details2Img} alt="Detalhes" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center px-6">
          <Heart className="w-12 h-12 text-white/80 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-5xl text-white italic drop-shadow-md">
            "O amor mora nos detalhes."
          </h2>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-32 bg-accent/10 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm tracking-widest uppercase text-primary/80 font-sans font-semibold mb-4">Investimento</h2>
            <h3 className="text-4xl md:text-5xl text-foreground">A sua história em capítulos</h3>
            <p className="mt-6 text-muted-foreground text-lg">Selecione a experiência que melhor traduz o seu sonho.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {/* Pacote 1 */}
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm shadow-none hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-normal">Pacote Essencial</CardTitle>
                <CardDescription className="text-2xl text-foreground mt-2">R$ 1.600</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start"><Film className="w-4 h-4 mr-2 text-primary/60 shrink-0 mt-0.5" /> Cerimônia</li>
                  <li className="flex items-start"><Film className="w-4 h-4 mr-2 text-primary/60 shrink-0 mt-0.5" /> Festa</li>
                  <li className="flex items-start"><Film className="w-4 h-4 mr-2 text-primary/60 shrink-0 mt-0.5" /> Edição dinâmica</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Escolher</a>
                </Button>
              </CardFooter>
            </Card>

            {/* Pacote 2 */}
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm shadow-none hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary/30" />
              <CardHeader>
                <CardTitle className="text-xl font-normal">Intermediário I</CardTitle>
                <CardDescription className="text-2xl text-foreground mt-2">R$ 2.000</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/5 p-3 rounded-sm mb-4 text-xs italic text-primary border border-primary/10">
                  "O making off pesa muito emocionalmente — é o upgrade lógico"
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start"><Film className="w-4 h-4 mr-2 text-primary/60 shrink-0 mt-0.5" /> Making off</li>
                  <li className="flex items-start"><Film className="w-4 h-4 mr-2 text-primary/60 shrink-0 mt-0.5" /> Cerimônia</li>
                  <li className="flex items-start"><Film className="w-4 h-4 mr-2 text-primary/60 shrink-0 mt-0.5" /> Festa</li>
                  <li className="flex items-start"><Film className="w-4 h-4 mr-2 text-primary/60 shrink-0 mt-0.5" /> Edição emocional</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Escolher</a>
                </Button>
              </CardFooter>
            </Card>

            {/* Pacote 3 */}
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm shadow-none hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-normal">Intermediário II</CardTitle>
                <CardDescription className="text-2xl text-foreground mt-2">R$ 2.390</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start"><Film className="w-4 h-4 mr-2 text-primary/60 shrink-0 mt-0.5" /> Pré-wedding</li>
                  <li className="flex items-start"><Film className="w-4 h-4 mr-2 text-primary/60 shrink-0 mt-0.5" /> Cerimônia</li>
                  <li className="flex items-start"><Film className="w-4 h-4 mr-2 text-primary/60 shrink-0 mt-0.5" /> Festa</li>
                  <li className="flex items-start"><Film className="w-4 h-4 mr-2 text-primary/60 shrink-0 mt-0.5" /> Edição com storytelling</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Escolher</a>
                </Button>
              </CardFooter>
            </Card>

            {/* Pacote Premium - Highlighted */}
            <Card className="border-primary bg-primary/5 shadow-lg transform md:-translate-y-4 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center">
                <Star className="w-3 h-3 mr-1" /> A Escolha Perfeita
              </div>
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl font-normal text-primary">Premium</CardTitle>
                <CardDescription className="text-3xl text-foreground mt-2 font-medium">R$ 2.790</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-foreground/80">
                  <li className="flex items-start font-medium"><Video className="w-4 h-4 mr-2 text-primary shrink-0 mt-0.5" /> Pré-wedding</li>
                  <li className="flex items-start font-medium"><Video className="w-4 h-4 mr-2 text-primary shrink-0 mt-0.5" /> Making off</li>
                  <li className="flex items-start font-medium"><Video className="w-4 h-4 mr-2 text-primary shrink-0 mt-0.5" /> Cerimônia</li>
                  <li className="flex items-start font-medium"><Video className="w-4 h-4 mr-2 text-primary shrink-0 mt-0.5" /> Festa</li>
                  <li className="flex items-start font-medium"><Video className="w-4 h-4 mr-2 text-primary shrink-0 mt-0.5" /> Edição cinematográfica</li>
                  <li className="flex items-start font-medium"><Video className="w-4 h-4 mr-2 text-primary shrink-0 mt-0.5" /> Conteúdo para redes sociais</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Reservar Data</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <img src={details1Img} alt="Detalhes Finos" className="w-full rounded-sm shadow-xl" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl text-foreground mb-8">Adicionais Especiais</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-border/50 pb-4">
                  <div>
                    <h4 className="text-lg font-medium text-foreground">Votos gravados + edição</h4>
                    <p className="text-sm text-muted-foreground">O áudio puro das suas promessas</p>
                  </div>
                  <span className="text-primary font-medium">a partir de R$ 300</span>
                </div>
                <div className="flex justify-between items-end border-b border-border/50 pb-4">
                  <div>
                    <h4 className="text-lg font-medium text-foreground">Stories em tempo real</h4>
                    <p className="text-sm text-muted-foreground">Para compartilhar no dia</p>
                  </div>
                  <span className="text-primary font-medium">a partir de R$ 250</span>
                </div>
                <div className="flex justify-between items-end border-b border-border/50 pb-4">
                  <div>
                    <h4 className="text-lg font-medium text-foreground">Trends/Reels</h4>
                    <p className="text-sm text-muted-foreground">Vídeos curtos engajantes</p>
                  </div>
                  <span className="text-primary font-medium">a partir de R$ 200</span>
                </div>
                <div className="flex justify-between items-end border-b border-border/50 pb-4">
                  <div>
                    <h4 className="text-lg font-medium text-foreground">Vídeo com cartas</h4>
                    <p className="text-sm text-muted-foreground">Um registro emocionante da troca</p>
                  </div>
                  <span className="text-primary font-medium">a partir de R$ 300</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-foreground text-background text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-6 relative z-10 max-w-3xl">
          <Heart className="w-12 h-12 text-primary mx-auto mb-8 opacity-80" />
          <h2 className="text-4xl md:text-6xl text-background mb-8 leading-tight">
            Prontos para dar <span className="text-primary italic">play</span> na sua história?
          </h2>
          <p className="text-background/70 text-lg mb-12 font-light">
            Nossa agenda de casamentos é limitada para garantir dedicação total a cada casal. Entre em contato para verificar a disponibilidade da sua data.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white border-none py-8 px-10 text-xl rounded-none w-full sm:w-auto">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Phone className="mr-3 w-6 h-6" /> Conversar pelo WhatsApp
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background pt-20 pb-10 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <img src={logoImage} alt="Storymaker de Casamento" className="h-16 mix-blend-multiply opacity-80" />
            <div className="flex space-x-6 text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Mail className="w-6 h-6" /></a>
            </div>
          </div>
          <Separator className="bg-border/50 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground/60 font-light">
            <p>© {new Date().getFullYear()} Storymaker de Casamento. Todos os direitos reservados.</p>
            <p className="mt-2 md:mt-0">Desenvolvido com sofisticação no Brasil.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
