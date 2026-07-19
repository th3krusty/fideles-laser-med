import { useRef, useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { supabase } from "../lib/supabase.js";

export function Contact() {
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    produto: "Instrumento Médico",
    descricao: "",
  });

  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sending, setSending] = useState(false);

  function update(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function uploadImage(file) {
    const cleanName = file.name
      .normalize("NFD")
      .replace(/[\\u0300-\\u036f]/g, "")
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

    try {
      setSending(true);

      const url = await uploadImage(file);

      setImageName(file.name);
      setImageUrl(url);

      alert("Imagem enviada com sucesso!");

    } catch (err) {
      alert("Erro ao enviar imagem.");
      console.error(err);

    } finally {
      setSending(false);
    }
  }

  function enviarOrcamento(e) {
    e.preventDefault();

    if (!form.nome.trim() || !form.telefone.trim()) {
      alert("Preencha o nome e o WhatsApp.");
      return;
    }

    const mensagem = `
📋 *Novo Pedido de Orçamento - Fideles Laser Med*

👤 *Nome:*
${form.nome}

📱 *WhatsApp:*
${form.telefone}

📧 *E-mail:*
${form.email || "Não informado"}

📦 *Produto:*
${form.produto}

📝 *Descrição:*
${form.descricao || "Nenhuma descrição informada."}
${imageUrl ? `

🖼️ *Imagem enviada:*
${imageUrl}` : ""}
`;

    const numero = "5541999033793";

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(url, "_blank");
  }

  return (
    <main className="container page-narrow">
      <div className="contact-header">
        <p className="eyebrow">Fale conosco</p>

        <h1>Solicite um orçamento</h1>

        <p className="contact-text">
          Envie sua ideia e responderemos o mais rápido possível.
          Trabalhamos com gravação a laser em instrumentos médicos,
          odontológicos, facas, tábuas, copos, brindes e muito mais.
        </p>
      </div>

      <div className="contact-grid">

        <form className="contact-form" onSubmit={enviarOrcamento}>

          <label className="field-label">
            Nome
          </label>

          <input
            type="text"
            placeholder="Seu nome"
            value={form.nome}
            onChange={(e) => update("nome", e.target.value)}
          />

          <label className="field-label">
            WhatsApp
          </label>

          <input
            type="tel"
            placeholder="(00) 00000-0000"
            value={form.telefone}
            onChange={(e) => update("telefone", e.target.value)}
          />

          <label className="field-label">
            E-mail
          </label>

          <input
            type="email"
            placeholder="voce@email.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />

          <label className="field-label">
            O que deseja gravar?
          </label>

          <select
            value={form.produto}
            onChange={(e) => update("produto", e.target.value)}
          >
            <option>Instrumento Médico</option>
            <option>Instrumento Odontológico</option>
            <option>Kit Churrasco</option>
            <option>Faca</option>
            <option>Tábua</option>
            <option>Copo</option>
            <option>Outro</option>
          </select>

          <label className="field-label">
            Descreva seu projeto
          </label>

          <textarea
            rows={6}
            placeholder="Descreva como deseja a gravação..."
            value={form.descricao}
            onChange={(e) => update("descricao", e.target.value)}
          />

          <label className="field-label">
            Anexar imagem (opcional)
          </label>

          <label className="upload-btn">
            <Upload size={16} />

            {imageName ? "Trocar imagem" : "Escolher imagem"}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFile}
            />
          </label>

          {imageName && (
            <p className="file-name">
              <ImageIcon size={14} style={{ marginRight: 6 }} />
              {imageName}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={sending}
          >
            <MessageCircle size={18} />
            {sending ? "Enviando imagem..." : "Solicitar orçamento"}
          </button>

        </form>

        <aside className="contact-info">

          <div className="info-card">
            <Phone size={22} />
            <h3>WhatsApp</h3>
            <p>(41) 99913-1999</p>
          </div>

          <div className="info-card">
            <Mail size={22} />
            <h3>E-mail</h3>
            <p>contato@fideleslaser.com.br</p>
          </div>

          <div className="info-card">
            <MapPin size={22} />
            <h3>Atendimento</h3>
            <p>Curitiba - PR e Região</p>
          </div>

          <div className="info-card">
            <Clock size={22} />
            <h3>Horário</h3>
            <p>
              Segunda a Sexta
              <br />
              08:00 às 18:00
            </p>
          </div>

        </aside>

      </div>
    </main>
  );
}