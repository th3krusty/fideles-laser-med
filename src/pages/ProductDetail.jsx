import { useRef, useState } from "react";
import { ArrowLeft, ImageOff, Minus, Plus, Upload } from "lucide-react";
import { SIZES } from "../data/products.js";
import { Icons } from "../components/Icons.jsx";
import { money, genId } from "../lib/format.js";
import { supabase } from "../lib/supabase.js";

export function ProductDetail({ product, onBack, onAdd }) {
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [revealed, setRevealed] = useState(false);
  const fileRef = useRef(null);
  const Icon = Icons[product.icon];
  const price = product.prices[size];
const [imageUrl, setImageUrl] = useState(null);

async function uploadImage(file) {
  const cleanName = file.name
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-zA-Z0-9.-]/g, "-");

const fileName = `${Date.now()}-${cleanName}`;

  const { error } = await supabase.storage
    .from("pedidos")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    throw error;
  }

  const { data } = supabase.storage
    .from("pedidos")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

 async function handleFile(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  if (file.size > 4.5 * 1024 * 1024) {
    alert("A imagem precisa ter menos de 4,5 MB.");
    return;
  }

  setImageName(file.name);

  try {
    const url = await uploadImage(file);

setImage(url);
setImageUrl(url);
setRevealed(false);

    requestAnimationFrame(() =>
      setTimeout(() => setRevealed(true), 40)
    );

  } catch (error) {
    alert("Erro ao enviar imagem.");
    console.error(error);
  }
}

  return (
    <main className="container product-page">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Voltar aos produtos
      </button>

      <div className="product-grid">
        <div className="preview">
          <div className="preview-frame">
            {image ? (
              <img
                src={image}
                alt="Prévia da imagem enviada"
                className={"preview-img" + (revealed ? " revealed" : "")}
              />
            ) : (
              <Icon />
            )}
          </div>
          <label className="upload-btn">
            <Upload size={16} />
            {imageName ? "Trocar imagem" : "Enviar imagem"}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} hidden />
          </label>
          {imageName && <p className="file-name">{imageName}</p>}
          {!imageName && (
            <p className="file-hint">
              <ImageOff size={13} /> Nenhuma imagem enviada — pode adicionar depois também.
            </p>
          )}
        </div>

        <div className="details">
          <p className="eyebrow">{product.material}</p>
          <h1>{product.name}</h1>
          <p className="product-desc">{product.desc}</p>

          <div className="size-picker">
            <span className="field-label">Tamanho da área gravada</span>
            <div className="size-options">
              {SIZES.map((s) => (
                <button
                  key={s.key}
                  className={"size-opt" + (size === s.key ? " active" : "")}
                  onClick={() => setSize(s.key)}
                >
                  <strong>{s.label}</strong>
                  <span>{s.desc}</span>
                  <span className="size-price">{money(product.prices[s.key])}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="qty-picker">
            <span className="field-label">Quantidade</span>
            <div className="qty-controls">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuir">
                <Minus size={15} />
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Aumentar">
                <Plus size={15} />
              </button>
            </div>
          </div>

          <label className="field-label" htmlFor="note">Observações (opcional)</label>
          <textarea
            id="note"
            placeholder="Ex.: posicionar no canto inferior direito, texto em itálico…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />

          <div className="total-line">
            <span>Total</span>
            <strong>{money(price * qty)}</strong>
          </div>

          <button
            className="btn btn-primary btn-block"
            onClick={() =>
              onAdd({
                lineId: genId() + Math.random().toString(36).slice(2, 6),
                productId: product.id,
                productName: product.name,
                size,
                qty,
                price,
                note,
                imageUrl,
                imageName,
              })
            }
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </main>
  );
}
