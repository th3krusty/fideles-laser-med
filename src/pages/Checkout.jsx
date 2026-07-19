import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { money } from "../lib/format.js";

export function Checkout({ cart, total, onBack, onPlace }) {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    entrega: "retirada",
    endereco: "",
  });
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.nome.trim() || !form.telefone.trim()) {
      setError("Preencha nome e telefone para continuar.");
      return;
    }
    if (form.entrega === "envio" && !form.endereco.trim()) {
      setError("Informe o endereço de entrega.");
      return;
    }
    setError("");
    onPlace(form);
  }

  return (
    <main className="container page-narrow">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Voltar ao carrinho
      </button>
      <h1>Finalizar pedido</h1>

      <form className="checkout-form" onSubmit={submit}>
        <label className="field-label" htmlFor="nome">Nome completo</label>
        <input id="nome" value={form.nome} onChange={(e) => update("nome", e.target.value)} placeholder="Seu nome" />

        <label className="field-label" htmlFor="telefone">Telefone / WhatsApp</label>
        <input id="telefone" value={form.telefone} onChange={(e) => update("telefone", e.target.value)} placeholder="(00) 00000-0000" />

        <label className="field-label" htmlFor="email">E-mail (opcional)</label>
        <input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="voce@email.com" />

        <span className="field-label">Entrega</span>
        <div className="radio-row">
          <label className={"radio-opt" + (form.entrega === "retirada" ? " active" : "")}>
            <input type="radio" name="entrega" checked={form.entrega === "retirada"} onChange={() => update("entrega", "retirada")} />
            Combinar retirada <span className="hint-text"> Curitiba</span>
          </label>
          <label className={"radio-opt" + (form.entrega === "envio" ? " active" : "")}>
            <input type="radio" name="entrega" checked={form.entrega === "envio"} onChange={() => update("entrega", "envio")} />
            Correios <span className="hint-text"> Verificar custo de envio.</span>
          </label>
        </div>

        {form.entrega === "envio" && (
          <>
            <label className="field-label" htmlFor="endereco">Endereço completo</label>
            <textarea id="endereco" rows={2} value={form.endereco} onChange={(e) => update("endereco", e.target.value)} placeholder="Rua, número, bairro, cidade, CEP" />
          </>
        )}

        {error && <p className="form-error">{error}</p>}

        <div className="total-line">
          <span>Total do pedido</span>
          <strong>{money(total)}</strong>
        </div>
        <p className="checkout-note">
          O pagamento é combinado na confirmação do pedido (Pix, cartão na retirada ou link enviado por WhatsApp).
        </p>

        <button className="btn btn-primary btn-block" type="submit">
          Confirmar pedido
        </button>
      </form>
    </main>
  );
}
