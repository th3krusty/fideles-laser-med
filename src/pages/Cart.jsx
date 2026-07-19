import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Icons } from "../components/Icons.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { money } from "../lib/format.js";

export function Cart({ cart, total, onRemove, onQty, onBack, onCheckout }) {
  return (
    <main className="container page-narrow">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Continuar comprando
      </button>
      <h1>Carrinho</h1>

      {cart.length === 0 ? (
        <EmptyState
          icon={<ShoppingCart size={28} strokeWidth={1.3} />}
          title="Seu carrinho está vazio"
          desc="Escolha uma peça no catálogo para começar."
        />
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => {
              const ItemIcon = Icons[item.productId];
              return (
                <li key={item.lineId} className="cart-item">
                  <div className="cart-thumb">
                    {item.image ? <img src={item.image} alt="" /> : ItemIcon ? <ItemIcon /> : null}
                  </div>
                  <div className="cart-info">
                    <h3>{item.productName}</h3>
                    <p className="cart-meta">Tamanho {item.size} · {money(item.price)} / un.</p>
                    {item.note && <p className="cart-note">"{item.note}"</p>}
                  </div>
                  <div className="cart-qty">
                    <button onClick={() => onQty(item.lineId, -1)} aria-label="Diminuir"><Minus size={13} /></button>
                    <span>{item.qty}</span>
                    <button onClick={() => onQty(item.lineId, 1)} aria-label="Aumentar"><Plus size={13} /></button>
                  </div>
                  <strong className="cart-line-total">{money(item.qty * item.price)}</strong>
                  <button className="icon-btn" onClick={() => onRemove(item.lineId)} aria-label="Remover">
                    <Trash2 size={16} />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="cart-summary">
            <div className="total-line">
              <span>Total</span>
              <strong>{money(total)}</strong>
            </div>
            <button className="btn btn-primary btn-block" onClick={onCheckout}>
              Finalizar pedido
            </button>
          </div>
        </>
      )}
    </main>
  );
}
