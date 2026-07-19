# Dr. Fideles Laser Med — loja online

Site de gravação a laser separado por páginas, pronto para rodar como projeto
React (Vite).

## Estrutura

```
src/
  App.jsx              orquestra qual página aparece
  index.css            estilo global (paleta, tipografia, layout)
  data/products.js      catálogo (produtos, tamanhos, preços)
  lib/format.js          formatação de moeda e geração de nº de pedido
  lib/storage.js         camada de persistência (hoje: localStorage)
  components/
    NavBar.jsx
    Footer.jsx
    EmptyState.jsx
    Icons.jsx           ícones dos produtos (SVG)
  pages/
    Catalog.jsx
    ProductDetail.jsx
    Cart.jsx
    Checkout.jsx
    Confirmation.jsx
    Orders.jsx
  assets/logo.jpg
```

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Limitações importantes (leia antes de publicar de verdade)

- **Sem pagamento real.** O checkout só registra o pedido; não há integração
  com Pix, cartão ou boleto ainda. Para isso, o próximo passo é ligar a um
  gateway (Mercado Pago, Stripe, PagSeguro etc.).
- **Pedidos ficam só no navegador do cliente** (`localStorage`), então não
  chegam automaticamente até você. Para receber os pedidos de verdade, troque
  `src/lib/storage.js` por chamadas a uma API sua (ex.: `POST /api/orders`)
  ligada a um banco de dados — o resto do app não precisa mudar.
- Preços em `src/data/products.js` são um ponto de partida — ajuste como
  quiser.
