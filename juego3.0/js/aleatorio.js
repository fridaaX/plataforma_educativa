const dropZone = document.getElementById('dropZone');
const pieces = document.getElementById('pieces');
const finalMessage = document.getElementById('final-message');
const mensajeError = document.getElementById("mensaje-error");

// Banco de elementos combinados: figuras, números y letras
const elementos = [
  // Figuras
  { name: 'triangle', img: 'img/triangle.png', silueta: 'img/triangle-sil.png' },
  { name: 'star', img: 'img/star.png', silueta: 'img/star-sil.png' },
  { name: 'circle', img: 'img/circle.png', silueta: 'img/circle-sil.png' },
  { name: 'square', img: 'img/square.png', silueta: 'img/square-sil.png' },

  // Números
  { name: 'uno', img: 'img/uno.png', silueta: 'img/uno-sil.png' },
  { name: 'dos', img: 'img/dos.png', silueta: 'img/dos-sil.png' },
  { name: 'tres', img: 'img/tres.png', silueta: 'img/tres-sil.png' },
  { name: 'cuatro', img: 'img/cuatro.png', silueta: 'img/cuatro-sil.png' },
  { name: 'cinco', img: 'img/cinco.png', silueta: 'img/cinco-sil.png' },
  { name: 'seis', img: 'img/seis.png', silueta: 'img/seis-sil.png' },
  { name: 'siete', img: 'img/siete.png', silueta: 'img/siete-sil.png' },
  { name: 'ocho', img: 'img/ocho.png', silueta: 'img/ocho-sil.png' },
  { name: 'nueve', img: 'img/nueve.png', silueta: 'img/nueve-sil.png' },
  { name: 'diez', img: 'img/diez.png', silueta: 'img/diez-sil.png' },

  // Letras
  { name: 'a', img: 'img/a.png', silueta: 'img/a-sil.png' },
  { name: 'e', img: 'img/e.png', silueta: 'img/e-sil.png' },
  { name: 'i', img: 'img/i.png', silueta: 'img/i-sil.png' },
  { name: 'o', img: 'img/o.png', silueta: 'img/o-sil.png' },
  { name: 'u', img: 'img/u.png', silueta: 'img/u-sil.png' },
];

let rondaActual = 0;
const totalRondas = 5;
let aciertosEnRonda = 0;
let elementosPorRonda = [];
let piezaSeleccionada = null;

function iniciarRonda() {
  dropZone.innerHTML = '';
  pieces.innerHTML = '';
  aciertosEnRonda = 0;
  piezaSeleccionada = null;

  elementosPorRonda = [...elementos].sort(() => 0.5 - Math.random()).slice(0, 5);

  elementosPorRonda.forEach((el) => {
    const silueta = document.createElement('img');
    silueta.src = el.silueta;
    silueta.classList.add('drop-img');
    silueta.dataset.name = el.name;
    dropZone.appendChild(silueta);

    // Drag and drop
    silueta.addEventListener('dragover', (e) => e.preventDefault());
    silueta.addEventListener('drop', (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData('name');
      verificarRespuesta(data, el, silueta);
    });

    // Click/touch
    silueta.addEventListener('click', () => {
      if (piezaSeleccionada) {
        verificarRespuesta(piezaSeleccionada.dataset.name, el, silueta);
      }
    });
  });

  const piezasMezcladas = [...elementosPorRonda].sort(() => 0.5 - Math.random());
  piezasMezcladas.forEach((el) => {
    const pieza = document.createElement('img');
    pieza.src = el.img;
    pieza.classList.add('draggable');
    pieza.setAttribute('draggable', true);
    pieza.dataset.name = el.name;
    pieces.appendChild(pieza);

    // Drag and drop
    pieza.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('name', e.target.dataset.name);
    });

    // Click/touch
    pieza.addEventListener('click', () => {
      document.querySelectorAll('.draggable').forEach(p => p.classList.remove('seleccionada'));
      pieza.classList.add('seleccionada');
      piezaSeleccionada = pieza;
    });
  });
}

function verificarRespuesta(nombreSeleccionado, elemento, silueta) {
  if (nombreSeleccionado === elemento.name && !silueta.classList.contains('ocupado')) {
    silueta.classList.add('ocupado');

    const imagenFinal = document.createElement('img');
    imagenFinal.src = elemento.img;
    imagenFinal.classList.add('drop-img');
    dropZone.replaceChild(imagenFinal, silueta);

    document.querySelector(`img[data-name="${nombreSeleccionado}"].draggable`)?.remove();

    aciertosEnRonda++;
    piezaSeleccionada = null;

    if (aciertosEnRonda === 5) {
      setTimeout(siguienteRonda, 1000);
    }
  } else {
    mensajeError.textContent = "¡Intenta otra vez!";
    mensajeError.style.display = "block";
    setTimeout(() => {
      mensajeError.style.display = "none";
    }, 1500);
  }
}

function siguienteRonda() {
  rondaActual++;
  if (rondaActual < totalRondas) {
    iniciarRonda();
  } else {
    mostrarFinal();
  }
}

function mostrarFinal() {
  dropZone.style.display = 'none';
  pieces.style.display = 'none';
  finalMessage.style.display = 'block';
}

iniciarRonda();
