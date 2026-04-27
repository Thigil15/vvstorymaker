import logoImage from "@assets/Logo_StoryMaker_Casamento_Sem_fundo_1777242203099.png";

const WHATSAPP_LINK = "https://wa.me/5512982355909";
const WHATSAPP_TEXT =
  "Olá! Vim pelo site da Storymaker, mas a página que eu procurava não foi encontrada. Pode me ajudar?";
const WHATSAPP_HREF = `${WHATSAPP_LINK}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fdfaf5] text-[#1a1410] px-6 py-16 text-center">
      <a href="/" aria-label="Voltar para a página inicial" className="mb-10">
        <img
          src={logoImage}
          alt="Storymaker de Casamento"
          className="h-16 md:h-20 w-auto"
        />
      </a>

      <p className="smallcaps text-[12px] tracking-[0.3em] text-[#8a6a2e] mb-4">
        404
      </p>
      <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-light leading-tight max-w-[640px]">
        Esta página <span className="italic">não existe</span> — mas a sua
        história ainda pode ser contada.
      </h1>
      <p className="mt-6 max-w-[520px] text-[16px] md:text-[17px] leading-[1.85] font-light text-[#3b322a]">
        O endereço que você procurava não foi encontrado. Volte para a página
        inicial ou fale com a gente diretamente no WhatsApp.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <a
          href="/"
          className="smallcaps text-[12px] tracking-[0.3em] border border-[#1a1410] text-[#1a1410] hover:bg-[#1a1410] hover:text-[#fdfaf5] transition-colors px-7 py-3.5"
        >
          voltar para o início
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="smallcaps text-[12px] tracking-[0.3em] border border-[#1a1410] bg-[#1a1410] text-[#fdfaf5] hover:bg-transparent hover:text-[#1a1410] transition-colors px-7 py-3.5"
        >
          falar no WhatsApp
        </a>
      </div>
    </div>
  );
}
