const banco = [
    { imagen: "imagenes/instrumentos/acordeon.png", sonido: "sonidos/instrumentos/acordeon.mp3", nombre: "acordeon" },
    { imagen: "imagenes/instrumentos/arpa.png", sonido: "sonidos/instrumentos/arpa.mp3", nombre: "arpa" },
    { imagen: "imagenes/instrumentos/bateria.png", sonido: "sonidos/instrumentos/bateria.mp3", nombre: "bateria" },
    { imagen: "imagenes/instrumentos/bongo.png", sonido: "sonidos/instrumentos/bongo.mp3", nombre: "bongo" },
    { imagen: "imagenes/instrumentos/flauta.png", sonido: "sonidos/instrumentos/flauta.mp3", nombre: "flauta" },
    { imagen: "imagenes/instrumentos/guitar-e.png", sonido: "sonidos/instrumentos/guitar-e.mp3", nombre: "guitar-e" },
    { imagen: "imagenes/instrumentos/guitarra.png", sonido: "sonidos/instrumentos/guitarra.mp3", nombre: "guitarra" },
    { imagen: "imagenes/instrumentos/piano.png", sonido: "sonidos/instrumentos/piano.mp3", nombre: "piano" },
    { imagen: "imagenes/instrumentos/sax.png", sonido: "sonidos/instrumentos/sax.mp3", nombre: "sax" }
];

let rondas = 5;
let errores = 0;
let intentos = 0;
let rondaActual = 0;
let sonidoActual = new Audio();
let nivel = new URLSearchParams(window.location.search).get('nivel') || 1;

/*document.getElementById("nivel-texto").textContent = "Nivel " + nivel;*/

function iniciarJuego() {
    rondaActual = 0;
    errores = 0;
    intentos = 0;
    document.getElementById("controles").style.display = "none";
    siguienteRonda();
}

function siguienteRonda() {
    if (rondaActual >= rondas) {
        terminarJuego("🎉 ¡Felicidades! Has completado el juego. 🎉");
        return;
    }

    intentos = 0;
    let opciones = [...banco];
    let sonidoCorrecto = opciones.splice(Math.floor(Math.random() * opciones.length), 1)[0];
    let distractores = [];

    while (distractores.length < 2) {
        let elegido = opciones[Math.floor(Math.random() * opciones.length)];
        if (!distractores.includes(elegido)) distractores.push(elegido);
    }

    let imagenes = [sonidoCorrecto, ...distractores].sort(() => Math.random() - 0.5);

    sonidoActual.src = sonidoCorrecto.sonido;
    sonidoActual.play();

    let contenedor = document.getElementById("imagenes");
    contenedor.innerHTML = "";

    imagenes.forEach(img => {
        let imagenElemento = document.createElement("img");
        imagenElemento.src = img.imagen;
        imagenElemento.classList.add("imagen");
        imagenElemento.dataset.sonido = img.nombre;
        imagenElemento.addEventListener("click", () => validarRespuesta(img.nombre, sonidoCorrecto.nombre));
        contenedor.appendChild(imagenElemento);
    });

    document.getElementById("bocina").onclick = () => sonidoActual.play();
    rondaActual++;
}

function validarRespuesta(eleccion, correcto) {
    if (eleccion === correcto) {
        mostrarMensaje("✅ ¡Correcto! Avanzas a la siguiente ronda.", "exito");
        setTimeout(siguienteRonda, 2000);
    } else {
        intentos++;
        errores++;
        mostrarMensaje(`❌ Incorrecto. Intento ${intentos} de 3.`, "error");

        if (errores >= 3) {
            setTimeout(() => terminarJuego("💔 ¡Has perdido! Inténtalo de nuevo."), 2000);
        } else if (intentos >= 3) {
            setTimeout(() => {
                mostrarMensaje("🚨 Has agotado tus intentos. Pasando a la siguiente ronda.", "error");
                setTimeout(siguienteRonda, 2000);
            }, 2000);
        }
    }
}

function mostrarMensaje(texto, tipo) {
    let mensajeElemento = document.getElementById("mensaje");
    mensajeElemento.textContent = texto;
    mensajeElemento.className = "mensaje " + (tipo === "exito" ? "mensaje-exito" : "mensaje-error");
    mensajeElemento.style.display = "block";

    setTimeout(() => mensajeElemento.style.display = "none", 2000);
}

function terminarJuego(mensajeFinal) {
    mostrarMensaje(mensajeFinal, "exito");
    document.getElementById("imagenes").innerHTML = "";
    document.getElementById("controles").style.display = "block";
}

document.getElementById("btn-repetir").addEventListener("click", () => {
    iniciarJuego();
});

document.getElementById("btn-nivel").addEventListener("click", () => {
    window.location.href = "niveles.html";
});

document.getElementById("btn-inicio").addEventListener("click", () => {
    window.location.href = "index.html";
});

window.onload = iniciarJuego;
