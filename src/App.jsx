import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";
import { Catalog } from "./pages/Catalog.jsx";
import { ProductDetail } from "./pages/ProductDetail.jsx";
import { Cart } from "./pages/Cart.jsx";
import { Checkout } from "./pages/Checkout.jsx";
import { Confirmation } from "./pages/Confirmation.jsx";
import { Orders } from "./pages/Orders.jsx";
import { loadJSON, saveJSON } from "./lib/storage.js";
import { genId } from "./lib/format.js";
import { Contact } from "./pages/Contact.jsx";
import { WhatsAppButton } from "./components/WhatsAppButton.jsx";
import { Privacy } from "./pages/Privacy.jsx";
import { Terms } from "./pages/Terms.jsx";
import { InstagramButton } from "./components/InstagramButton.jsx";
import { About } from "./pages/About.jsx";


export default function App() {
  
  const [view, setView] = useState("catalog"); // catalog | product | cart | checkout | confirmation | orders | contact | privacy | terms | about
  const [activeProduct, setActiveProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [ready, setReady] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  
const [showCartModal, setShowCartModal] = useState(() => {
  return sessionStorage.getItem("cartModal") === "true";
});
  useEffect(() => {
    (async () => {
      const [c, o] = await Promise.all([loadJSON("cart", []), loadJSON("orders", [])]);
      setCart(c);
      setOrders(o);
      setReady(true);
    })();
  }, []);
  useEffect(() => {
  function closeModal() {
    setShowCartModal(false);
  }

  window.addEventListener("pageshow", closeModal);

  return () => {
    window.removeEventListener("pageshow", closeModal);
  };
}, []);
useEffect(() => {
  function resetModal() {
    setShowCartModal(false);
    sessionStorage.removeItem("cartModal");
  }

  window.addEventListener("pageshow", resetModal);

  return () => {
    window.removeEventListener("pageshow", resetModal);
  };
}, []);
  useEffect(() => {
    if (ready) saveJSON("cart", cart);
  }, [cart, ready]);

  useEffect(() => {
    if (ready) saveJSON("orders", orders);
  }, [orders, ready]);
 useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  setShowCartModal(false);

}, [view]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  function addToCart(item) {
    setCart((prev) => [...prev, item]);
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 550);
  }
  function removeFromCart(lineId) {
    setCart((prev) => prev.filter((i) => i.lineId !== lineId));
  }
  function updateQty(lineId, delta) {
    setCart((prev) =>
      prev.map((i) => (i.lineId === lineId ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
    );
  }
  function placeOrder(customer) {
  const order = {
    id: genId(),
    createdAt: new Date().toISOString(),
    customer,
    items: cart,
    total: cartTotal,
  };

  setOrders((prev) => [order, ...prev]);
  setLastOrder(order);
  setCart([]);

  const mensagem = `
🔥 *Novo pedido - Fideles Laser Med*

🚹 Cliente:
${customer.nome}

📞 Telefone:
${customer.telefone}

🚚 Entrega:
${customer.entrega === "envio" ? "Enviar pelo correio" : "Retirar na loja"}
${customer.entrega === "envio" ? `\n📍 Endereço:\n${customer.endereco}` : ""}

🛒 Produtos:
${cart.map(item => `
• ${item.productName}

Tamanho da gravação: ${item.size}
Quantidade: ${item.qty}
Valor: R$ ${item.price.toFixed(2)}
${item.note ? "Obs: " + item.note : ""}
${item.imageUrl ? "Imagem para gravação: " + item.imageUrl : ""}
`).join("\n")}

💰 Total:
R$ ${cartTotal.toFixed(2)}
`;

  const numero = "5541999033793";

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");

  setView("confirmation");
}

  return (
    <div className="app">
      <NavBar
  cartCount={cartCount}
  cartPulse={cartPulse}
  onLogo={() => setView("catalog")}
  onCart={() => setView("cart")}
  onOrders={() => setView("orders")}
  onContact={() => setView("contact")}
/>

      {view === "catalog" && (
        <Catalog
          onOpenProduct={(p) => {
            setActiveProduct(p);
            setView("product");
          }}
        />
      )}

      {view === "product" && activeProduct && (
        <ProductDetail
  product={activeProduct}
  onBack={() => setView("catalog")}
 onAdd={(item) => {
  addToCart(item);
  setShowCartModal(true);
  sessionStorage.setItem("cartModal", "true");
}}
/>
      )}

      {view === "cart" && (
        <Cart
          cart={cart}
          total={cartTotal}
          onRemove={removeFromCart}
          onQty={updateQty}
          onBack={() => setView("catalog")}
          onCheckout={() => setView("checkout")}
        />
      )}

      {view === "checkout" && (
        <Checkout cart={cart} total={cartTotal} onBack={() => setView("cart")} onPlace={placeOrder} />
      )}

      {view === "confirmation" && lastOrder && (
        <Confirmation order={lastOrder} onShop={() => setView("catalog")} onOrders={() => setView("orders")} />
      )}

      {view === "orders" && (
  <Orders 
    orders={orders} 
    onBack={() => setView("catalog")} 
  />
)}

{view === "contact" && (
  <Contact />
)}

{view === "privacy" && (
  <Privacy />
)}
  {view === "terms" && (
  <Terms />
)}
{view === "about" && (
  <About />
)}

  <WhatsAppButton 
  onClick={() => setShowCartModal(false)}
/>
  <InstagramButton 
  onClick={() => setShowCartModal(false)}
/>
        {showCartModal && (
  <div className="modal-overlay">
    <div className="cart-modal">

      <div className="modal-icon">
        ✓
      </div>

      <h2>Produto adicionado!</h2>

      <p>
        O produto foi adicionado ao seu carrinho.
      </p>

      <div className="modal-actions">

        <button
          className="btn btn-ghost"
         onClick={() => {
  setShowCartModal(false);
  sessionStorage.removeItem("cartModal");
  setView("catalog");
}}
        >
          Continuar comprando
        </button>

        <button
          className="btn btn-primary"
          onClick={() => {
  setShowCartModal(false);
  sessionStorage.removeItem("cartModal");
  setView("cart");
}}
        >
          Ir para o carrinho
        </button>

      </div>

    </div>
  </div>
)}

<Footer
  onPrivacy={() => setView("privacy")}
  onTerms={() => setView("terms")}
  onAbout={() => setView("about")}
/>
    </div>
  );
}
