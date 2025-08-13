// Efeito digitação do slogan
const sloganText = "-> DEV EM MOVIMENTO: DO FRONT- END PARA DADOS <-";
const sloganEl = document.getElementById("slogan");
let sloganIndex = 0;

function escreverSlogan() {
  if (sloganIndex < sloganText.length) {
    sloganEl.innerHTML += sloganText.charAt(sloganIndex);
    sloganIndex++;
    setTimeout(escreverSlogan, 40);
  }
}
escreverSlogan();

// Efeito digitação do nome
const nome = "JULIANA RIBEIRO";
const nomeEl = document.getElementById("name");
let nomeIndex = 0;

function escreverNome() {
  if (nomeIndex < nome.length) {
    nomeEl.innerText += nome.charAt(nomeIndex);
    nomeIndex++;
    setTimeout(escreverNome, 100);
  }
}
setTimeout(escreverNome, 500);

// Animação ao scroll dos projetos
const cards = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

cards.forEach(card => {
  observer.observe(card);
});

// Parar carrossel ao passar o mouse em habilidades
const carousel = document.getElementById("carousel");
const cardsHabilidades = document.querySelectorAll(".habilidade-card");

cardsHabilidades.forEach(card => {
  card.addEventListener("mouseenter", () => {
    carousel.style.animationPlayState = "paused";
  });
  card.addEventListener("mouseleave", () => {
    carousel.style.animationPlayState = "running";
  });
});
