document.addEventListener("DOMContentLoaded", () => {
  // Animação digitação do slogan
  const sloganText = "-> DEV EM MOVIMENTO: DO FRONT-END PARA DADOS <-";
  const sloganEl = document.getElementById("slogan");
  if(sloganEl) {
    let sloganIndex = 0;
    function escreverSlogan() {
      if (sloganIndex < sloganText.length) {
        sloganEl.innerHTML += sloganText.charAt(sloganIndex);
        sloganIndex++;
        setTimeout(escreverSlogan, 40);
      }
    }
    escreverSlogan();
  }

  // Animação digitação do nome
  const nome = "JULIANA RIBEIRO";
  const nomeEl = document.getElementById("name");
  if(nomeEl){
    let nomeIndex = 0;
    function escreverNome() {
      if (nomeIndex <= nome.length) {
        nomeEl.innerText = nome.substring(0, nomeIndex);
        nomeIndex++;
        setTimeout(escreverNome, 100);
      }
    }
    setTimeout(escreverNome, 500);
  }

  // Scroll suave, ativar link ativo no menu e botão "Contate-me"
  const linksMenu = document.querySelectorAll('nav a');
  const btnContato = document.querySelector('.contact');
  const logoLink = document.querySelector('.logo-link');

  function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        linksMenu.forEach(el => {
            el.classList.remove('active');
            if (el.getAttribute('href') === sectionId) {
                el.classList.add('active');
            }
        });
    }
  }
  
  linksMenu.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href');
      scrollToSection(id);
    });
  });
  
  if (logoLink) {
    logoLink.addEventListener('click', e => {
      e.preventDefault();
      scrollToSection('#home');
    });
  }

  if(btnContato) {
      btnContato.addEventListener('click', () => {
        scrollToSection('#contato');
      });
  }

  // Animação dos cards de projetos ao aparecer na viewport
  const cards = document.querySelectorAll(".project-card");
  const cardsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        cardsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => cardsObserver.observe(card));

  // Carrossel infinito de habilidades com JS
  const carousel = document.getElementById("carousel");
  if (carousel) {
      carousel.innerHTML += carousel.innerHTML;

      let pos = 0;
      const speed = 0.8; 
      let isPaused = false;

      function animateCarousel() {
          if (!isPaused) {
              pos -= speed;
              if (pos <= -carousel.scrollWidth / 2) {
                  pos = 0;
              }
              carousel.style.transform = `translateX(${pos}px)`;
          }
          requestAnimationFrame(animateCarousel);
      }
      animateCarousel();

      const carouselContainer = document.querySelector('.carousel-container');
      carouselContainer.addEventListener("mouseenter", () => { isPaused = true; });
      carouselContainer.addEventListener("mouseleave", () => { isPaused = false; });
  }
  
  // Validação e envio do formulário
  const form = document.getElementById('formContato');
  const formMessage = document.getElementById('formMsg');

  if(form){
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
      setTimeout(() => { formMessage.style.display = 'none'; }, 3000);
    });
  }

  // Botão voltar ao topo
  const btnTopo = document.getElementById('btnTopo');
  if(btnTopo){
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) btnTopo.style.display = 'block';
      else btnTopo.style.display = 'none';
    });
    btnTopo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Lógica para Modo Claro / Escuro
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  if(themeToggle) {
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
  }
  
  // Lógica para ativar a animação do marcador de texto
  const highlightSpan = document.querySelector('.highlight-animation');
  if (highlightSpan) {
    const highlightObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          highlightObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    highlightObserver.observe(highlightSpan);
  }

  // LÓGICA DO CARROSSEL DE PROJETOS (CORRIGIDA)
  function setupCarousel(containerId, leftArrowId, rightArrowId) {
    const container = document.getElementById(containerId);
    const leftArrow = document.getElementById(leftArrowId);
    const rightArrow = document.getElementById(rightArrowId);

    if (!container || !leftArrow || !rightArrow) {
      return; // Sai da função se algum elemento não for encontrado
    }

    // A LÓGICA DAS SETAS FICA AQUI FORA DO 'IF'
    const updateArrows = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      leftArrow.style.display = container.scrollLeft > 10 ? 'flex' : 'none';
      rightArrow.style.display = container.scrollLeft < maxScroll - 10 ? 'flex' : 'none';
    };

    leftArrow.addEventListener('click', () => {
      const scrollAmount = container.querySelector('.project-card').offsetWidth + 30;
      container.scrollLeft -= scrollAmount;
    });

    rightArrow.addEventListener('click', () => {
      const scrollAmount = container.querySelector('.project-card').offsetWidth + 30;
      container.scrollLeft += scrollAmount;
    });

    container.addEventListener('scroll', updateArrows);
    window.addEventListener('load', () => setTimeout(updateArrows, 100));
    window.addEventListener('resize', updateArrows);
  }

  setupCarousel('projetos-container', 'projetos-arrow-left', 'projetos-arrow-right');
  setupCarousel('academicos-container', 'academicos-arrow-left', 'academicos-arrow-right');
});