import { ShoppingCart } from "lucide-react";
import logo from "../assets/logo.jpg";

export function NavBar({ cartCount, cartPulse, onLogo, onCart, onOrders, onContact }) {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <button className="brand" onClick={onLogo}>
          <img src={logo} alt="Fideles Laser Med" className="brand-logo" />
          <span className="brand-text">
            Fideles
            <span className="brand-sub">laser med</span>
          </span>
        </button>
        <nav className="nav-actions">
          <button className="link-btn" onClick={onContact}>Contato</button>
          <button className="link-btn" onClick={onOrders}>Meus pedidos</button>
          <button
            className={"cart-btn" + (cartPulse ? " pulse" : "")}
            onClick={onCart}
            aria-label="Ver carrinho"
          >
            <ShoppingCart size={19} strokeWidth={1.6} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}
