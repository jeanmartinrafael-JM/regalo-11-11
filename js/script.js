/* ============================================
   MÚSICA DE FONDO CON BOTÓN
   ============================================ */
(function () {
  const audio = new Audio('audio/musica.mp3');
  audio.loop = true;
  audio.volume = 0.55;

  // Crear botón flotante
  const boton = document.createElement('button');
  boton.className = 'boton-musica';
  boton.title = 'Activar / pausar música';
  boton.textContent = '🔇';
  document.body.appendChild(boton);

  // Recuperar estado desde sessionStorage
  const estabaSonando = sessionStorage.getItem('musicaSonando') === 'true';
  const tiempoGuardado = parseFloat(sessionStorage.getItem('musicaTiempo')) || 0;

  if (estabaSonando) {
    audio.currentTime = tiempoGuardado;
    audio.play().then(() => {
      boton.textContent = '🔊';
      boton.classList.add('sonando');
    }).catch(() => {
      boton.textContent = '🔇';
    });
  }

  // Guardar tiempo antes de salir
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('musicaTiempo', audio.currentTime);
    sessionStorage.setItem('musicaSonando', !audio.paused ? 'true' : 'false');
  });

  // Actualizar tiempo cada segundo
  setInterval(() => {
    if (!audio.paused) {
      sessionStorage.setItem('musicaTiempo', audio.currentTime);
    }
  }, 1000);

  // Click del botón
  boton.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        boton.textContent = '🔊';
        boton.classList.add('sonando');
        sessionStorage.setItem('musicaSonando', 'true');
      }).catch(err => {
        console.warn('No se pudo reproducir el audio:', err);
      });
    } else {
      audio.pause();
      boton.textContent = '🔇';
      boton.classList.remove('sonando');
      sessionStorage.setItem('musicaSonando', 'false');
    }
  });
})();

/* ============================================
   LLUVIA DE MARGARITAS
   ============================================ */
(function () {
  // Crear contenedor
  const contenedor = document.createElement('div');
  contenedor.className = 'lluvia-margaritas';
  document.body.appendChild(contenedor);

  const TOTAL = 22; // cantidad de margaritas

  function crearMargarita() {
    const span = document.createElement('span');
    span.textContent = '🌼';

    // Posición horizontal aleatoria
    span.style.left = Math.random() * 100 + 'vw';

    // Duración aleatoria entre 8 y 15 segundos
    const duracion = Math.random() * 7 + 8;
    span.style.animationDuration = duracion + 's';

    // Retraso aleatorio
    span.style.animationDelay = (Math.random() * 10) + 's';

    // Tamaño ligeramente variable
    span.style.fontSize = (Math.random() * 14 + 20) + 'px';

    contenedor.appendChild(span);
  }

  for (let i = 0; i < TOTAL; i++) {
    crearMargarita();
  }
})();

/* ============================================
   CORAZONES FLOTANTES (página final)
   ============================================ */
function activarCorazones() {
  const emojis = ['💖', '💕', '💗', '💓', '💞', '❤️', '🌼'];

  function crearCorazon() {
    const c = document.createElement('div');
    c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    c.style.position = 'fixed';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.top = '100vh';
    c.style.fontSize = (Math.random() * 20 + 15) + 'px';
    c.style.pointerEvents = 'none';
    c.style.zIndex = '5';
    c.style.animation = `subirCorazon ${Math.random() * 3 + 4}s linear forwards`;
    document.body.appendChild(c);

    setTimeout(() => c.remove(), 7000);
  }

  setInterval(crearCorazon, 400);
}

if (document.body.classList.contains('final')) {
  activarCorazones();
}