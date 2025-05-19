let letraActual = 'A'.charCodeAt(0);
let errores = 0;
let erroresIdentifica = 0;
let letraObjetivo;
let letrasObjetivoRestantes = 20;


function mostrarNiveles() {
    window.location.href = 'nivelesGLOB.html';
}

function iniciarNivel(nivel) {
    if (nivel === 'alfabeto') {
        window.location.href = 'juegoGLOB.html';
    } else if (nivel === 'identifica') {
        window.location.href = 'identificaGLOB.html';
    }
}

function iniciarJuegoAlfabeto() {
    let zonaJuego = document.getElementById('zona-juego');
    let erroresTexto = document.getElementById('errores');
    
    let imagenesLetras = {};
    for (let i = 65; i <= 90; i++) {
        imagenesLetras[String.fromCharCode(i)] = `./IMG/Globos/${String.fromCharCode(i).toLowerCase()}.png`;
    }

    function obtenerLetrasDiferentes(excluir, cantidad) {
        let letrasDisponibles = [];
        let codigoExcluido = excluir.charCodeAt(0);
    
        for (let i = 65; i <= 90; i++) {
            if (Math.abs(i - codigoExcluido) >= 6) {
                letrasDisponibles.push(String.fromCharCode(i));
            }
        }
    
        letrasDisponibles = letrasDisponibles.sort(() => Math.random() - 0.5);
        return letrasDisponibles.slice(0, cantidad);
    }

    function crearGlobo(letra) {
        let globo = document.createElement('div');
        globo.classList.add('globo');
        globo.style.left = obtenerPosicionNoEncimada() + '%';
        
        if (imagenesLetras[letra]) {
            globo.style.backgroundImage = `url(${imagenesLetras[letra]})`;
            globo.style.backgroundSize = 'cover';
            globo.style.backgroundPosition = 'center';
        }

        zonaJuego.appendChild(globo);

        let subir = setInterval(() => {
            let top = parseInt(globo.style.bottom || '0');
            if (top >= window.innerHeight - 100) {
                clearInterval(subir);
                globo.remove();
            } else {
                globo.style.bottom = (top + 3) + 'px'; // Velocidad aumentada
            }
        }, 45);

        globo.addEventListener('click', () => {
            if (letra === String.fromCharCode(letraActual)) {
                globo.remove(); // Solo elimina el globo seleccionado
                letraActual++;
                if (letraActual > 'Z'.charCodeAt(0)) {
                    mostrarMensaje('¡Felicidades! Has completado el juego.', true);
                }
            } else {
                errores++;
                erroresTexto.textContent = errores;
                if (errores === 3) {
                    mostrarMensaje('¡Juego terminado! Demasiados errores.', false);
                } else {
                    mostrarAvisoError(errores);
                }
            }
        });
        
    }

    setInterval(() => {
        if (letraActual <= 'Z'.charCodeAt(0)) {
            let letrasDiferentes = obtenerLetrasDiferentes(String.fromCharCode(letraActual), 2);
            let letrasMostrar = [String.fromCharCode(letraActual), ...letrasDiferentes];
    
            letrasMostrar.forEach(letra => crearGlobo(letra));
        }
    }, 3500);
}


// Letras aleatorias
function iniciarJuegoIdentifica() {
    let zonaJuego = document.getElementById('zona-juego');
    let erroresTexto = document.getElementById('errores');
    let mensajeLetra = document.getElementById('mensaje-letra');
    
    letraObjetivo = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    mensajeLetra.innerHTML = `<div class="mensaje">Encuentra la letra: <strong>${letraObjetivo}</strong></div>`;

    function crearGlobo(letra, esVacio = false) {
        let globo = document.createElement('div');
        globo.classList.add('globo');
        globo.style.left = Math.random() * 90 + '%';
        
        if (!esVacio) {
            globo.style.backgroundImage = `url(./IMG/Globos/${letra.toLowerCase()}.png)`;
            globo.style.backgroundSize = 'cover';
            globo.style.backgroundPosition = 'center';
        }
        zonaJuego.appendChild(globo);

        //Velocidad de subida = 4px
        let subir = setInterval(() => {
            let top = parseInt(globo.style.bottom || '0');
            if (top >= window.innerHeight - 100) {
                clearInterval(subir);
                globo.remove();
            } else {
                globo.style.bottom = (top + 4) + 'px';
            }
        }, 60);

        globo.addEventListener('click', () => {
            if (letra === letraObjetivo) {
                globo.remove();
                letrasObjetivoRestantes--;
                if (letrasObjetivoRestantes === 0) {
                    mostrarMensaje('¡Felicidades! Has encontrado todas las letras.', true);
                }
            } else if (!esVacio) {
                erroresIdentifica++;
                erroresTexto.textContent = erroresIdentifica;
                if (erroresIdentifica === 3) {
                    mostrarMensaje('¡Juego terminado! Demasiados errores.', false);
                } else {
                    mostrarAvisoError(erroresIdentifica);
                }
            }
        });
    }

    let globos = new Array(20).fill(letraObjetivo)
        .concat(new Array(15).fill(''))
        .concat("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').filter(l => l !== letraObjetivo).sort(() => 0.5 - Math.random()).slice(0, 15));
    
    globos.sort(() => Math.random() - 0.5);
    
    let generados = 0;
    let intervalo = setInterval(() => {
        if (generados < globos.length) {
            crearGlobo(globos[generados], globos[generados] === '');
            generados++;
        } else {
            clearInterval(intervalo);
        }
    }, 1000);
}


function mostrarAvisoError(numErrores) {
    let aviso = document.createElement('div');
    aviso.classList.add('mensaje-error');
    aviso.textContent = `¡Cuidado! Has cometido ${numErrores} error(es).`;
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 2000);
}

function mostrarMensaje(mensaje, exito) {
    let divMensaje = document.createElement('div');
    divMensaje.classList.add('mensaje');
    divMensaje.textContent = mensaje;



    let btnReiniciar = document.createElement('button');
    btnReiniciar.textContent = 'Reiniciar';
    btnReiniciar.onclick = () => location.reload();

    let btnSalir = document.createElement('button');
    btnSalir.textContent = 'Salir';
    btnSalir.onclick = () => window.location.href = 'indexGLOB.html';

    divMensaje.appendChild(btnReiniciar);
    divMensaje.appendChild(btnSalir);
    document.body.appendChild(divMensaje);
}


let posicionesPrevias = [];

function obtenerPosicionNoEncimada() {
    let nuevaPosicion;
    let intentos = 0;
    const distanciaMinima = 12; // Distancia mínima en porcentaje

    do {
        nuevaPosicion = Math.random() * 80 + 10; // Entre 10% y 90% para evitar bordes
        intentos++;
    } while (intentos < 15 && posicionesPrevias.some(pos => Math.abs(pos - nuevaPosicion) < distanciaMinima));

    posicionesPrevias.push(nuevaPosicion);

    // Mantener solo las últimas 6 posiciones para evitar sobrecarga
    if (posicionesPrevias.length > 6) {
        posicionesPrevias.shift();
    }

    return nuevaPosicion;
}
