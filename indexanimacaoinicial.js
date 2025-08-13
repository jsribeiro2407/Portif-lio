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

  setTimeout(() => {
    window.location.href = "index.html"; // redireciona para sua página real
  }, 1000);
}

// troca após 2s ou com movimento do mouse
setTimeout(redirecionar, 2000);
window.addEventListener("mousemove", redirecionar, { once: true });
