  let dividendo = 0;
  let divisor = 0;
  let totalDulces = 0;
  let imagenDulceSeleccionada = "";
  let maxDulcesPorCaja = 0;

const dulcesDiv = document.getElementById("dulces");
const cajasDiv = document.getElementById("cajas");
const resultadoDiv = document.getElementById("resultado");
const mensajeP = document.getElementById("mensaje");

function generarDivision() {
  do{
    dividendo = Math.floor(Math.random() * 25) + 6;
    divisor = Math.floor(Math.random() * 5) + 2;
    } 
  while (dividendo % divisor !== 0);
  totalDulces = dividendo;

  maxDulcesPorCaja = dividendo / divisor;

  imagenDulceSeleccionada = imagenesDulces[Math.floor(Math.random() * imagenesDulces.length)];

  //Insertar los valores en la intrucción y la respuesta
  document.getElementById("instruccion").textContent = `Tenemos ${dividendo} dulces para repartirlos en ${divisor} cajas. `+ `Arrastra los dulces a las cajas para que cada una tenga la misma contidad dentro.`;

  document.getElementById("m").textContent = dividendo;
  document.getElementById("n").textContent = divisor;

  crearDulces();
  crearCajas();
}

const imagenesDulces = ["imagenes/dulce1.png", "imagenes/dulce2.png", "imagenes/dulce1.png", "imagenes/dulce1.png", "imagenes/dulce1.png"];
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

      if (dulcesEnCaja >= maxDulcesPorCaja) {
        return;
      }

      const dragging = document.querySelector(".dragging");
      if (dragging) {
        e.currentTarget.appendChild(dragging);

        let dulcesColocados = 0;
        for (let j = 0; j < cajasDiv.children.length; j++) {
          dulcesColocados += cajasDiv.children[j].querySelectorAll('.dulce').length;
        }

        if (dulcesColocados === dividendo) {
          resultadoDiv.classList.remove("hidden");
        }
      }
    });
    cajasDiv.appendChild(caja);
  }
}

function verificarResultado() {
  console.log("Verificando...");

  const valor1 = parseInt(document.getElementById("respuesta").value);
  const valor2 = parseInt(document.getElementById("respuestaEcuacion").value);

  let esCorrecto1 = true;
  let esCorrecto2 = true;

  for (let i = 0; i < cajasDiv.children.length; i++){
    const cantidadEnCaja = cajasDiv.children[i].childElementCount;
    if (cantidadEnCaja !== maxDulcesPorCaja) {
      esCorrecto1 = false;
    }
  }

  if (valor2 !== maxDulcesPorCaja){
    esCorrecto2 = false;
  }

  if (esCorrecto1 && esCorrecto2) {
    mensajeP.textContent = "¡Correcto!";
    mensajeP.style.color = "green";
  } else {
    mensajeP.textContent = "Intenta de nuevo";
    mensajeP.style.color = "red";
  }
}

function nuevaDivision(){
  //Limpria dulces y cajas anteriores
  dulcesDiv.innerHTML = "";
  cajasDiv.innerHTML = "";
  //Quita el resultado y mensaje
  resultadoDiv.classList.add("hidden");
  mensajeP.textContent = "";
  //Limpia la entrada de respuesta
  document.getElementById("respuesta").value = "";
  document.getElementById("respuestaEcuacion").value = "";

  generarDivision();
}

function abrirModal() {
  resultadoDiv.classList.remove("hidden");
}

function cerrarModal() {
  resultadoDiv.classList.add("hidden");
}

window.nuevaDivision = nuevaDivision;
generarDivision();
