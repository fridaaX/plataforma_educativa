let piezaSeleccionada = null;

document.querySelectorAll('.draggable').forEach(pieza => {
  pieza.addEventListener('click', () => {
    // Deseleccionar si vuelven a tocar la misma
    if (piezaSeleccionada === pieza) {
      pieza.classList.remove('seleccionada');
      piezaSeleccionada = null;
    } else {
      // Quitar selección anterior
      document.querySelectorAll('.draggable').forEach(p => p.classList.remove('seleccionada'));
      // Marcar esta como seleccionada
      pieza.classList.add('seleccionada');
      piezaSeleccionada = pieza;
    }
  });
});

document.querySelectorAll('.drop-img').forEach(zona => {
  zona.addEventListener('click', () => {
    if (!piezaSeleccionada) return; // No hay letra seleccionada

    const letraSoltada = piezaSeleccionada.dataset.shape;
    const letraZona = zona.dataset.shape;

    if (letraSoltada === letraZona) {
      zona.src = piezaSeleccionada.src;
      piezaSeleccionada.classList.add('hidden');
      piezaSeleccionada.classList.remove('seleccionada');
      piezaSeleccionada = null;

      verificarCompletado();
    } else {
      // Retroalimentación visual de error
      zona.classList.add('wrong');
      setTimeout(() => zona.classList.remove('wrong'), 800);
    }
  });
});

function verificarCompletado() {
  const piezasRestantes = document.querySelectorAll('.draggable:not(.hidden)');
  if (piezasRestantes.length === 0) {
    setTimeout(() => {
      localStorage.setItem("nivelCompleto", "el nivel de figuras");
      window.location.href = "final.html";
    }, 800);
  }
}
