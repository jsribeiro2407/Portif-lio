// Animação digitação do slogan
const sloganText = "-> DEV EM MOVIMENTO: DO FRONT-END PARA DADOS <-";
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

// Animação digitação do nome
const nome = "JULIANA RIBEIRO";
const nomeEl = document.getElementById("name");
let nomeIndex = 0;

function escreverNome() {
  if (nomeIndex <= nome.length) {
    nomeEl.innerText = nome.substring(0, nomeIndex);
    nomeIndex++;
    setTimeout(escreverNome, 100);
  }
}
setTimeout(escreverNome, 500);

// Scroll suave e ativar link ativo no menu + mostrar só uma seção
const linksMenu = document.querySelectorAll('nav a');
const todasSecoes = document.querySelectorAll('section');

linksMenu.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    // Ativa link
    linksMenu.forEach(el => el.classList.remove('active'));
    link.classList.add('active');

    // Esconde todas seções e mostra a selecionada
    todasSecoes.forEach(sec => sec.classList.remove('active'));
    const id = link.getAttribute('href');
    document.querySelector(id).classList.add('active');

    // Scroll para o topo da seção
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

// Animação dos cards de projetos ao aparecer na viewport
const cards = document.querySelectorAll(".project-card");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
cards.forEach(card => observer.observe(card));

// Carrossel infinito habilidades
const carousel = document.getElementById("carousel");

// Duplicar conteúdo pra loop infinito
carousel.innerHTML += carousel.innerHTML;

let pos = 0;
const speed = 1; // pixels por frame, ajuste para mais rápido ou mais lento
let isPaused = false;

function animate() {
  if (!isPaused) {
    pos -= speed;
    // Quando o deslocamento alcançar metade da largura (conteúdo duplicado), volta ao início
    if (pos <= -carousel.scrollWidth / 2) {
      pos = 0;
    }
    carousel.style.transform = `translateX(${pos}px)`;
  }
  requestAnimationFrame(animate);
}

animate();

carousel.addEventListener("mouseenter", () => {
  isPaused = true;
});

carousel.addEventListener("mouseleave", () => {
  isPaused = false;
});

// Validação simples e envio simulado do formulário
const form = document.getElementById('formContato');
const formMessage = document.getElementById('formMsg');

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) {
    formMessage.style.color = 'red';
    formMessage.textContent = 'Por favor, preencha todos os campos corretamente.';
    formMessage.style.display = 'block';
    return;
  }
  formMessage.style.color = 'limegreen';
  formMessage.textContent = 'Mensagem enviada com sucesso!';
  formMessage.style.display = 'block';
  form.reset();
});

// Botão voltar ao topo
const btnTopo = document.getElementById('btnTopo');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) btnTopo.style.display = 'block';
  else btnTopo.style.display = 'none';
});

btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});