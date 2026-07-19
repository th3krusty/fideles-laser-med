import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton({ onClick }) {

  function openWhatsApp() {

    if (onClick) onClick();
    const mensagem =
      "Olá! Gostaria de saber mais sobre os produtos da Fideles Laser Med.";

    window.location.href =
      "https://wa.me/5541999033793?text=" + encodeURIComponent(mensagem);
  }

  return (
    <button
      className="whatsapp-float"
      onClick={openWhatsApp}
      aria-label="WhatsApp"
    >
      <FaWhatsapp size={30} />
    </button>
  );
}