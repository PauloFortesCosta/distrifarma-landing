// === CONFIG ===
const WHATSAPP_NUMBER = "5561991703362";

// Cria link do WhatsApp com mensagem opcional de produto
function createWhatsAppLink(productName, productPrice) {
  let message = "Olá! Gostaria de fazer um pedido na Drogaria DistriFarma.";
  if (productName && productPrice) {
    message = `Olá! Gostaria de fazer um pedido do produto: ${productName} - ${productPrice}`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(productName, productPrice) {
  const url = createWhatsAppLink(productName, productPrice);
  window.open(url, "_blank", "noopener");
}

function openMaps() {
  const address = "QN 7F Conjunto 07 Lote 30 - Riacho Fundo II";
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  window.open(url, "_blank", "noopener");
}

function smoothScrollTo(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  // === BOTÕES PRINCIPAIS ===
  const btnTopo = document.getElementById("btnTopoWhats");
  const btnHero = document.getElementById("btnHeroWhats");
  const btnContato = document.getElementById("btnContatoWhats");
  const enderecoClick = document.getElementById("enderecoClick");

  btnTopo?.addEventListener("click", (e) => { e.preventDefault(); openWhatsApp(); });
  btnHero?.addEventListener("click", (e) => { e.preventDefault(); openWhatsApp(); });
  btnContato?.addEventListener("click", (e) => { e.preventDefault(); openWhatsApp(); });
  enderecoClick?.addEventListener("click", openMaps);

  // === BOTÕES "PEDIR" DOS CARDS ===
  document.querySelectorAll(".pedir").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const card = btn.closest("article");
      const name = card?.getAttribute("data-name");
      const price = card?.getAttribute("data-price");
      openWhatsApp(name, price);
    });
  });

  // === FAQ SEM ACORDEÃO (respostas sempre visíveis) ===
  document.querySelectorAll(".faq__item").forEach((item) => {
    const q = item.querySelector(".faq__q");
    const a = item.querySelector(".faq__a");
    if (!a) return;

    // marca como "aberto"
    item.classList.add("open");

    // garante que nada fique colapsado
    a.style.maxHeight = "none";
    a.style.overflow = "visible";
    a.style.opacity = "1";

    // deixa o cursor neutro na pergunta
    if (q) q.style.cursor = "default";
  });

  // === Rolagem suave para âncoras (se usar no futuro) ===
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        smoothScrollTo(hash);
      }
    });
  });

  // === Ano do rodapé ===
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

  // === Sombra da topbar ao rolar ===
  const topbar = document.querySelector(".topbar");
  const toggleShadow = () => {
    if (!topbar) return;
    topbar.style.boxShadow = window.scrollY > 6 ? "0 8px 24px rgba(0,0,0,.06)" : "none";
  };
  toggleShadow();
  window.addEventListener("scroll", toggleShadow, { passive: true });
});
