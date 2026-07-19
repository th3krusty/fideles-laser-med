import { MessageCircle } from "lucide-react";
import { Instagram } from "lucide-react";

export function InstagramButton({ onClick }) {

  function openInstagram() {

    if (onClick) onClick();

    window.location.href =
      "https://www.instagram.com/fideleslaser/";
  }

  return (
    <button
      className="instagram-float"
      onClick={openInstagram}
      aria-label="Instagram"
    >
      <Instagram size={30} />
    </button>
  );
}