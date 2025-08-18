const pontos = document.getElementById("pontos");
const mensagem = document.getElementById("mensagem");

let etapa = 0;
let animando = true;
let jaTrocou = false;

// anima os pontinhos
const animacao = setInterval(() => {
  if (!animando) return;
  etapa = (etapa + 1) % 4;
  pontos.textContent = ".".repeat(etapa);
}, 500);

// troca a tela
function redirecionar() {
  if (jaTrocou) return;
  jaTrocou = true;
  animando = false;
  
  mensagem.textContent = "TUDO PRONTO, VAMOS LÁ!";
  
  // Adiciona a classe que inicia o fade-out
  document.body.classList.add('fade-out');

  // Espera a animação de fade-out terminar antes de redirecionar
  setTimeout(() => {
    window.location.href = "portifolio.html"; 
  }, 1000); // 1000ms = 1s (mesmo tempo da transição no CSS)
}

// O tempo total antes de iniciar o redirecionamento agora é 2000ms + 1000ms do fade
setTimeout(redirecionar, 2000);
window.addEventListener("mousemove", redirecionar, { once: true });