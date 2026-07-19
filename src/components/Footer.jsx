import logo from "../assets/logo.jpg";

export function Footer({ onPrivacy, onTerms, onAbout }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src={logo} alt="Fideles Laser Med" className="footer-logo" />
          <div>
            <strong>Fideles Laser Med</strong>
            <p>Seg–Sex, 9h–18h · (41) 99913-1999 | contato@fideleslasermed.com.br | CNPJ:62.756.957/0001-10</p>
            
          </div>
        </div>
        <p className="footer-note">
          Retirada mediante agendamento ou entrega via Correios. <br />
        </p>
        
        <p className="footer-note">
          Desenvolvido por <a href="https://www.instagram.com/th3krusty" target="_blank" rel="noopener noreferrer">TH3KRUSTY Labs</a>
        </p>
        <button 
  className="link-btn"
  onClick={onPrivacy}
>
  Política de Privacidade
</button>
<button
  className="link-btn"
  onClick={() => onTerms()}
>
  Termos de Uso
</button>
<button 
  className="link-btn"
  onClick={onAbout}
>Sobre nós
</button>
       
        <p> Todos os direitos reservados. &copy; 2026 Fideles Laser Med. </p>
      </div>
    </footer>
  );
}
