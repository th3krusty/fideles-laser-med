import { ChevronRight } from "lucide-react";
import { PRODUCTS } from "../data/products.js";
import { Icons } from "../components/Icons.jsx";
import { money } from "../lib/format.js";
import { Contact } from "./Contact.jsx";
import  maquinaLaser  from "../assets/maquina.png";

export function Catalog({ onOpenProduct }) {
  return (
    <main>
      <section
  className="hero"
  style={{
    backgroundImage: `linear-gradient(
      rgba(0,0,0,0.75),
      rgba(0,0,0,0.75)
    ), url(${maquinaLaser})`
  }}
>
        <div className="container hero-inner">
          <p className="eyebrow">Identifique e afie seus instrumentos cirúrgicos!</p>
          <h1>
            SEUS INSTRUMENTOS <span className="hero-scan">gravados a laser</span> 
          </h1>
          <p className="hero-copy">
           Eles merecem identificação segura e permanente
          </p>
          <a href="#catalogo" className="btn btn-primary">
            Veja também outros produtos <ChevronRight size={16} />
          </a>
        </div>
      </section>

      <section className="process">
        <div className="container process-inner">
          {[
            ["01", "Escolha a peça", "Instrumento Médico, tábua, copo, chaveiro, faca — e o tamanho da gravação."],
            ["02", "Envie a logo ou o texto", "Logo, foto ou texto. Aceitamos PNG, JPG e SVG."],
            ["03", "Nós revisamos", "Ajustamos contraste e traço para o material antes de gravar."],
            ["04", "Você valida a arte", "Nós iniciamos a gravação somente após sua aprovação da arte final."],
            ["05", "Retire ou receba", "Combinamos entrega ou retirada na finalização do pedido."],
          ].map(([n, t, d]) => (
            <div className="process-step" key={n}>
              <span className="process-n">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="catalogo" className="catalog">
        <div className="container">
          <h2 className="section-title">Produtos</h2>
          <div className="grid">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={() => onOpenProduct(p)} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductCard({ product, onOpen }) {
  const Icon = Icons[product.icon];
  const min = Math.min(...Object.values(product.prices));
  return (
    <button className="card" onClick={onOpen}>
      <div className="card-art">
        <Icon />
        <span className="scan-line" aria-hidden="true" />
      </div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="card-material">{product.material}</p>
        <p className="card-price">a partir de <strong>{money(min)}</strong></p>
      </div>
    </button>
  );
}
