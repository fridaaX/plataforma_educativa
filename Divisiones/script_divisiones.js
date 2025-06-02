let dividendo = 0;
let divisor = 0;
let totalDulces = 0;
let imagenDulceSeleccionada = "";
let maxDulcesPorCaja = 0;

const dulcesDiv = document.getElementById("dulces");
const cajasDiv = document.getElementById("cajas");
const resultadoDiv = document.getElementById("resultado");
const mensajeP = document.getElementById("mensaje");
const btnSiguienteModal = document.getElementById("btnSiguienteModal");

function generarDivision() {
  do {
    dividendo = Math.floor(Math.random() * 25) + 6;
    divisor = Math.floor(Math.random() * 5) + 2;
  } while (dividendo % divisor !== 0);

  totalDulces = dividendo;
  maxDulcesPorCaja = dividendo / divisor;

  imagenDulceSeleccionada = imagenesDulces[Math.floor(Math.random() * imagenesDulces.length)];

  document.getElementById("instruccion").textContent =
    `Tenemos ${dividendo} dulces para repartirlos en ${divisor} cajas. ` +
    `Arrastra los dulces a las cajas para que cada una tenga la misma cantidad dentro.`;

  document.getElementById("m").textContent = dividendo;
  document.getElementById("n").textContent = divisor;

  crearDulces();
  crearCajas();
}

const imagenesDulces = [
  "imagenes/dulce1.png",
  "imagenes/dulce2.png",
  "imagenes/dulce1.png",
  "imagenes/dulce1.png",
  "imagenes/dulce1.png"
];

function crearDulces() {
  const angulo = Math.floor(Math.random() * 20 - 10);

  for (let i = 0; i < dividendo; i++) {
    const dulce = document.createElement("div");
    dulce.classList.add("dulce");
    dulce.setAttribute("draggable", true);

    const imagen = document.createElement("img");
    imagen.src = imagenDulceSeleccionada;
    imagen.alt = "Dulce";
    imagen.classList.add("imagen-dulce");

    dulce.style.transform = `rotate(${angulo}deg)`;
    dulce.appendChild(imagen);

    dulce.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", "dulce");
      e.target.classList.add("dragging");
    });

    dulce.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
    });

    dulcesDiv.appendChild(dulce);
  }
}

function crearCajas() {
  for (let i = 0; i < divisor; i++) {
    const caja = document.createElement("div");
    caja.classList.add("caja");

    caja.addEventListener("dragover", (e) => e.preventDefault());

    caja.addEventListener("drop", (e) => {
      const dulcesEnCaja = e.currentTarget.querySelectorAll('.dulce').length;

      if (dulcesEnCaja >= maxDulcesPorCaja) return;

      const dragging = document.querySelector(".dragging");
      if (dragging) {
        e.currentTarget.appendChild(dragging);

        let dulcesColocados = contarDulcesEnCajas();
        if (dulcesColocados === dividendo) {
          // resultadoDiv.classList.remove("hidden"); // Ya no se abre automáticamente
        }
      }
    });

    cajasDiv.appendChild(caja);
  }
}

function contarDulcesEnCajas() {
  let dulcesColocados = 0;
  for (let j = 0; j < cajasDiv.children.length; j++) {
    dulcesColocados += cajasDiv.children[j].querySelectorAll('.dulce').length;
  }
  return dulcesColocados;
}

function verificarResultado() {
  mensajeP.textContent = ""; // Limpiar mensaje anterior
  const valor1 = parseInt(document.getElementById("respuesta").value);
  const valor2 = parseInt(document.getElementById("respuestaEcuacion").value);

  let dulcesColocados = contarDulcesEnCajas();

  if (dulcesColocados < dividendo) {
    mensajeP.textContent = "Aún no has colocado todos los dulces en las cajas.";
    mensajeP.style.color = "orange";
    btnSiguienteModal.classList.add("hidden");
    return;
  }

  // Verificar distribución correcta
  let esCorrecto1 = true;
  for (let i = 0; i < cajasDiv.children.length; i++) {
    const cantidadEnCaja = cajasDiv.children[i].childElementCount;
    if (cantidadEnCaja !== maxDulcesPorCaja) {
      esCorrecto1 = false;
    }
  }

  const esCorrecto2 = valor2 === maxDulcesPorCaja;

  if (esCorrecto1 && esCorrecto2) {
    mensajeP.textContent = "¡Correcto!";
    mensajeP.style.color = "green";
    btnSiguienteModal.classList.remove("hidden");
  } else {
    mensajeP.textContent = "Intenta de nuevo";
    mensajeP.style.color = "red";
    btnSiguienteModal.classList.add("hidden");
  }
}

function nuevaDivision() {
  dulcesDiv.innerHTML = "";
  cajasDiv.innerHTML = "";
  resultadoDiv.classList.add("hidden");
  mensajeP.textContent = "";
  document.getElementById("respuesta").value = "";
  document.getElementById("respuestaEcuacion").value = "";
  btnSiguienteModal.classList.add("hidden");

  generarDivision();
}

function abrirModal() {
  const dulcesColocados = contarDulcesEnCajas();

  mensajeP.textContent = ""; // Limpiar mensaje anterior al abrir

  if (dulcesColocados < dividendo) {
    mensajeP.textContent = "Aún no has colocado todos los dulces en las cajas.";
    mensajeP.style.color = "orange";
  }

  resultadoDiv.classList.remove("hidden");
}

function cerrarModal() {
  resultadoDiv.classList.add("hidden");
}

window.nuevaDivision = nuevaDivision;
generarDivision();

