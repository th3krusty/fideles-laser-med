import { ArrowLeft, Package } from "lucide-react";
import { EmptyState } from "../components/EmptyState.jsx";
import { money } from "../lib/format.js";

export function Orders({ orders, onBack }) {
  return (
    <main className="container page-narrow">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Voltar à loja
      </button>
      <h1>Meus pedidos</h1>
      <p className="page-hint">Histórico salvo neste navegador.</p>

      {orders.length === 0 ? (
        <EmptyState
          icon={<Package size={28} strokeWidth={1.3} />}
          title="Nenhum pedido ainda"
          desc="Seus pedidos aparecem aqui depois da finalização da compra."
        />
      ) : (
        <ul className="orders-list">
          {orders.map((o) => (
            <li key={o.id} className="order-card">
              <div className="order-head">
                <strong>{o.id}</strong>
                <span>{new Date(o.createdAt).toLocaleDateString("pt-BR")}</span>
              </div>
              <p className="cart-meta">{o.items.map((i) => i.productName).join(", ")}</p>
              <div className="order-foot">
                <span>{o.customer?.entrega === "retirada" ? "Retirada na loja" : "Envio pelo correio"}</span>
                <strong>{money(o.total)}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
