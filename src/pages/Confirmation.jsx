import { Check } from "lucide-react";
import { money } from "../lib/format.js";

export function Confirmation({ order, onShop, onOrders }) {
  return (
    <main className="container page-narrow confirmation">
      <div className="confirm-icon"><Check size={26} strokeWidth={2} /></div>
      <h1>Pedido recebido</h1>
      <p className="confirm-copy">
        Número do pedido <strong>{order.id}</strong>. Vamos revisar a arte e
        confirmar o prazo por telefone ou WhatsApp em breve.
      </p>

      <div className="order-summary">
        <div className="total-line">
          <span>Total</span>
          <strong>{money(order.total)}</strong>
        </div>
        <p className="cart-meta">
          {order.items.reduce((s, i) => s + i.qty, 0)} peça(s) ·{" "}
          {order.customer.entrega === "retirada" ? "retirada na loja" : "envio pelo correio"}
        </p>
      </div>

      <div className="confirm-actions">
        <button className="btn btn-ghost" onClick={onOrders}>Ver meus pedidos</button>
        <button className="btn btn-primary" onClick={onShop}>Voltar à loja</button>
      </div>
    </main>
  );
}
