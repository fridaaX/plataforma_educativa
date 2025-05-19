const banco = [
    { imagen: "imagenes/animales/gato.png", sonido: "sonidos/animales/gato.mp3", nombre: "gato" },
    { imagen: "imagenes/animales/perro.png", sonido: "sonidos/animales/perro.mp3", nombre: "perro" },
    { imagen: "imagenes/animales/pollito.png", sonido: "sonidos/animales/pollito.mp3", nombre: "pollito" },
    { imagen: "imagenes/animales/vaca.png", sonido: "sonidos/animales/vaca.mp3", nombre: "vaca" },
    { imagen: "imagenes/animales/caballo.png", sonido: "sonidos/animales/caballo.mp3", nombre: "caballo" },
    { imagen: "imagenes/animales/oveja.png", sonido: "sonidos/animales/oveja.mp3", nombre: "oveja" },
    { imagen: "imagenes/animales/pato.png", sonido: "sonidos/animales/pato.mp3", nombre: "pato" },
    { imagen: "imagenes/animales/cerdo.png", sonido: "sonidos/animales/cerdo.mp3", nombre: "cerdo" },
    { imagen: "imagenes/animales/gallo.png", sonido: "sonidos/animales/gallo.mp3", nombre: "gallo" },
    { imagen: "imagenes/animales/burro.png", sonido: "sonidos/animales/burro.mp3", nombre: "burro" },
    { imagen: "imagenes/animales/leon.png", sonido: "sonidos/animales/leon.mp3", nombre: "leon" },
    { imagen: "imagenes/animales/tigre.png", sonido: "sonidos/animales/tigre.mp3", nombre: "tigre" },
    { imagen: "imagenes/animales/elefante.png", sonido: "sonidos/animales/elefante.mp3", nombre: "elefante" },
    { imagen: "imagenes/animales/mono.png", sonido: "sonidos/animales/mono.mp3", nombre: "mono" },
    { imagen: "imagenes/animales/rana.png", sonido: "sonidos/animales/rana.mp3", nombre: "rana" }
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
