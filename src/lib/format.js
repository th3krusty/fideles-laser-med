export const money = (n) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const genId = () => "PED-" + Date.now().toString(36).toUpperCase();
